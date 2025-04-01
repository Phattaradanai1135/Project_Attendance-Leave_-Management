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

window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    try {
        console.log('Loading employee data...');

        const response = await axios.get(`${BASE_URL}/employees`);
        console.log(response.data);

        const employeeDOM = document.getElementById('employee');

        if (response.data.length === 0) {
            employeeDOM.innerHTML = "";
            Swal.fire({
                icon: "info",
                title: "ไม่มีข้อมูล",
                text: "ไม่พบข้อมูลพนักงานในระบบ",
            });
            return;
        }

        let htmlData = `
            <table>
            <tr id="table-header">
                <th>Id</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Position</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>`;

        for (let employee of response.data) {
            htmlData += `
            <tr id="table-row">
                <td data-label="Id">${employee.employee_id}</td> 
                <td data-label="Firstname">${employee.first_name}</td> 
                <td data-label="Lastname">${employee.last_name}</td> 
                <td data-label="Position">${employee.position}</td>
                <td><a href='editemployee.html?id=${employee.employee_id}'><button class='check-in'>Edit</button></a></td>
                <td><button class='delete check-out' data-id='${employee.employee_id}'>Delete</button></td>
            </tr>`;
        }

        htmlData += `</table>`;
        employeeDOM.innerHTML = htmlData;

        document.querySelectorAll('.delete').forEach((button) => {
            button.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;

                Swal.fire({
                    title: "ยืนยันการลบ?",
                    text: "คุณต้องการลบพนักงานคนนี้ใช่หรือไม่?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "ลบข้อมูล",
                    cancelButtonText: "ยกเลิก"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await axios.delete(`${BASE_URL}/employees/${id}`);

                            const newResponse = await axios.get(`${BASE_URL}/employees`);
                            if (newResponse.data.length === 0) {
                                employeeDOM.innerHTML = "";
                                Swal.fire({
                                    icon: "success",
                                    title: "ลบเสร็จสิ้น!",
                                    text: "ไม่มีข้อมูลพนักงานเหลืออยู่",
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

                                await loadData();
                            }
                        } catch (error) {
                            console.error('Error:', error);
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

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถโหลดข้อมูลพนักงานได้",
        });
    }
};
