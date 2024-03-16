-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2024 at 07:36 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `assessmentTitle` varchar(30) DEFAULT NULL,
  `assessmenttype` varchar(20) NOT NULL,
  `quarterperiod` varchar(20) DEFAULT NULL,
  `dateGiven` date NOT NULL,
  `studentID` varchar(25) DEFAULT NULL,
  `sectionname` varchar(50) DEFAULT NULL,
  `subjectname` varchar(25) DEFAULT NULL,
  `teacherid` varchar(25) DEFAULT NULL,
  `grade` int(10) DEFAULT NULL,
  `total` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`id`, `assessmentTitle`, `assessmenttype`, `quarterperiod`, `dateGiven`, `studentID`, `sectionname`, `subjectname`, `teacherid`, `grade`, `total`) VALUES
(119, 'Recitation for November 10, 20', 'Recitation', 'Fourth Quarter', '0000-00-00', 'DAZ20171525', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 14, 25),
(120, 'Recitation for November 10, 20', 'Recitation', 'Fourth Quarter', '0000-00-00', 'DAZ20181005', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 13, 25),
(121, 'Recitation for November 10, 20', 'Recitation', 'Fourth Quarter', '0000-00-00', 'DAZ11111111', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 12, 25),
(122, 'Test Quiz 1 - Nov 8, 2023', 'Quiz', 'Fourth Quarter', '0000-00-00', 'DAZ20171525', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 14, 30),
(123, 'Test Quiz 1 - Nov 8, 2023', 'Quiz', 'Fourth Quarter', '0000-00-00', 'DAZ20230015', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 13, 30),
(124, 'Test Quiz 1 - Nov 8, 2023', 'Quiz', 'Fourth Quarter', '0000-00-00', 'DAZ20181005', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 15, 30),
(125, 'Test Quiz 1 - Nov 8, 2023', 'Quiz', 'Fourth Quarter', '0000-00-00', 'DAZ20201015', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 20, 30),
(126, 'Test Quiz 1 - Nov 8, 2023', 'Quiz', 'Fourth Quarter', '0000-00-00', 'DAZ11111111', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 13, 30),
(127, 'Ass 1', 'Assignment', 'First Quarter', '0000-00-00', 'DAZ20171525', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 20, 25),
(128, 'Ass 1', 'Assignment', 'First Quarter', '0000-00-00', 'DAZ20230015', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 20, 25),
(129, 'Ass 1', 'Assignment', 'First Quarter', '0000-00-00', 'DAZ20181005', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 19, 25),
(130, 'Ass 1', 'Assignment', 'First Quarter', '0000-00-00', 'DAZ20201015', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 18, 25),
(131, 'Ass 1', 'Assignment', 'First Quarter', '0000-00-00', 'DAZ11111111', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 21, 25),
(132, 'Summative Exam', 'Summative Exam', 'Fourth Quarter', '0000-00-00', 'DAZ20171525', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 80, 100),
(133, 'Summative Exam', 'Summative Exam', 'Fourth Quarter', '0000-00-00', 'DAZ20230015', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 90, 100),
(134, 'Summative Exam', 'Summative Exam', 'Fourth Quarter', '0000-00-00', 'DAZ20181005', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 75, 100),
(135, 'Summative Exam', 'Summative Exam', 'Fourth Quarter', '0000-00-00', 'DAZ20201015', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 69, 100),
(136, 'Summative Exam', 'Summative Exam', 'Fourth Quarter', '0000-00-00', 'DAZ11111111', 'VII - St. Lorenzo', 'MATHTEST', '10420012023', 72, 100);

-- --------------------------------------------------------

--
-- Table structure for table `assessmenttype`
--

CREATE TABLE `assessmenttype` (
  `id` int(11) NOT NULL,
  `assessmenttype` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assessmenttype`
--

INSERT INTO `assessmenttype` (`id`, `assessmenttype`) VALUES
(1, 'Assignment'),
(5, 'Periodical Exam'),
(3, 'Quiz'),
(6, 'Recitation'),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(8, 'Mathematics Department', 'Visible'),
(9, 'MAPEHeh Department', 'Invisible');

-- --------------------------------------------------------

--
-- Table structure for table `lessons`
--

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL,
  `lessonID` int(11) DEFAULT NULL,
  `lessonTitle` varchar(80) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `lessonID`, `lessonTitle`, `subjectname`, `teacherid`, `quarterperiod`, `sectionname`, `section1`, `section2`, `section3`, `section4`, `section5`, `section6`, `section7`, `section8`, `section9`, `section10`, `dateCreated`, `dateUpdated`, `visibility`) VALUES
(5, 1, 'Testing Lesson 1', 'Sex Education for Teens', '10420012023', 'First Quarter', 'X - St. Paul', 'This is section 1', 'This is section 2', 'This is section 3', 'This is section 4', 'This is section 5', 'This is section 6', 'This is section 7', 'This is section 8', 'This is section 9', 'This is section 10', '2023-11-03 23:10:20', '2023-11-03 23:10:20', 'Visible'),
(6, 1, 'Testing Lesson 1', 'Algebra2', '2020-069', 'First Quarter', 'VIII - St. Anne', 'This is section 1', 'This is section 2', 'This is section 3', 'This is section 4', 'This is section 5', 'This is section 6', 'This is section 7', 'This is section 8', 'This is section 9', 'This is section 10', '2023-11-04 23:09:21', '2023-11-04 23:09:21', 'Visible'),
(7, 1, 'Pananakop ng mga kastila', 'MATHTEST', '10420012023', 'First Quarter', 'VII - St. Lorenzo', 'This is section 1', 'This is section 2', 'This is section 3', 'This is section 4', 'This is section 5', 'This is section 6', 'This is section 7', 'This is section 8', 'This is section 9', 'This is section 10', '2023-11-06 23:22:26', '2023-11-06 23:22:26', 'Visible');

-- --------------------------------------------------------

--
-- Table structure for table `quarters`
--

CREATE TABLE `quarters` (
  `id` int(11) NOT NULL,
  `quarterperiod` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(24, 'X - St. Paul', 'Visible'),
(25, 'XI', 'Visible'),
(26, 'xii', 'Visible');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentattendance`
--

INSERT INTO `studentattendance` (`id`, `studentID`, `subjectname`, `sectionname`, `teacherid`, `date`, `quarterperiod`, `attendance`) VALUES
(19, 'DAZ20201015', 'MATHTEST', 'VII - St. Lorenzo', '10420012023', 'November 7, 2023', 'First Quarter', 'P'),
(20, 'DAZ11111111', 'MATHTEST', 'VII - St. Lorenzo', '10420012023', 'November 8, 2023', 'First Quarter', 'Present'),
(21, 'DAZ20201015', NULL, NULL, NULL, 'November 7, 2023', 'First Quarter', 'P'),
(22, 'DAZ11111111', NULL, NULL, NULL, 'November 7, 2023', 'First Quarter', 'r'),
(23, 'DAZ20181005', 'MATHTEST', 'VII - St. Lorenzo', '10420012023', 'November 8, 2023', 'First Quarter', 'Present'),
(24, 'DAZ20230015', 'MATHTEST', 'VII - St. Lorenzo', '10420012023', 'November 9, 2023', 'First Quarter', 'Present');

-- --------------------------------------------------------

--
-- Table structure for table `studentlogins`
--

CREATE TABLE `studentlogins` (
  `id` int(11) NOT NULL,
  `studentID` varchar(25) DEFAULT NULL,
  `studentUserName` varchar(25) DEFAULT NULL,
  `studentPassword` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentlogins`
--

INSERT INTO `studentlogins` (`id`, `studentID`, `studentUserName`, `studentPassword`) VALUES
(7, 'DAZ20171525', 'DAZSMA-jrdmercado', '3V7$m*PMw$Tg'),
(8, 'DAZ20230015', 'DAZSMA-ceapastrana', '$2b$11$2vhg0rqf1MLIKvMniY2ub.ac3grX39PVt2JpRw1i51YRKGGv.WoS.'),
(9, 'DAZ20201015', 'DAZSMA-jcrico', 'r?!M0BUWxsjj'),
(10, 'DAZ20181005', 'DAZSMA-mcramos', 'VXhvn%w#jWIb'),
(11, 'DAZ11111111', 'DAZSMA-jlsupra', 'xiz7HL6CK4E&'),
(12, 'DAZ11111112', 'DAZSMA-jdki', '4XhOX60mX3TL');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `studentID`, `firstname`, `middlename`, `lastname`, `suffix`, `sectionname`, `dateEnrolled`, `status`) VALUES
(13, 'DAZ20171525', 'Jan Raymarc', 'D.', 'Mercado', 'Sr.', 'VII - St. Lorenzo', '2023-11-04 21:54:33', 'Enrolled'),
(14, 'DAZ20230015', 'Christian Emmanuel', 'Avecilla', 'Pastrana', 'III', 'VII - St. Lorenzo', '2023-11-04 21:54:33', 'Enrolled'),
(15, 'DAZ20201015', 'Justroilon', 'C.', 'Rico', 'Sr.', 'VII - St. Lorenzo', '2023-11-04 21:54:33', 'Enrolled'),
(16, 'DAZ20181005', 'Marc', 'Casupang', 'Ramos', 'Jr.', 'VII - St. Lorenzo', '2023-11-04 21:54:33', 'Enrolled'),
(18, 'DAZ11111111', 'James', 'Lebron', 'Supra', 'Sr.', 'VII - St. Lorenzo', '2023-11-06 04:22:00', 'Enrolled'),
(19, 'DAZ11111112', 'JOHN', 'Doe', 'Ki', 'none', 'X - St. Joseph', '2023-11-12 15:41:00', 'Enrolled');

-- --------------------------------------------------------

--
-- Table structure for table `subjectoverview`
--

CREATE TABLE `subjectoverview` (
  `id` int(11) NOT NULL,
  `teacherid` varchar(25) NOT NULL,
  `subjectname` varchar(25) NOT NULL,
  `sectionname` varchar(50) NOT NULL,
  `overview` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjectoverview`
--

INSERT INTO `subjectoverview` (`id`, `teacherid`, `subjectname`, `sectionname`, `overview`) VALUES
(1, '10420012023', 'MATHTEST', 'VII - St. Lorenzo', 'hehehe'),
(3, '10420012023', 'Sex Education for Teens', 'X - St. Paul', 'test subject overview');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subjectid`, `subjectname`, `teacherid`, `sectionname`, `visibility`) VALUES
(1, 'Math-01', 'Mathematics Today', '2013-023', 'VII - St. Blaise', 'Visible'),
(5, 'Math-003', 'Geometry for kids', '2020-069', 'X - St. Joseph', 'Visible'),
(6, 'SexED-101', 'Sex Education for Teens', '10420012023', 'X - St. Paul', 'Visible'),
(7, 'Math-032', 'Algebra2', '2020-069', 'VIII - St. Anne', 'Visible'),
(8, 'GenMath-11', 'General Math', '12113334', 'VII - St. Lorenzo', 'Visible'),
(9, 'Math-004', 'MATHTEST', '10420012023', 'VII - St. Lorenzo', 'Visible'),
(10, 'Science09', 'Science-Biology', '12113234', 'VII - St. Blaise', 'Visible');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacherannouncements`
--

INSERT INTO `teacherannouncements` (`id`, `teacherid`, `subjectname`, `sectionname`, `announcementTitle`, `announcement`, `visibility`, `dateCreated`, `dateUpdated`) VALUES
(8, '10420012023', 'Sex Education for Teens', 'X - St. Paul', 'sex ed 1', 'Seeeex', 'Visible', '2023-11-03 23:09:51', '2023-11-03 23:09:51'),
(9, '10420012023', 'MATHTEST', 'VII - St. Lorenzo', 'HEHE', '<p><span style=\"text-decoration: underline;\"><em><strong>hehehehehedadada</strong></em></span></p>', 'Visible', '2023-11-12 16:49:52', '2023-11-13 00:00:08'),
(10, '10420012023', 'MATHTEST', 'VII - St. Lorenzo', 'Test Announcement 2', 'test announcement2', 'Visible', '2023-11-13 16:49:52', '2023-11-13 16:49:52'),
(11, '10420012023', 'Sex Education for Teens', 'X - St. Paul', 'dede', 'dede', NULL, '2023-11-13 00:41:20', '2023-11-13 00:41:20'),
(12, '10420012023', 'Sex Education for Teens', 'X - St. Paul', 'haha', 'gumana', NULL, '2023-11-13 00:41:45', '2023-11-13 00:41:45'),
(13, '10420012023', 'Sex Education for Teens', 'X - St. Paul', 'haha', 'hahaaa', 'Visible', '2023-11-13 00:43:46', '2023-11-13 00:43:46'),
(14, '10420012023', 'Sex Education for Teens', 'X - St. Paul', 'hahahaha', '<p><strong>hahahhahahdasdasdasd</strong></p>', 'Visible', '2023-11-13 00:53:02', '2023-11-13 00:53:02'),
(15, '10420012023', 'Sex Education for Teens', 'X - St. Paul', 'will it work', '<p>will it work</p>', 'Visible', '2023-11-13 00:54:03', '2023-11-13 00:54:03'),
(16, '10420012023', 'Sex Education for Teens', 'X - St. Paul', 'dedo', '<p>dedo</p>', 'Visible', '2023-11-13 00:54:50', '2023-11-13 00:54:50'),
(17, '10420012023', 'Sex Education for Teens', 'X - St. Paul', 'gegege edited', '<p>asdasda edited</p>', 'Visible', '2023-11-13 00:55:28', '2023-11-13 01:15:08'),
(18, '12113334', 'General Math', 'VII - St. Lorenzo', 'Quiz 1 (March 7, 2024)', '<p>Quiz tomorrow guiz.</p>', 'Visible', '2024-03-07 22:46:52', '2024-03-07 22:46:52');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacherdetails`
--

INSERT INTO `teacherdetails` (`id`, `teacherid`, `firstname`, `middlename`, `lastname`, `suffix`, `department`, `visibility`) VALUES
(1, '2013-023', 'Alexandra', 'Echevaria', 'San Jose', 'null', 'Araling Panlipunan Department', 'Visible'),
(2, '2020-069', 'Hanz Angelo', 'Viterbo', 'Bernababe', NULL, 'Mathematics Department', 'Visible'),
(3, '10420012023', 'Christian Emmanuel', 'Avecilla', 'Pastrana', NULL, 'Mathematics Department', 'Visible'),
(4, '104200120232', 'Marc', 'Casupang', 'Ramos', '', 'Science Department', 'Visible'),
(5, '1910854', 'Alfio', 'I', 'Regla', 'null', 'Araling Panlipunan Department', 'Visible'),
(6, '333245051', 'Christian Emmanuels', 'Avecillas', 'Pastrana', 'Sr.', 'TLE Department', 'Visible'),
(7, '12113234', 'Dota', 'Dota', 'Dota', 'VI', 'PE Department', 'Visible'),
(8, '12113334', 'John', 'Doe', 'Reggy', 'Sr.', 'HeKaSi Department', 'Visible');

-- --------------------------------------------------------

--
-- Table structure for table `teacherlogins`
--

CREATE TABLE `teacherlogins` (
  `id` int(11) NOT NULL,
  `teacherid` varchar(25) NOT NULL,
  `userlogin` varchar(25) DEFAULT NULL,
  `userpassword` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacherlogins`
--

INSERT INTO `teacherlogins` (`id`, `teacherid`, `userlogin`, `userpassword`) VALUES
(1, '2020-069', 'havb-069', '$2b$10$tYybTFo2kN/rl9lBLb/k8u80o7s0DODD.cfRdSeI9RB36HGgkjd.y'),
(2, '10420012023', 't-ceapastrana', '$2b$10$F1Ae4JBdjEJIHOGNQMH0bu92wUfb0ce11wHUo0c4KmqD65wDvi.nS'),
(3, '104200120232', 't-mcramos', '$2b$10$R1XHClE0whRGV11gtFK4F.2Gtr3/BDW1kVU.6gEk4U9gInLZ.c8/q'),
(4, '1910854', 't-airegla', '$2b$10$3yEi2tEDHbYQ7T4TFrbqAuhzBxWfEQLYsDmb6aVoSZ.sTCtL5zQGm'),
(5, '333245051', 't-ceapastrana', '$2b$10$sKF97isEHshJd3ApCSKZyuBv4k8W9L88in0QXZafTNf26n5KdbP1e'),
(6, '12113234', 't-dddota', '$2b$10$B5wezbzPqerrz4SIQrbkFeVyVhn8JdBeYmDQqot7RbUqrnR.8p.GW'),
(7, '12113334', 't-jdreggy', '$2b$10$8JgiwnlsVcG5F09xolu85ePImAerrz6fqJAOadoLVSj9edbpLnfUq');

-- --------------------------------------------------------

--
-- Table structure for table `uploaded_files`
--

CREATE TABLE `uploaded_files` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `sectionname` varchar(255) NOT NULL,
  `name_of_file` varchar(255) NOT NULL,
  `teacherid` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `mimetype` varchar(255) NOT NULL,
  `size` int(255) NOT NULL,
  `visibility` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uploaded_files`
--

INSERT INTO `uploaded_files` (`id`, `filename`, `sectionname`, `name_of_file`, `teacherid`, `path`, `mimetype`, `size`, `visibility`) VALUES
(9, '1710299694608-Wirehshark_RICO, JUSTROILON C.pdf', 'VII - St. Jude', 'Wireshark', '12113334', 'file_uploads\\1710299694608-Wirehshark_RICO, JUSTROILON C.pdf', 'application/pdf', 51280, 'visible'),
(10, '1710339483179-Justroilon_Rico_RESUME.pdf', 'VII - St. Dominic', 'resume1', '', 'file_uploads\\1710339483179-Justroilon_Rico_RESUME.pdf', 'application/pdf', 21095, 'invisible'),
(11, '1710417640300-Project-Documentation-Brute-Forcing-Using-HYDRA-via-DVWA-in-Ethical-Hacking.pptx', 'VII - St. Lorenzo', 'hacking docu', '', 'file_uploads\\1710417640300-Project-Documentation-Brute-Forcing-Using-HYDRA-via-DVWA-in-Ethical-Hacking.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 661606, 'visible'),
(12, '1710421296953-Project-Documentation-System Admin IT41S2.pdf', 'VII - St. Lorenzo', 'proj', '12113334', 'file_uploads\\1710421296953-Project-Documentation-System Admin IT41S2.pdf', 'application/pdf', 2659984, 'visible'),
(13, '1710421522966-The old man and the sea.pdf', 'VII - St. Dominic', 'old man and the sea', '12113334', 'file_uploads\\1710421522966-The old man and the sea.pdf', 'application/pdf', 601470, 'visible'),
(14, '1710474754045-Seminar Portfolio - Zapier.pdf', 'VII - St. Lorenzo', 'Zapier', '1910854', 'file_uploads\\1710474754045-Seminar Portfolio - Zapier.pdf', 'application/pdf', 53256475, 'visible'),
(15, '1710479659388-366788.webp', 'VII - St. Lorenzo', 'Wally', '12113334', 'file_uploads\\1710479659388-366788.webp', 'image/webp', 11422, 'visible'),
(16, '1710510656846-1710080949616-resume pic 2(1).jpg', 'VII - St. Lorenzo', 'justroilon', '12113334', 'file_uploads\\1710510656846-1710080949616-resume pic 2(1).jpg', 'image/jpeg', 44283, 'visible'),
(17, '1710570457122-slider.jpeg', 'VII - St. Lorenzo', 'Slider', '12113334', 'file_uploads\\1710570457122-slider.jpeg', 'image/jpeg', 14138, 'visible');

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
-- Indexes for table `subjectoverview`
--
ALTER TABLE `subjectoverview`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacherid` (`teacherid`),
  ADD KEY `subjectname` (`subjectname`),
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
-- Indexes for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `assessmenttype`
--
ALTER TABLE `assessmenttype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `studentattendance`
--
ALTER TABLE `studentattendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `studentlogins`
--
ALTER TABLE `studentlogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `subjectoverview`
--
ALTER TABLE `subjectoverview`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `teacherannouncements`
--
ALTER TABLE `teacherannouncements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `teacherdetails`
--
ALTER TABLE `teacherdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `teacherlogins`
--
ALTER TABLE `teacherlogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
-- Constraints for table `subjectoverview`
--
ALTER TABLE `subjectoverview`
  ADD CONSTRAINT `subjectoverview_ibfk_1` FOREIGN KEY (`subjectname`) REFERENCES `subjects` (`subjectname`) ON UPDATE CASCADE,
  ADD CONSTRAINT `subjectoverview_ibfk_2` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON UPDATE CASCADE,
  ADD CONSTRAINT `subjectoverview_ibfk_3` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON UPDATE CASCADE;

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
