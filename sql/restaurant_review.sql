-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2024 at 06:07 AM
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
-- Database: `restaurant_review`
--

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `_id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `openinghours` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `website` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`_id`, `name`, `img`, `description`, `category`, `openinghours`, `address`, `website`) VALUES
(1, 'Tasty Bowl', 'images/tastybowl.jpg', 'We\'re proud to be a choice eatery in Ang Mo Kio Ave 10, offering affordable and delightful Asian fusion cuisine.', 'Asian', 'Daily 8am to 9pm ', '574 Ang Mo Kio Ave 10, #01-1825, Singapore 560574', NULL),
(2, 'The Castel Cafe', 'images/castel.jpg', 'A must-go casual dining Italian restaurant in a bustling neighbourhood serving authentic pizza and pasta.', 'Italian restaurant', 'Daily 9am to 7pm', 'Ang Mo Kio Ave 10, #01-1940 Block 555, Singapore 560555', NULL),
(3, 'MOS Burger', 'images/mosburger.webp', 'MOS Burger is a fast food chain known for its popular rice burgers. The burgers are prepared fresh upon order, offering a unique fusion of Western and Japanese flavors. Their Yakiniku Rice Burger and Teriyaki Burger are recommended options for those who enjoy a blend of Western and Japanese cuisine.', ' Fast food restaurant', 'Daily 8am to 10pm', '53 Ang Mo Kio Ave 3, #01 - 33 AMK Hub, Singapore 569933', 'https://www.mosburger.com.sg/'),
(4, 'Burger King Ang Mo Kio', 'images/burgerking.png', 'Every day, more than 11 million guests visit BURGER KING® restaurants near them around the world. And they do so because our fast food restaurants are known for serving high-quality, great-tasting, and affordable food.', 'Burgers', 'Daily 10am to 11pm', '53 Ang Mo Kio Avenue 3, #01-40 Amk Hub Singapore 569933', 'https://www.burgerking.com.sg/'),
(5, 'McDonald\'s Sengkang Sports Complex', 'images/macdonald.jpg', 'Classic, long-running fast-food chain known for its burgers & fries.', 'Hamburger restaurant', 'Daily 24/7', '57 Anchorvale Rd, #02-03, Singapore 544964', 'https://www.mcdonalds.com.sg/'),
(6, 'Fried Rice Story', 'images/story.jpg', 'Fried Rice Story specialises in Egg fried rice. Our Egg fried rice comes with different flavors with its own unique taste.', 'Chinese', 'Daily 10.30am to 9.15pm', '330 Anchorvale St, Stall 7, Singapore 540330', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `_id` int(11) NOT NULL,
  `restaurantId` int(11) DEFAULT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `review` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `datePosted` varchar(65) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`_id`, `restaurantId`, `username`, `review`, `rating`, `datePosted`) VALUES
(31, 6, 'tingwei', 'Arguably best fried rice I’ve tasted. Portion was good - bowlful, definitely will fill you up. Tasted the truffle fried rice, egg fried rice & mala fried rice. ALL was flavourful, true to taste, not oily & comes with a choice of side of varying price. The chilli paste at the side however lacked the spicy punch - slightly bland despite it’s fierce red outlook.', 5, '9 August 2024 at 23:00'),
(33, 6, 'Michael', 'Ordered the teriyaki egg fried rice with chicken katsu after seeing some of the reviews. To be honest, the chicken katsu was generally ok, crispy on the outside while still juicy on the inside. But it somehow lacked seasoning. Fried rice had a very nice wok hei but the sweet teriyaki sauce was overpowering it, a tad too sweet for my liking. It does have some potential, so I may try some other flavor the next time.', 3, '9 August 2024 at 22:58'),
(34, 2, 'albert', 'One of the best Italian eat out in the locality. Their beef lasagna is one of the best that I have had. Rates are less compared to other similar restaurants. Had tried couple of their pizzas, all of it was good.', 5, '11 August 2024 at 10:31'),
(35, 3, 'albert', 'Food is ok. But service needs improvements. I made 2 transactions for food, because of advertised “sticker” promotion. When I collect my food, I was told sticker only at Bishan. The advertised in the banner says “nationwide”. Subsequently I re-read banner which says start on 13th Feb. That made me more upset, Felt like being cheated.', 3, '11 August 2024 at 10:56'),
(36, 1, 'albert', 'Tasty food with good portions and the chef / boss was very friendly and accommodating. We were satisfied w every dish we ordered - fried rice with pork chop, prawn paste chicken wings, prawn noodles, Korean chicken rice, chilli oil wanton. Will definitely visit again!', 5, '11 August 2024 at 10:59'),
(37, 1, 'Jenny', 'Always walk past but have not tried the food until today after I read some reviews. Went for prawn noodle soup and fried prawn fritter. They are good but it was not the best that I had before. Shop owner is very friendly and I will try their rice bowl next time.', 4, '11 August 2024 at 11:00'),
(38, 6, 'Jenny', 'Ordered Jumbo Crab Meat Egg Fried rice. The fried rice is fluffy and not oily. Chilli is good with a punch. Crab meat is a bit dry and do not look big to me. Overall reasonable priced and decent food. Will not purposely come all the way here. Will return if nearby.', 4, '11 August 2024 at 11:02'),
(39, 1, 'Michael', 'Little hidden gem in AMK. This shop serves really nice local food and taiwanese food. Their egg fried rice is so simple but yet fried to perfection. Their rice bowls are also great. Worthy of a mention is their 红油抄手 it is one of the best. The chilli sauce has a nice kick to it but yet it isn’t too overpowering. Adding noodles to it and it will be a perfect meal. ', 5, '11 August 2024 at 11:04'),
(40, 5, 'Michael', 'I\'m very disappointed with the service at this MacDonald outlet. The service is incredibly slow, and the overall customer experience is very poor. I would not recommend this place to anyone looking for a quick and efficient meal.', 1, '11 August 2024 at 11:08'),
(41, 4, 'Michael', 'Got Mushroom Swiss burger promo 1 for 1 @S$5.85 and was happy to bring home for a meal. The beef patty is dried and hard, I am disappointed that the standard has dropped. I hope Burger King take this feedback, makes every burger tastes like a real burger.', 2, '11 August 2024 at 11:10'),
(42, 2, 'Michael', 'The pastas are very good. While portion abit small but the price also cheaper ard $7 nett. My favourite is the cream onion buongustaio. The sauce is very very good! Otherwise the spicy meatball pasta is nice too. Pasta is good aldente n not soggy. The meatball also very well flavoured.', 4, '11 August 2024 at 11:11'),
(43, 2, 'tingwei', 'Great neighbourhood Italian restaurant with wide range of pastas and pizzas at very reasonable prices. As good as Sazeriya if not better. Will definitely return...', 5, '11 August 2024 at 11:12'),
(44, 5, 'tingwei', 'Food is decent and service crew\'s attitude is okay. But a quick tip is to always double check your orders, be it take away or dine in, because there\'s a 50% chance that your order is wrong. Dont assume that just because there a special order sticker on your burger, it\'s made to your order. Sometimes they will just slap the special order sticker on a normal order.', 2, '11 August 2024 at 11:15'),
(45, 3, 'Stanley', 'Their wagyu burger and dropped in quality since they changed the recipe. Don’t think I’ll buy Mos again unless they change their ingredients.', 3, '11 August 2024 at 11:17'),
(46, 5, 'Stanley', 'Not a recommended place to visit during weekends. Super duper crowded. Nice but limited seats. For those who wish to studies. Put this mcdonald at the last on ur wish list.', 4, '11 August 2024 at 11:18'),
(47, 4, 'Stanley', 'Small and convenient. Service was okay. Wouldn\'t recommend the Cheesecake, tastes abit weird. The Hershey\'s pie never lets me down perfect snack and desert. The value meals have a great variety and high quality. Overall a great fast food restaurant.', 4, '11 August 2024 at 11:20'),
(48, 3, 'Wesley', 'I love mos burger but this outlet is such a disgrace to the brand. Super slow with the order. Floor is oily. Stocks all over the place. Super warm as they leave the door to the out-door area open. Staff are very unfriendly. I really wonder why the management is not doing anything since there are so many complaints. I really regretted coming here before checking the reviews. ', 1, '11 August 2024 at 11:21'),
(49, 4, 'Wesley', 'i’ll give a star for the onion rings sorry but the tender grill chicken was burnt and over grilled really badly. It was to a point that it isn’t edible and shld be disposed. not only my burger but the other two burgers too (tender grill chicken) was badly burnt. was looking forward to supper and only to be served with a non edible burger, really disappointing.', 1, '11 August 2024 at 11:22');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('6MRSTnKbB1BlLrp-BX-0AVc2DDLIf2S6', 1723433509, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-08-12T03:21:01.467Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"isLoggedIn\":true,\"username\":\"Wesley\"}'),
('CKPjFnZE1pS7HqYLgpwFPy3rmRdDRs0H', 1723429023, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-08-12T02:17:02.809Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('Gdk6U7h6qberD-iZ7pHRdDfIUFxG_4hA', 1723435159, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-08-12T03:52:38.410Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"isLoggedIn\":true,\"username\":\"tingwei\"}'),
('VYGASXOHy5kHRI4icyTzhoXFx1aAP7VD', 1723356397, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-08-11T06:06:37.315Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `_id` int(11) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`_id`, `username`, `password`, `email`) VALUES
(1, 'user1', 'password', 'user1@gmail.com'),
(2, 'user2', 'password', 'user2@gmail.com'),
(3, 'david', '123', 'david@gmail.com'),
(4, 'albert', '123', 'albert@gmail.com'),
(5, 'tingwei', 'Tingwei', 'mrdudys@gmail.com'),
(6, 'test', '123', 'test@gmail.com'),
(7, 'Michael', 'michael', 'michael@gmail.com'),
(8, 'thomas', 'thomas', 'thomas@gmail.com'),
(9, 'test', 'a', 'a@g'),
(13, 'tingwei', 'as', 'as@gmail.com'),
(14, 'test2', 'tingwei', 'testing@gmail.com'),
(29, 'Jenny', 'jenny', 'jenny@gmail.com'),
(30, 'Stanley', 'stanley', 'stanley@gmail.com'),
(31, 'Wesley', 'wesley', 'wesley@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `FK_restaurantId` (`restaurantId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`_id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_restaurantId` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
