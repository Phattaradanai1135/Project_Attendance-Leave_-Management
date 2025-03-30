-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db:3306
-- Generation Time: Mar 30, 2025 at 03:56 PM
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
(25, 6, 26, 24),
(26, 6, 27, 25),
(27, 6, 28, 26),
(28, 6, 29, 27),
(29, 6, 30, 28),
(30, 6, 31, 29);

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
(31, 6, '2025-03-30', '15:46:39');

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
(29, 6, '2025-03-30', '15:46:39');

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
(1, 6, 'ลาป่วย', '2025-03-29', '2025-03-31', 'COVID-19'),
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
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `check_in`
--
ALTER TABLE `check_in`
  MODIFY `check_in_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `check_out`
--
ALTER TABLE `check_out`
  MODIFY `check_out_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `leave_request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
