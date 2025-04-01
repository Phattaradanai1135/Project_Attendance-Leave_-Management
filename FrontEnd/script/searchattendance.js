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

        const response = await axios.get(`${BASE_URL}/attendance_records/${employeeidDOM.value}`);
        console.log("response", response.data);

        infoDetailDOM.classList.remove("hidden");

        let htmlData = `
            <table>
            <tr id="table-header">
                <th>Attendance_Id</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Check_In_Date</th>
                <th>Check_In_Time</th>
                <th>Check_Out_Date</th>
                <th>Check_Out_Time</th>
                <th>Delete</th>
            </tr>`;

        for (let employee of response.data) {
            let formattedDate = new Date(employee.check_in_date).toLocaleDateString('th-TH');
            let formattedDate2 = new Date(employee.check_out_date).toLocaleDateString('th-TH');

            htmlData += `
            <tr id="table-row">
                <td data-label="Attendance_Id">${employee.attendance_id}</td> 
                <td data-label="Firstname">${employee.first_name}</td> 
                <td data-label="Lastname">${employee.last_name}</td> 
                <td data-label="Check_In_Date">${formattedDate}</td>
                <td data-label="Check_In_Time">${employee.check_in_time}</td>
                <td data-label="Check_Out_Date">${formattedDate2}</td>
                <td data-label="Check_Out_Time">${employee.check_out_time}</td>
                <td><button class='delete check-out' data-id='${employee.attendance_id}'>Delete</button></td>
            </tr>`;
        }

        htmlData += '</table>';
        infoDetailDOM.innerHTML = htmlData;

        Swal.fire({
            icon: "success",
            title: "สำเร็จ!",
            text: "ค้นหารายการการลงเวลาเข้า-ออกสำเร็จ",
            showConfirmButton: false,
            timer: 3000
        });

        document.querySelectorAll('.delete').forEach((button) => {
            button.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;

                Swal.fire({
                    title: "ยืนยันการลบ?",
                    text: "คุณต้องการลบข้อมูลนี้ใช่หรือไม่?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "ลบข้อมูล",
                    cancelButtonText: "ยกเลิก"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.delete(`${BASE_URL}/attendance_records/${id}`);
                            Swal.fire({
                                icon: "success",
                                title: "ลบข้อมูลสำเร็จ!",
                                showConfirmButton: false,
                                timer: 2000
                            });
                            await searchingData();
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
