document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const containerHeader = document.querySelector(".container-header");

    function checkScreenSize() {
        if (window.innerWidth > 1024) {
            navbar.classList.add("active");
            containerHeader.classList.add("active");
        } else {
            navbar.classList.remove("active");
            containerHeader.classList.remove("active");
        }
    }

    function toggleMenu() {
        navbar.classList.toggle("active");
        menuToggle.classList.toggle("active");
        containerHeader.classList.toggle("active");
    }

    menuToggle.addEventListener("click", toggleMenu);
    window.addEventListener("resize", checkScreenSize);

    checkScreenSize();
});

const BASE_URL = 'http://localhost:8000';

let employeeidDOM = document.getElementById("employeeID");
let infoDetailDOM = document.getElementById("information");

const searchingData = async () => {
    try {
        if (employeeidDOM.value.trim() === '') {
            Swal.fire({
                icon: "warning",
                title: "แจ้งเตือน",
                text: "กรุณากรอกรหัสพนักงาน!",
            });
            return;
        }

        const response = await axios.get(`${BASE_URL}/leave_requests_employees/${employeeidDOM.value}`);
        console.log("response", response.data);

        if (response.data.length === 0) {
            infoDetailDOM.classList.add("hidden");
            Swal.fire({
                icon: "error",
                title: "ไม่พบข้อมูล",
                text: "ไม่มีรายการใบลางานสำหรับพนักงานนี้!",
            });
            return;
        }

        infoDetailDOM.classList.remove("hidden");

        let htmlData = `
            <table>
            <tr id="table-header">
                <th>ID</th>
                <th>employee_id</th>
                <th>leave_type</th>
                <th>start_date</th>
                <th>end_date</th>
                <th>description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>`;

        for (let employee of response.data) {
            let formattedDate = new Date(employee.start_date).toLocaleDateString('th-TH');
            let formattedDate2 = new Date(employee.end_date).toLocaleDateString('th-TH');

            htmlData += `
            <tr id="table-row">
                <td data-label="ID">${employee.leave_request_id}</td> 
                <td data-label="employee_id">${employee.employee_id}</td> 
                <td data-label="leave_type">${employee.leave_type}</td> 
                <td data-label="start_date">${formattedDate}</td>
                <td data-label="end_date">${formattedDate2}</td>
                <td data-label="description">${employee.descruiption}</td>
                <td><a href='editleave.html?id=${employee.leave_request_id}'><button class='check-in'>Edit</button></a></td>
                <td><button class='check-out delete' data-id='${employee.leave_request_id}'>Delete</button></td>
            </tr>`;
        }

        htmlData += '</table>';
        infoDetailDOM.innerHTML = htmlData;

        Swal.fire({
            icon: "success",
            title: "ค้นหาสำเร็จ!",
            text: "พบรายการใบลางานของพนักงาน",
            showConfirmButton: false,
            timer: 3000
        });

        document.querySelectorAll('.delete').forEach((button) => {
            button.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;

                Swal.fire({
                    title: "ยืนยันการลบ?",
                    text: "คุณต้องการลบใบลางานนี้ใช่หรือไม่?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "ลบข้อมูล",
                    cancelButtonText: "ยกเลิก"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.delete(`${BASE_URL}/leave_requests/${id}`);
                            const newResponse = await axios.get(`${BASE_URL}/leave_requests_employees/${employeeidDOM.value}`);

                            if (newResponse.data.length === 0) {
                                infoDetailDOM.classList.add("hidden");
                                Swal.fire({
                                    icon: "success",
                                    title: "ลบเสร็จสิ้น!",
                                    text: "ไม่มีข้อมูลใบลางานเหลืออยู่",
                                    showConfirmButton: false,
                                    timer: 3000
                                });
                            } else {
                                Swal.fire({
                                    icon: "success",
                                    title: "ลบข้อมูลสำเร็จ!",
                                    text: "อัปเดตรายการที่เหลือ",
                                    showConfirmButton: false,
                                    timer: 2000
                                });

                                await searchingData();
                            }
                        } catch (error) {
                            console.log('error', error);
                            Swal.fire({
                                icon: "error",
                                title: "เกิดข้อผิดพลาด",
                                text: "ไม่สามารถลบข้อมูลได้",
                            });
                        }
                    }
                });
            });
        });

    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "ไม่พบข้อมูล",
            text: "ไม่พบรหัสพนักงานหรือไม่มีข้อมูล!",
        });

        infoDetailDOM.classList.add('hidden');
    }
};
