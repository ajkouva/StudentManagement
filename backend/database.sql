-- Clean slate first
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS student CASCADE;
DROP TABLE IF EXISTS teacher CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS attendance_status;

CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'LEAVE');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(20) DEFAULT 'TEACHER' NOT NULL
);

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE REFERENCES users(email) ON DELETE CASCADE,
	subject varchar(50),
	roll_num int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teacher (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE REFERENCES users(email) ON DELETE CASCADE,
    subject VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL REFERENCES student(email) ON DELETE CASCADE,
    date DATE NOT NULL,
    status attendance_status NOT NULL
);

-- Insert Dummy Data (Users first, then specific roles, then attendance)
-- Note: Passwords here are placeholders. In real app, they must be hashed. 
-- Assuming these are just for testing logic or DB constraints.

-- 1. Users
INSERT INTO users (name, email, password_hash, role) VALUES
('Aman Verma', 'aman@gmail.com', 'hashed_pass_1', 'STUDENT'),
('Riya Sharma', 'riya@gmail.com', 'hashed_pass_2', 'STUDENT'),
('Karan Singh', 'karan@gmail.com', 'hashed_pass_3', 'STUDENT'),
('Neha Gupta', 'neha@gmail.com', 'hashed_pass_4', 'STUDENT'),
('Arjun Patel', 'arjun@gmail.com', 'hashed_pass_5', 'STUDENT');

-- 2. Students references users(email)
INSERT INTO student (name, email, subject, roll_num) VALUES
('Aman Verma', 'aman@gmail.com', 'Computer Science', 101),
('Riya Sharma', 'riya@gmail.com', 'Mathematics', 102),
('Karan Singh', 'karan@gmail.com', 'Physics', 103),
('Neha Gupta', 'neha@gmail.com', 'Chemistry', 104),
('Arjun Patel', 'arjun@gmail.com', 'Biology', 105);

-- 3. Attendance
-- Note: 'c@gmail.com', 'd@gmail.com', 'b@gmail.com' were in original file but not in users/student tables above.
-- Replacing with valid emails from above for data integrity.

INSERT INTO attendance (email, date, status) VALUES
('aman@gmail.com', '2026-02-11', 'PRESENT'),
('aman@gmail.com', '2026-02-12', 'ABSENT'),
('riya@gmail.com', '2026-02-13', 'PRESENT'),
('riya@gmail.com', '2026-02-14', 'ABSENT'),
('riya@gmail.com', '2026-02-15', 'PRESENT'),
('karan@gmail.com', '2026-02-11', 'PRESENT'),
('karan@gmail.com', '2026-02-12', 'ABSENT'),
('karan@gmail.com', '2026-02-13', 'PRESENT'),
('karan@gmail.com', '2026-02-14', 'ABSENT'),
('karan@gmail.com', '2026-02-15', 'PRESENT');


-- View data
SELECT * FROM users;
SELECT * FROM student;
SELECT * FROM teacher;
SELECT * FROM attendance;

-- Select specific attendance
SELECT TO_CHAR(date, 'YYYY-MM-DD') as date, status FROM attendance WHERE email='aman@gmail.com' ORDER BY date DESC;