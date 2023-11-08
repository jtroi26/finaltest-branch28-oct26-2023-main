-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2023 at 02:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finalcapstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `admindetails`
--

CREATE TABLE `admindetails` (
  `id` int(11) NOT NULL,
  `admin_id` varchar(25) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `visibility` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admindetails`
--

INSERT INTO `admindetails` (`id`, `admin_id`, `firstname`, `middlename`, `lastname`, `department`, `role`, `visibility`) VALUES
(1, 'admin-10001', 'Christian Emmanuel', 'Avecilla', 'Pastrana', 'TLE Department', 'Admin', 'Visible');

-- --------------------------------------------------------

--
-- Table structure for table `adminlogins`
--

CREATE TABLE `adminlogins` (
  `id` int(11) NOT NULL,
  `admin_id` varchar(25) DEFAULT NULL,
  `username` varchar(25) NOT NULL,
  `userpassword` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminlogins`
--

INSERT INTO `adminlogins` (`id`, `admin_id`, `username`, `userpassword`) VALUES
(1, 'admin-10001', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` int(11) NOT NULL,
  `assessmenttype` varchar(20) NOT NULL,
  `quarterperiod` varchar(20) DEFAULT NULL,
  `studentID` varchar(25) DEFAULT NULL,
  `sectionname` varchar(50) DEFAULT NULL,
  `subjectname` varchar(25) DEFAULT NULL,
  `teacherid` varchar(25) DEFAULT NULL,
  `grade` int(10) DEFAULT NULL,
  `total` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assessmenttype`
--

CREATE TABLE `assessmenttype` (
  `id` int(11) NOT NULL,
  `assessmenttype` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessmenttype`
--

INSERT INTO `assessmenttype` (`id`, `assessmenttype`) VALUES
(1, 'Assignment'),
(5, 'Periodical Exam'),
(3, 'Quiz'),
(2, 'Seatwork'),
(4, 'Summative Exam');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `department` varchar(50) NOT NULL,
  `visibility` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department`, `visibility`) VALUES
(1, 'TLE Department', 'Visible'),
(2, 'Araling Panlipunan Department', 'Visible'),
(3, 'Science Department', 'Visible'),
(4, 'PE Department', 'Visible'),
(5, 'CLE Department', 'Visible'),
(6, 'HeKaSi Department', 'Visible'),
(7, 'Uwian Department', 'Invisible'),
(8, 'Mathematics Department', 'Visible');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `lessonID` int(11) DEFAULT NULL,
  `lessonTitle` varchar(30) NOT NULL,
  `subjectname` varchar(25) DEFAULT NULL,
  `teacherid` varchar(25) DEFAULT NULL,
  `quarterperiod` varchar(20) DEFAULT NULL,
  `sectionname` varchar(50) DEFAULT NULL,
  `section1` longtext DEFAULT NULL,
  `section2` longtext DEFAULT NULL,
  `section3` longtext DEFAULT NULL,
  `section4` longtext DEFAULT NULL,
  `section5` longtext DEFAULT NULL,
  `section6` longtext DEFAULT NULL,
  `section7` longtext DEFAULT NULL,
  `section8` longtext DEFAULT NULL,
  `section9` longtext DEFAULT NULL,
  `section10` longtext DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `dateUpdated` datetime DEFAULT NULL,
  `visibility` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `lessonID`, `lessonTitle`, `subjectname`, `teacherid`, `quarterperiod`, `sectionname`, `section1`, `section2`, `section3`, `section4`, `section5`, `section6`, `section7`, `section8`, `section9`, `section10`, `dateCreated`, `dateUpdated`, `visibility`) VALUES
(5, 1, 'Testing Lesson 1', 'Sex Education for Teens', '10420012023', 'First Quarter', 'X - St. Paul', 'This is section 1', 'This is section 2', 'This is section 3', 'This is section 4', 'This is section 5', 'This is section 6', 'This is section 7', 'This is section 8', 'This is section 9', 'This is section 10', '2023-11-03 23:10:20', '2023-11-03 23:10:20', 'Visible'),
(6, 1, 'Testing Lesson 1', 'Algebra2', '2020-069', 'First Quarter', 'VIII - St. Anne', 'This is section 1', 'This is section 2', 'This is section 3', 'This is section 4', 'This is section 5', 'This is section 6', 'This is section 7', 'This is section 8', 'This is section 9', 'This is section 10', '2023-11-04 23:09:21', '2023-11-04 23:09:21', 'Visible'),
(7, 1, 'Testing Lesson 1', 'MATHTEST', '10420012023', 'First Quarter', 'VII - St. Lorenzo', 'This is section 1', 'This is section 2', 'This is section 3', 'This is section 4', 'This is section 5', 'This is section 6', 'This is section 7', 'This is section 8', 'This is section 9', 'This is section 10', '2023-11-06 23:22:26', '2023-11-06 23:22:26', 'Visible');

-- --------------------------------------------------------

--
-- Table structure for table `quarters`
--

CREATE TABLE `quarters` (
  `id` int(11) NOT NULL,
  `quarterperiod` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quarters`
--

INSERT INTO `quarters` (`id`, `quarterperiod`) VALUES
(1, 'First Quarter'),
(4, 'Fourth Quarter'),
(2, 'Second Quarter'),
(3, 'Third Quarter');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `sectionname` varchar(50) DEFAULT NULL,
  `visibility` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `sectionname`, `visibility`) VALUES
(5, 'VII - St. Lorenzo', 'Visible'),
(6, 'VII - St. Dominic', 'Visible'),
(7, 'VII - St. Martin', 'Visible'),
(8, 'VII - St. Blaise', 'Visible'),
(9, 'VII - St. Jude', 'Visible'),
(10, 'VIII - St. Mary', 'Visible'),
(11, 'VIII - St. Elizabeth', 'Visible'),
(12, 'VIII - St. Bernadette', 'Visible'),
(13, 'VIII - St. Anne', 'Visible'),
(14, 'VIII - St. Therese', 'Visible'),
(15, 'IX - St. Matthew', 'Visible'),
(16, 'IX - St. Mark', 'Visible'),
(17, 'IX - St. Luke', 'Visible'),
(18, 'IX - St. John E.', 'Visible'),
(19, 'IX - St. Thomas', 'Visible'),
(20, 'X - St. Joseph', 'Visible'),
(21, 'X - John B.', 'Visible'),
(22, 'X - Clement', 'Visible'),
(23, 'X - St. Peter', 'Visible'),
(24, 'X - St. Paul', 'Visible');

-- --------------------------------------------------------

--
-- Table structure for table `studentattendance`
--

CREATE TABLE `studentattendance` (
  `id` int(11) NOT NULL,
  `studentID` varchar(25) DEFAULT NULL,
  `subjectname` varchar(25) DEFAULT NULL,
  `sectionname` varchar(50) DEFAULT NULL,
  `teacherid` varchar(25) DEFAULT NULL,
  `date` varchar(25) NOT NULL,
  `quarterperiod` varchar(20) DEFAULT NULL,
  `attendance` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentattendance`
--

INSERT INTO `studentattendance` (`id`, `studentID`, `subjectname`, `sectionname`, `teacherid`, `date`, `quarterperiod`, `attendance`) VALUES
(19, 'DAZ20201015', 'MATHTEST', 'VII - St. Lorenzo', '10420012023', 'November 7, 2023', 'First Quarter', 'P'),
(20, 'DAZ11111111', 'MATHTEST', 'VII - St. Lorenzo', '10420012023', 'November 7, 2023', 'First Quarter', 'r'),
(21, 'DAZ20201015', NULL, NULL, NULL, 'November 7, 2023', 'First Quarter', 'P'),
(22, 'DAZ11111111', NULL, NULL, NULL, 'November 7, 2023', 'First Quarter', 'r');

-- --------------------------------------------------------

--
-- Table structure for table `studentlogins`
--

CREATE TABLE `studentlogins` (
  `id` int(11) NOT NULL,
  `studentID` varchar(25) DEFAULT NULL,
  `studentUserName` varchar(25) DEFAULT NULL,
  `studentPassword` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentlogins`
--

INSERT INTO `studentlogins` (`id`, `studentID`, `studentUserName`, `studentPassword`) VALUES
(7, 'DAZ20171525', 'DAZSMA-jrdmercado', '3V7$m*PMw$Tg'),
(8, 'DAZ20230015', 'DAZSMA-ceapastrana', '9lvlIY9BMfQP'),
(9, 'DAZ20201015', 'DAZSMA-jcrico', 'r?!M0BUWxsjj'),
(10, 'DAZ20181005', 'DAZSMA-mcramos', 'VXhvn%w#jWIb'),
(11, 'DAZ11111111', 'DAZSMA-jlsupra', 'xiz7HL6CK4E&');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `studentID` varchar(25) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `suffix` varchar(15) DEFAULT NULL,
  `sectionname` varchar(50) DEFAULT NULL,
  `dateEnrolled` datetime DEFAULT NULL,
  `status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `studentID`, `firstname`, `middlename`, `lastname`, `suffix`, `sectionname`, `dateEnrolled`, `status`) VALUES
(13, 'DAZ20171525', 'Jan Raymarc', 'D.', 'Mercado', 'Sr.', 'X - St. Paul', '2023-11-04 21:54:33', 'Unenrolled'),
(14, 'DAZ20230015', 'Christian Emmanuel', 'Avecilla', 'Pastrana', 'III', 'IX - St. Thomas', '2023-11-04 21:54:33', 'Unenrolled'),
(15, 'DAZ20201015', 'Justroilon', 'C.', 'Rico', 'VIII', 'VII - St. Lorenzo', '2023-11-04 21:54:33', 'Unenrolled'),
(16, 'DAZ20181005', 'Marc', 'Casupang', 'Ramos', 'Jr.', 'VIII - St. Elizabeth', '2023-11-04 21:54:33', 'Unenrolled'),
(18, 'DAZ11111111', 'James', 'Lebron', 'Supra', 'Sr.', 'VII - St. Lorenzo', '2023-11-06 04:22:00', 'Unenrolled');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subjectid` varchar(25) DEFAULT NULL,
  `subjectname` varchar(25) DEFAULT NULL,
  `teacherid` varchar(25) DEFAULT NULL,
  `sectionname` varchar(50) DEFAULT NULL,
  `visibility` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subjectid`, `subjectname`, `teacherid`, `sectionname`, `visibility`) VALUES
(1, 'Math-01', 'Mathematics Today', '2013-023', 'VII - St. Blaise', 'Visible'),
(5, 'Math-003', 'Geometry for kids', '2020-069', 'X - St. Joseph', 'Visible'),
(6, 'SexED-101', 'Sex Education for Teens', '10420012023', 'X - St. Paul', 'Visible'),
(7, 'Math-032', 'Algebra2', '2020-069', 'VIII - St. Anne', 'Visible'),
(8, 'GenMath-11', 'General Math', '2013-023', 'VII - St. Lorenzo', 'Visible'),
(9, 'Math-004', 'MATHTEST', '10420012023', 'VII - St. Lorenzo', 'Visible');

-- --------------------------------------------------------

--
-- Table structure for table `teacherannouncements`
--

CREATE TABLE `teacherannouncements` (
  `id` int(11) NOT NULL,
  `teacherid` varchar(25) DEFAULT NULL,
  `subjectname` varchar(25) DEFAULT NULL,
  `sectionname` varchar(25) DEFAULT NULL,
  `announcementTitle` varchar(30) NOT NULL,
  `announcement` longtext NOT NULL,
  `visibility` varchar(15) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacherannouncements`
--

INSERT INTO `teacherannouncements` (`id`, `teacherid`, `subjectname`, `sectionname`, `announcementTitle`, `announcement`, `visibility`, `dateCreated`, `dateUpdated`) VALUES
(8, '10420012023', 'Sex Education for Teens', 'X - St. Paul', 'sex ed 1', 'Seeeex', 'Visible', '2023-11-03 23:09:51', '2023-11-03 23:09:51');

-- --------------------------------------------------------

--
-- Table structure for table `teacherdetails`
--

CREATE TABLE `teacherdetails` (
  `id` int(11) NOT NULL,
  `teacherid` varchar(25) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `suffix` varchar(50) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `visibility` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacherdetails`
--

INSERT INTO `teacherdetails` (`id`, `teacherid`, `firstname`, `middlename`, `lastname`, `suffix`, `department`, `visibility`) VALUES
(1, '2013-023', 'Alexandra', 'Echevaria', 'San Jose', 'null', 'Araling Panlipunan Department', 'Visible'),
(2, '2020-069', 'Hanz Angelo', 'Viterbo', 'Bernababe', NULL, 'Mathematics Department', 'Visible'),
(3, '10420012023', 'Christian Emmanuel', 'Avecilla', 'Pastrana', 'null', 'Uwian Department', 'Visible');

-- --------------------------------------------------------

--
-- Table structure for table `teacherlogins`
--

CREATE TABLE `teacherlogins` (
  `id` int(11) NOT NULL,
  `teacherid` varchar(25) NOT NULL,
  `userlogin` varchar(25) DEFAULT NULL,
  `userpassword` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacherlogins`
--

INSERT INTO `teacherlogins` (`id`, `teacherid`, `userlogin`, `userpassword`) VALUES
(1, '2020-069', 'havb-069', 'havb-069'),
(2, '10420012023', 't-ceapastrana', 'P!*10v@5shsu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admindetails`
--
ALTER TABLE `admindetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_id_2` (`admin_id`),
  ADD KEY `admin_id` (`admin_id`),
  ADD KEY `department` (`department`);

--
-- Indexes for table `adminlogins`
--
ALTER TABLE `adminlogins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id_2` (`admin_id`);

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quarterperiod` (`quarterperiod`),
  ADD KEY `assessmenttype` (`assessmenttype`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `sectionname` (`sectionname`),
  ADD KEY `subjectname` (`subjectname`),
  ADD KEY `teacherid` (`teacherid`);

--
-- Indexes for table `assessmenttype`
--
ALTER TABLE `assessmenttype`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessmenttype` (`assessmenttype`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `department` (`department`),
  ADD KEY `department_2` (`department`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quarterperiod` (`quarterperiod`),
  ADD KEY `subjectname` (`subjectname`) USING BTREE,
  ADD KEY `sectionname` (`sectionname`),
  ADD KEY `teacherid` (`teacherid`);

--
-- Indexes for table `quarters`
--
ALTER TABLE `quarters`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `quarterperiod_2` (`quarterperiod`),
  ADD KEY `quarterperiod` (`quarterperiod`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sectionname_2` (`sectionname`),
  ADD KEY `sectionname` (`sectionname`);

--
-- Indexes for table `studentattendance`
--
ALTER TABLE `studentattendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `subjectname` (`subjectname`),
  ADD KEY `sectionname` (`sectionname`),
  ADD KEY `teacherid` (`teacherid`),
  ADD KEY `quarterperiod` (`quarterperiod`);

--
-- Indexes for table `studentlogins`
--
ALTER TABLE `studentlogins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `studentID` (`studentID`),
  ADD KEY `sectionname` (`sectionname`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subjectname` (`subjectname`),
  ADD KEY `teacherid` (`teacherid`) USING BTREE,
  ADD KEY `sectionname` (`sectionname`);

--
-- Indexes for table `teacherannouncements`
--
ALTER TABLE `teacherannouncements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacherid` (`teacherid`,`subjectname`,`sectionname`),
  ADD KEY `sectionname` (`sectionname`),
  ADD KEY `subjectname` (`subjectname`);

--
-- Indexes for table `teacherdetails`
--
ALTER TABLE `teacherdetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teacherid` (`teacherid`),
  ADD KEY `department` (`department`),
  ADD KEY `teacherid_2` (`teacherid`);

--
-- Indexes for table `teacherlogins`
--
ALTER TABLE `teacherlogins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacherid` (`teacherid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admindetails`
--
ALTER TABLE `admindetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `adminlogins`
--
ALTER TABLE `adminlogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `assessmenttype`
--
ALTER TABLE `assessmenttype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `quarters`
--
ALTER TABLE `quarters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `studentattendance`
--
ALTER TABLE `studentattendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `studentlogins`
--
ALTER TABLE `studentlogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `teacherannouncements`
--
ALTER TABLE `teacherannouncements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `teacherdetails`
--
ALTER TABLE `teacherdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teacherlogins`
--
ALTER TABLE `teacherlogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admindetails`
--
ALTER TABLE `admindetails`
  ADD CONSTRAINT `admindetails_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments` (`department`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `adminlogins`
--
ALTER TABLE `adminlogins`
  ADD CONSTRAINT `adminlogins_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admindetails` (`admin_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `assessments_ibfk_1` FOREIGN KEY (`assessmenttype`) REFERENCES `assessmenttype` (`assessmenttype`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_2` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_3` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_4` FOREIGN KEY (`quarterperiod`) REFERENCES `quarters` (`quarterperiod`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_5` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_6` FOREIGN KEY (`subjectname`) REFERENCES `subjects` (`subjectname`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`subjectname`) REFERENCES `subjects` (`subjectname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_3` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_4` FOREIGN KEY (`quarterperiod`) REFERENCES `quarters` (`quarterperiod`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `studentattendance`
--
ALTER TABLE `studentattendance`
  ADD CONSTRAINT `studentattendance_ibfk_1` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `studentattendance_ibfk_2` FOREIGN KEY (`quarterperiod`) REFERENCES `quarters` (`quarterperiod`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `studentattendance_ibfk_3` FOREIGN KEY (`subjectname`) REFERENCES `subjects` (`subjectname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `studentattendance_ibfk_4` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `studentattendance_ibfk_5` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `studentlogins`
--
ALTER TABLE `studentlogins`
  ADD CONSTRAINT `studentlogins_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `subjects_ibfk_2` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `teacherannouncements`
--
ALTER TABLE `teacherannouncements`
  ADD CONSTRAINT `teacherannouncements_ibfk_1` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `teacherannouncements_ibfk_2` FOREIGN KEY (`subjectname`) REFERENCES `subjects` (`subjectname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `teacherannouncements_ibfk_3` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `teacherdetails`
--
ALTER TABLE `teacherdetails`
  ADD CONSTRAINT `teacherdetails_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments` (`department`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `teacherlogins`
--
ALTER TABLE `teacherlogins`
  ADD CONSTRAINT `teacherlogins_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
