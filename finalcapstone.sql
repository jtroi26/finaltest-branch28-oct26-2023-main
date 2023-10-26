-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2023 at 06:14 PM
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
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `department` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department`) VALUES
(2, 'Araling Panlipunan Department'),
(1, 'TLE Department');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `lessonID` int(11) DEFAULT NULL,
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
  `dateCreated` date DEFAULT NULL,
  `dateUpdated` date DEFAULT NULL,
  `visibility` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `lessonID`, `subjectname`, `teacherid`, `quarterperiod`, `sectionname`, `section1`, `section2`, `section3`, `section4`, `section5`, `section6`, `section7`, `section8`, `section9`, `section10`, `dateCreated`, `dateUpdated`, `visibility`) VALUES
(1, 1, 'General Math', '2020-069', 'First Quarter', '8 - St. John Bosco', 'test1', 'testtest12', 'testtest13', 'test1', 'test13', 'test12', 'test1', 'test12', 'test13', 'test1', '2023-10-25', '2023-10-28', 'Visible');

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
(1, '8 - St. John Bosco', 'Visible'),
(2, '9 - St. Therese of Avila', 'Visible'),
(3, '7 - St. Therese', 'Visible');

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
(1, '2020-0001', 'jrmercado', 'password');

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
  `sectionname` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `studentID`, `firstname`, `middlename`, `lastname`, `suffix`, `sectionname`) VALUES
(1, '2020-0001', 'Jan Raymarc', 'D.', 'Mercado', 'none', '8 - St. John Bosco');

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
(1, 'Math-01', 'Mathematics Today', '2013-023', '8 - St. John Bosco', 'Visible'),
(5, 'Filipino-1', 'Ang Talinhaga ', '2020-069', '9 - St. Therese of Avila', 'Visible'),
(6, 'SexED-101', 'Sex Education for Teens', '2013-023', '8 - St. John Bosco', 'Visible'),
(7, 'Math-032', 'Algebra2', '2020-069', '9 - St. Therese of Avila', 'Visible'),
(8, 'GenMath-11', 'General Math', '2020-069', '8 - St. John Bosco', 'Visible');

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
  `department` varchar(50) DEFAULT NULL,
  `visibility` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacherdetails`
--

INSERT INTO `teacherdetails` (`id`, `teacherid`, `firstname`, `middlename`, `lastname`, `department`, `visibility`) VALUES
(1, '2013-023', 'Alexandra', 'Echevaria', 'San Jose', 'Araling Panlipunan Department', 'Visible'),
(2, '2020-069', 'Hanz Angelo', 'Viterbo', 'Bernababe', 'TLE Department', 'Visible');

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
(1, '2020-069', 'havb-069', 'havb-069');

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
  ADD UNIQUE KEY `sectionname` (`sectionname`),
  ADD KEY `sectionname_2` (`sectionname`);

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
  ADD KEY `studentID_2` (`studentID`),
  ADD KEY `sectionname` (`sectionname`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subjectname` (`subjectname`),
  ADD KEY `teacherid` (`teacherid`,`sectionname`),
  ADD KEY `subjects_ibfk_2` (`sectionname`);

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
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quarters`
--
ALTER TABLE `quarters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `studentlogins`
--
ALTER TABLE `studentlogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `teacherdetails`
--
ALTER TABLE `teacherdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teacherlogins`
--
ALTER TABLE `teacherlogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`quarterperiod`) REFERENCES `quarters` (`quarterperiod`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`subjectname`) REFERENCES `subjects` (`subjectname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_4` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_5` FOREIGN KEY (`teacherid`) REFERENCES `subjects` (`teacherid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `studentlogins`
--
ALTER TABLE `studentlogins`
  ADD CONSTRAINT `studentlogins_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `subjects_ibfk_2` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON DELETE SET NULL ON UPDATE CASCADE;

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
