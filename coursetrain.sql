-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2019 at 05:07 AM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coursetrain`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `questionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `content`, `questionId`) VALUES
(1, 'Xấu vcđ', 1),
(2, 'javascript', 3),
(3, 'C++', 3),
(4, 'Công', 2),
(5, 'Chắc chắn là Công', 2),
(6, 'Tàm tạm', 1),
(7, 'Xinh', 1),
(8, 'Không thể xinh hơn', 1),
(9, 'C sharp', 3),
(10, 'Python', 3),
(11, 'Hoàng', 2),
(12, 'Hà', 2);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `descript` text,
  `valid` int(11) DEFAULT NULL,
  `total_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `descript`, `valid`, `total_time`) VALUES
(1, 'DayOne', 'Overview về công ty, vị trí và công việc mà nhân viên sẽ đảm nhiệm...Blabla...', 1, 10),
(2, 'ISMS', 'Khóa học đào tạo về bảo mật thông tin, bảo mật tài sản...', 0, 60),
(3, 'CMMI3', 'Đào tạo các quy định, chính sách mới về quản lý dự án theo tiêu chuẩn CMMI3', 0, 20),
(4, 'RegularExpression', 'Training skill về biểu thức chính quy và cách ứng dụng biểu thức chính quy trong lập trình', 0, 1),
(5, 'avcc', 'Perfect', 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `category` text,
  `type` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `correctId` text NOT NULL,
  `courseId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `category`, `type`, `content`, `correctId`, `courseId`) VALUES
(1, 'Gái Xinh', 0, 'Mai xinh hay xấu?', '1', 1),
(2, 'Vớ vẩn', 1, 'Tên bạn là gì?', '4,5', 1),
(3, 'Vớ vẩn', 1, 'Dự án bạn đang làm về ngôn ngữ gì?', '2,3', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text,
  `email` text,
  `fullname` text,
  `position` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `fullname`, `position`) VALUES
(1, 'kien.do', '111111', 'kien.do@vietis.com.vn', 'Đỗ Văn Kiên', 'PM'),
(2, 'cong.nguyenchien', '222222', 'cong.nguyenchien@vietis.com.vn', 'Nguyễn Chiến Công', 'DEV'),
(3, 'hoang.phanhuy', '333333', 'hoang.phanhuy@vietis.com.vn', 'Phan Huy Hoàng', 'DEV'),
(4, 'test', '1', 'test@gmail.com', 'Pham Huy Test', 'DEV'),
(5, 'ha.phamhuy', '111111', 'ha.phamhuy@vietis.com.vn', 'Phạm Huy Hà', 'DEV'),
(25, 'long.lehoang', 'Asd@1234', 'long.lehoang@vietis.com.vn', 'Lê Hoàng Long', 'DEV'),
(26, 'asd', 'Asd@1111', 'asd@asd.com', 'asd', 'DEV'),
(27, 'asdasdsad', '1@aAAsadasd', 'asd@asdasd.coma', 'asd', 'DEV'),
(28, 'asd5', 'Asd@1111', 'asdf@sad.com', 'asd', 'DEV');

-- --------------------------------------------------------

--
-- Table structure for table `users_courses`
--

CREATE TABLE `users_courses` (
  `userId` int(11) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_courses`
--

INSERT INTO `users_courses` (`userId`, `courseId`, `status`) VALUES
(1, 1, 0),
(1, 2, 0),
(2, 2, 0),
(3, 1, 0),
(4, 1, 1),
(25, 1, 1),
(5, 1, 0),
(26, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_id` (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_id` (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
