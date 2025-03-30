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
            };
        }

        const response = await axios.get(`${BASE_URL}/attendance_records/${employeeidDOM.value}`);
        console.log("response", response.data);

        message.classList.add('success');
        message.classList.remove('danger');
        message.classList.remove('hidden');

        infoDetailDOM.classList.remove("hidden");

        let htmlData = `
                        <table id="tableheader">
                        <tr>
                            <th>attendance_id</th>
                            <th>first_name</th>
                            <th>last_name</th>
                            <th>check_in_date</th>
                            <th>check_in_time</th>
                            <th>check_out_date</th>
                            <th>check_out_time</th>
                            <th>Delete</th>
                        </tr>`;

        for (let i = 0; i < response.data.length; i++) {
            let employee = response.data[i];
            let formattedDate = new Date(employee.check_in_date).toLocaleDateString('th-TH');
            let formattedDate2 = new Date(employee.check_out_date).toLocaleDateString('th-TH');
            htmlData += `
                        <table id="tablecustomers">
                        <tr>
                        <td data-label="attendance_id">${employee.attendance_id}</td> 
                        <td data-label="first_name">${employee.first_name}</td> 
                        <td data-label="last_name">${employee.last_name}</td> 
                        <td data-label="check_in_date">${formattedDate}</td>
                        <td data-label="check_in_time">${employee.check_in_time}</td>
                        <td data-label="check_out_date">${formattedDate2}</td>
                        <td data-label="check_out_time">${employee.check_out_time}</td>
                        <td><button class='delete check-out' data-id='${employee.attendance_id}'>Delete</button></td>
                        </tr>`;
        }
        message.innerHTML = "ค้นหารายการการลงเวลาเข้า-ออกสำเร็จ";
        htmlData += '</table>';
        infoDetailDOM.innerHTML = htmlData;

        document.querySelectorAll('.delete').forEach((button) => {
            button.addEventListener('click', async (event) => {
                const id = event.target.dataset.id;
                try {
                    await axios.delete(`${BASE_URL}/attendance_records/${id}`);
                    await searchingData();
                } catch (error) {
                    console.log('error', error);
                }
            });
        });

    } catch (err) {
        message.classList.add('danger');
        message.classList.remove('success');
        message.classList.remove('hidden');

        infoDetailDOM.classList.add('hidden');

        message.innerHTML = 'ไม่พบรหัสพนักงาน';
    }
};
