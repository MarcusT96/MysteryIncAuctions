-- MySQL dump 10.13  Distrib 8.1.0, for Linux (x86_64)
--
-- Host: localhost    Database: mystery_inc
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bids`
--
CREATE DATABASE IF NOT EXISTS mystery_inc;

USE mystery_inc;



DROP TABLE IF EXISTS `bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bids` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` int NOT NULL,
  `userid` int NOT NULL,
  `boxId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `boxId` (`boxId`),
  CONSTRAINT `bids_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`),
  CONSTRAINT `bids_ibfk_2` FOREIGN KEY (`boxId`) REFERENCES `mystery_boxes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bids`
--

LOCK TABLES `bids` WRITE;
/*!40000 ALTER TABLE `bids` DISABLE KEYS */;
INSERT INTO `bids` VALUES (30,700,7,12),(34,701,7,12),(35,702,10,12),(36,750,10,12),(37,5000,10,10);
/*!40000 ALTER TABLE `bids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bought_boxes`
--

DROP TABLE IF EXISTS `bought_boxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bought_boxes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `time` datetime NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `buyer_id` int NOT NULL,
  `paid` tinyint(1) NOT NULL,
  `delivered` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `buyer_id` (`buyer_id`),
  CONSTRAINT `bought_boxes_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bought_boxes`
--

LOCK TABLES `bought_boxes` WRITE;
/*!40000 ALTER TABLE `bought_boxes` DISABLE KEYS */;
INSERT INTO `bought_boxes` VALUES (1,'Köpt låda',2.50,3000,'2024-02-24 15:00:00','Köpt låda test','https://www.ikea.com/se/sv/images/products/pappis-lada-med-lock-brun__0710998_pe727873_s5.jpg?f=s',1,1,0),(2,'Cool låda',4.00,4605,'2024-03-12 15:00:00','Coola låda me coola grejer','https://rukminim2.flixcart.com/image/850/1000/kmccosw0/party-gift-bag/b/b/c/1-tituprint-gift-box-pink-gift-box-with-ribbon-empty-boxes-for-original-imagf9z4tcthhgpy.jpeg?q=90&crop=false',10,0,0),(3,'Special Box',3.20,5000,'2024-02-25 12:30:00','A unique and special box','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSuJvXojP1hoUKPYUq4cWQDJAZPFoi-JJIt1Chey3cG0iHs1lBRz_Kgd_Ds7KH3C8I9vI&usqp=CAU',2,1,1),(4,'Gift Box',1.50,2500,'2024-02-26 10:45:00','A beautifully wrapped gift box','https://bonden.b-cdn.net/81669-thickbox_default/forvaringslada-plywood-20050.jpg',10,1,0),(5,'Large Container',5.80,7000,'2024-02-27 18:15:00','A spacious and durable container','https://shop.kvibergs.se/wp-content/uploads/2022/07/lada972.jpg',7,1,1),(6,'Small Container',5.80,7000,'2024-02-27 18:15:00','A spacious and durable container','https://jako.se/wp-content/uploads/2018/01/Kldd-lda-med-lock_Hestra-700x700.jpg',7,0,0);
/*!40000 ALTER TABLE `bought_boxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Teknik & Gadgets'),(2,'Spel & Hobby'),(3,'Skönhet & Välbefinnande'),(4,'Mode & Assessoarer'),(5,'Mat & Godis'),(6,'Böcker & Litteratur'),(7,'Film & Musik'),(8,'Hem & Trädgård'),(9,'Fitness & Sport'),(10,'Resor & Äventyr'),(11,'Annat');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mystery_boxes`
--

DROP TABLE IF EXISTS `mystery_boxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mystery_boxes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `price` int NOT NULL,
  `time` datetime NOT NULL,
  `description` text NOT NULL,
  `category` int NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  CONSTRAINT `mystery_boxes_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mystery_boxes`
--

LOCK TABLES `mystery_boxes` WRITE;
/*!40000 ALTER TABLE `mystery_boxes` DISABLE KEYS */;
INSERT INTO `mystery_boxes` VALUES (1,'Mystery Box A',2.50,500,'2024-04-10 15:00:00','Utforska det okända med Mystery Box A, en omsorgsfullt kuraterad samling av äventyrsutrustning och exklusiva samlarobjekt. Varje föremål har valts ut för att inspirera och utmana din inre upptäcktsresande. Från tåliga utomhusverktyg till sällsynta kartor och guider, denna låda är din biljett till nästa stora äventyr. Vem vet vilka hemligheter som väntar på att avslöjas? Gör dig redo för en resa fylld med upptäckter och överraskningar som kommer att föra dig till platser du bara kunnat drömma om.',1,'https://quickbutik.imgix.net/27187j/products/164806013962136aa23a9ed.jpeg'),(2,'Detective\'s Mystery Box',3.00,2300,'2024-05-12 15:00:00','För den föddes detektiven erbjuder denna låda en fängslande samling av mysterier att lösas, komplett med allt en aspirerande Sherlock Holmes behöver. Från invecklade pussel och kryptiska ledtrådar till autentiska detektivverktyg, varje objekt har noggrant valts ut för att testa ditt snille och ditt tålamod. Denna låda är inte bara en utmaning; den är en inbjudan att dyka djupt in i detektivarbetets konst och vetenskap. Kliv in i en värld av mörka hemligheter och gåtfulla gåtor, där endast de mest uppmärksamma och skarpsinniga kan hoppas på att triumfera.',2,'https://www.mynthuset.se/images/stories/sn/mysterybox-tillbehor-6015515091/Mystery_box.png'),(3,'Champion\'s Mystery Box',1.80,800,'2024-05-14 14:00:00','Skapad med den ultimata atleten i åtanke, Champion\'s Mystery Box innehåller en elitnivå av sportutrustning, träningsredskap och exklusiva fansprodukter. Från högteknologiska fitnessprylar till autograferade memorabilia från världskända idrottare, har varje föremål i denna låda potentialen att lyfta din träning och din ande till nya höjder. Det är en hyllning till segerandan, designad för att sporra dig till dina egna mästerskapsvinster. Upptäck verktygen och inspirationen för att övervinna dina gränser och skriva din egen historia av triumf och mästerskap.',9,'https://www.nordicfighter.com/pub/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/image/7919a378/rea-mysterybox-3.png'),(4,'Pokemasters Mystery Box',4.20,1300,'2024-05-16 14:00:00','Pokemasters Mystery Box är den ultimata skatten för varje Pokémon-fanatiker. Fylld till brädden med sällsynta kort, exklusiva figurer, och Pokémon-merchandise, denna låda erbjuder en oöverträffad möjlighet att utöka din samling med föremål du inte hittar någon annanstans. Upptäck limited edition art prints, pokéballs i fullskala, och kanske till och med några mytiska Pokémon som gömmer sig inuti. För samlaren som söker det extraordinära, är detta en resa in i hjärtat av Pokémon-världen, där varje upptäckt föremål bär på en historia och kraften hos vänskap och äventyr.',2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlIzW051K4I_XPBDHY5qunsRWijfr1XxwNFw&usqp=CAU'),(5,'Indossa Mystery Box',2.00,799,'2024-05-18 14:00:00','Indossa Mystery Box är en exquisit utforskning av modevärlden, där eleganta accessoarer, trendiga designerplagg, och banbrytande skönhetsprodukter sammanflätas för att skapa en upplevelse utöver det vanliga. Denna låda är en odyssé genom de senaste modetrenderna, en chans att äga unika stycken som sätter tonen för din personliga stil. Från handplockade smycken som kompletterar varje outfit till limited edition parfymer som fångar essensen av lyx, erbjuder Indossa Mystery Box en oöverträffad skönhet och elegans som förgyller ditt liv och din garderob.',4,'https://indossa.se/cdn/shop/products/Skarmavbild2023-04-03kl.02.40.27_65c65c59-d8b6-4cc1-a6d8-3627d97e50e2_800x.png?v=1680482912'),(6,'Red Mystery Box',3.50,1599,'2024-03-20 14:00:00','Den Röda Mysterielådan erbjuder en fängslande blandning av spänning och nyfikenhet, fylld med handplockade föremål designade för att överraska och förtrolla. Denna låda är en hyllning till mysteriet självt, en samling av unika och intrigerande föremål som kommer att väcka din fantasi och leda dig på en resa av upptäckt. Från tekniska under till kulturella artefakter, varje objekt i Den Röda Mysterielådan har valts ut för att utmana din uppfattning och berika din världsbild. Är du redo att uppleva det oväntade och utforska gränserna för vad som är möjligt?',11,'https://thedetailingshack.co.uk/wp-content/uploads/2022/01/istockphoto-1138540348-170667a.jpg'),(7,'Top G Mystery Box',2.80,899,'2024-03-22 14:00:00','Top G Mystery Box är en kuraterad samling av extraordinära produkter från några av världens mest eftertraktade märken. Denna låda är en oas av lyx och innovation, där varje objekt representerar toppen av kvalitet och design. Från banbrytande teknologiska prylar till exklusiva modeartiklar och livsstilsprodukter, erbjuder Top G en unik möjlighet att berika ditt liv med det allra bästa. Låt varje föremål inspirera och imponera, och upptäck en ny nivå av sofistikering och komfort som endast Top G kan erbjuda.',4,'https://03.cdn37.se/Ww/images/2.2118080/tengo-mystery-box-skor.jpeg'),(8,'AmazonBoxen',4.00,1799,'2024-03-24 14:00:00','AmazonBoxen bjuder in dig på en upptäcktsfärd genom Amazons oändliga utbud, med en unik blandning av produkter från alla tänkbara kategorier. Varje låda är en resa genom teknikens underverk, hushållens nödvändigheter, och kulturens skatter, noggrant utvalda för att överraska och glädja. Det är en chans att uppleva det oväntade, att stöta på föremål du aldrig visste att du behövde och att hitta nya favoriter som berikar din vardag. AmazonBoxen är din portal till en värld av upptäckt, där varje objekt är ett steg på vägen mot nya äventyr.',11,'https://facts.net/wp-content/uploads/2023/10/14-mind-blowing-facts-about-amazon-mystery-box-1697546639.jpg'),(9,'Bergens Hemlighet',10.00,4999,'2024-05-31 10:33:00','Dyk in i det okända med vår exklusiva Mystery Box, ditt pass till ett hemligt äventyr i en legendarisk bergskedja! Kuraterad av experter för att väcka din äventyrslust, lovar denna låda en unik upplevelse fylld med spänning och upptäckter. Innehållet är en välbevarad hemlighet, utformad för att överraska och inspirera. Är du redo att ta steget in i en värld av mysterier? Lägg ditt bud nu och förbered dig för resan av ditt liv!',10,'https://i.imgur.com/tUy85uO.jpg'),(10,'Smakernas Skatt',25.00,5000,'2024-05-01 14:38:00','Utforska den kulinariska världens hemligheter med \"Smakernas Skatt\", en exklusiv auktion som erbjuder en gåtfull box fylld med oöverträffade matlagningsupplevelser. Sammansatt av världsberömda kockar, innehåller denna extraordinära låda allt från sällsynta ingredienser till privata matlagningskurser. Varje objekt är en pusselbit i din gastronomiska resa, skräddarsydd för att väcka din nyfikenhet och förädla dina matlagningsfärdigheter. Missa inte chansen att utforska matlagningens konst på en nivå du aldrig tidigare upplevt. Auktionen avslutas snart - lägg ditt bud och låt din kulinariska odyssey börja!',5,'https://i.imgur.com/dwV46aS.jpeg'),(11,'Destination Okänd',5.00,9999,'2024-07-25 14:41:00','Upptäck världen med \"Destination Okänd\", en unik mystery box som erbjuder en hemlig jordenruntresa. Vad boxen innehåller är en välbevarad hemlighet, utformad för att locka fram äventyraren i dig. Kanske väntar privatflyg till avlägsna öar, exklusiva middagar under norrskenet, eller kulturella upplevelser som ännu inte upptäckts av massorna? Varje element i denna mystery box är valt för att berika din resa med oväntade upplevelser och ovärderliga minnen. Ge dig själv chansen att utforska planeten på ett sätt som aldrig tidigare varit möjligt. Ditt nästa stora äventyr börjar med ett bud – missa inte denna möjlighet till en resa utöver det vanliga.',10,'https://i.imgur.com/PTwVotF.jpeg'),(12,'Guldmedaljörens Gåva',10.00,800,'2024-04-30 06:44:00','Välkommen till auktionen av \"Guldmedaljörens Gåva\", en mystery box med exklusivt sportinnehåll som överträffar alla förväntningar. Vad väntar inuti? Kanske signerade samlarföremål från olympiska legender, privatlektioner med världsmästare, eller VIP-biljetter till de mest eftertraktade sportevenemangen globalt. Denna låda är inte bara en samling av föremål; den är en biljett till en värld av passion, prestation och exklusivitet. Designad för den sanna sportentusiasten som söker det yttersta inom sportens värld. Vågar du missa chansen att äga något så unikt? Lägg ditt bud nu och upptäck vad som gömmer sig bakom denna extraordinära sportupplevelse.',9,'https://i.imgur.com/t3YWz7l.jpeg');
/*!40000 ALTER TABLE `mystery_boxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_options`
--

DROP TABLE IF EXISTS `payment_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_number` text NOT NULL,
  `expiration_date` text NOT NULL,
  `CVC` text NOT NULL,
  `type` text NOT NULL,
  `cardholder_name` text NOT NULL,
  `user_id` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_options`
--

LOCK TABLES `payment_options` WRITE;
/*!40000 ALTER TABLE `payment_options` DISABLE KEYS */;
INSERT INTO `payment_options` VALUES (1,'1111-2222-3333-4444','01-28','123','Debit card','John Doe','0c1f'),(2,'5555-6666-7777-8888','05-23','456','Credit card','Jane Smith','1'),(3,'4656-2343-5436-6453','05-23','456','Debit card','Johnny B. Good','1'),(4,'9876-5432-1098-7654','09-25','789','Debit card','Alex Johnson','7053'),(5,'4321-8765-2109-5432','12-30','321','Credit card','Emily White','7053'),(6,'8345-3249-2345-7654','04-28','485','Credit card','Pelle Jöns','0c1f'),(7,'asdasdasd','asdasdasdasd','asdasdasd','Credit card','dasdasd','7'),(8,'132321321231231','1231','123','Credit card','asdasdasd','7'),(10,'2341-222-1113-1231','05-31','123','Debit card','Pontus Maximus','10');
/*!40000 ALTER TABLE `payment_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `score` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,4,'Väldigt najs!!','Budade på en djurlåda och fick en hel häst!'),(2,5,'Överraskad av Mångfalden!','Jag deltog i en auktion för en kulturbox och blev helt överväldigad av mångfalden i innehållet. Från handgjorda konstverk till traditionella kläder och delikatesser, denna låda erbjöd en resa runt världen i varje objekt. En fantastisk upplevelse för den äventyrslystne!'),(3,4,'High-Tech Överraskningar!','Budade på en teknikbox och blev imponerad av de senaste gadgetarna och elektroniska prylarna. Varje objekt var noga utvalt och visade på MysteryIncs engagemang för att leverera högkvalitativ teknik till sina användare. Lite förvånad och mycket nöjd med denna futuristiska upplevelse!'),(4,4,'Nostalgisk Glädje!','Valde att delta i auktionen för en retrobox och fick verkligen min dos av nostalgi. Från gamla vinylskivor till vintage kläder, denna låda tog mig tillbaka i tiden och gav mig en känsla av retrocharm. Perfekt för dem som älskar att återuppleva det förgångna!'),(7,5,'Riktigt najs!','Ett helt klezmerband i!');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zipCode` varchar(50) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'tommy@example.com','hej123','Tommy','Wang','Propellergatan 1','Malmö','211 15','Sverige','076-123 45 67',1),(2,'jane@example.com','hello123','Jane','Doe','Examplegatan 2','Stockholm','100 20','Sverige','076-234 56 78',0),(3,'erik@example.com','password123','Erik','Svensson','Vägengatan 3','Göteborg','300 30','Sverige','076-345 67 89',0),(4,'lisa@example.com','secret123','Lisa','Johansson','Storgatan 4','Uppsala','400 40','Sverige','076-456 78 90',1),(5,'oscar@example.com','guess123','Oscar','Karlsson','Lillgatan 5','Lund','500 50','Sverige','076-567 89 01',0),(6,'kalle@anka.se','disney','kalle','anka','Storgatan 1','Ankeborg',NULL,NULL,'076-782 83 74',NULL),(7,'rasmus@test.com','klezmer','Rasmus','Hellgren','Osbygatan 1','Osby','231 12','Osby','076-827 35 43',0),(10,'pontus@example.com','hej123','Pontus','Paulsson','Gatan 123','Staden','123 45','Landet','070-123 45 67',1),(11,'marcus@example.com','Klezmernajs','Marcus','Turesson',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-13  9:00:52
