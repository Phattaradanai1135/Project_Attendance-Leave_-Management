function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("th-TH"); // ใช้รูปแบบเวลาของไทย
  document.getElementById("clock").textContent = timeString;
}
setInterval(updateTime, 1000);
window.onload = updateTime;

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
let mode = 'CREATE' //Default mode
let selectedId = ''

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  console.log('employee_id', id)
  if (id) {
    mode = 'EDIT'
    selectedId = id

    //1. เราจะดึงข้อมูลของ employee ที่ต้องการแก้ไข
    try {
      const response = await axios.get(`${BASE_URL}/employees/${id}`)
      const employee = response.data

      //2. เราจะนำข้อมูลของ employee ที่ดึงมา ใส่ใน input ที่เรามี
      let firstNameDOM = document.querySelector('input[name=firstname]');
      let lastNameDOM = document.querySelector('input[name=lastname]');
      let positionDOM = document.querySelector('input[name=position]');

      firstNameDOM.value = employee.first_name
      lastNameDOM.value = employee.last_name
      positionDOM.value = employee.position

    } catch (error) {
      console.log('error', error)
    }
  }
}

const validateDataAdd = (userData) => {
  let errors = []

  if (!userData.first_name) {
    errors.push('กรุณากรอกชื่อ')
  }
  if (!userData.last_name) {
    errors.push('กรุณากรอกนามสกุล')
  }
  if (!userData.position) {
    errors.push('กรุณาตำแหน่ง')
  }
  return errors
}


const submitAddData = async () => {
  let firstNameDOM = document.querySelector('input[name=firstname]');
  let lastNameDOM = document.querySelector('input[name=lastname]');
  let positionDOM = document.querySelector('input[name=position]');

  let messageDOM = document.getElementById('message');

  try {
    let userData = {
      first_name: firstNameDOM.value,
      last_name: lastNameDOM.value,
      position: positionDOM.value,
    }

    console.log('submitData', userData);
    let message = 'บันทึกข้อมูลเรียบร้อย'
    if (mode == 'CREATE') {
      const response = await axios.post(`${BASE_URL}/employees`, userData)
      console.log('response', response.data);
    } else {
      const response = await axios.put(`${BASE_URL}/employees/${selectedId}`, userData)
      message = 'แก้ไขข้อมูลเรียบร้อย'
      console.log('response', response.data);
    }
    Swal.fire({
      title: message,
      icon: "success",
      draggable: true
    });
  } catch (error) {
    console.log('error message', error.message);
    console.log('error', error.errors);

    if (error.response) {
        error.message = error.response.data.message
        error.errors = error.response.data.errors
    }

    let errorMessage = error.errors.join('<br>');

    Swal.fire({
        icon: "error",
        title: error.message,
        html: errorMessage,
    });
}
}

