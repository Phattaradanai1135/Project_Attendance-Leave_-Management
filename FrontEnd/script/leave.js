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

const formatDate = (dateString) => {
    return dateString ? dateString.split('T')[0] : '';
};


window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    console.log('leave_request_id', id)
    if (id) {
        mode = 'EDIT'
        selectedId = id

        //1. เราจะดึงข้อมูลของ leave_request ที่ต้องการแก้ไข
        try {
            const response = await axios.get(`${BASE_URL}/leave_requests/${id}`)
            const leave_request = response.data
            console.log('leave_request', leave_request[0]);

            //2. เราจะนำข้อมูลของ leave_request ที่ดึงมา ใส่ใน input ที่เรามี
            let employee_idDOM = document.querySelector('input[name=employeeID]');
            let leave_typeDOM = document.querySelector('select[name=leave-type]');
            let start_dateDOM = document.querySelector('input[name=start-date]');
            let end_dateDOM = document.querySelector('input[name=end-date]');
            let descruiptionDOM = document.querySelector('textarea[name=leave-reason]');


            employee_idDOM.value = leave_request[0].employee_id
            leave_typeDOM.value = leave_request[0].leave_type
            start_dateDOM.value = formatDate(leave_request[0].start_date)
            end_dateDOM.value = formatDate(leave_request[0].end_date)
            descruiptionDOM.value = leave_request[0].descruiption

        } catch (error) {
            console.log('error', error)
        }
    }
}

const validateDataLeave = (LeaveData) => {
    let errors = []

    if (!LeaveData.employee_id) {
        errors.push('กรุณากรอกรหัสพนักงาน')
    }
    if (!LeaveData.leave_type) {
        errors.push('กรุณาเลือกประเภทการลา')
    }
    if (!LeaveData.start_date) {
        errors.push('กรุณากำหนดวันเริ่มลา')
    }
    if (!LeaveData.end_date) {
        errors.push('กรุณากำหนดวันสิ้นสุดลา')
    }
    if (!LeaveData.start_date) {
        errors.push('กรุณากรอกำหนดวันเริ่มลา')
    }
    if (!LeaveData.descruiption) {
        errors.push('กรุณากรอกเหตุผลการลา')
    }
    return errors
}


const submitLeaveData = async () => {
    let employee_idDOM = document.querySelector('input[name=employeeID]');
    let leave_typeDOM = document.querySelector('select[name=leave-type]');
    let start_dateDOM = document.querySelector('input[name=start-date]');
    let end_dateDOM = document.querySelector('input[name=end-date]');
    let descruiptionDOM = document.querySelector('textarea[name=leave-reason]');

    let messageDOM = document.getElementById('message');

    try {
        let LeaveData = {
            employee_id: employee_idDOM.value,
            leave_type: leave_typeDOM.value,
            start_date: start_dateDOM.value,
            end_date: end_dateDOM.value,
            descruiption: descruiptionDOM.value,
        }

        console.log('submitLeaveData', LeaveData);
        let message = 'บันทึกการลางานเรียบร้อย'
        if (mode == 'CREATE') {
            const response = await axios.post(`${BASE_URL}/leave_requests`, LeaveData)
            console.log('response', response.data);
        } else {
            const response = await axios.put(`${BASE_URL}/leave_requests/${selectedId}`, LeaveData)
            message = 'แก้ไขการลางานเรียบร้อย'
            console.log('response', response.data);
        }
        messageDOM.innerText = message
        messageDOM.className = 'message success'
        setTimeout(() => {
            messageDOM.innerText = '';
            messageDOM.className = '';
        }, 3000);
    } catch (error) {
        console.log('error message', error.message);
        console.log('error', error.errors);

        if (error.response) {
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }

        let htmlData = '<div>'
        htmlData += `<div> ${error.message} </div>`
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li> ${error.errors[i]} </li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'

        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
        setTimeout(() => {
            messageDOM.innerText = '';
            messageDOM.className = '';
        }, 3000);
    }
}