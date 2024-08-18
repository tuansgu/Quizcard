-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2024 at 09:52 AM
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
-- Database: `flashcard`
--

-- --------------------------------------------------------

--
-- Table structure for table `flashcards`
--

CREATE TABLE `flashcards` (
  `id` int(11) NOT NULL,
  `term` varchar(255) NOT NULL,
  `definition` text NOT NULL,
  `flashcard_set_id` int(11) DEFAULT NULL,
  `example` varchar(255) DEFAULT NULL,
  `definition_vn` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flashcards`
--

INSERT INTO `flashcards` (`id`, `term`, `definition`, `flashcard_set_id`, `example`, `definition_vn`) VALUES
(1, 'Vocabulary', 'The body of words used in a particular language.', 1, NULL, NULL),
(2, 'Grammar', 'The system and structure of a language.', 1, NULL, NULL),
(3, 'Pronunciation', 'The way in which a word is pronounced.', 1, NULL, NULL),
(4, 'Synonym', 'A word or phrase that means exactly or nearly the same as another word or phrase.', 1, NULL, NULL),
(5, 'Antonym', 'A word opposite in meaning to another.', 1, NULL, NULL),
(6, 'Adjective', 'A word that describes a noun or pronoun.', 1, NULL, NULL),
(7, 'Adverb', 'A word that modifies a verb, adjective, or other adverb.', 1, NULL, NULL),
(8, 'Noun', 'A word used to identify any of a class of people, places, or things.', 1, NULL, NULL),
(9, 'Verb', 'A word used to describe an action, state, or occurrence.', 1, NULL, NULL),
(10, 'Preposition', 'A word governing, and usually preceding, a noun or pronoun.', 1, NULL, NULL),
(11, 'Force', 'Strength or energy as an attribute of physical action or movement.', 2, NULL, NULL),
(12, 'Velocity', 'The speed of something in a given direction.', 2, NULL, NULL),
(13, 'Acceleration', 'Increase in the rate or speed of something.', 2, NULL, NULL),
(14, 'Gravity', 'The force that attracts a body towards the center of the earth.', 2, NULL, NULL),
(15, 'Mass', 'A measure of the amount of matter in an object.', 2, NULL, NULL),
(16, 'Energy', 'The capacity to do work.', 2, NULL, NULL),
(17, 'Momentum', 'The quantity of motion of a moving body.', 2, NULL, NULL),
(18, 'Power', 'The rate at which work is done.', 2, NULL, NULL),
(19, 'Work', 'The energy transferred to or from an object via the application of force along a displacement.', 2, NULL, NULL),
(20, 'Kinetic Energy', 'The energy that a body possesses by virtue of being in motion.', 2, NULL, NULL),
(21, 'Algebra', 'A branch of mathematics dealing with symbols and the rules for manipulating those symbols.', 3, NULL, NULL),
(22, 'Geometry', 'The branch of mathematics involving points, lines, planes, and figures.', 3, NULL, NULL),
(23, 'Calculus', 'The mathematical study of continuous change.', 3, NULL, NULL),
(24, 'Equation', 'A statement that the values of two mathematical expressions are equal.', 3, NULL, NULL),
(25, 'Function', 'A relationship or expression involving one or more variables.', 3, NULL, NULL),
(26, 'Matrix', 'A rectangular array of numbers or other mathematical objects.', 3, NULL, NULL),
(27, 'Integral', 'A function representing the area under a curve.', 3, NULL, NULL),
(28, 'Derivative', 'A measure of how a function changes as its input changes.', 3, NULL, NULL),
(29, 'Probability', 'A measure of the likelihood that an event will occur.', 3, NULL, NULL),
(30, 'Statistics', 'The practice or science of collecting and analyzing numerical data.', 3, NULL, NULL),
(31, 'Spontaneously', 'Tự ý tự phát ', 16, NULL, NULL),
(33, 'portrait', 'a photograph, painting, drawing, ... of the person, less commonly, a group of people.', 16, NULL, NULL),
(34, 'mechanism', 'a way of doing something that is planned or part of a system', 16, 'mechanism for dealing with complaint from the general public', 'Cơ chế, cơ chế hoạt động'),
(35, 'Spontaneously', 'Tự ý tự phát ', 18, 'mechanism for dealing with complaint from the general public', 'chân dung, ảnh'),
(36, 'Vocabulary', 'The body of words used in a particular language.', 20, NULL, NULL),
(37, 'Grammar', 'The system and structure of a language.', 20, NULL, NULL),
(38, 'Pronunciation', 'The way in which a word is pronounced.', 20, NULL, NULL),
(39, 'Synonym', 'A word or phrase that means exactly or nearly the same as another word or phrase.', 20, NULL, NULL),
(40, 'Antonym', 'A word opposite in meaning to another.', 20, NULL, NULL),
(41, 'Adjective', 'A word that describes a noun or pronoun.', 20, NULL, NULL),
(42, 'Adverb', 'A word that modifies a verb, adjective, or other adverb.', 20, NULL, NULL),
(43, 'Noun', 'A word used to identify any of a class of people, places, or things.', 20, NULL, NULL),
(44, 'Verb', 'A word used to describe an action, state, or occurrence.', 20, NULL, NULL),
(45, 'Preposition', 'A word governing, and usually preceding, a noun or pronoun.', 20, NULL, NULL),
(51, 'Algebra', 'A branch of mathematics dealing with symbols and the rules for manipulating those symbols.', 24, NULL, NULL),
(52, 'Geometry', 'The branch of mathematics involving points, lines, planes, and figures.', 24, NULL, NULL),
(53, 'Calculus', 'The mathematical study of continuous change.', 24, NULL, NULL),
(54, 'Equation', 'A statement that the values of two mathematical expressions are equal.', 24, NULL, NULL),
(55, 'Function', 'A relationship or expression involving one or more variables.', 24, NULL, NULL),
(56, 'Matrix', 'A rectangular array of numbers or other mathematical objects.', 24, NULL, NULL),
(57, 'Integral', 'A function representing the area under a curve.', 24, NULL, NULL),
(58, 'Derivative', 'A measure of how a function changes as its input changes.', 24, NULL, NULL),
(59, 'Probability', 'A measure of the likelihood that an event will occur.', 24, NULL, NULL),
(60, 'Statistics', 'The practice or science of collecting and analyzing numerical data.', 24, NULL, NULL),
(61, 'essential', 'this is necessary or needed', 25, 'The local goverment is not able to provide essential/vial services such as gas, electricity, water', 'Cần thiết, thiết yếu'),
(62, 'spontaneously', 'in a way that is not planned but done because you suddenly want to do it.', 25, 'We spontaneously started to dance.', 'tự phát, nảy sinh.'),
(63, 'gradually', 'very slow, over a long period of time.', 25, 'Gradually, the children began understand.', 'chậm, từ từ'),
(64, 'rush', 'to move or to do something with great speed, often too fast.', 25, 'We\'ve got plenty of time, there\'s not need to run.', 'nhanh chóng, chạy nhanh.'),
(65, 'skyscraper', 'that is the tall building in the city.', 25, 'world\'s tallest skyscraper.', 'toà nhà cao tầng'),
(66, 'wage', 'a regular amount of money that you earn, usually every week or every month, for work or service.', 25, 'The average wage for unskilled workers is very low.', 'tiền lương trả theo tuần(chủ yếu là công việc dùng sức)'),
(67, 'salary', 'money that employees receive for doing their job, especially professional employees or people working in an office, usually paid every month.', 25, 'He gets base salary plus commission.', 'Lương(dành cho người làm tại văn phòng).'),
(68, 'job security', 'the state of having a job that is secure.', 25, 'Zero-hours contracts offer worker little or no job security.', 'công việc ổn định.'),
(69, 'upbringing', 'the way in which a child is cared for and taught how to behave while it is growing up.', 25, 'Your Dad\'s upbringing was totally different to mine.', 'dạy dỗ, dạy bảo.'),
(70, 'obey', 'to do what you are told or expected to do.', 25, 'I tried to run but my legs just wouldn\'t obey me.', 'Tuân theo'),
(71, 'swearing', 'rude or offensive language.', 25, 'I was shocked at the swearing.', 'nói tục, chửi thề'),
(72, 'cosmos', 'the universe, especially when it is thought of as an ordered system.', 25, 'the structure of the cosmos.', 'Vũ trụ/ trật tự, hài hòa');

-- --------------------------------------------------------

--
-- Table structure for table `flashcard_sets`
--

CREATE TABLE `flashcard_sets` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flashcard_sets`
--

INSERT INTO `flashcard_sets` (`id`, `name`, `description`, `user_id`, `status`) VALUES
(1, 'English', 'English for me', 1, 1),
(2, 'Biology', 'Sinh học', 1, 1),
(3, 'Temperature', 'Ngữ văn', 1, 1),
(4, 'Math', 'Toán học', 1, 1),
(5, 'Physics', 'Vật lí', 1, 1),
(16, 'Major', 'Major For Information Technology', 1, 1),
(17, 'Temperature', 'Ngữ văn', 1, 1),
(18, 'English for me', 'Topic 3', 2, 1),
(19, 'For me', 'Sinh học', 2, 1),
(20, 'Environment', 'Vật lí', 2, 1),
(21, 'English', 'English for me', 2, NULL),
(22, 'English', 'English for me', 3, NULL),
(23, 'Biology', 'Sinh học', 3, NULL),
(24, 'Temperature', 'Ngữ văn', 3, NULL),
(25, 'English For Me', 'Review everything to learn in Study4', 18, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('pEFSKLNub51MVuoM3GwuE6r2_9DFk3t1', 1724053687, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-08-19T07:48:06.473Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":18,\"email\":\"nguyentuan01082003t@gmail.com\",\"password\":\"$2b$10$bYN8uBQd24VxtZk7SmOui.ttK4pcxDoZ7gq6zgtnjZBBGCkDFoUgG\",\"firstname\":\"Hoang Tuan\",\"lastname\":\"Nguyenex\",\"phone\":\"0328357808\",\"gender\":\"Male\",\"role\":\"Customer/Users\",\"address\":\"Hồ Chí Minh\",\"create_at\":\"2024-08-15T17:00:00.000Z\",\"update_at\":\"2024-08-17T17:00:00.000Z\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `create_at` date DEFAULT NULL,
  `update_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `phone`, `gender`, `role`, `address`, `create_at`, `update_at`) VALUES
(1, 'alice@example.com', '$2b$10$.vq4StentqKq58AYtZRVee5ebTHiol34rAL1rbKLef07A4mWIaytW', 'Tuan', 'Nguyen', '0328357808', 'Male', 'Customer/Users', 'Hồ Chí Minh', '2024-08-09', '2024-08-15'),
(2, 'nguyentuan01082003@gmail.com', '$2b$10$iyHAN2JJAtb4TFT5RTb4dOFdX1ndgsKu4iPES8TycopKg0/rjrtQi', 'Thao', 'Nguyen', '0328357808', 'Male', 'Customer/Users', 'Hồ Chí Minh', NULL, NULL),
(3, 'nguyentun@gmail.com', '$2b$10$a4GbdHuPMDL2iocbY7/cZ.TNVFaS0JV1wd7DZMg/XopfTXcUaRfYu', 'Tuan', 'Nguyen', '0328357808', 'Female', 'Customer/Users', 'Hồ Chí Minh', NULL, NULL),
(4, 'nguyenthiphuongthao@gmail.com', '$2b$10$8jNBlck.N98UIQ3t1RTkZOFCDvzozHWSmU5C81PtkpVHDWTcT/04m', 'Thao', 'Nguyen', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'hoangtuan@gmail.com', '$2b$10$dN5yxaUZbR61IXl.zhae4.pw1d.R/WzIKKhoo/mshFnXqT4hWa/QC', 'Yu', 'Hoang ', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'quiangui@gmail.com', '$2b$10$gXa9B5SfDemUjkoUlRw0I.tqvOW.MrRmlMdD44CHaH395iCOfA5bi', 'Yiy', 'Qiang', '0328357808', 'Female', 'Admin', 'Hồ Chí Minh', NULL, NULL),
(18, 'nguyentuan01082003t@gmail.com', '$2b$10$bYN8uBQd24VxtZk7SmOui.ttK4pcxDoZ7gq6zgtnjZBBGCkDFoUgG', 'Hoang Tuan', 'Nguyenex', '0328357808', 'Male', 'Customer/Users', 'Hồ Chí Minh', '2024-08-16', '2024-08-18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flashcards`
--
ALTER TABLE `flashcards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flashcard_set_id` (`flashcard_set_id`);

--
-- Indexes for table `flashcard_sets`
--
ALTER TABLE `flashcard_sets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flashcards`
--
ALTER TABLE `flashcards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `flashcard_sets`
--
ALTER TABLE `flashcard_sets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `flashcards`
--
ALTER TABLE `flashcards`
  ADD CONSTRAINT `flashcards_ibfk_1` FOREIGN KEY (`flashcard_set_id`) REFERENCES `flashcard_sets` (`id`);

--
-- Constraints for table `flashcard_sets`
--
ALTER TABLE `flashcard_sets`
  ADD CONSTRAINT `flashcard_sets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
