CREATE TABLE `turing_feedback` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `howToKnow` varchar(20) NOT NULL,
  `major` varchar(30) NOT NULL,
  `grade` varchar(20) NOT NULL,
  `why` varchar(100) NOT NULL,
  `difficulty` varchar(20) NOT NULL,
  `service` varchar(200) NOT NULL,
  `serviceAdvice` varchar(500) DEFAULT NULL,
  `ojAdvice` varchar(500) DEFAULT NULL,
  `problemAdvice` varchar(500) DEFAULT NULL,
  `needCertreq` varchar(30) NOT NULL,
  `satisfy` varchar(30) NOT NULL,
  `moreContest` varchar(30) NOT NULL,
  `submitAt` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8
