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

-- Exportiere Daten aus Tabelle webstore.user: ~1 rows (ungefähr)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`username`, `password`, `salt`, `email`, `name`, `surname`, `admin`) VALUES
	('Username', 'Ei����&VE��t��C�C$��H+��ʺi�P!��a��l�ث�\0��MWb�����3��U,&', '��|���c���-晁��C�C�F��c��VB� �x�f��VR@<8�E�i�!&���:p���i�', 'user@email.com', 'Name', 'Surname', 0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
