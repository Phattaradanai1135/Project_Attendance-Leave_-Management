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


const BASE_URL = 'http://localhost:8000';

const validateCheck_In_Data = (Data_Check_In) => {
  let errors = [];

  if (!Data_Check_In.employee_id) {
    errors.push('กรุณากรอกรหัสพนักงาน');
  }

  return errors;
};

const Check_In_Data = async () => {
  let employee_idDOM = document.querySelector('input[name=employeeID]');

  let Data_Check_In = {
    employee_id: employee_idDOM.value.trim()
  };

  let errors = validateCheck_In_Data(Data_Check_In);
  if (errors.length > 0) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: errors[0],
    });
    return;
  }

  try {
    console.log('Check_In_Data', Data_Check_In);
    await axios.post(`${BASE_URL}/check_in`, Data_Check_In);

    Swal.fire({
      icon: "success",
      title: "Check-in สำเร็จ!",
    });

  } catch (error) {
    console.log('error message', error.message);

    if (error.response) {
      error.message = error.response.data.message;
      error.errors = error.response.data.errors;
    }

    let errorMessage = error.errors ? error.errors.join('<br>') : '';

    Swal.fire({
      icon: "error",
      title: error.message,
      html: errorMessage,
    });
  }
};

const Check_Out_Data = async () => {
  let employee_idDOM = document.querySelector('input[name=employeeIDD]');

  let Data_Check_Out = {
    employee_id: employee_idDOM.value.trim()
  };

  if (!Data_Check_Out.employee_id) {
    Swal.fire({
      icon: "error",
      title: "เกิดข้อผิดพลาด",
      text: "กรุณากรอกรหัสพนักงาน",
    });
    return;
  }

  try {
    console.log('Check_Out_Data', Data_Check_Out);
    await axios.post(`${BASE_URL}/check_Out`, Data_Check_Out);

    Swal.fire({
      icon: "success",
      title: "Check-out สำเร็จ!",
    });

  } catch (error) {
    console.log('error message', error.message);

    if (error.response) {
      error.message = error.response.data.message;
      error.errors = error.response.data.errors;
    }

    let errorMessage = error.errors ? error.errors.join('<br>') : '';

    Swal.fire({
      icon: "error",
      title: error.message,
      html: errorMessage,
    });
  }
};
