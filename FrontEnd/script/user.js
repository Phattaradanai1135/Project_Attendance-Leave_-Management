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
window.onload = async () => {
    await loadData()
}

const loadData = async () => {
    console.log('user page loaded')
    //1. load employee ทั้งหมด จาก api ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/employees`)
    console.log(response.data)

    const employeeDOM = document.getElementById('employee')
    //2. นำ employee ทั้งหมด โหลดกลับเข้าไปใน html

    let htmlData = `
        <table id="tableheader">
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Position</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>`
    for (let i = 0; i < response.data.length; i++) {
        let employee = response.data[i]
        htmlData += `
        <table id="tablecustomers">
            <tr>
                <td data-label="ID">${employee.employee_id}</td> 
                <td data-label="Firstname">${employee.first_name}</td> 
                <td data-label="Lastname">${employee.last_name}</td> 
                <td data-label="Position">${employee.position}</td>
                <td><a href='editemployee.html?id=${employee.employee_id}'><button class='check-in'>Edit</button></a></td>
                <td><button class='delete check-out' data-id='${employee.employee_id}'>Delete</button></td>
            </tr>
        </table>`
    }
    htmlData += '</div>'
    employeeDOM.innerHTML = htmlData

    //3. ลบ user
    const deleteDOM = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDOM.length; i++) {
        deleteDOM[i].addEventListener('click', async (event) => {
            //ดึง id ของ user ที่ต้องการลบ
            const id = event.target.dataset.id
            try {
                await axios.delete(`${BASE_URL}/employees/${id}`)
                loadData() //recursive function = เรียกใช้ฟังก์ชั่น ตัวเอง
            } catch (error) {
                console.log('error', error)
            }
        })
    }
}