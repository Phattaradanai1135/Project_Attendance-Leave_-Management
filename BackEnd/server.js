const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const moment = require('moment-timezone');

app.use(bodyParser.json());
app.use(cors());
let conn = null
port = 8000

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

const validateCheck_In_Data = (Data_Check_In) => {
    let errors = []

    if (!Data_Check_In.employee_id) {
        errors.push('กรุณากรอกรหัสพนักงาน')
    }
    return errors
}

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8830
    })
}

// path = GET /employees สำหรับ get employees ทั้งหมดที่บันทึกไว้
app.get('/employees', async (req, res) => {
    const results = await conn.query('SELECT * FROM employees')
    res.json(results[0])
})

//GET /employees/:id สำหรับดึง user รายคนออกมา
app.get('/employees/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM employees WHERE employee_id = ?', id)
        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'Employee not found' }
        }
        res.json(results[0][0])
    } catch (error) {
        console.error('error: ', error.message)
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        })
    }
})

// path = GET /leave_requests สำหรับ get leave_requests ทั้งหมดที่บันทึกไว้
app.get('/leave_requests', async (req, res) => {
    const results = await conn.query('SELECT * FROM leave_requests')
    res.json(results[0])
})

// path = GET /leave_requests/:id สำหรับ get leave_requests employee_id ที่บันทึกไว้
app.get('/leave_requests_employees/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM leave_requests WHERE employee_id = ?', id)
        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'Leave Requests not found' }
        }
        res.json(results[0])
    } catch (error) {
        console.error('error: ', error.message)
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        })
    }
})

// path = GET /leave_requests/:id สำหรับ get leave_requests employee_id ที่บันทึกไว้
app.get('/leave_requests/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM leave_requests WHERE leave_request_id = ?', id)
        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'Leave Requests not found' }
        }
        res.json(results[0])
    } catch (error) {
        console.error('error: ', error.message)
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        })
    }
})

// path = GET /attendance_records สำหรับ get attendance_records ทั้งหมดที่บันทึกไว้
app.get('/attendance_records/:employee_id', async (req, res) => {
    try {
        let employee_id = req.params.employee_id;
        const [results] = await conn.query(`
            SELECT 
                ar.attendance_id, 
                e.first_name, 
                e.last_name, 
                ci.check_in_date, 
                ci.check_in_time, 
                co.check_out_date, 
                co.check_out_time 
            FROM attendance_records ar
            JOIN employees e ON ar.employee_id = e.employee_id
            LEFT JOIN check_in ci ON ar.check_in_id = ci.check_in_id
            LEFT JOIN check_out co ON ar.check_out_id = co.check_out_id
            WHERE ar.employee_id = ?
            ORDER BY ci.check_in_date DESC
        `, [employee_id]);

        res.json(results);
    } catch (error) {
        console.error('Error fetching attendance records:', error.message);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});

// path = POST /employees สำหรับสร้าง employees ใหม่บันทึกเข้าไป
app.post('/employees', async (req, res) => {
    try {
        let employee = req.body;
        const errors = validateDataAdd(employee)
        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        const results = await conn.query('INSERT INTO employees SET ?', employee)
        res.json({
            message: 'Create user successfully',
            data: results[0]
        })
    } catch (error) {
        const errorsMessages = error.message || 'Something went wrong'
        const errors = error.errors || []
        console.error('error message ', error.message)
        res.status(500).json({
            message: errorsMessages,
            errors: errors
        })
    }
});

app.post('/employees/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updateEmployee = req.body;
        const results = await conn.query(
            'UPDATE employees SET ? WHERE id = ?',
            [updateEmployee, id]
        )
        res.json({
            message: 'Update Employee successfully',
            data: results[0]
        })
    } catch (error) {
        console.error('error: ', error.message)
        let statusCode = error.statusCode || 500
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        })
    }
});

// path = POST /leave_requests สำหรับสร้าง leave_requests ใหม่บันทึกเข้าไป
app.post('/leave_requests', async (req, res) => {
    try {
        let leave_request = req.body;
        const errors = validateDataLeave(leave_request)
        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        const results = await conn.query('INSERT INTO leave_requests SET ?', leave_request)
        res.json({
            message: 'Create leave_requests successfully',
            data: results[0]
        })
    } catch (error) {
        const errorsMessages = error.message || 'Something went wrong'
        const errors = error.errors || []
        console.error('error message ', error.message)
        res.status(500).json({
            message: errorsMessages,
            errors: errors
        })
    }
});

// path = POST /check_in สำหรับสร้าง check_in ใหม่บันทึกเข้าไป
// path = POST /check_in ห้าม Check-in ซ้ำถ้ายังไม่ได้ Check-out
app.post('/check_in', async (req, res) => {
    try {
        const { employee_id } = req.body;
        const errors = validateCheck_In_Data({ employee_id });

        // ใช้ moment-timezone เพื่อให้แน่ใจว่าเป็นเวลาไทย
        const thaiDate = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
        const thaiTime = moment().tz('Asia/Bangkok').format('HH:mm:ss');

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'กรุณากรอกรหัสพนักงาน',
                errors: errors
            });
        }

        console.log("Employee ID ที่ส่งมา:", employee_id);

        //**ตรวจสอบว่าพนักงานมีอยู่จริงหรือไม่**
        const [employee] = await conn.query(
            `SELECT employee_id FROM employees WHERE employee_id = ?`,
            [employee_id]
        );

        if (employee.length === 0) {
            return res.status(404).json({ message: 'ไม่พบพนักงานในระบบ' });
        }

        //**ตรวจสอบว่าพนักงานมี Check-in ที่ยังไม่ Check-out หรือไม่**
        const [existingRecord] = await conn.query(
            `SELECT ar.attendance_id 
             FROM attendance_records ar 
             JOIN check_in ci ON ar.check_in_id = ci.check_in_id 
             WHERE ar.employee_id = ? AND ar.check_out_id IS NULL 
             ORDER BY ci.check_in_date DESC 
             LIMIT 1`,
            [employee_id]
        );

        if (existingRecord.length > 0) {
            return res.status(400).json({
                message: 'ไม่สามารถ Check-in ได้ เพราะยังไม่ได้ Check-out จากครั้งก่อน'
            });
        }

        //**บันทึก Check-in ใหม่**
        const [result] = await conn.query(
            `INSERT INTO check_in (employee_id, check_in_date, check_in_time) 
            VALUES (?, ?, ?)`,
            [employee_id, thaiDate, thaiTime]
        );

        let check_in_id = result.insertId;

        // **บันทึกลง attendance_records**
        await conn.query(
            'INSERT INTO attendance_records (employee_id, check_in_id) VALUES (?, ?)',
            [employee_id, check_in_id]
        );

        res.json({ message: 'Check-in success', check_in_id });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});





// path = POST /check_out สำหรับสร้าง check_out ใหม่บันทึกเข้าไป
// path = POST /check_out ห้าม Check-out ถ้ายังไม่ได้ Check-in
app.post('/check_out', async (req, res) => {
    try {
        const { employee_id } = req.body;
        const errors = validateCheck_In_Data({ employee_id });

        //ใช้ moment-timezone เพื่อให้แน่ใจว่าเป็นเวลาไทย
        const thaiDate = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
        const thaiTime = moment().tz('Asia/Bangkok').format('HH:mm:ss');

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'กรุณากรอกรหัสพนักงาน',
                errors: errors
            });
        }

        console.log("Employee ID ที่ส่งมา:", employee_id);

        //**ตรวจสอบว่าพนักงานมีอยู่จริงหรือไม่**
        const [employee] = await conn.query(
            `SELECT employee_id FROM employees WHERE employee_id = ?`,
            [employee_id]
        );

        if (employee.length === 0) {
            return res.status(404).json({ message: 'ไม่พบพนักงานในระบบ' });
        }

        //**ตรวจสอบว่าพนักงานมี Check-in ที่ยังไม่ Check-out หรือไม่**
        const [checkInRecord] = await conn.query(
            `SELECT ar.attendance_id 
             FROM attendance_records ar 
             JOIN check_in ci ON ar.check_in_id = ci.check_in_id 
             WHERE ar.employee_id = ? AND ar.check_out_id IS NULL 
             ORDER BY ci.check_in_date DESC 
             LIMIT 1`,
            [employee_id]
        );

        if (checkInRecord.length === 0) {
            return res.status(400).json({
                message: 'ไม่สามารถ Check-out ได้ เพราะยังไม่ได้ Check-in'
            });
        }

        const attendance_id = checkInRecord[0].attendance_id;

        //**บันทึกเวลา Check-out**
        const [result] = await conn.query(
            `INSERT INTO check_out (employee_id, check_out_date, check_out_time) 
            VALUES (?, ?, ?)`,
            [employee_id, thaiDate, thaiTime]
        );

        let check_out_id = result.insertId;

        //**อัปเดต attendance_records ด้วย check_out_id**
        await conn.query(
            'UPDATE attendance_records SET check_out_id = ? WHERE attendance_id = ?',
            [check_out_id, attendance_id]
        );

        res.json({ message: 'Check-out success', check_out_id });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});



// path = PUT /employees/:id สำหรับแก้ไข employee รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/employees/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updateEmployee = req.body;
        const results = await conn.query(
            'UPDATE employees SET ? WHERE employee_id = ?',
            [updateEmployee, id]
        )
        res.json({
            message: 'Update employee successfully',
            data: results[0]
        })
    } catch (error) {
        console.error('error: ', error.message)
        let statusCode = error.statusCode || 500
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        })
    }
});

// path = PUT /leave_requests/:id สำหรับแก้ไข leave_request แต่ละรายการ (ตาม id ที่บันทึกเข้าไป)
app.put('/leave_requests/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updateleave_request = req.body;
        const results = await conn.query(
            'UPDATE leave_requests SET ? WHERE leave_request_id = ?',
            [updateleave_request, id]
        )
        res.json({
            message: 'Update leave_requests successfully',
            data: results[0]
        })
    } catch (error) {
        console.error('error: ', error.message)
        let statusCode = error.statusCode || 500
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        })
    }
});

// path = DELETE /employees/:id สำหรับลบ employee รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/employees/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM employees WHERE employee_id = ?', parseInt(id))
        res.json({
            message: 'Delete employee successfully',
            data: results[0]
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({
            message: errorMessage,
            errors: error.message
        })
    }
});

// path = DELETE /leave_requests/:id สำหรับลบ leave_request แต่ละรายการ (ตาม id ที่บันทึกเข้าไป)
app.delete('/leave_requests/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM leave_requests WHERE leave_request_id = ?', parseInt(id))
        res.json({
            message: 'Delete leave_request successfully',
            data: results[0]
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({
            message: errorMessage,
            errors: error.message
        })
    }
});

// path = DELETE /attendance_records/:id สำหรับลบ attendance_records แต่ละรายการ (ตาม id ที่บันทึกเข้าไป)
app.delete('/attendance_records/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM attendance_records WHERE attendance_id = ?', parseInt(id))
        res.json({
            message: 'Delete attendance_record successfully',
            data: results[0]
        })
    } catch (error) {
        console.error('error message', error.message)
        res.status(500).json({
            message: errorMessage,
            errors: error.message
        })
    }
});

app.listen(port, async (req, res) => {
    await initMySQL()
    console.log('Http server is running on port ' + port)
});