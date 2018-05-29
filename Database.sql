-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.2.14-MariaDB - mariadb.org binary distribution
-- Server Betriebssystem:        Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Exportiere Datenbank Struktur für webstore
CREATE DATABASE IF NOT EXISTS `webstore` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `webstore`;

-- Exportiere Struktur von Tabelle webstore.order_collection
CREATE TABLE IF NOT EXISTS `order_collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  `username` varchar(100) NOT NULL,
  `price` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK__user` (`username`),
  CONSTRAINT `FK__user` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle webstore.order_collection: ~16 rows (ungefähr)
/*!40000 ALTER TABLE `order_collection` DISABLE KEYS */;
REPLACE INTO `order_collection` (`id`, `name`, `address`, `username`, `price`) VALUES
	(40, 'sdasd asdsad', 'asda adasd asdasd', 'admin', 0),
	(41, 'nasndoad oasndoad', '1321213 addasda asdad1 3213', 'admin', 0),
	(42, 'asdsa assdas', 'asd asd ad', 'admin', 0),
	(43, 'DASad asdasd', 'sadas sf df', 'admin', 17.5),
	(44, 'asdnkasbdkas saddnk', 'askdb askbd kjbads', 'admin', 153.5),
	(45, 'asldn lsandk', 'lasdn lsdn ladsna', 'admin', 2),
	(46, 'Name Surname', '123 City Street 1', 'Username', 2),
	(47, 'a a', 'a a a', 'a', 36),
	(48, 'a a', '1 1 1', 'a', 60),
	(49, 'select * from product a', '1 1 1', 'a', 2.5),
	(50, '<script>alert("XSS")</script> a', 'a a a', 'a', 2),
	(51, 'asdas asd', 'asd asd asd', 'admin', 2),
	(52, 'asdasd asdasd', 'asd asd asd 1', 'admin', 36),
	(53, 'sadasd asdasd', 'asddas dsaad dsaasd 1', 'admin', 37.5),
	(54, 'asd asdasd', 'asdasd sadasd asdasdasd', 'admin', 38),
	(55, 'asd asd', 'asd sad sad', 'Username', 2);
/*!40000 ALTER TABLE `order_collection` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle webstore.order_item
CREATE TABLE IF NOT EXISTS `order_item` (
  `order_id` int(11) NOT NULL,
  `product` varchar(50) NOT NULL,
  `package` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK__order` (`order_id`),
  KEY `FK__package` (`package`),
  KEY `FK_order_item_product` (`product`),
  CONSTRAINT `FK__order` FOREIGN KEY (`order_id`) REFERENCES `order_collection` (`id`),
  CONSTRAINT `FK__package` FOREIGN KEY (`package`) REFERENCES `package` (`package_name`),
  CONSTRAINT `FK_order_item_product` FOREIGN KEY (`product`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle webstore.order_item: ~21 rows (ungefähr)
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
REPLACE INTO `order_item` (`order_id`, `product`, `package`, `quantity`, `id`) VALUES
	(40, 'forst_1857', 'Single Bottle', 1, 52),
	(41, 'forst_1857', 'Single Bottle', 1, 53),
	(41, 'forst_1857', 'Full Crate', 5, 54),
	(41, 'forst_sixtus', 'Full Crate', 2, 55),
	(42, 'forst_1857', 'Single Bottle', 1, 56),
	(42, 'forst_1857', 'Sixpack', 1, 57),
	(43, 'forst_felsenkeller', 'Single Bottle', 1, 58),
	(43, 'forst_felsenkeller', 'Sixpack', 1, 59),
	(44, 'forst_1857', 'Single Bottle', 1, 60),
	(44, 'forst_1857', 'Full Crate', 4, 61),
	(44, 'forst_kronen', 'Single Bottle', 5, 62),
	(45, 'forst_sixtus', 'Single Bottle', 1, 63),
	(46, 'forst_1857', 'Single Bottle', 1, 64),
	(47, 'forst_sixtus', 'Full Crate', 1, 65),
	(48, 'forst_felsenkeller', 'Sixpack', 4, 66),
	(49, 'forst_felsenkeller', 'Single Bottle', 1, 67),
	(50, 'forst_1857', 'Single Bottle', 1, 68),
	(51, 'forst_1857', 'Single Bottle', 1, 69),
	(52, 'forst_1857', 'Full Crate', 1, 70),
	(53, 'forst_kronen', 'Single Bottle', 1, 71),
	(53, 'forst_kronen', 'Sixpack', 4, 72),
	(54, 'forst_1857', 'Single Bottle', 1, 73),
	(54, 'forst_1857', 'Full Crate', 1, 74),
	(55, 'forst_1857', 'Single Bottle', 1, 75);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle webstore.package
CREATE TABLE IF NOT EXISTS `package` (
  `package_name` varchar(50) NOT NULL,
  `package_amount` int(11) NOT NULL,
  PRIMARY KEY (`package_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle webstore.package: ~3 rows (ungefähr)
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
REPLACE INTO `package` (`package_name`, `package_amount`) VALUES
	('Full Crate', 24),
	('Single Bottle', 1),
	('Sixpack', 6);
/*!40000 ALTER TABLE `package` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle webstore.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `shortdesc` text DEFAULT NULL,
  `image` varchar(50) DEFAULT 'test.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle webstore.product: ~4 rows (ungefähr)
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
REPLACE INTO `product` (`id`, `name`, `description`, `shortdesc`, `image`) VALUES
	('forst_1857', 'Forst 1857', 'BESONDERHEITEN: Spezialbier mit vollem malztypischem Aroma, satter goldgelber Farbe und feiner Hopfennote. Ein dezent blumiger Duft im Nachtrunk verführt, gemeinsam mit einer süßen Erinnerung auf den Lippen, zum Genuss eines weiteren Schlucks. Dieses Spezialbier nach altüberliefertem Rezept verkörpert für jeden Bierkenner die Krönung des Genusses.\r\n\r\nBESONDERHEITEN: mildes und weiches Bier, mit typisch malzigem Aroma und feinster bitterer Geschmack im Nachtrunk\r\n\r\nDAS GLAS: keines - FORST 1857 genießt man am besten direkt aus der Flasche\r\n\r\nALKOHOL: alc. 4,8 % vol.\r\n\r\nIDEALE TEMPERATUR: 7°C\r\n\r\nAROMA: überaus rein mit leichten Anklängen von Hopfen\r\n\r\nSCHAUM: fein, kompakt und stabil\r\n\r\nZUTATEN: Wasser, Gerstenmalz, Maisgritz, Hopfen\r\n\r\nDie hervorgehobenen Zutaten können Allergien und Intoleranzen auslösen', 'GESCHMACK: ein frischer Malzgeschmack verbindet sich harmonisch mit einer leichten Hopfennote und macht Lust auf mehr', 'Forst_1857.png'),
	('forst_felsenkeller', 'Forst Felsenkeller', 'BESONDERHEITEN: Dieses naturtrübe, direkt vom Lagertank abgefüllte, nicht filtrierte und nicht pasteurisierte Spezialbier überrascht den aufmerksamen Bierliebhaber mit seinem runden, vollmundigen Geschmack und dem angenehm weichen Abgang, der zum nächsten Schluck einlädt\r\n\r\nDAS GLAS: Kristallglas mit einem breiten und konischen Kelch, der nach oben enger wird um das Aroma bestens zu bündeln\r\n\r\nALKOHOL: Alc.  5.2 % vol\r\n\r\nIDEALE TEMPERATUR: 6-8°C\r\n\r\nAROMA: Weich und angenehm\r\n\r\nSCHAUM: Feinporig und kompakt\r\n\r\nZUTATEN: Wasser, Gerstenmalz, Maisgritz, Hopfen\r\nDie hervorgehobenen Zutaten können Allergien und Intoleranzen auslösen.', 'GESCHMACK: Rund und vollmundig', 'Forst_Felsenkeller.png'),
	('forst_kronen', 'Forst Kronen', 'BESONDERHEITEN: Spezialbier mit vollem malztypischem Aroma, satter goldgelber Farbe und feiner Hopfennote. Ein dezent blumiger Duft im Nachtrunk verführt, gemeinsam mit einer süßen Erinnerung auf den Lippen, zum Genuss eines weiteren Schlucks. Dieses Spezialbier nach altüberliefertem Rezept verkörpert für jeden Bierkenner die Krönung des Genusses.\r\n\r\nDAS GLAS: Kelch aus glattem, dünnwandigem Glas, nach oben hin leicht verjüngt, das die Schaumkrone aufrichtet, ohne sie überlaufen zu lassen.\r\n\r\nALKOHOL: alc. 5,2 % Vol.\r\n\r\nIDEALE TEMPERATUR: 6-8°C\r\n\r\nAROMA: angenehm, von eleganter Intensität\r\n\r\nSCHAUM: fein, haftend und stabil\r\n\r\nZUTATEN: Wasser, Gerstenmalz, Maisgritz, Hopfen\r\nDie hervorgehobenen Zutaten können Allergien und Intoleranzen auslösen.', 'GESCHMACK: rund und mäßig gehopft.', 'Forst_Kronen.png'),
	('forst_sixtus', 'Forst Sixtus', 'BESONDERHEITEN: das bekannte und geschätzte Bockbier aus dem Hause FORST verdankt seine für diese Sorte einzigartige Karamellnote den besonderen Malzen sowie einem speziellen Herstellungsverfahren. Schon der erste Schluck erfüllt den Gaumen mit Freude, seine dunkle Wärme und die dezente Hopfennote erinnern an den urspründlichen Charakter der Starkbiere und an die traditionelle Braukunst der Klöster\r\n\r\nDAS GLAS: elegante Tulpe mit zylindrischem Körper, verengtem Bauch und ausgestellter Oberseite um die Aromaintensität zu unterstreichen. Die Öffnung der Tulpe nimmt den Bierschaum auf und ermöglicht die volle Entfaltung der Aromen \r\n\r\nALKOHOL: alc. 6,5 % vol.\r\n\r\nIDEALE TEMPERATUR: 8°C\r\n\r\nAROMA: malztypisch mit leichter Hopfennote\r\n\r\nSCHAUM: kompakt und konsistent. Zutaten: Wasser, Gerstenmalz, Maisgritz, Hopfen\r\n\r\nDie hervorgehobenen Zutaten können Allergien und Intoleranzen auslösen', 'GESCHMACK: weich-samtig mit charakteristischem Malzaroma, und angenehmer Karamellnote', 'Forst_Sixtus.png');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle webstore.product_package
CREATE TABLE IF NOT EXISTS `product_package` (
  `product` varchar(50) NOT NULL,
  `package` varchar(50) NOT NULL DEFAULT 'Single Bottle',
  `price` float unsigned NOT NULL,
  KEY `FK__product` (`product`),
  KEY `FK_product_package_package` (`package`),
  CONSTRAINT `FK__product` FOREIGN KEY (`product`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_product_package_package` FOREIGN KEY (`package`) REFERENCES `package` (`package_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle webstore.product_package: ~12 rows (ungefähr)
/*!40000 ALTER TABLE `product_package` DISABLE KEYS */;
REPLACE INTO `product_package` (`product`, `package`, `price`) VALUES
	('forst_1857', 'Single Bottle', 2),
	('forst_felsenkeller', 'Single Bottle', 2.5),
	('forst_kronen', 'Single Bottle', 1.5),
	('forst_sixtus', 'Single Bottle', 2),
	('forst_1857', 'Sixpack', 12),
	('forst_felsenkeller', 'Sixpack', 15),
	('forst_kronen', 'Sixpack', 9),
	('forst_sixtus', 'Sixpack', 12),
	('forst_1857', 'Full Crate', 36),
	('forst_felsenkeller', 'Full Crate', 38),
	('forst_kronen', 'Full Crate', 32),
	('forst_sixtus', 'Full Crate', 36);
/*!40000 ALTER TABLE `product_package` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle webstore.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle webstore.sessions: ~4 rows (ungefähr)
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
REPLACE INTO `sessions` (`session_id`, `expires`, `data`) VALUES
	('6RaF86SSCbf33OzomJDh7pfrFKpb2agy', 1527692488, '{"cookie":{"originalMaxAge":null,"expires":null,"secure":true,"httpOnly":true,"path":"/"},"user":{"username":"b","admin":false}}'),
	('E9QZD17H_OjJBZrhU0_lCRGw0I0XvGFc', 1527670558, '{"cookie":{"originalMaxAge":null,"expires":null,"secure":true,"httpOnly":true,"path":"/"},"user":{"username":"admin","admin":true}}'),
	('RCm50QarwP80a8L4s9GTy1CymZAitGeW', 1527692328, '{"cookie":{"originalMaxAge":null,"expires":null,"secure":true,"httpOnly":true,"path":"/"},"user":{"username":"admin","admin":true}}'),
	('VrO7h-HNZaLscWkmJuxbcdRicoFA82Lg', 1527709196, '{"cookie":{"originalMaxAge":null,"expires":null,"secure":true,"httpOnly":true,"path":"/"},"user":{"username":"admin","admin":true}}'),
	('iwR_zH97iPl8eE4xC6ZYgMl4NYmJMDgB', 1527709830, '{"cookie":{"originalMaxAge":null,"expires":null,"secure":true,"httpOnly":true,"path":"/"},"user":{"username":"Username","admin":false}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

-- Exportiere Struktur von Tabelle webstore.user
CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(100) NOT NULL,
  `password` binary(64) NOT NULL,
  `salt` binary(64) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportiere Daten aus Tabelle webstore.user: ~7 rows (ungefähr)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`username`, `password`, `salt`, `email`, `name`, `surname`, `admin`) VALUES
	('a', '���u�#�Ɨ�-Q����?�������wx&[vU5r�����+�� ��v��cc9���', '.�\0o1F����:KR`�(����izu�|@j�[��UP��i��g�W!%��S��Z��	��', 'a@a.aa', 'abc', 'asss', 1),
	('adasasdasd', '��8A��SEwrsك�v���Dx��2G��x�&c�ςJv���E�dp��&5x����e�&.�S�', '�&���4��Ŭy�m}~��$�O�?��I]�*���E�jt����z^0D}2Qݱ7�', 'a@a.a', 'k', 'k', 0),
	('admin', '��W`y�u��!YW˂�7�h��mѾxo���G�:�}v7�r}�����"5��uH��kDp�F_', '���fnZ��JQ�s\r�T�$�-�QVˆ �*�ɬ]�:O�`�4��M��/�l��I�Ϣ�úk�', 'admin@admin.it', 'admin', 'admin', 1),
	('aspdjapd', '�K�Eן{W�$�p��X\rS;�͚j���1t\'��>�޶�����Hd ^�~%��O��', '��oZ���k^l�\0W�jH��T��	��o�ܖ���J�v���i��˔;�e�\\p��\n', 'asdasd@asd.a', 'pjasdija', 'oijasodjas', 0),
	('b', '��YЀ9��"<��|_�����qa�l��\\��̗O���|$r8x���Fu��.����O-X��Z', '��˻;JmD�����\\�q��ϸ�ya�B�ӟ׆G�~@PZCK��FlSI��f�����xh�Y85', 'sadsa@as.as', 'b', 'b', 0),
	('k', 'h������SJ9?�~KA\0a�1�K�g�^T����������^�ASY�-���bI�', '\\����԰��y���*=/�D"�����y�@.ޜ�����t�s,)����36���g�����ُ�', 'a@a.a', 'k', 'k', 0),
	('mamma', '�h��e�����V#u�/౺s����\no��Z�ZVS��;b��*pݽ���.Mf��i�;TW', 'ޗ�1�I��Y"��V�"n!����������˿�]dз;�Qb�p�*�o�J�4�Gn�/�', 'eggsk4hj@sadvhjb.com', 'mamma', 'mamma', 0),
	('Username', 'Ei����&VE��t��C�C$��H+��ʺi�P!��a��l�ث�\0��MWb�����3��U,&', '��|���c���-晁��C�C�F��c��VB� �x�f��VR@<8�E�i�!&���:p���i�', 'user@email.com', 'Name', 'Surname', 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Exportiere Struktur von Trigger webstore.order_item_after_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `order_item_after_insert` AFTER INSERT ON `order_item` FOR EACH ROW BEGIN

update order_collection set price = 
	(select sum(product_package.price * order_item.quantity) from order_item
	 inner join product_package on (product_package.product = order_item.product && product_package.package = order_item.package)
	 where order_item.order_id = new.order_id)
where order_collection.id = new.order_id;

END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
