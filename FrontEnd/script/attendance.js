function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("th-TH");
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

const validateCheck_In_Data = (Data_Check_In) => {
  let errors = [];

  if (!Data_Check_In.employee_id) {
    errors.push(' กรุณากรอกรหัสพนักงาน');
  }

  return errors;
};



const Check_In_Data = async () => {
  let employee_idDOM = document.querySelector('input[name=employeeID]');
  let messageDOM = document.getElementById('messageIn');

  let Data_Check_In = {
    employee_id: employee_idDOM.value.trim() // ตัดช่องว่าง
  };

  // ✅ ตรวจสอบข้อมูลก่อนส่ง
  let errors = validateCheck_In_Data(Data_Check_In);
  if (errors.length > 0) {
    messageDOM.innerHTML = `<div>❌ ${errors[0]}</div>`;
    messageDOM.className = 'message danger';

    setTimeout(() => {
      messageDOM.innerHTML = '';
      messageDOM.className = '';
    }, 3000);
    return; // หยุดฟังก์ชันตรงนี้
  }

  try {
    console.log('Check_In_Data', Data_Check_In);
    const response = await axios.post(`${BASE_URL}/check_in`, Data_Check_In);

    messageDOM.innerText = '✅ Check-in สำเร็จ!';
    messageDOM.className = 'message success';

    setTimeout(() => {
      messageDOM.innerText = '';
      messageDOM.className = '';
    }, 3000);

  } catch (error) {
    console.log('error message', error.message);

    if (error.response) {
      error.message = error.response.data.message;
      error.errors = error.response.data.errors;
    }

    let htmlData = `<div>❌ ${error.message}</div><ul>`;
    if (error.errors) {
      for (let i = 0; i < error.errors.length; i++) {
        htmlData += `<li>⚠️ ${error.errors[i]}</li>`;
      }
    }
    htmlData += '</ul>';

    messageDOM.innerHTML = htmlData;
    messageDOM.className = 'message danger';

    setTimeout(() => {
      messageDOM.innerHTML = '';
      messageDOM.className = '';
    }, 5000);
  }
};

const Check_Out_Data = async () => {
  let employee_idDOM = document.querySelector('input[name=employeeIDD]');
  let messageDOM = document.getElementById('messageOut');

  let Data_Check_Out = {
    employee_id: employee_idDOM.value.trim()
  };

  // ✅ ตรวจสอบก่อนส่ง
  if (!Data_Check_Out.employee_id) {
    messageDOM.innerHTML = `<div>❌ กรุณากรอกรหัสพนักงาน</div>`;
    messageDOM.className = 'message danger';

    setTimeout(() => {
      messageDOM.innerHTML = '';
      messageDOM.className = '';
    }, 3000);
    return;
  }

  try {
    console.log('Check_Out_Data', Data_Check_Out);
    const response = await axios.post(`${BASE_URL}/check_Out`, Data_Check_Out);

    messageDOM.innerText = '✅ Check-out สำเร็จ!';
    messageDOM.className = 'message success';

    setTimeout(() => {
      messageDOM.innerText = '';
      messageDOM.className = '';
    }, 3000);

  } catch (error) {
    console.log('error message', error.message);

    if (error.response) {
      error.message = error.response.data.message;
      error.errors = error.response.data.errors;
    }

    let htmlData = `<div>❌ ${error.message}</div><ul>`;
    if (error.errors) {
      for (let i = 0; i < error.errors.length; i++) {
        htmlData += `<li>⚠️ ${error.errors[i]}</li>`;
      }
    }
    htmlData += '</ul>';

    messageDOM.innerHTML = htmlData;
    messageDOM.className = 'message danger';

    setTimeout(() => {
      messageDOM.innerHTML = '';
      messageDOM.className = '';
    }, 5000);
  }
};
