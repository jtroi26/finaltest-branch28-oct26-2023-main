-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2024 at 06:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
(1, 'admin-10001', 'Christian Emmanuel', 'Avecilla', 'Pastrana', 'Araling Panlipunan', 'Admin', 'Visible'),
(2, 'admin-10002', 'Justroilon', 'C', 'Rico', 'Araling Panlipunan', 'Admin', 'Visible'),
(3, 'admin-10003', 'John ', 'Michael', 'Doe', 'Araling Panlipunan', 'Admin', 'Invisible'),
(4, 'admin-10004', 'Chris', 'Tiu', 'TEST', 'Araling Panlipunan', 'Admin', 'Visible');

-- --------------------------------------------------------

--
-- Table structure for table `adminlogins`
--

CREATE TABLE `adminlogins` (
  `id` int(11) NOT NULL,
  `admin_id` varchar(25) DEFAULT NULL,
  `username` varchar(25) NOT NULL,
  `userpassword` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminlogins`
--

INSERT INTO `adminlogins` (`id`, `admin_id`, `username`, `userpassword`) VALUES
(1, 'admin-10001', 'admin', 'admin'),
(2, 'admin-10002', 'admin-jcrico', '$2b$10$TtN2WHqi48DDqYTX57qr1uPCmgPQAwT7PU70xxHCbtLW13muzZU/2'),
(3, 'admin-10003', 'admin-jmdoe', '$2b$11$e7BcxEFeBPhgZMQZNz3pgObDRWtJ/XBfOzMDjAMYFbcgyUfxGOF9m'),
(4, 'admin-10004', 'admin-cttest', '$2b$10$ZnLxhwDmqobLg5nvDW1TVu89P0pChHBd/YLlDYmjdOVaqXHIVZgCm');

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` int(11) NOT NULL,
  `assessmentTitle` varchar(30) DEFAULT NULL,
  `assessmenttype` varchar(20) NOT NULL,
  `quarterperiod` varchar(20) DEFAULT NULL,
  `dateGiven` varchar(25) NOT NULL,
  `studentID` varchar(25) DEFAULT NULL,
  `sectionname` varchar(50) DEFAULT NULL,
  `subjectname` varchar(25) DEFAULT NULL,
  `teacherid` varchar(25) DEFAULT NULL,
  `grade` int(10) DEFAULT NULL,
  `total` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`id`, `assessmentTitle`, `assessmenttype`, `quarterperiod`, `dateGiven`, `studentID`, `sectionname`, `subjectname`, `teacherid`, `grade`, `total`) VALUES
(1, 'Performance Task 1', 'Performance Task', 'First Quarter', '2024-06-25', '1910854', 'VIII - St. Bernadette', 'Araling Panlipunan', '10420012023', 24, 25),
(2, 'Assignment 1', 'Assignment', 'First Quarter', '2024-06-25', '1910854', 'VIII - St. Bernadette', 'Araling Panlipunan', '10420012023', 24, 25),
(3, 'Assignment 1', 'Assignment', 'First Quarter', '2024-07-12', '1910856', 'VIII - St. Mary', 'Araling Panlipunan', '123456789', 25, 25),
(4, 'Assignment 1', 'Assignment', 'First Quarter', '2024-07-12', '1910855', 'VIII - St. Mary', 'Araling Panlipunan', '123456789', 23, 25);

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
(5, 'Performance Task'),
(6, 'Periodical Exam'),
(3, 'Quiz'),
(7, 'Recitation'),
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
(1, 'Araling Panlipunan', 'Visible');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lessons`
--

INSERT INTO `lessons` (`id`, `lessonID`, `lessonTitle`, `subjectname`, `teacherid`, `quarterperiod`, `sectionname`, `section1`, `section2`, `section3`, `section4`, `section5`, `section6`, `section7`, `section8`, `section9`, `section10`, `dateCreated`, `dateUpdated`, `visibility`) VALUES
(2, 1, 'West Philippine Sea', 'Araling Panlipunan', '10420012023', 'First Quarter', 'VIII - St. Bernadette', '<p><img src=\"https://globalnation.inquirer.net/224867/2023-a-lookback-at-rising-tension-in-west-ph-sea\" alt=\"West Philippine Sea\"></p>\r\n<p>Ang West Philippine Sea, bahagi ng South China Sea na nasa loob ng Exclusive Economic Zone (EEZ) ng Pilipinas, ay isang mahalagang bahagi ng teritoryo ng bansa. Ang araling ito ay naglalayong bigyan ng kaalaman ang mga mag-aaral tungkol sa kasaysayan, kahalagahan, at mga isyu kaugnay ng West Philippine Sea.</p>\r\n<p><strong>Mga Layunin ng Aralin:</strong></p>\r\n<ul>\r\n<li>Maunawaan ang kasaysayan at kahalagahan ng West Philippine Sea.</li>\r\n<li>Matukoy ang mga pinag-aagawang teritoryo at mga bansang sangkot.</li>\r\n<li>Mapag-aralan ang mga batas at kasunduang internasyonal na may kinalaman sa teritoryo.</li>\r\n<li>Matalakay ang mga epekto ng isyu sa ekonomiya, pulitika, at kapayapaan ng rehiyon.</li>\r\n<li>Mahikayat ang mga mag-aaral na magbigay ng kanilang opinyon at mungkahi tungkol sa isyu.</li>\r\n</ul>\r\n<p><strong>Nilalaman ng Aralin:</strong></p>\r\n<ol>\r\n<li>\r\n<p><strong>Heograpiya ng West Philippine Sea:</strong></p>\r\n<ul>\r\n<li>Lokasyon: Bahagi ng South China Sea na sakop ng 200 nautical miles EEZ ng Pilipinas.</li>\r\n<li>Mga Pulo: Spratly Islands (Kalayaan Group of Islands), Scarborough Shoal (Panatag Shoal), at iba pang mga bato at bahura.</li>\r\n<li>Natural na Yaman: Yamang-dagat, langis, at natural gas.</li>\r\n</ul>\r\n</li>\r\n<li>\r\n<p><strong>Kasaysayan ng West Philippine Sea:</strong></p>\r\n<ul>\r\n<li>Sinaunang Panahon: Mga unang paggalugad at pangangasiwa ng mga Pilipino sa lugar.</li>\r\n<li>Kasaysayan ng Pag-angkin: Pagtalakay sa pag-angkin ng iba\'t ibang bansa tulad ng China, Vietnam, Malaysia, at Taiwan.</li>\r\n<li>Mga Kaso at Kasunduan: UN Convention on the Law of the Sea (UNCLOS) at ang 2016 arbitral ruling na pumapabor sa Pilipinas.</li>\r\n</ul>\r\n</li>\r\n<li>\r\n<p><strong>Mga Isyu at Alitan:</strong></p>\r\n<ul>\r\n<li>Mga Pinag-aagawang Teritoryo: Spratly Islands, Scarborough Shoal, at iba pa.</li>\r\n<li>Militarisasyon: Pagtayo ng mga pasilidad militar ng China sa mga pinag-aagawang lugar.</li>\r\n<li>Pangingisda at Yamang-Dagat: Mga insidente ng pangingisda at pagnanakaw ng yamang-dagat sa loob ng EEZ ng Pilipinas.</li>\r\n</ul>\r\n</li>\r\n<li>\r\n<p><strong>Mga Batas at Kasunduan:</strong></p>\r\n<ul>\r\n<li>UNCLOS: Karapatan ng mga bansa sa kanilang EEZ.</li>\r\n<li>2016 Arbitral Tribunal Ruling: Resulta ng kaso ng Pilipinas laban sa China.</li>\r\n<li>Code of Conduct in the South China Sea: Patuloy na negosasyon para sa kapayapaan at katatagan sa rehiyon.</li>\r\n</ul>\r\n</li>\r\n<li>\r\n<p><strong>Kahalagahan ng West Philippine Sea:</strong></p>\r\n<ul>\r\n<li>Ekonomiya: Potensyal sa langis at natural gas, pangisdaan, at iba pang likas na yaman.</li>\r\n<li>Seguridad: Estratehikong lokasyon para sa depensa ng bansa.</li>\r\n<li>Kapaligiran: Pagpapanatili ng marine biodiversity.</li>\r\n</ul>\r\n</li>\r\n</ol>', '', '', '', '', '', '', '', '', '', '2024-06-25 19:10:55', '2024-06-25 19:10:55', 'Visible'),
(3, 1, 'Panahon ng mga katutubo', NULL, NULL, 'First Quarter', NULL, '<p><span id=\"t3_1\" class=\"t s2_1\" data-mappings=\"[[50,&quot;ti&quot;]]\">Ayon sa pag aaral may sarili ng sibilisasyon ang atng mga ninuno bago pa man </span> <span id=\"t4_1\" class=\"t s2_1\" data-mappings=\"[[4,&quot;ti&quot;],[19,&quot;ti&quot;]]\">dumatng ang mga kastila.</span></p>\r\n<p><span id=\"t6_1\" class=\"t s2_1\">Mga Negrito, Indones at Malay ang mag pinaniniwalaang unang mamamayan ng Pilipinas.&nbsp;</span> <span id=\"t8_1\" class=\"t s2_1\" data-mappings=\"[[46,&quot;ti&quot;],[67,&quot;ti&quot;],[82,&quot;ti&quot;]]\">Mayroon narin silang sariling Alpabeto at Panitkan bago pa man dumating ang mga kastila.&nbsp;<br></span></p>\r\n<p>&nbsp;</p>\r\n<p><span class=\"t s2_1\" data-mappings=\"[[46,&quot;ti&quot;],[67,&quot;ti&quot;],[82,&quot;ti&quot;]]\">Negrito</span></p>\r\n<p><span class=\"t s2_1\" data-mappings=\"[[46,&quot;ti&quot;],[67,&quot;ti&quot;],[82,&quot;ti&quot;]]\"><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/A_LUZON_NEGRITO_WITH_SPEAR.jpg/1200px-A_LUZON_NEGRITO_WITH_SPEAR.jpg\" alt=\"Negrito\" width=\"120\" height=\"165\">&nbsp;<br></span></p>\r\n<p>Ang mga Negrito sa Pilipinas ay isa sa mga pinakamatandang pangkat ng tao na nanirahan sa kapuluan, ayon kay H. Otley Beyer. Sinasabing dumating sila noong mga 20,000 taon na ang nakalilipas mula sa Borneo, at naglakad patungo sa Palawan, Mindoro, at ilang bahagi ng Mindanao sa pamamagitan ng mga tulay na lupa. Bagamat isa ito sa mga teoryang tinatanggap, may mga pag-aaral na nagmumungkahi na maaaring may iba pang naunang pangkat kaysa sa mga Negrito. Ang mga pinakamatandang katibayan ng tao sa Tabon ay nagpapakita na hindi lahat ng unang nanirahan sa Pilipinas ay Negrito. Hindi pa rin tiyak kung kailan eksaktong dumating ang mga Negrito sa kapuluan. May mga teoryang nagsasabing baka dumating sila noong huling panahon ng tag-ginaw, mga 30,000 hanggang 18,000 taon na ang nakalilipas, nang bumabaw ang mga karagatan at nagbigay daan sa paglalakad mula sa Biyetnam, Indonesia, at Malaysia.</p>\r\n<p>May mga pag-aaral na nagtatanong kung marunong din ang mga Negrito sa pamamangka at paglalakbay sa katubigan tulad ng ibang pangkat ng aboriheno sa Bagong Guinea at Melanesya. Bagaman may mga paghahambing sa kanilang mga kasanayan, tulad ng paggamit ng palakol at askarol, at kaalaman sa pamamangka, may mga suliranin sa paghanap ng mga sinaunang kagamitang yari sa bato o kahoy mula sa kanilang kasukalan sa mga kagubatan. Kilala sila sa kanilang nomadikong pamumuhay, pagala-gala, at paglipat-lipat ng mga pook, na walang permanenteng tirahan o mga istruktura kagaya ng mga libingan ng mga namatay.</p>\r\n<p>&nbsp;</p>\r\n<p>Indones</p>\r\n<p>&nbsp;</p>\r\n<p>Pinaniniwalaang sumunod ang mga katutubong Indones na nanirahan sa bansang Pilipinas.</p>', '', '', '', '', '', '', '', '', '', '2024-07-12 00:02:24', '2024-07-12 00:28:02', 'Visible');

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
(1, 'VIII - St. Bernadette', 'Visible'),
(2, 'VIII - St. Mary', 'Visible');

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
(1, '1910854', 'Araling Panlipunan', 'VIII - St. Bernadette', '10420012023', 'June 25, 2024', 'First Quarter', 'Present'),
(2, '1910856', 'Araling Panlipunan', 'VIII - St. Mary', '123456789', 'July 12, 2024', 'First Quarter', 'Present'),
(3, '1910855', 'Araling Panlipunan', 'VIII - St. Mary', '123456789', 'July 12, 2024', 'First Quarter', 'Present');

-- --------------------------------------------------------

--
-- Table structure for table `studentlogins`
--

CREATE TABLE `studentlogins` (
  `id` int(11) NOT NULL,
  `studentID` varchar(25) DEFAULT NULL,
  `studentUserName` varchar(25) DEFAULT NULL,
  `studentPassword` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentlogins`
--

INSERT INTO `studentlogins` (`id`, `studentID`, `studentUserName`, `studentPassword`) VALUES
(1, '1910854', 'DAZSMA-ceapastrana', '$2b$11$Yx62jlzcnMIfc2gJ/cHLYOUyuas0lMfBDuVzREHr1eha5GJ/QGENC'),
(2, '1910855', 'DAZSMA-clrlorenzo', '$2b$11$iZfP0XIL7zlEy1yJTQsgSuF8DsFHb.98.alqtn3b9KyKMbbjzq4Za'),
(3, '1910856', 'DAZSMA-mjjones', '$2b$11$fvmEAX2HS30wS1dasHthMeWOzUVnEy0VjwNx5pcYZheTJXJ88uHka');

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
(1, '1910854', 'Christian Emmanuel', 'Avecilla', 'Pastrana', 'Sr.', 'VIII - St. Bernadette', '2024-01-01 01:30:00', 'Enrolled'),
(2, '1910855', 'Carlos Lorenzo', 'Renzo', 'Lorenzo', '', 'VIII - St. Mary', '2024-07-11 06:03:00', 'Enrolled'),
(3, '1910856', 'Michael', 'James', 'Jones', 'III', 'VIII - St. Mary', '2024-07-12 06:01:00', 'Enrolled');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjectoverview`
--

INSERT INTO `subjectoverview` (`id`, `teacherid`, `subjectname`, `sectionname`, `overview`) VALUES
(1, '10420012023', 'Araling Panlipunan', 'VIII - St. Bernadette', '<p>Ang Araling Panlipunan ay isang mahalagang bahagi ng kurikulum ng edukasyon sa Pilipinas. Layunin nitong paunlarin ang kaalaman ng mga mag-aaral tungkol sa lipunan, kultura, kasaysayan, heograpiya, ekonomiya, at agham pampulitika. Nilalayon nitong hubugin ang mga mag-aaral upang maging mapanuri, responsableng mamamayan na aktibong nakikibahagi sa mga usaping panlipunan at pambansa.</p>\r\n<p><strong>Mga Bahagi ng Araling Panlipunan:</strong></p>\r\n<ol>\r\n<li>\r\n<p><strong>Kasaysayan (History):</strong></p>\r\n<ul>\r\n<li><strong>Kasaysayan ng Pilipinas:</strong> Pagsusuri sa mga mahahalagang pangyayari, tao, at lugar sa kasaysayan ng Pilipinas mula sa sinaunang panahon hanggang sa kasalukuyan.</li>\r\n<li><strong>Kasaysayan ng Daigdig:</strong> Pagtalakay sa mga makasaysayang pangyayari sa buong mundo na nakaapekto sa kasaysayan ng Pilipinas at iba pang bansa.</li>\r\n</ul>\r\n</li>\r\n<li>\r\n<p><strong>Heograpiya (Geography):</strong></p>\r\n<ul>\r\n<li><strong>Pisikal na Heograpiya:</strong> Pag-aaral sa mga likas na yaman, anyong lupa at tubig, klima, at iba pang aspeto ng kapaligiran.</li>\r\n<li><strong>Kultural na Heograpiya:</strong> Pag-unawa sa mga kultura, wika, relihiyon, at tradisyon ng iba&rsquo;t ibang grupo ng tao sa Pilipinas at sa mundo.</li>\r\n</ul>\r\n</li>\r\n<li>\r\n<p><strong>Ekonomiks (Economics):</strong></p>\r\n<ul>\r\n<li><strong>Batayang Ekonomiks:</strong> Pag-aaral sa mga pangunahing konsepto ng ekonomiya tulad ng produksiyon, pagkonsumo, at distribusyon.</li>\r\n<li><strong>Ekonomiyang Pampamilya at Panlipunan:</strong> Pagtalakay sa mga usaping pang-ekonomiya na may direktang epekto sa pang-araw-araw na buhay ng mga mamamayan.</li>\r\n</ul>\r\n</li>\r\n<li>\r\n<p><strong>Agham Pampulitika (Political Science):</strong></p>\r\n<ul>\r\n<li><strong>Pamahalaan at Pulitika ng Pilipinas:</strong> Pag-aaral sa istruktura ng pamahalaan, mga sangay ng gobyerno, at proseso ng eleksyon sa Pilipinas.</li>\r\n<li><strong>Karapatang Pantao at Mamamayan:</strong> Pag-unawa sa mga karapatang pantao at tungkulin ng bawat mamamayan sa isang demokratikong lipunan.</li>\r\n</ul>\r\n</li>\r\n<li>\r\n<p><strong>Sosyolohiya at Antropolohiya (Sociology and Anthropology):</strong></p>\r\n<ul>\r\n<li><strong>Pag-aaral sa Lipunan:</strong> Pagtalakay sa mga institusyon ng lipunan tulad ng pamilya, paaralan, simbahan, at pamahalaan.</li>\r\n<li><strong>Kulturang Pilipino:</strong> Pag-unawa sa mga kaugalian, paniniwala, at tradisyon ng iba&rsquo;t ibang pangkat-etniko sa Pilipinas.</li>\r\n</ul>\r\n</li>\r\n</ol>\r\n<p><strong>Mga Layunin ng Araling Panlipunan:</strong></p>\r\n<ul>\r\n<li>Mahubog ang mga mag-aaral na may malalim na kaalaman sa kasaysayan at kultura ng Pilipinas at ng mundo.</li>\r\n<li>Mapalawak ang kamalayan ng mga mag-aaral sa mga isyung panlipunan at pang-ekonomiya.</li>\r\n<li>Mahikayat ang mga mag-aaral na maging aktibong kalahok sa mga gawaing pampulitika at pangkomunidad.</li>\r\n<li>Maitaguyod ang pagkilala at paggalang sa pagkakaiba-iba ng kultura at pananampalataya.</li>\r\n</ul>'),
(2, '123456789', 'Araling Panlipunan', 'VIII - St. Mary', '<p><img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoqJiY4Y9v6fZ0s0ZQlwzM6MiY0NaKZLlqdw&amp;s\" alt=\"Target\" width=\"50\" height=\"50\"></p>\r\n<p>Pangkalahatang Pagsusuri: Araling Panlipunan para sa Ikalawang Taon ng mga Mag-aaral</p>\r\n<p>Paglalarawan ng Kurso</p>\r\n<p>Ang Araling Panlipunan para sa mga mag-aaral ng Ikalawang Taon ay nakatuon sa malalim na pag-unawa sa kasaysayan, heograpiya, kultura, pamahalaan, at papel ng Pilipinas sa pandaigdigang komunidad. Layunin ng asignaturang ito na mapalawak ang kamalayan ng mga mag-aaral sa kanilang pambansang pagkakakilanlan, pamana, at mga tungkulin bilang mamamayan.</p>\r\n<p>Mga Layunin at Obhetibo</p>\r\n<p><strong>Pag-unawa sa Kasaysayan</strong>: Makakuha ng masusing kaalaman sa kasaysayan ng Pilipinas mula sa pre-kolonyal na panahon hanggang sa kasalukuyan. Pag-aralan ang mga mahahalagang pangyayari, personalidad, at yugto na humubog sa bansa.<br>&nbsp;&nbsp;<br><strong>Heograpikal na Kamalayan</strong>: Maunawaan ang heograpiya ng Pilipinas, kasama na ang pisikal na anyo, klima, likas na yaman, at kung paano ito nakaapekto sa pag-unlad ng bansa.<br>&nbsp;&nbsp;<br><strong>Kulturang Pagkilala</strong>: Kilalanin ang iba\'t ibang kultura, tradisyon, at wika sa Pilipinas, at pahalagahan ang kontribusyon ng mga ito sa pambansang pagkakakilanlan.<br>&nbsp;&nbsp;<br><strong>Pag-aaral sa Pamahalaan at Ekonomiya</strong>: Alamin ang estruktura at tungkulin ng pamahalaan ng Pilipinas, at unawain ang mga pangunahing prinsipyo ng ekonomiya at paano ito umiiral sa lokal at pambansang antas.<br>&nbsp;&nbsp;<br><strong>Pandaigdigang Kamalayan</strong>: Tuklasin ang papel ng Pilipinas sa pandaigdigang komunidad, ang mga ugnayan nito sa ibang bansa, at ang epekto ng mga pandaigdigang isyu sa bansa.</p>\r\n<p>Balangkas ng Kurso</p>\r\n<ol>\r\n<li><strong>Kasaysayan ng Pilipinas</strong><br>&nbsp; &nbsp;- Panahon ng mga Katutubo<br>&nbsp; &nbsp;- Panahon ng Kastila<br>&nbsp; &nbsp;- Panahon ng Amerikano<br>&nbsp; &nbsp;- Panahon ng Hapon<br>&nbsp; &nbsp;- Ikatlong Republika ng Pilipinas<br>&nbsp; &nbsp;- Kasalukuyang Panahon</li>\r\n<li><strong>Heograpiya ng Pilipinas</strong><br>&nbsp; &nbsp;- Pisikal na Anyo ng Pilipinas<br>&nbsp; &nbsp;- Klima at Panahon<br>&nbsp; &nbsp;- Likas na Yaman<br>&nbsp; &nbsp;- Mga Rehiyon at Lalawigan</li>\r\n<li><strong>Kultura at Lipunan</strong><br>&nbsp; &nbsp;- Mga Pambansang Simbolo at Bayani<br>&nbsp; &nbsp;- Tradisyon, Selebrasyon, at Paniniwala<br>&nbsp; &nbsp;- Mga Wika at Diyalekto<br>&nbsp; &nbsp;- Kontemporaryong Isyu sa Kultura</li>\r\n<li><strong>Pamahalaan at Ekonomiya</strong><br>&nbsp; &nbsp;- Estruktura ng Pamahalaan ng Pilipinas<br>&nbsp; &nbsp;- Karapatang Pantao at Batas<br>&nbsp; &nbsp;- Pangunahing Prinsipyo ng Ekonomiya<br>&nbsp; &nbsp;- Mga Patakaran sa Ekonomiya</li>\r\n</ol>\r\n<p><strong>Mga Paraan ng Pagtuturo</strong></p>\r\n<ul>\r\n<li><strong>Interaktibong Talakayan</strong>: Pagtalakay sa mga paksa sa klase na hinihikayat ang aktibong pakikilahok ng mga mag-aaral.</li>\r\n<li><strong>Pagsusuri ng Dokumento</strong>: Pag-aaral ng mga pangunahing dokumento, kasaysayang teksto, at iba pang materyal na pang-edukasyon.</li>\r\n<li><strong>Proyekto at Pananaliksik</strong>: Paglikha ng mga proyekto at pananaliksik na magpapalalim sa pag-unawa ng mga mag-aaral sa mga paksa.</li>\r\n<li><strong>Field Trip at Eksibit</strong>: Pagbisita sa mga lugar na may kaugnayan sa kasaysayan at kultura upang magkaroon ng mas aktwal na karanasan.</li>\r\n</ul>\r\n<p><strong>Pagtataya at Pagsusuri</strong></p>\r\n<ul>\r\n<li><span style=\"text-decoration: underline;\">Pagsusulit at Quiz</span>: Regular na pagsusulit upang masukat ang kaalaman at pag-unawa ng mga mag-aaral.</li>\r\n<li><span style=\"text-decoration: underline;\">Mga Gawaing Pangklase</span>: Mga aktibidad at gawaing pangklase na magpapakita ng kanilang natutunan.</li>\r\n<li><span style=\"text-decoration: underline;\">Proyekto at Pananaliksik</span>: Pagsusumite ng mga proyekto at pananaliksik bilang bahagi ng pagtataya.</li>\r\n<li><span style=\"text-decoration: underline;\">Paglahok sa Talakayan</span>: Pagtataya sa aktibong pakikilahok ng mga mag-aaral sa talakayan at mga aktibidad sa klase<strong>.</strong></li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<div id=\"simple-translate\" class=\"simple-translate-system-theme\">\r\n<div>\r\n<div class=\"simple-translate-button isShow\" style=\"background-image: url(\'moz-extension://d8e788b6-7ed4-4104-88da-77ca092d9930/icons/512.png\'); height: 22px; width: 22px; top: 232px; left: 67px;\">&nbsp;</div>\r\n<div class=\"simple-translate-panel \" style=\"width: 300px; height: 200px; top: 0px; left: 0px; font-size: 13px;\">\r\n<div class=\"simple-translate-result-wrapper\" style=\"overflow: hidden;\">\r\n<div class=\"simple-translate-move\" draggable=\"true\">&nbsp;</div>\r\n<div class=\"simple-translate-result-contents\">\r\n<p class=\"simple-translate-result\" dir=\"auto\">&nbsp;</p>\r\n<p class=\"simple-translate-candidate\" dir=\"auto\">&nbsp;</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>');

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
(1, 'AP-02', 'Araling Panlipunan', '10420012023', 'VIII - St. Bernadette', 'Visible'),
(2, 'AP-02', 'Araling Panlipunan', '123456789', 'VIII - St. Mary', 'Visible');

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
(2, '10420012023', 'Araling Panlipunan', 'VIII - St. Bernadette', 'Announcement for June 25', '<p>May quiz bukas, kaya mag aral kayo tungkol sa lesson 2.&nbsp;</p>', 'Invisible', '2024-06-25 19:00:01', '2024-06-25 19:00:01');

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
(1, '10420012023', 'Christian Emmanuel', 'Avecilla', 'Pastrana', NULL, 'Araling Panlipunan', 'Visible'),
(2, '123456789', 'John Michael', 'Estanislao', 'Doe', '', 'Araling Panlipunan', 'Visible');

-- --------------------------------------------------------

--
-- Table structure for table `teacherlogins`
--

CREATE TABLE `teacherlogins` (
  `id` int(11) NOT NULL,
  `teacherid` varchar(25) NOT NULL,
  `userlogin` varchar(25) DEFAULT NULL,
  `userpassword` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacherlogins`
--

INSERT INTO `teacherlogins` (`id`, `teacherid`, `userlogin`, `userpassword`) VALUES
(1, '10420012023', 't-ceapastrana', '$2b$10$.3Oz.jXEqysgOA3poQ/xz.XwNY17FRAKE9ucnb1bfndD1HoZEraJS'),
(2, '123456789', 't-jmedoe', '$2b$10$.sOQ0cRg75cThRyeH7CPuO4rxTEYaOh61n/Codp.X.uChpJSFjrZy');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uploaded_files`
--

INSERT INTO `uploaded_files` (`id`, `filename`, `sectionname`, `name_of_file`, `teacherid`, `path`, `mimetype`, `size`, `visibility`) VALUES
(1, '1719331458766-history-of-philippines-class.pptx', 'VIII - St. Bernadette', 'History of Philippines', '10420012023', 'file_uploads\\1719331458766-history-of-philippines-class.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 17384793, 'Visible'),
(2, '1720084297465-package.json', 'VIII - St. Bernadette', 'Package', '10420012023', 'file_uploads\\1720084297465-package.json', 'application/json', 737, 'Visible'),
(3, '1720084395267-package-lock.json', 'VIII - St. Bernadette', 'lock', '10420012023', 'file_uploads\\1720084395267-package-lock.json', 'application/json', 105883, 'Visible');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admindetails`
--
ALTER TABLE `admindetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_id` (`admin_id`),
  ADD KEY `department` (`department`);

--
-- Indexes for table `adminlogins`
--
ALTER TABLE `adminlogins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessmenttype` (`assessmenttype`),
  ADD KEY `quarterperiod` (`quarterperiod`),
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
  ADD KEY `department` (`department`);

--
-- Indexes for table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subjectname` (`subjectname`),
  ADD KEY `teacherid` (`teacherid`),
  ADD KEY `quarterperiod` (`quarterperiod`),
  ADD KEY `sectionname` (`sectionname`);

--
-- Indexes for table `quarters`
--
ALTER TABLE `quarters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quarterperiod` (`quarterperiod`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
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
  ADD KEY `studentID` (`studentID`),
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
  ADD KEY `subjectid` (`subjectid`),
  ADD KEY `subjectname` (`subjectname`),
  ADD KEY `teacherid` (`teacherid`),
  ADD KEY `sectionname` (`sectionname`);

--
-- Indexes for table `teacherannouncements`
--
ALTER TABLE `teacherannouncements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacherid` (`teacherid`),
  ADD KEY `subjectname` (`subjectname`),
  ADD KEY `sectionname` (`sectionname`);

--
-- Indexes for table `teacherdetails`
--
ALTER TABLE `teacherdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacherid` (`teacherid`),
  ADD KEY `department` (`department`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `sectionname` (`sectionname`),
  ADD KEY `teacherid` (`teacherid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admindetails`
--
ALTER TABLE `admindetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `adminlogins`
--
ALTER TABLE `adminlogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `assessmenttype`
--
ALTER TABLE `assessmenttype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `quarters`
--
ALTER TABLE `quarters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `studentattendance`
--
ALTER TABLE `studentattendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `studentlogins`
--
ALTER TABLE `studentlogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subjectoverview`
--
ALTER TABLE `subjectoverview`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teacherannouncements`
--
ALTER TABLE `teacherannouncements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teacherdetails`
--
ALTER TABLE `teacherdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teacherlogins`
--
ALTER TABLE `teacherlogins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admindetails`
--
ALTER TABLE `admindetails`
  ADD CONSTRAINT `admindetails_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments` (`department`) ON UPDATE CASCADE;

--
-- Constraints for table `adminlogins`
--
ALTER TABLE `adminlogins`
  ADD CONSTRAINT `adminlogins_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admindetails` (`admin_id`) ON UPDATE CASCADE;

--
-- Constraints for table `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `assessments_ibfk_1` FOREIGN KEY (`assessmenttype`) REFERENCES `assessmenttype` (`assessmenttype`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_2` FOREIGN KEY (`quarterperiod`) REFERENCES `quarters` (`quarterperiod`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_3` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_4` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_5` FOREIGN KEY (`subjectname`) REFERENCES `subjects` (`subjectname`) ON UPDATE CASCADE,
  ADD CONSTRAINT `assessments_ibfk_6` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON UPDATE CASCADE;

--
-- Constraints for table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`subjectname`) REFERENCES `subjects` (`subjectname`) ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_3` FOREIGN KEY (`quarterperiod`) REFERENCES `quarters` (`quarterperiod`) ON UPDATE CASCADE,
  ADD CONSTRAINT `lessons_ibfk_4` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON UPDATE CASCADE;

--
-- Constraints for table `studentattendance`
--
ALTER TABLE `studentattendance`
  ADD CONSTRAINT `studentattendance_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `studentattendance_ibfk_2` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON UPDATE CASCADE,
  ADD CONSTRAINT `studentattendance_ibfk_3` FOREIGN KEY (`quarterperiod`) REFERENCES `quarters` (`quarterperiod`) ON UPDATE CASCADE,
  ADD CONSTRAINT `studentattendance_ibfk_4` FOREIGN KEY (`subjectname`) REFERENCES `subjects` (`subjectname`) ON UPDATE CASCADE,
  ADD CONSTRAINT `studentattendance_ibfk_5` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON UPDATE CASCADE;

--
-- Constraints for table `studentlogins`
--
ALTER TABLE `studentlogins`
  ADD CONSTRAINT `studentlogins_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `students` (`studentID`) ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON UPDATE CASCADE;

--
-- Constraints for table `subjectoverview`
--
ALTER TABLE `subjectoverview`
  ADD CONSTRAINT `subjectoverview_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `subjectoverview_ibfk_2` FOREIGN KEY (`subjectname`) REFERENCES `subjects` (`subjectname`) ON UPDATE CASCADE,
  ADD CONSTRAINT `subjectoverview_ibfk_3` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON UPDATE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `subjects_ibfk_2` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON UPDATE CASCADE;

--
-- Constraints for table `teacherannouncements`
--
ALTER TABLE `teacherannouncements`
  ADD CONSTRAINT `teacherannouncements_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `teacherannouncements_ibfk_2` FOREIGN KEY (`subjectname`) REFERENCES `subjectoverview` (`subjectname`) ON UPDATE CASCADE,
  ADD CONSTRAINT `teacherannouncements_ibfk_3` FOREIGN KEY (`sectionname`) REFERENCES `sections` (`sectionname`) ON UPDATE CASCADE;

--
-- Constraints for table `teacherdetails`
--
ALTER TABLE `teacherdetails`
  ADD CONSTRAINT `teacherdetails_ibfk_1` FOREIGN KEY (`department`) REFERENCES `departments` (`department`) ON UPDATE CASCADE;

--
-- Constraints for table `teacherlogins`
--
ALTER TABLE `teacherlogins`
  ADD CONSTRAINT `teacherlogins_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teacherdetails` (`teacherid`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
