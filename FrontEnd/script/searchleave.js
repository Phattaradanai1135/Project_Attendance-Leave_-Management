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

const BASE_URL = 'http://localhost:8000'

let employeeidDOM = document.getElementById("employeeID")
let message = document.getElementById("message")
let infoDetailDOM = document.getElementById("information")

const searchingData = async () => {

    try {

        if (employeeidDOM.value == '') {
            throw {
                message: "ไม่ได้ใส่ข้อมูล"
            }
        }

        const response = await axios.get(`${BASE_URL}/leave_requests_employees/${employeeidDOM.value}`)
        console.log("response", response.data);

        message.classList.add('success')
        message.classList.remove('danger')
        message.classList.remove('hidden')

        infoDetailDOM.classList.remove("hidden")

        let htmlData = `<table id="tableheader">
                        <tr>
                            <th>ID</th>
                            <th>employee_id</th>
                            <th>leave_type</th>
                            <th>start_date</th>
                            <th>end_date</th>
                            <th>descruiption</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>`
        for (let i = 0; i < response.data.length; i++) {
            let employee = response.data[i]
            let formattedDate = new Date(employee.start_date).toLocaleDateString('th-TH');
            let formattedDate2 = new Date(employee.end_date).toLocaleDateString('th-TH');
            htmlData += `
                        <table id="tablecustomers">
                        <tr>
                        <td data-label="ID">${employee.leave_request_id}</td> 
                        <td data-label="employee_id">${employee.employee_id}</td> 
                        <td data-label="leave_type">${employee.leave_type}</td> 
                        <td data-label="start_date">${formattedDate}</td>
                        <td data-label="end_date">${formattedDate2}</td>
                        <td data-label="descruiption">${employee.descruiption}</td>
                        <td><a href='editleave.html?id=${employee.leave_request_id}'><button class = 'check-in'>Edit</button></a></td>
                        <td><button class = 'check-out delete' data-id = '${employee.leave_request_id}'>Delete</button></td>
                        </tr>
                        </table>
                        </div>`
        }
        message.innerHTML = "ค้นหารายการใบลางานสำเร็จ";
        htmlData += '</div>';
        infoDetailDOM.innerHTML = htmlData;

        document.querySelectorAll('.delete').forEach((button) => {
            button.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                try {
                    await axios.delete(`${BASE_URL}/leave_requests/${id}`);
                    await searchingData();
                } catch (error) {
                    console.log('error', error);
                }
            });
        });

    } catch (err) {
        message.classList.add('danger')
        message.classList.remove('succes')
        message.classList.remove('hidden')

        infoDetailDOM.classList.add('hidden')

        message.innerHTML = 'ไม่พบรหัสพนักงาน'
    }
}