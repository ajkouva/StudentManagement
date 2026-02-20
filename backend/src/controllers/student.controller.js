const pool = require("../db/db");
// require('dotenv').config();

async function studentDetails(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (req.user.role !== "STUDENT") {
            return res.status(403).json({ message: "Access denied" });
        }
        const email = req.user.email;

        const result = await pool.query('select id, name, email, subject, roll_num from student where email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Student profile not found" });
        }

        const student = result.rows[0];

        res.json({
            profile: {
                name: student.name,
                id_code: student.id,
                subject: student.subject,
                roll_no: student.roll_num,
                email: student.email
            },
        })

    } catch (e) {
        console.error('Dashboard error:', e);
        res.status(500).json({ error: 'Server error' });
    }
}

async function attendanceCalendar(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role !== "STUDENT") {
        return res.status(403).json({ message: "Access denied" });
    }
    const userEmail = req.user.email;
    if (!userEmail) {
        return res.status(400).json({ error: "User email required" });
    }
    try {
        // Query attendance by joining with student table since attendance uses student_id
        const attendanceQuery = `
            SELECT TO_CHAR(a.date, 'YYYY-MM-DD') as date, a.status 
            FROM attendance a
            JOIN student s ON a.student_id = s.id
            WHERE s.email = $1 
            ORDER BY a.date DESC
        `;
        const attendanceResult = await pool.query(attendanceQuery, [userEmail]);

        res.json({
            attendance: attendanceResult.rows
        });

    } catch (e) {
        console.error("Attendance calendar error: ", e);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { studentDetails, attendanceCalendar };