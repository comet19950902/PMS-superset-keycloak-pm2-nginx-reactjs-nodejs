-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: crypto_app
-- ------------------------------------------------------
-- Server version	10.3.34-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `PMS_Portfolio_View`
--

DROP TABLE IF EXISTS `PMS_Portfolio_View`;
/*!50001 DROP VIEW IF EXISTS `PMS_Portfolio_View`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `PMS_Portfolio_View` (
  `Portfolio Name` tinyint NOT NULL,
  `Party Name` tinyint NOT NULL,
  `Party Type` tinyint NOT NULL,
  `Party Ownership(%)` tinyint NOT NULL,
  `Total Fund Value (USD)` tinyint NOT NULL,
  `Investment Type` tinyint NOT NULL,
  `Investment Value(USD)` tinyint NOT NULL,
  `Wallet Type` tinyint NOT NULL,
  `Wallet Value(USD)` tinyint NOT NULL,
  `ExchangeAsset Type` tinyint NOT NULL,
  `Total Exchange Value(USD)` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `binance_usdt`
--

DROP TABLE IF EXISTS `binance_usdt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `binance_usdt` (
  `openTime` varchar(50) DEFAULT NULL,
  `open` varchar(45) DEFAULT NULL,
  `asset_id` varchar(45) DEFAULT NULL,
  `asset_symbol` varchar(45) DEFAULT NULL,
  `close` varchar(45) DEFAULT NULL,
  `closeTime` varchar(45) DEFAULT NULL,
  `symbol_at` varchar(45) NOT NULL,
  `created_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`symbol_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `exchange_history`
--

DROP TABLE IF EXISTS `exchange_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exchange_history` (
  `symbol_order_id_api_key` text DEFAULT NULL,
  `symbol` text DEFAULT NULL,
  `timeStamp` text DEFAULT NULL,
  `datetime` text DEFAULT NULL,
  `id` text DEFAULT NULL,
  `order` text DEFAULT NULL,
  `type` text DEFAULT NULL,
  `side` text DEFAULT NULL,
  `takerOrMaker` text DEFAULT NULL,
  `price` text DEFAULT NULL,
  `amount` text DEFAULT NULL,
  `cost` text DEFAULT NULL,
  `fee` text DEFAULT NULL,
  `fees` text DEFAULT NULL,
  `info` text DEFAULT NULL,
  `created_time` text DEFAULT NULL,
  `created_by` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `portfolio_id` text DEFAULT NULL,
  `api_key` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `exchange_logs`
--

DROP TABLE IF EXISTS `exchange_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exchange_logs` (
  `symbol_order_id_api_key_timestamp` text DEFAULT NULL,
  `symbol_order_id_api_key` text DEFAULT NULL,
  `created_by` text DEFAULT NULL,
  `created_time` text DEFAULT NULL,
  `timestamp` text DEFAULT NULL,
  `api_key` text DEFAULT NULL,
  `portfolio_id` text DEFAULT NULL,
  `previous_comment` text DEFAULT NULL,
  `new_comment` text DEFAULT NULL,
  `username` text DEFAULT NULL,
  `usertype` text DEFAULT NULL,
  `amount` text DEFAULT NULL,
  `price` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_add_investment`
--

DROP TABLE IF EXISTS `pms_add_investment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_add_investment` (
  `investment_id` varchar(100) NOT NULL,
  `investment_name` varchar(200) NOT NULL,
  `investment_type` varchar(800) NOT NULL,
  `date_of_investment` varchar(100) NOT NULL,
  `investment_value` varchar(60) NOT NULL,
  `created_date` varchar(100) NOT NULL,
  `portfolio_id` varchar(100) NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `updated_date` varchar(100) NOT NULL,
  `updated_by` varchar(200) NOT NULL,
  `comments` longtext DEFAULT NULL,
  PRIMARY KEY (`investment_id`),
  UNIQUE KEY `investment_name_UNIQUE` (`investment_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_address_chain_list`
--

DROP TABLE IF EXISTS `pms_address_chain_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_address_chain_list` (
  `address_asset_id` varchar(100) NOT NULL,
  `asset_id` varchar(45) NOT NULL,
  `asset_name` varchar(80) NOT NULL,
  `total_asset_balance` varchar(45) NOT NULL,
  `asset_percentage_value` varchar(45) NOT NULL,
  `address_id` varchar(60) NOT NULL,
  `timeStamp` varchar(45) NOT NULL,
  `logo_url` longtext DEFAULT NULL,
  PRIMARY KEY (`address_asset_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_address_chain_list_logs`
--

DROP TABLE IF EXISTS `pms_address_chain_list_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_address_chain_list_logs` (
  `address_asset_time` varchar(250) NOT NULL,
  `address_asset_id` varchar(150) NOT NULL,
  `address_id` varchar(100) NOT NULL,
  `asset_id` varchar(80) NOT NULL,
  `asset_name` varchar(150) NOT NULL,
  `total_asset_balance` varchar(45) NOT NULL,
  `asset_percentage_value` varchar(45) NOT NULL,
  `timeStamp` varchar(45) NOT NULL,
  `logo_url` longtext DEFAULT NULL,
  `created_date` varchar(80) NOT NULL,
  PRIMARY KEY (`address_asset_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_address_daily_snapshot`
--

DROP TABLE IF EXISTS `pms_address_daily_snapshot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_address_daily_snapshot` (
  `address_id_timeStamp` varchar(100) NOT NULL,
  `total_usd` double DEFAULT NULL,
  `address_id` varchar(100) NOT NULL,
  `timeStamp` varchar(80) DEFAULT NULL,
  `wallet_id` varchar(100) DEFAULT NULL,
  `portfolio_id` varchar(100) DEFAULT NULL,
  `address_name` varchar(200) DEFAULT NULL,
  `address_type` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`address_id_timeStamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_address_transaction_audit_logs`
--

DROP TABLE IF EXISTS `pms_address_transaction_audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_address_transaction_audit_logs` (
  `transaction_id_timestamp` varchar(300) NOT NULL,
  `self_address_id` varchar(100) DEFAULT NULL,
  `other_address_id` varchar(100) DEFAULT NULL,
  `asset_chain` varchar(100) DEFAULT NULL,
  `amount` longtext DEFAULT NULL,
  `transaction_time` varchar(80) DEFAULT NULL,
  `transaction_type` varchar(120) DEFAULT NULL,
  `cate_id` varchar(100) DEFAULT NULL,
  `send_data` longtext DEFAULT NULL,
  `recieve_data` longtext DEFAULT NULL,
  `created_at` varchar(100) NOT NULL,
  `comments` longtext DEFAULT NULL,
  `updated_time` varchar(100) DEFAULT NULL,
  `updated_by` varchar(200) NOT NULL,
  `timestamp` varchar(13) NOT NULL,
  `new_comment_added` longtext DEFAULT NULL,
  `username` varchar(200) NOT NULL,
  `usertype` varchar(100) NOT NULL,
  `transaction_id` varchar(250) NOT NULL,
  PRIMARY KEY (`transaction_id_timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_exchange_api_key_credentials`
--

DROP TABLE IF EXISTS `pms_exchange_api_key_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_exchange_api_key_credentials` (
  `exchange_apikey` varchar(150) NOT NULL,
  `exchange_secret_api_key` varchar(200) NOT NULL,
  `created_by` varchar(150) DEFAULT NULL,
  `portfolio_id` varchar(100) DEFAULT NULL,
  `created_date` varchar(100) DEFAULT NULL,
  `exchange_name` varchar(300) NOT NULL,
  PRIMARY KEY (`exchange_apikey`),
  UNIQUE KEY `Exchange_secret_api_key_UNIQUE` (`exchange_secret_api_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_exchange_assets`
--

DROP TABLE IF EXISTS `pms_exchange_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_exchange_assets` (
  `makerCommission` double DEFAULT NULL,
  `takerCommission` double DEFAULT NULL,
  `buyerCommission` double DEFAULT NULL,
  `sellerCommission` double DEFAULT NULL,
  `canTrade` int(11) DEFAULT NULL,
  `canWithdraw` int(11) DEFAULT NULL,
  `canDeposit` int(11) DEFAULT NULL,
  `updateTime` double DEFAULT NULL,
  `accountType` text DEFAULT NULL,
  `asset` text DEFAULT NULL,
  `free` double DEFAULT NULL,
  `locked` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_exchange_data_logs`
--

DROP TABLE IF EXISTS `pms_exchange_data_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_exchange_data_logs` (
  `exchange_api_key_time` varchar(200) NOT NULL,
  `exchange_api_key` varchar(150) NOT NULL,
  `marketCommission` varchar(45) DEFAULT NULL,
  `takerCommission` varchar(45) DEFAULT NULL,
  `buyerCommission` varchar(45) DEFAULT NULL,
  `sellerCommission` varchar(45) DEFAULT NULL,
  `canTrade` tinyint(4) DEFAULT NULL,
  `canWithdraw` tinyint(4) DEFAULT NULL,
  `canDeposit` tinyint(4) DEFAULT NULL,
  `updateTime` varchar(45) DEFAULT NULL,
  `accountType` varchar(45) DEFAULT NULL,
  `assetName` varchar(45) DEFAULT NULL,
  `free` varchar(45) DEFAULT NULL,
  `locked` varchar(45) DEFAULT NULL,
  `apikeyName` varchar(200) NOT NULL,
  `portfolio_id` varchar(100) NOT NULL,
  `exchange_name` varchar(200) NOT NULL,
  `exchange_type` varchar(45) NOT NULL,
  PRIMARY KEY (`exchange_api_key_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_exchange_history_audit_logs`
--

DROP TABLE IF EXISTS `pms_exchange_history_audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_exchange_history_audit_logs` (
  `symbol_order_id_api_key_timestamp` text DEFAULT NULL,
  `symbol_order_id_api_key` text DEFAULT NULL,
  `created_by` text DEFAULT NULL,
  `created_time` text DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `api_key` text DEFAULT NULL,
  `portfolio_id` text DEFAULT NULL,
  `previous_comment` text DEFAULT NULL,
  `new_comment` text DEFAULT NULL,
  `username` text DEFAULT NULL,
  `usertype` text DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_investment_data_logs`
--

DROP TABLE IF EXISTS `pms_investment_data_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_investment_data_logs` (
  `investment_id_time_updated` varchar(200) NOT NULL,
  `previous_investment_amount` varchar(100) DEFAULT NULL,
  `investment_Id` varchar(100) DEFAULT NULL,
  `investment_name` varchar(200) DEFAULT NULL,
  `updated_date` varchar(100) DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `date_of_investment` varchar(100) DEFAULT NULL,
  `investment_type` varchar(120) DEFAULT NULL,
  `portfolio_id` varchar(120) DEFAULT NULL,
  `comments` longtext DEFAULT NULL,
  `new_investment_amount` varchar(100) DEFAULT NULL,
  `new_investment_name` varchar(200) DEFAULT NULL,
  `new_date_of_investment_modified` varchar(100) DEFAULT NULL,
  `new_comment_modified` longtext DEFAULT NULL,
  `new_investment_type` varchar(120) DEFAULT NULL,
  `timestamp` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`investment_id_time_updated`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_organisations_list`
--

DROP TABLE IF EXISTS `pms_organisations_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_organisations_list` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tax_id` varchar(100) DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `party_id` varchar(80) NOT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  `updated_time` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `party_id_UNIQUE` (`party_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_party_list`
--

DROP TABLE IF EXISTS `pms_party_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_party_list` (
  `party_id` varchar(100) NOT NULL,
  `belongs_to` varchar(100) DEFAULT NULL,
  `created_at` varchar(80) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`party_id`),
  UNIQUE KEY `belongs_to_index` (`belongs_to`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_party_portfolio`
--

DROP TABLE IF EXISTS `pms_party_portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_party_portfolio` (
  `party_portfolio_id` varchar(200) NOT NULL,
  `party_id` varchar(100) NOT NULL,
  `portfolio_id` varchar(100) NOT NULL,
  `updated_date` varchar(80) DEFAULT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  `ownership_percentage` float NOT NULL DEFAULT 100,
  PRIMARY KEY (`party_portfolio_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_person_list`
--

DROP TABLE IF EXISTS `pms_person_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_person_list` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email_id` varchar(100) DEFAULT NULL,
  `party_id` varchar(80) NOT NULL,
  `updated_by` varchar(80) DEFAULT NULL,
  `updated_time` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `party_id_UNIQUE` (`party_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_portfolio`
--

DROP TABLE IF EXISTS `pms_portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_portfolio` (
  `portfolio_id` varchar(100) NOT NULL,
  `updated_date` varchar(100) NOT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `portfolio_name` varchar(200) NOT NULL,
  PRIMARY KEY (`portfolio_id`),
  UNIQUE KEY `portfolio_name_UNIQUE` (`portfolio_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_portfolio_manager`
--

DROP TABLE IF EXISTS `pms_portfolio_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_portfolio_manager` (
  `portfolio_account_id` varchar(200) NOT NULL,
  `portfolio_id` varchar(100) NOT NULL,
  `accountant_id` varchar(100) NOT NULL,
  `created_at` varchar(100) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`portfolio_account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_user_balance`
--

DROP TABLE IF EXISTS `pms_user_balance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_user_balance` (
  `total_usd_value` double DEFAULT NULL,
  `percent` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_id` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timeStamp` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `portfolio_id` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wallet_id` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_type` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ref_address_number` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`address_id`),
  UNIQUE KEY `address_name_UNIQUE` (`address_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_user_exchange_info`
--

DROP TABLE IF EXISTS `pms_user_exchange_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_user_exchange_info` (
  `apikey` varchar(80) NOT NULL,
  `marketCommission` varchar(45) DEFAULT NULL,
  `takerCommission` varchar(45) DEFAULT NULL,
  `buyerCommission` varchar(45) DEFAULT NULL,
  `sellerCommission` varchar(45) DEFAULT NULL,
  `canTrade` tinyint(4) DEFAULT NULL,
  `canDeposit` tinyint(4) DEFAULT NULL,
  `canWithdraw` tinyint(4) DEFAULT NULL,
  `updateTime` varchar(45) DEFAULT NULL,
  `accountType` varchar(45) DEFAULT NULL,
  `assetName` varchar(45) DEFAULT NULL,
  `free` varchar(45) DEFAULT NULL,
  `locked` varchar(45) DEFAULT NULL,
  `apikeyName` varchar(200) NOT NULL,
  `portfolio_id` varchar(100) NOT NULL,
  `exchange_name` varchar(200) NOT NULL,
  `exchange_type` varchar(45) NOT NULL,
  PRIMARY KEY (`apikeyName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_user_exchange_trade_history`
--

DROP TABLE IF EXISTS `pms_user_exchange_trade_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_user_exchange_trade_history` (
  `symbol_order_id_api_key` text DEFAULT NULL,
  `symbol` text DEFAULT NULL,
  `timeStamp` text DEFAULT NULL,
  `datetime` text DEFAULT NULL,
  `id` text DEFAULT NULL,
  `order` text DEFAULT NULL,
  `type` text DEFAULT NULL,
  `side` text DEFAULT NULL,
  `takerOrMaker` text DEFAULT NULL,
  `price` text DEFAULT NULL,
  `amount` text DEFAULT NULL,
  `cost` text DEFAULT NULL,
  `fee` text DEFAULT NULL,
  `fees` text DEFAULT NULL,
  `info` text DEFAULT NULL,
  `created_time` text DEFAULT NULL,
  `created_by` text DEFAULT NULL,
  `updated_time` text DEFAULT NULL,
  `updated_by` text DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `portfolio_id` text DEFAULT NULL,
  `api_key` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_user_history`
--

DROP TABLE IF EXISTS `pms_user_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_user_history` (
  `address_id_timeStamp` varchar(200) NOT NULL,
  `total_usd` double DEFAULT NULL,
  `address_id` varchar(80) DEFAULT NULL,
  `timeStamp` varchar(60) DEFAULT NULL,
  `portfolio_id` varchar(80) DEFAULT NULL,
  `wallet_id` varchar(80) DEFAULT NULL,
  `address_name` varchar(200) NOT NULL,
  `address_type` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`address_id_timeStamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_user_invest`
--

DROP TABLE IF EXISTS `pms_user_invest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_user_invest` (
  `total_invest` double DEFAULT NULL,
  `user_balance` double DEFAULT NULL,
  `per` double DEFAULT NULL,
  `walletId` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timeStamp` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_user_wallet`
--

DROP TABLE IF EXISTS `pms_user_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_user_wallet` (
  `walletId` varchar(80) NOT NULL,
  `timeStamp` varchar(45) DEFAULT NULL,
  `portfolio_id` varchar(120) NOT NULL,
  `wallet_name` varchar(100) NOT NULL,
  `wallet_purpose` varchar(45) NOT NULL,
  PRIMARY KEY (`walletId`),
  UNIQUE KEY `wallet_name_UNIQUE` (`wallet_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_users`
--

DROP TABLE IF EXISTS `pms_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_users` (
  `user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `party_id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `previous_login_time` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `pms_view`
--

DROP TABLE IF EXISTS `pms_view`;
/*!50001 DROP VIEW IF EXISTS `pms_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `pms_view` (
  `Portfolio Name` tinyint NOT NULL,
  `Party Name` tinyint NOT NULL,
  `Party Type` tinyint NOT NULL,
  `Party Ownership(%)` tinyint NOT NULL,
  `Total Fund Value (USD)` tinyint NOT NULL,
  `Investment Type` tinyint NOT NULL,
  `Investment Value(USD)` tinyint NOT NULL,
  `Wallet Type` tinyint NOT NULL,
  `Wallet Value(USD)` tinyint NOT NULL,
  `ExchangeAsset Type` tinyint NOT NULL,
  `Total Exchange Value(USD)` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pms_wallet_asset`
--

DROP TABLE IF EXISTS `pms_wallet_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_wallet_asset` (
  `wallet_symbol_id` varchar(60) NOT NULL,
  `asset_id` varchar(60) NOT NULL,
  `chain` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `symbol` varchar(45) NOT NULL,
  `logo_url` longtext DEFAULT NULL,
  `price` double NOT NULL,
  `time_at` varchar(45) DEFAULT NULL,
  `amount` double NOT NULL,
  `raw_amount` double NOT NULL,
  `walletId` varchar(45) NOT NULL,
  `is_wallet` tinyint(4) NOT NULL,
  PRIMARY KEY (`wallet_symbol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_wallet_asset_type`
--

DROP TABLE IF EXISTS `pms_wallet_asset_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_wallet_asset_type` (
  `id` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chain` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_url` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `has_supported_portfolio` tinyint(4) DEFAULT NULL,
  `portfolio_item_name` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `net_usd_value` double DEFAULT NULL,
  `supply_token_list` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `walletId` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `borrow_token_list` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `reward_token_list` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `health_rate` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_wallet_chain_token_list`
--

DROP TABLE IF EXISTS `pms_wallet_chain_token_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_wallet_chain_token_list` (
  `wallet_chain_token_id` varchar(200) NOT NULL,
  `token_id` varchar(100) NOT NULL,
  `token_name` varchar(100) NOT NULL,
  `token_symbol` varchar(60) DEFAULT NULL,
  `token_optimized_symbol` varchar(80) DEFAULT NULL,
  `token_chain_id` varchar(80) DEFAULT NULL,
  `amount_time_at` varchar(80) DEFAULT NULL,
  `token_amount` varchar(60) DEFAULT NULL,
  `token_price` varchar(60) DEFAULT NULL,
  `is_wallet` varchar(45) DEFAULT NULL,
  `data_created_at` varchar(60) DEFAULT NULL,
  `logo_url` longtext DEFAULT NULL,
  `raw_amount` varchar(45) DEFAULT NULL,
  `address_id` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`wallet_chain_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_wallet_chain_token_logs`
--

DROP TABLE IF EXISTS `pms_wallet_chain_token_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_wallet_chain_token_logs` (
  `address_chain_token_time` varchar(280) NOT NULL,
  `wallet_chain_token_id` varchar(200) DEFAULT NULL,
  `token_id` varchar(100) DEFAULT NULL,
  `token_name` varchar(100) DEFAULT NULL,
  `token_symbol` varchar(60) DEFAULT NULL,
  `token_optimized_symbol` varchar(80) DEFAULT NULL,
  `token_chain_id` varchar(80) DEFAULT NULL,
  `amount_time_at` varchar(80) DEFAULT NULL,
  `token_amount` varchar(60) DEFAULT NULL,
  `token_price` varchar(60) DEFAULT NULL,
  `is_wallet` varchar(45) DEFAULT NULL,
  `data_created_at` varchar(60) DEFAULT NULL,
  `logo_url` longtext DEFAULT NULL,
  `raw_amount` varchar(45) DEFAULT NULL,
  `address_id` varchar(80) DEFAULT NULL,
  `created_time` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`address_chain_token_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_wallet_simple_protocol`
--

DROP TABLE IF EXISTS `pms_wallet_simple_protocol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_wallet_simple_protocol` (
  `protocol_chain_wallet_id` varchar(200) NOT NULL,
  `protocolId` varchar(80) DEFAULT NULL,
  `protocolName` varchar(100) DEFAULT NULL,
  `protocolChain` varchar(80) DEFAULT NULL,
  `protocolsiteUrl` longtext DEFAULT NULL,
  `protocolLogoUrl` longtext DEFAULT NULL,
  `tvlValue` varchar(80) DEFAULT NULL,
  `net_usd_value` varchar(80) DEFAULT NULL,
  `address_id` varchar(85) DEFAULT NULL,
  `updated_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`protocol_chain_wallet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_wallet_simple_protocol_logs`
--

DROP TABLE IF EXISTS `pms_wallet_simple_protocol_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_wallet_simple_protocol_logs` (
  `protocol_chain_wallet_id_time` varchar(280) NOT NULL,
  `protocol_chain_wallet_id` varchar(200) NOT NULL,
  `protocolId` varchar(80) NOT NULL,
  `protocolName` varchar(80) NOT NULL,
  `protocolChain` varchar(80) DEFAULT NULL,
  `protocolsiteUrl` longtext DEFAULT NULL,
  `protocolLogoUrl` longtext DEFAULT NULL,
  `tvlValue` varchar(80) DEFAULT NULL,
  `net_usd_value` varchar(80) DEFAULT NULL,
  `address_id` varchar(85) DEFAULT NULL,
  `updated_date` varchar(45) DEFAULT NULL,
  `created_date` varchar(45) NOT NULL,
  PRIMARY KEY (`protocol_chain_wallet_id_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_wallet_transaction_history_list`
--

DROP TABLE IF EXISTS `pms_wallet_transaction_history_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_wallet_transaction_history_list` (
  `transaction_id` varchar(100) NOT NULL,
  `other_wallet_address` varchar(45) DEFAULT NULL,
  `asset_chain` varchar(60) DEFAULT NULL,
  `amount` longtext DEFAULT NULL,
  `transaction_time` varchar(60) DEFAULT NULL,
  `transaction_type` varchar(60) DEFAULT NULL,
  `cate_id` varchar(45) DEFAULT NULL,
  `send_data` longtext DEFAULT NULL,
  `recieve_data` longtext DEFAULT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `comments` longtext DEFAULT NULL,
  `address_id` varchar(45) DEFAULT NULL,
  `updated_time` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pms_wallet_user_assets`
--

DROP TABLE IF EXISTS `pms_wallet_user_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_wallet_user_assets` (
  `id` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `symbol` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo_url` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chain` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  `balance` double DEFAULT NULL,
  `sum_exposure_usd` double DEFAULT NULL,
  `walletId` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_date` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `superset_view_cryptobet`
--

DROP TABLE IF EXISTS `superset_view_cryptobet`;
/*!50001 DROP VIEW IF EXISTS `superset_view_cryptobet`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `superset_view_cryptobet` (
  `Portfolio Name` tinyint NOT NULL,
  `Party Name` tinyint NOT NULL,
  `Party Type` tinyint NOT NULL,
  `Party Ownership(%)` tinyint NOT NULL,
  `Total Investment(USD)` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `PMS_Portfolio_View`
--

/*!50001 DROP TABLE IF EXISTS `PMS_Portfolio_View`*/;
/*!50001 DROP VIEW IF EXISTS `PMS_Portfolio_View`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`pms_server`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `PMS_Portfolio_View` AS with WalletData as (select `pp`.`portfolio_id` AS `portfolio_id`,`pp`.`portfolio_name` AS `portfolio_name`,`usb`.`address_type` AS `address_type`,ifnull(nullif(sum(`usb`.`total_usd_value`),''),0) AS `sumwallet` from (`crypto_app`.`pms_user_balance` `usb` join `crypto_app`.`pms_portfolio` `pp` on(cast(`usb`.`portfolio_id` as char charset utf8mb4) = cast(`pp`.`portfolio_id` as char charset utf8mb4))) group by `pp`.`portfolio_id`), investdata as (select `portfolio`.`portfolio_id` AS `portfolio_id`,`portfolio`.`portfolio_name` AS `portfolio_name`,`invest`.`investment_type` AS `investment_type`,ifnull(sum(`invest`.`investment_value`),0) AS `SumValue` from (`crypto_app`.`pms_portfolio` `portfolio` join `crypto_app`.`pms_add_investment` `invest` on(`portfolio`.`portfolio_id` = `invest`.`portfolio_id`)) group by `portfolio`.`portfolio_id`), exchangedata as (select `exc`.`portfolio_id` AS `portfolio_id`,`exc`.`assetName` AS `assetName`,ifnull(sum(`exc`.`free`),0) AS `sumofexchange` from (`crypto_app`.`pms_exchange_data_logs` `exc` join `crypto_app`.`pms_portfolio` `portfolio` on(`portfolio`.`portfolio_id` = `exc`.`portfolio_id`)) group by `exc`.`assetName`)select ucase(`portfolio`.`portfolio_name`) AS `Portfolio Name`,ifnull(ucase(`party`.`name`),'OTHER') AS `Party Name`,ifnull(ucase(`party`.`category`),'OTHER') AS `Party Type`,ifnull(ucase(`ppmap`.`ownership_percentage`),'OTHER') AS `Party Ownership(%)`,ifnull(round(`investo`.`SumValue` * `ppmap`.`ownership_percentage` / 100,2),0) + ifnull(round(`walletda`.`sumwallet` * `ppmap`.`ownership_percentage` / 100,2),0) + ifnull(round(`exc`.`sumofexchange` * `ppmap`.`ownership_percentage` / 100,2),0) AS `Total Fund Value (USD)`,ifnull(ucase(`investo`.`investment_type`),'OTHER') AS `Investment Type`,ifnull(round(`investo`.`SumValue` * `ppmap`.`ownership_percentage` / 100,2),0) AS `Investment Value(USD)`,ifnull(`walletda`.`address_type`,'OTHER') AS `Wallet Type`,ifnull(round(`walletda`.`sumwallet` * `ppmap`.`ownership_percentage` / 100,2),0) AS `Wallet Value(USD)`,ifnull(`exc`.`assetName`,'OTHER') AS `ExchangeAsset Type`,ifnull(round(`exc`.`sumofexchange` * `ppmap`.`ownership_percentage` / 100,2),0) AS `Total Exchange Value(USD)` from (((((`crypto_app`.`pms_portfolio` `portfolio` left join `crypto_app`.`pms_party_portfolio` `ppmap` on(`portfolio`.`portfolio_id` = `ppmap`.`portfolio_id`)) left join `crypto_app`.`pms_party_list` `party` on(`party`.`party_id` = `ppmap`.`party_id`)) left join `investdata` `investo` on(`investo`.`portfolio_id` = `portfolio`.`portfolio_id`)) left join `walletdata` `walletda` on(cast(`walletda`.`portfolio_id` as char charset utf8mb4) = cast(`portfolio`.`portfolio_id` as char charset utf8mb4))) left join `exchangedata` `exc` on(cast(`exc`.`portfolio_id` as char charset utf8mb4) = cast(`portfolio`.`portfolio_id` as char charset utf8mb4))) order by `portfolio`.`portfolio_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pms_view`
--

/*!50001 DROP TABLE IF EXISTS `pms_view`*/;
/*!50001 DROP VIEW IF EXISTS `pms_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`pms_server`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `pms_view` AS with WalletData as (select `pp`.`portfolio_id` AS `portfolio_id`,`pp`.`portfolio_name` AS `portfolio_name`,`usb`.`address_type` AS `address_type`,sum(`usb`.`total_usd_value`) AS `sumwallet` from (`crypto_app`.`pms_user_balance` `usb` join `crypto_app`.`pms_portfolio` `pp` on(cast(`usb`.`portfolio_id` as char charset utf8mb4) = cast(`pp`.`portfolio_id` as char charset utf8mb4))) group by `pp`.`portfolio_id`), investdata as (select `portfolio`.`portfolio_id` AS `portfolio_id`,`portfolio`.`portfolio_name` AS `portfolio_name`,`invest`.`investment_type` AS `investment_type`,sum(`invest`.`investment_value`) AS `SumValue` from (`crypto_app`.`pms_portfolio` `portfolio` join `crypto_app`.`pms_add_investment` `invest` on(`portfolio`.`portfolio_id` = `invest`.`portfolio_id`)) group by `portfolio`.`portfolio_id`), exchangedata as (select `exc`.`portfolio_id` AS `portfolio_id`,`exc`.`assetName` AS `assetName`,sum(`exc`.`free`) AS `sumofexchange` from (`crypto_app`.`pms_exchange_data_logs` `exc` join `crypto_app`.`pms_portfolio` `portfolio` on(`portfolio`.`portfolio_id` = `exc`.`portfolio_id`)) group by `exc`.`assetName`)select ucase(`portfolio`.`portfolio_name`) AS `Portfolio Name`,ucase(`party`.`name`) AS `Party Name`,ucase(`party`.`category`) AS `Party Type`,ucase(`ppmap`.`ownership_percentage`) AS `Party Ownership(%)`,round(`investo`.`SumValue` * `ppmap`.`ownership_percentage` / 100,2) + round(`walletda`.`sumwallet` * `ppmap`.`ownership_percentage` / 100,2) + round(`exc`.`sumofexchange` * `ppmap`.`ownership_percentage` / 100,2) AS `Total Fund Value (USD)`,ucase(`investo`.`investment_type`) AS `Investment Type`,round(`investo`.`SumValue` * `ppmap`.`ownership_percentage` / 100,2) AS `Investment Value(USD)`,`walletda`.`address_type` AS `Wallet Type`,round(`walletda`.`sumwallet` * `ppmap`.`ownership_percentage` / 100,2) AS `Wallet Value(USD)`,`exc`.`assetName` AS `ExchangeAsset Type`,round(`exc`.`sumofexchange` * `ppmap`.`ownership_percentage` / 100,2) AS `Total Exchange Value(USD)` from (((((`investdata` `investo` join `crypto_app`.`pms_portfolio` `portfolio` on(`investo`.`portfolio_id` = `portfolio`.`portfolio_id`)) join `walletdata` `walletda` on(cast(`walletda`.`portfolio_id` as char charset utf8mb4) = cast(`portfolio`.`portfolio_id` as char charset utf8mb4))) join `exchangedata` `exc` on(cast(`exc`.`portfolio_id` as char charset utf8mb4) = cast(`portfolio`.`portfolio_id` as char charset utf8mb4))) join `crypto_app`.`pms_party_portfolio` `ppmap` on(`portfolio`.`portfolio_id` = `ppmap`.`portfolio_id`)) join `crypto_app`.`pms_party_list` `party` on(`party`.`party_id` = `ppmap`.`party_id`)) order by `portfolio`.`portfolio_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `superset_view_cryptobet`
--

/*!50001 DROP TABLE IF EXISTS `superset_view_cryptobet`*/;
/*!50001 DROP VIEW IF EXISTS `superset_view_cryptobet`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`pms_server`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `superset_view_cryptobet` AS with investdata as (select `portfolio`.`portfolio_name` AS `portfolio_name`,`portfolio`.`portfolio_id` AS `portfolio_id`,sum(`invest`.`investment_value`) AS `SumValue` from (`crypto_app`.`pms_portfolio` `portfolio` join `crypto_app`.`pms_add_investment` `invest` on(`portfolio`.`portfolio_id` = `invest`.`portfolio_id`)) group by `portfolio`.`portfolio_id`)select ucase(`portfolio`.`portfolio_name`) AS `Portfolio Name`,ucase(`party`.`name`) AS `Party Name`,ucase(`party`.`category`) AS `Party Type`,ucase(`ppmap`.`ownership_percentage`) AS `Party Ownership(%)`,round(`investo`.`SumValue` * `ppmap`.`ownership_percentage` / 100,2) AS `Total Investment(USD)` from (((`investdata` `investo` join `crypto_app`.`pms_portfolio` `portfolio` on(`investo`.`portfolio_id` = `portfolio`.`portfolio_id`)) join `crypto_app`.`pms_party_portfolio` `ppmap` on(`portfolio`.`portfolio_id` = `ppmap`.`portfolio_id`)) join `crypto_app`.`pms_party_list` `party` on(`party`.`party_id` = `ppmap`.`party_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-19 19:42:20
