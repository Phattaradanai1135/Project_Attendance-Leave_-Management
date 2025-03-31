-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db:3306
-- Generation Time: Mar 31, 2025 at 10:41 AM
-- Server version: 5.7.44
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--
CREATE DATABASE IF NOT EXISTS `webdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `webdb`;

-- --------------------------------------------------------

--
-- Table structure for table `attendance_records`
--

CREATE TABLE `attendance_records` (
  `attendance_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `check_in_id` int(11) DEFAULT NULL,
  `check_out_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance_records`
--

INSERT INTO `attendance_records` (`attendance_id`, `employee_id`, `check_in_id`, `check_out_id`) VALUES
(39, 7, 40, 38),
(41, 7, 42, 40),
(43, 7, 45, 42),
(44, 6, 47, 44),
(45, 7, 48, 43),
(46, 6, 49, 48),
(47, 7, 50, 47),
(48, 9, 51, 45),
(49, 10, 52, 46),
(50, 6, 53, 49),
(51, 6, 54, 50),
(52, 6, 55, 51),
(53, 7, 56, 52);

-- --------------------------------------------------------

--
-- Table structure for table `check_in`
--

CREATE TABLE `check_in` (
  `check_in_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `check_in_date` date NOT NULL,
  `check_in_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `check_in`
--

INSERT INTO `check_in` (`check_in_id`, `employee_id`, `check_in_date`, `check_in_time`) VALUES
(14, 6, '2025-03-30', '12:04:45'),
(15, 6, '2025-03-30', '12:06:24'),
(16, 6, '2025-03-30', '12:10:00'),
(17, 6, '2025-03-30', '12:13:54'),
(18, 6, '2025-03-30', '12:40:55'),
(19, 6, '2025-03-30', '12:49:53'),
(20, 6, '2025-03-30', '12:49:55'),
(21, 6, '2025-03-30', '12:49:56'),
(22, 6, '2025-03-30', '12:49:57'),
(23, 6, '2025-03-30', '12:49:58'),
(24, 6, '2025-03-30', '12:50:00'),
(25, 6, '2025-03-30', '12:50:01'),
(26, 6, '2025-03-30', '12:57:16'),
(27, 6, '2025-03-30', '12:57:18'),
(28, 6, '2025-03-30', '12:57:20'),
(29, 6, '2025-03-30', '15:46:34'),
(30, 6, '2025-03-30', '15:46:37'),
(31, 6, '2025-03-30', '15:46:39'),
(32, 6, '2025-03-30', '18:41:47'),
(33, 7, '2025-03-30', '18:41:50'),
(34, 6, '2025-03-30', '18:42:43'),
(35, 6, '2025-03-30', '18:45:10'),
(36, 6, '2025-03-30', '18:46:48'),
(37, 6, '2025-03-30', '01:49:32'),
(38, 6, '2025-03-31', '01:54:56'),
(39, 6, '2025-03-31', '01:57:56'),
(40, 7, '2025-03-31', '01:58:09'),
(41, 6, '2025-03-31', '02:01:41'),
(42, 7, '2025-03-31', '02:01:43'),
(44, 6, '2025-03-31', '02:02:18'),
(45, 7, '2025-03-31', '02:02:21'),
(47, 6, '2025-03-31', '02:02:42'),
(48, 7, '2025-03-31', '02:02:46'),
(49, 6, '2025-03-31', '02:04:30'),
(50, 7, '2025-03-31', '02:04:32'),
(51, 9, '2025-03-31', '02:04:36'),
(52, 10, '2025-03-31', '02:04:40'),
(53, 6, '2025-03-31', '17:19:54'),
(54, 6, '2025-03-31', '17:20:45'),
(55, 6, '2025-03-31', '17:38:10'),
(56, 7, '2025-03-31', '17:38:22');

-- --------------------------------------------------------

--
-- Table structure for table `check_out`
--

CREATE TABLE `check_out` (
  `check_out_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `check_out_date` date NOT NULL,
  `check_out_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `check_out`
--

INSERT INTO `check_out` (`check_out_id`, `employee_id`, `check_out_date`, `check_out_time`) VALUES
(12, 6, '2025-03-30', '12:05:02'),
(13, 6, '2025-03-30', '12:06:32'),
(14, 6, '2025-03-30', '12:10:10'),
(15, 6, '2025-03-30', '12:14:02'),
(16, 6, '2025-03-30', '12:40:58'),
(17, 6, '2025-03-30', '12:49:54'),
(18, 6, '2025-03-30', '12:49:55'),
(19, 6, '2025-03-30', '12:49:56'),
(20, 6, '2025-03-30', '12:49:58'),
(21, 6, '2025-03-30', '12:49:59'),
(22, 6, '2025-03-30', '12:50:00'),
(23, 6, '2025-03-30', '12:50:01'),
(24, 6, '2025-03-30', '12:57:18'),
(25, 6, '2025-03-30', '12:57:19'),
(26, 6, '2025-03-30', '12:57:20'),
(27, 6, '2025-03-30', '15:46:36'),
(28, 6, '2025-03-30', '15:46:38'),
(29, 6, '2025-03-30', '15:46:39'),
(30, 6, '2025-03-30', '18:42:01'),
(31, 6, '2025-03-30', '18:42:44'),
(32, 6, '2025-03-30', '18:45:11'),
(33, 6, '2025-03-30', '18:46:49'),
(34, 6, '2025-03-30', '01:50:47'),
(35, 6, '2025-03-31', '01:54:56'),
(36, 6, '2025-03-31', '01:58:04'),
(37, 7, '2025-03-31', '01:58:07'),
(38, 7, '2025-03-31', '01:58:10'),
(39, 6, '2025-03-31', '02:01:52'),
(40, 7, '2025-03-31', '02:01:55'),
(41, 6, '2025-03-31', '02:02:28'),
(42, 7, '2025-03-31', '02:02:31'),
(43, 7, '2025-03-31', '02:02:49'),
(44, 6, '2025-03-31', '02:02:53'),
(45, 9, '2025-03-31', '02:04:43'),
(46, 10, '2025-03-31', '02:04:47'),
(47, 7, '2025-03-31', '02:04:50'),
(48, 6, '2025-03-31', '02:04:54'),
(49, 6, '2025-03-31', '17:20:05'),
(50, 6, '2025-03-31', '17:20:51'),
(51, 6, '2025-03-31', '17:38:13'),
(52, 7, '2025-03-31', '17:38:26');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `position` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `first_name`, `last_name`, `position`) VALUES
(6, 'ภัทรดนัย', 'เครือพันธ์ศักดิ์', 'Programmer'),
(7, 'อุอิอา', 'อาอุอิ', 'Tester'),
(9, 'Snip', 'Saku', 'Programmer'),
(10, 'Sawan', 'What', 'IT Support'),
(11, 'Sad', 'Dad', 'Tester'),
(12, 'Sipper', 'Papper', 'Porgrammer'),
(13, 'Ton', 'Tan', 'Programmer');

-- --------------------------------------------------------

--
-- Table structure for table `leave_requests`
--

CREATE TABLE `leave_requests` (
  `leave_request_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `leave_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `descruiption` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `leave_requests`
--

INSERT INTO `leave_requests` (`leave_request_id`, `employee_id`, `leave_type`, `start_date`, `end_date`, `descruiption`) VALUES
(1, 6, 'ลาป่วย', '2025-03-28', '2025-03-30', 'COVID-19'),
(2, 7, 'ลากิจ', '2025-03-30', '2025-03-03', 'ไปทำธุระที่ต่างจังหวัด'),
(3, 6, 'ลาพักร้อน', '2025-04-03', '2025-04-04', 'ไปเที่ยว');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance_records`
--
ALTER TABLE `attendance_records`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `check_in_id` (`check_in_id`),
  ADD KEY `check_out_id` (`check_out_id`);

--
-- Indexes for table `check_in`
--
ALTER TABLE `check_in`
  ADD PRIMARY KEY (`check_in_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `check_out`
--
ALTER TABLE `check_out`
  ADD PRIMARY KEY (`check_out_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD PRIMARY KEY (`leave_request_id`),
  ADD KEY `leave_requests_ibfk_1` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance_records`
--
ALTER TABLE `attendance_records`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `check_in`
--
ALTER TABLE `check_in`
  MODIFY `check_in_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `check_out`
--
ALTER TABLE `check_out`
  MODIFY `check_out_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `leave_request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance_records`
--
ALTER TABLE `attendance_records`
  ADD CONSTRAINT `attendance_records_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`),
  ADD CONSTRAINT `attendance_records_ibfk_2` FOREIGN KEY (`check_in_id`) REFERENCES `check_in` (`check_in_id`),
  ADD CONSTRAINT `attendance_records_ibfk_3` FOREIGN KEY (`check_out_id`) REFERENCES `check_out` (`check_out_id`);

--
-- Constraints for table `check_in`
--
ALTER TABLE `check_in`
  ADD CONSTRAINT `check_in_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `check_out`
--
ALTER TABLE `check_out`
  ADD CONSTRAINT `check_out_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD CONSTRAINT `leave_requests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
