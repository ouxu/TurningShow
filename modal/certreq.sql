CREATE TABLE `certreq` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `leaderName` varchar(20) NOT NULL,
  `leaderMobile` varchar(20) NOT NULL,
  `leaderMail` varchar(50) NOT NULL,
  `certreq` varchar(20) NOT NULL,
  `memberName1` varchar(20) DEFAULT NULL,
  `memberName2` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `postCode` varchar(20) DEFAULT NULL,
  `addressDetail` varchar(150) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `submitAt` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
