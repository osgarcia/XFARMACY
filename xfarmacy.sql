-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 07-10-2023 a las 03:20:02
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `xfarmacy`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`` PROCEDURE `SP_ADDLAB` (IN `DI_Idcon` INT, IN `DS_Prod` VARCHAR(100), IN `DS_Casprod` VARCHAR(100), IN `DI_Cantprod` INT, IN `DD_Preprod` DECIMAL(10,2), IN `DS_Feccomp` VARCHAR(100), IN `DS_Stcompr` VARCHAR(100))   BEGIN
    
 START TRANSACTION;
 
 
INSERT INTO venprod(Idcon, Prod, Casprod, Cantprod, Preprod, Feccomp, Stcompr) values(DI_Idcon, DS_Prod, DS_Casprod, DI_Cantprod, DD_Preprod, DS_Feccomp, DS_Stcompr);

 COMMIT;
 END$$

CREATE DEFINER=`` PROCEDURE `SP_ADDMED` (IN `DI_Idcon` INT, IN `DS_Prod` VARCHAR(100), IN `DS_Casprod` VARCHAR(100), IN `DI_Cantprod` INT, IN `DD_Preprod` DECIMAL(10,2), IN `DS_Feccomp` VARCHAR(100), IN `DS_Stcompr` VARCHAR(100))   BEGIN
    
 START TRANSACTION;
 
 
INSERT INTO venprod(Idcon, Prod, Casprod, Cantprod, Preprod, Feccomp, Stcompr) values(DI_Idcon, DS_Prod, DS_Casprod, DI_Cantprod, DD_Preprod, DS_Feccomp, DS_Stcompr);

UPDATE prods set Unidisp = Unidisp - DI_Cantprod Where Noprod = DS_Prod;

 COMMIT;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_CITAMEDMOVIL` (IN `DI_IDPa` INT, IN `DS_Nocli` VARCHAR(255), IN `DS_Fecconsul` VARCHAR(100), IN `DS_clihour` VARCHAR(100), IN `DS_Moticonsul` VARCHAR(255), IN `DS_Histenf` VARCHAR(255), IN `DS_Tipespec` VARCHAR(100), IN `DS_medesp` VARCHAR(100), IN `DI_IDH` INT)   BEGIN
    
    START TRANSACTION;
    
    INSERT INTO cliconsul(IDPa, Nocli, Fecconsul, clihour, Moticonsul, Histenf, Tipespec, medesp) values(DI_IDPa, DS_Nocli, DS_Fecconsul, DS_clihour, DS_Moticonsul, DS_Histenf, DS_Tipespec, DS_medesp);
    
    IF DS_clihour = '07:00' THEN 
    UPDATE dochour set Hdoc1 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
    IF DS_clihour = '08:00' THEN 
    UPDATE dochour set Hdoc2 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
    IF DS_clihour = '09:00' THEN 
    UPDATE dochour set Hdoc3 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
    IF DS_clihour = '10:00' THEN 
    UPDATE dochour set Hdoc4 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
    IF DS_clihour = '11:00' THEN 
    UPDATE dochour set Hdoc5 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
     IF DS_clihour = '12:00' THEN 
    UPDATE dochour set Hdoc6 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
     IF DS_clihour = '13:00' THEN 
    UPDATE dochour set Hdoc7 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
     IF DS_clihour = '14:00' THEN 
    UPDATE dochour set Hdoc8 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
     IF DS_clihour = '15:00' THEN 
    UPDATE dochour set Hdoc9 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
     IF DS_clihour = '16:00' THEN 
    UPDATE dochour set Hdoc10 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
    IF DS_clihour = '17:00' THEN 
    UPDATE dochour set Hdoc11 = " " WHERE IDH = DI_IDH;
    
    END IF;
    
    COMMIT;
    
    END$$

CREATE DEFINER=`` PROCEDURE `SP_CONSULFACT` (IN `DI_Idcon` INT)   BEGIN
    
 START TRANSACTION;
 
select b.Idcon, Prod, Casprod, Cantprod, Preprod, Cantprod * Preprod as Total, Clnit, Nocli from venprod a left join cliconsul b on a.Idcon = b.Idcon left join pacien c on b.IDPa = c.IDPa where b.Idcon = DI_Idcon;
 


 COMMIT;
 END$$

CREATE DEFINER=`` PROCEDURE `SP_MNSECRE` ()   BEGIN
    

 
 START TRANSACTION;
 
 select * from pacien a left join fusers b on a.climed = b.User;
 
 select * from fusers a left join dochour b on a.ID = b.IDD where Dresp = "GEN" and fecaten >= current_date();
 
 select * from fusers a left join dochour b on a.ID = b.IDD where Dresp <> "GEN" and fecaten >= current_date();
 
 
 COMMIT;
 END$$

CREATE DEFINER=`` PROCEDURE `SP_UPCONSULESP` (IN `DI_Idcon` INT, IN `DS_Nocli` VARCHAR(100), IN `DS_Fecconsul` VARCHAR(100), IN `DS_stcconsul` CHAR(5))   BEGIN
    
 START TRANSACTION;
 
 UPDATE CLICONSUL SET stcconsul = DS_stcconsul WHERE Idcon = DI_Idcon;
 
INSERT INTO venprod(Idcon,  Prod, Casprod, Cantprod, Preprod, Feccomp, Stcompr) values(DI_Idcon,'CONGE','MED','1', '150.00', DS_Fecconsul, 'CGESP');

 COMMIT;
 END$$

CREATE DEFINER=`` PROCEDURE `SP_UPCONSULGEN` (IN `DI_Idcon` INT, IN `DS_Nocli` VARCHAR(100), IN `DS_Fecconsul` VARCHAR(100), IN `DS_stcconsul` CHAR(5))   BEGIN
    
 START TRANSACTION;
 
 UPDATE CLICONSUL SET stcconsul = DS_stcconsul WHERE Idcon = DI_Idcon;
 
INSERT INTO venprod(Idcon,  Prod, Casprod, Cantprod, Preprod, Feccomp, Stcompr) values(DI_Idcon,'CONGE','MED','1', '100.00', DS_Fecconsul, 'CGA');

 COMMIT;
 END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliconsul`
--

CREATE TABLE `cliconsul` (
  `Idcon` int(11) NOT NULL,
  `IDPa` int(11) NOT NULL,
  `Empcod` varchar(10) NOT NULL DEFAULT 'MED',
  `Nocli` varchar(255) DEFAULT NULL,
  `Fecconsul` varchar(100) DEFAULT NULL,
  `clihour` varchar(100) NOT NULL,
  `Moticonsul` varchar(255) DEFAULT NULL,
  `Histenf` varchar(255) DEFAULT NULL,
  `Dlabs` char(1) DEFAULT 'N',
  `Plterau` char(1) DEFAULT 'N',
  `Refespc` varchar(100) NOT NULL,
  `Tipespec` varchar(100) NOT NULL DEFAULT 'GEN',
  `medesp` varchar(100) NOT NULL,
  `Consulcome` varchar(255) DEFAULT NULL,
  `Comenespeci` varchar(255) NOT NULL,
  `stcconsul` char(5) NOT NULL DEFAULT 'G'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cliconsul`
--

INSERT INTO `cliconsul` (`Idcon`, `IDPa`, `Empcod`, `Nocli`, `Fecconsul`, `clihour`, `Moticonsul`, `Histenf`, `Dlabs`, `Plterau`, `Refespc`, `Tipespec`, `medesp`, `Consulcome`, `Comenespeci`, `stcconsul`) VALUES
(50, 14, 'MED', 'Carlos Alejandro Cruz Ramirez', '2023-09-29', '07:00', 'Dolor De Estomago', 'Dolor de estamago desde hace 2 dias despues de comer churrasco en la calle', 'N', 'N', '', 'GEN', '', 'Farmacia: Desparacitante y Purgante.', '', 'P'),
(51, 14, 'MED', 'Carlos Alejandro Cruz Ramirez', '2023-09-29', '10:00', 'Dolor De Cabeza', 'Dolor De Cabeza', 'N', 'N', '', 'GEN', '', 'Farmacia: Doloneurobion 1 cada 12 horas', '', 'P'),
(52, 14, 'MED', 'Carlos Alejandro Cruz Ramirez', '2023-09-30', '07:00', 'Dolor de Cabeza y Mareos', 'Dolor de Cabeza luego de caida por gradas.', 'Y', 'N', 'Y', 'NEU', 'Oscar Alexis García Del Cid', 'Laboratorio: Radiografia De Cabeza\r\n\r\nFarmacia: Paracetamol y Desimflamatorios Dosis para 2 días', '', 'P'),
(53, 11, 'MED', 'Floricelda Del Cid Mayen', '2023-09-30', '11:00', 'Dolor de Cabeza y Perdida de Fuerza', 'Paciente tiene enfermedad de tiroides', 'N', 'N', '', 'GEN', '', 'Farmacia: Tratamiento contra la tirodies casa media Fyser', '', 'P'),
(54, 17, 'MED', 'Gustavo García Cortez', '2023-09-30', '11:00', 'Dolor de Rodilla Intenso', 'Dolor de rodilla paciente subrio caida hace 2 dias', 'Y', 'N', '', 'GEN', '', 'Farmacia: Desimflamatorios por 2 días\r\n\r\nLaboratorio: Radiografia de Rodilla', '', 'P'),
(55, 8, 'MED', 'Jose Antonio Gonzalez Gonzalez', '2023-09-30', '14:00', 'Tos seca y dolor de Garganta', 'Sintomas durante 3 días ', 'N', 'N', '', 'GEN', '', 'Farmacia: Salbutamol en spray utilizar por 1 semana', '', 'P'),
(56, 13, 'MED', 'Carlos Ivan Del Cid Mayen', '2023-09-30', '16:00', 'Dificultad para respirar', 'Golpe en pecho tras caer de motocicleta', 'N', 'N', '', 'GEN', '', 'Farmacia: Crema Lubriderm para mesaje en pecho 2 veces al dia.', '', 'FL'),
(58, 14, 'MED', 'Carlos Alejandro Cruz Ramirez', '2023-10-01', '14:00', 'Fuerte dolor de cabeza se expande por toda la columna', 'Fuerta dolor desde caida por gradas hace 2 dias.', 'Y', 'N', 'Y', 'NEU', 'Oscar Alexis García Del Cid', 'Farmacia: Desinflamante 1 cada 12 horas por 5 días\r\n\r\nLaboratorio: Tomografia de craneo', '', 'L'),
(59, 20, 'MED', 'Miguel Angel Asturias', '2023-10-04', '07:00', 'Dolor de Cuerpo y Estomago', 'Dolor intenso por 3 dias despues de fuerte lluvia', 'N', 'N', '', 'GEN', '', 'Farmacia: Paracetamol 1 capsula cada 6 horas por 5 dias.', '', 'P');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliusers`
--

CREATE TABLE `cliusers` (
  `IDClie` int(11) NOT NULL,
  `Empcod` varchar(10) NOT NULL DEFAULT 'MED',
  `Clinomb` varchar(100) DEFAULT NULL,
  `Clinumb` int(11) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `DPI` bigint(20) DEFAULT 0,
  `fecnaclie` varchar(20) NOT NULL,
  `cliadress` varchar(255) NOT NULL,
  `cliciudad` varchar(100) NOT NULL,
  `cliedad` int(11) NOT NULL,
  `cliprofe` varchar(100) NOT NULL,
  `clistatus` varchar(50) NOT NULL DEFAULT 'Activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cliusers`
--

INSERT INTO `cliusers` (`IDClie`, `Empcod`, `Clinomb`, `Clinumb`, `username`, `pass`, `DPI`, `fecnaclie`, `cliadress`, `cliciudad`, `cliedad`, `cliprofe`, `clistatus`) VALUES
(3, 'MED', 'Oscar Alexis García Del Cid', 54986081, 'ozmasmter92@gmail.com', '$2a$08$gvEOFLB9enS7jasFvxTlauFF75wVXa7GYlPLEILt3QdQyCRARnYAK', 2125915760101, '1992-06-01', 'Casa 2 M Colinas Del Norte 2 San Jose Del Golfo', 'Guatemala', 31, 'Ingeniero', 'Activo'),
(4, 'MED', 'Gabriel Oscar Adrian García Cua', 41541698, 'ggarcia@gmail.com', '$2a$08$.LsgxlvABVtTn3tb4sdUwuBMw3MXLO19zd/IoI0hxuNUAelTfUdG6', 2125976780102, '2020-08-14', 'Casa 2 M Colonia Colinas Del Norte 2 San Jose Del Golfo', 'Guatemala', 3, 'Estudiante', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dochour`
--

CREATE TABLE `dochour` (
  `IDH` int(11) NOT NULL,
  `IDD` int(11) DEFAULT NULL,
  `Empcod` varchar(10) NOT NULL DEFAULT 'MED',
  `Ndoc` varchar(100) DEFAULT NULL,
  `Hdoc1` varchar(100) DEFAULT NULL,
  `Hdoc2` varchar(100) DEFAULT NULL,
  `Hdoc3` varchar(100) DEFAULT NULL,
  `Hdoc4` varchar(100) DEFAULT NULL,
  `Hdoc5` varchar(100) DEFAULT NULL,
  `Hdoc6` varchar(100) DEFAULT NULL,
  `Hdoc7` varchar(100) DEFAULT NULL,
  `Hdoc8` varchar(100) DEFAULT NULL,
  `Hdoc9` varchar(100) DEFAULT NULL,
  `Hdoc10` varchar(100) DEFAULT NULL,
  `Hdoc11` varchar(100) DEFAULT NULL,
  `fecaten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `dochour`
--

INSERT INTO `dochour` (`IDH`, `IDD`, `Empcod`, `Ndoc`, `Hdoc1`, `Hdoc2`, `Hdoc3`, `Hdoc4`, `Hdoc5`, `Hdoc6`, `Hdoc7`, `Hdoc8`, `Hdoc9`, `Hdoc10`, `Hdoc11`, `fecaten`) VALUES
(1, 3, 'MED', 'Oscar Alexis García Del Cid', '08:00', '09:00', '10:30', '', '', '14:00', '16:00', '', '', '', '', '2023-08-29'),
(2, 4, 'MED', 'Jose Antonio Gonzalez Ramirez', '08:00', '10:00', '11:30', '', '', '14:00', '', '', '', '', '', '2023-08-29'),
(3, 3, 'MED', 'Oscar Alexis García Del Cid', '08:00', '10:00', '11:00', '', '', '15:00', '16:00', '', '', '', '', '2023-08-31'),
(4, 3, 'MED', 'Oscar Alexis García Del Cid', '08:00', '10:00', '11:00', '', '', '15:00', '16:00', '17:00', '', '', '', '2023-09-01'),
(5, 4, 'MED', 'Jose Antonio Gonzalez Ramirez', '07:00', '08:00', '09:00', '10:00', '11:00', '', '', '', '', '', '', '2023-08-30'),
(7, 3, 'MED', 'Oscar Alexis García Del Cid', '08:00', '09:00', '10:00', '11:00', '', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '2023-09-02'),
(8, 3, 'MED', 'Oscar Alexis García Del Cid', '09:00', '10:00', '11:00', '', '', '12:00', '15:00', '16:00', '', '', '', '2023-09-03'),
(9, 4, 'MED', 'Jose Antonio Gonzalez Ramirez', '10:30', '11:30', '', '', '', '12:30', '14:30', '', '', '', '', '2023-09-02'),
(10, 4, 'MED', 'Jose Antonio Gonzalez Ramirez', '08:00', '10:00', '11:00', '', '', '13:00', '14:00', '16:00', '', '', '', '2023-09-04'),
(11, 4, 'MED', 'Jose Antonio Gonzalez Ramirez', ' ', ' ', ' ', '', '', ' ', ' ', '', '', '', '', '2023-09-05'),
(12, 3, 'MED', 'Oscar Alexis García Del Cid', '', '', '', '', '', '14:00', '15:00', '16:00', '', '', '', '2023-09-05'),
(13, 4, 'MED', 'Jose Antonio Gonzalez Ramirez', ' ', ' ', ' ', '10:00', '11:00', '12:00', '13:00', '14:00', '', '', '', '2023-09-06'),
(14, 4, 'MED', 'Jose Antonio Gonzalez Ramirez', '', '', '', '', '', '', '', ' ', '15:00', '', '', '2023-09-08'),
(15, 3, 'MED', 'Oscar Alexis García Del Cid', '08:00', '09:00', '', '', '', '', '', '', '', '', '', '2023-09-12'),
(16, 4, 'MED', 'Jose Antonio Gonzalez Ramirez', ' ', ' ', '', '', '', '', '', '', '', '', '', '2023-09-12'),
(17, 3, 'MED', 'Oscar Alexis García Del Cid', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '', '', '', '', '2023-09-19'),
(18, 2, 'MED', 'Gabriel Adrían García Cua', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '', '14:00', '15:00', '16:00', '17:00', '2023-09-19'),
(19, 5, 'MED', 'Gabriela Alicia Cua Ortega', '07:00', '', '', '10:00', '', '', '', '', '', '', '', '2023-09-19'),
(20, 2, 'MED', 'Gabriel Adrían García Cua', '', '', '', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '2023-09-24'),
(21, 4, 'MED', 'Jose Antonio Gonzalez Ramirez', '', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '2023-10-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fusers`
--

CREATE TABLE `fusers` (
  `ID` bigint(20) NOT NULL,
  `Empcod` varchar(10) NOT NULL DEFAULT 'MED',
  `Nuser` varchar(100) DEFAULT NULL,
  `User` varchar(100) DEFAULT NULL,
  `Pass` varchar(100) DEFAULT NULL,
  `DPI` bigint(20) DEFAULT NULL,
  `Nacuser` varchar(100) NOT NULL,
  `Fecnac` varchar(100) NOT NULL,
  `Fecingre` varchar(255) DEFAULT NULL,
  `Rol` varchar(10) DEFAULT NULL,
  `Dresp` varchar(20) DEFAULT NULL,
  `drestat` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `fusers`
--

INSERT INTO `fusers` (`ID`, `Empcod`, `Nuser`, `User`, `Pass`, `DPI`, `Nacuser`, `Fecnac`, `Fecingre`, `Rol`, `Dresp`, `drestat`) VALUES
(2, 'MED', 'Gabriel Adrían García Cua', 'ggarcia', '$2a$08$jnzxTwc9fxd.6aUd933skO6l4acWurpxhG5YsjmeQ.PemHrz5h18u', 212598677901, '', '', '2023-07-19', 'DR', 'CAR', 'A'),
(3, 'MED', 'Oscar Alexis García Del Cid', 'odelcid', '$2a$08$1w3OvW5J.8QoIEfxbpNGkOVzg9wYHDDqMT2XoBF238hgrvCxspIHa', 2125915760101, '', '', '2023-08-29', 'DR', 'NEU', 'A'),
(4, 'MED', 'Jose Antonio Gonzalez Ramirez', 'jgonzalez', '$2a$08$.Dwn5E.6TpHHViuFoJnMUeOrFJwFo/Nf6RbeLcc7xkvYG7Uy7jfKq', 2125916770101, '', '', '2023-08-29', 'DR', 'GEN', 'A'),
(5, 'MED', 'Gabriela Alicia Cua Ortega', 'gcortega', '$2a$08$oJ6jrdrMLILhywrDUbnhz.DhO1A4odpkfA0jJTXy9LU6TjP94fvje', 1861911210101, '', '', '2023-09-19', 'DR', 'PSI', 'A'),
(7, 'MED', 'Pablo Ivan Pineda Cortez', 'ppineda', '$2a$08$Soe/z6m7dW6.78OTlG5npetTmryJoWwOGCrU5RMoBqj7DWjRy530u', 2125816790101, '', '', '2023-09-30', 'SO', 'N/A', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `labs`
--

CREATE TABLE `labs` (
  `ID` bigint(20) NOT NULL,
  `Nolab` varchar(100) NOT NULL,
  `Prelab` decimal(10,2) NOT NULL,
  `Labdeta` varchar(100) NOT NULL,
  `Stlab` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `labs`
--

INSERT INTO `labs` (`ID`, `Nolab`, `Prelab`, `Labdeta`, `Stlab`) VALUES
(1, 'Resonancia Magnetica', 300.00, 'Resonancia Espacial para Detectar Analias como cancer o heridas internas.', 'N'),
(2, 'Tomografia Creano', 450.00, 'Utilizada para tener detalles del cerebro en busqueda de anomalias.', 'D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacien`
--

CREATE TABLE `pacien` (
  `IDPa` int(11) NOT NULL,
  `Empcod` varchar(10) NOT NULL DEFAULT 'MED',
  `Noclie` varchar(50) DEFAULT NULL,
  `Cliedad` int(11) DEFAULT NULL,
  `Cldpi` bigint(100) NOT NULL,
  `Clnit` varchar(20) NOT NULL,
  `Fecna` varchar(100) DEFAULT NULL,
  `Sexo` char(1) DEFAULT NULL,
  `Clnac` varchar(100) NOT NULL,
  `Cldomi` varchar(255) NOT NULL,
  `Cldepto` varchar(100) NOT NULL,
  `Clmuni` varchar(100) NOT NULL,
  `Clcel` bigint(100) NOT NULL,
  `Cltel` bigint(100) NOT NULL,
  `clidia` char(1) DEFAULT NULL,
  `clipre` char(1) DEFAULT NULL,
  `clihipe` char(1) DEFAULT NULL,
  `clitipsa` varchar(10) DEFAULT NULL,
  `climed` varchar(255) NOT NULL,
  `cliquiru` char(1) NOT NULL,
  `clitrauma` char(1) NOT NULL,
  `clialerg` char(1) NOT NULL,
  `clihistobst` varchar(255) NOT NULL,
  `clihabit` char(1) NOT NULL,
  `clistat` varchar(100) NOT NULL DEFAULT 'GEN',
  `cliotr` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pacien`
--

INSERT INTO `pacien` (`IDPa`, `Empcod`, `Noclie`, `Cliedad`, `Cldpi`, `Clnit`, `Fecna`, `Sexo`, `Clnac`, `Cldomi`, `Cldepto`, `Clmuni`, `Clcel`, `Cltel`, `clidia`, `clipre`, `clihipe`, `clitipsa`, `climed`, `cliquiru`, `clitrauma`, `clialerg`, `clihistobst`, `clihabit`, `clistat`, `cliotr`) VALUES
(6, 'MED', 'Maria De Los Angeles García Del Cid', 30, 0, '0', '1993-08-29', 'F', '', '', '', '', 0, 0, 'N', 'N', 'N', 'O-', 'odelcid', 'Y', 'N', 'N', 'No Aplica', 'N', 'GEN', 'Cirugia De Nariz'),
(7, 'MED', 'Karla Viviana García Del Cid', 28, 0, '0', '1995-04-29', 'F', '', '', '', '', 0, 0, 'N', 'N', 'N', 'O+', 'odelcid', 'N', 'N', 'Y', 'No Aplica', 'N', 'GEN', 'Paciente Alergico a la Penicilina'),
(8, 'MED', 'Jose Antonio Gonzalez Gonzalez', 34, 0, '0', '2023-09-05', 'M', '', '', '', '', 0, 0, 'N', 'N', 'N', 'O+', 'odelcid', 'Y', 'N', 'Y', 'No aplica', 'N', 'GEN', 'Cirugias: Apendice\r\nAlergias: Penisina'),
(10, 'MED', 'Roberto Rosales', 21, 0, '0', '1990-12-16', 'M', '', '', '', '', 0, 0, 'N', 'N', 'N', 'O+', 'odelcid', 'N', 'N', 'Y', 'No Aplica', 'N', 'GEN', 'Alergias: Paracetamol'),
(11, 'MED', 'Floricelda Del Cid Mayen', 57, 0, '0', '2023-09-20', 'F', '', '', '', '', 0, 0, 'N', 'Y', 'N', 'O+', 'odelcid', 'N', 'N', 'N', '3 Hijos', 'N', 'GEN', 'Paciente con problemas de Tiroides'),
(12, 'MED', 'Kevin Ovidio Lopez Campos', 31, 0, '0', '2023-09-22', 'M', '', '', '', '', 0, 0, 'Y', 'N', 'N', 'AB+', 'ggarcia', 'N', 'N', 'N', 'No Aplica', 'N', 'GEN', 'Diabetes Tipo 2'),
(13, 'MED', 'Carlos Ivan Del Cid Mayen', 38, 0, '0', '2023-09-22', 'M', '', '', '', '', 0, 0, 'N', 'N', 'N', 'A+', 'odelcid', 'N', 'N', 'N', 'No Aplica', 'N', 'GEN', 'Apnea del Sueño'),
(14, 'MED', 'Carlos Alejandro Cruz Ramirez', 28, 2125915760101, '7040370-8', '2023-09-22', 'M', 'Guatemalteco', 'Casa 2 M Colinas Del Norte 2', 'Guatemala', 'San Jose Del Golfo', 54986981, 41541698, 'N', 'N', 'N', 'A+', 'odelcid', 'N', 'N', 'N', 'No Aplica', 'N', 'GEN', 'Ninguno'),
(15, 'MED', 'Luis Fernando Gomez Valenzuela', 32, 0, '0', '2023-09-22', 'M', '', '', '', '', 0, 0, 'N', 'N', 'N', 'B+', 'ggarcia', 'Y', 'N', 'N', 'No Aplica', 'N', 'GEN', 'Cirigua de Rodilla'),
(16, 'MED', 'Vitalina Cortez Aguilar', 85, 0, '0', '2023-09-22', 'F', '', '', '', '', 0, 0, 'N', 'Y', 'N', 'O+', 'odelcid', 'Y', 'N', 'N', '2 Hijos', 'N', 'GEN', 'Cirugia de mama, Cancer de mama'),
(17, 'MED', 'Gustavo García Cortez', 44, 0, '0', '2023-09-22', 'M', '', '', '', '', 0, 0, 'N', 'N', 'N', 'O+', 'odelcid', 'N', 'N', 'N', 'No Aplica', 'N', 'GEN', 'Ninguno'),
(20, 'MED', 'Miguel Angel Asturias', 50, 0, '', '1973-03-04', 'M', '', '', '', '', 0, 0, 'N', 'N', 'N', 'O+', 'jgonzalez', 'N', 'N', 'Y', 'No Aplica', 'N', 'GEN', 'Alergias: Penicilina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prods`
--

CREATE TABLE `prods` (
  `ID` bigint(20) NOT NULL,
  `Noprod` varchar(100) DEFAULT NULL,
  `Casprod` varchar(100) DEFAULT NULL,
  `Resprod` char(5) DEFAULT NULL,
  `Preprod` decimal(10,2) DEFAULT NULL,
  `Unidisp` int(11) DEFAULT NULL,
  `Prdeta` varchar(255) NOT NULL,
  `Fecingrep` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `prods`
--

INSERT INTO `prods` (`ID`, `Noprod`, `Casprod`, `Resprod`, `Preprod`, `Unidisp`, `Prdeta`, `Fecingrep`) VALUES
(1, 'Salbutamol', 'Galoxona', 'N', 60.00, 20, 'Jarabe Espectorante Descongestiona y Alivia los Pulmones Dosis Recomendada: 1 Cucharada Cada 8 Horas', '2023-10-01'),
(2, 'Lubriderm', 'Meycos', 'N', 20.00, 97, 'Crema hidratante Efectiva contra quemaduras del sol previene y reduce los efectos de la exposicion prolongada al sol', '2023-10-01'),
(3, 'Paracetamol', 'Pfizer', 'N', 10.00, 98, 'Medicamento para dolor intenso de cabeza blister 10 capsulas 600 mg.', '2023-10-01'),
(4, 'Crema Sana Sana', 'Pfizer', 'N', 50.00, 100, 'Creama para golpes', '2023-10-04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venprod`
--

CREATE TABLE `venprod` (
  `ID` bigint(20) NOT NULL,
  `Idcon` bigint(20) NOT NULL,
  `Prod` varchar(100) DEFAULT NULL,
  `Casprod` varchar(100) DEFAULT NULL,
  `Cantprod` int(11) DEFAULT NULL,
  `Preprod` decimal(10,2) DEFAULT NULL,
  `Feccomp` varchar(100) NOT NULL DEFAULT current_timestamp(),
  `Stcompr` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `venprod`
--

INSERT INTO `venprod` (`ID`, `Idcon`, `Prod`, `Casprod`, `Cantprod`, `Preprod`, `Feccomp`, `Stcompr`) VALUES
(4, 49, 'CONGE', 'MED', 1, 100.00, '2023-09-27', 'CGA'),
(5, 47, 'CONGE', 'MED', 1, 100.00, '2023-09-28', 'CGA'),
(6, 50, 'CONGE', 'MED', 1, 100.00, '2023-09-29', 'CGA'),
(7, 50, 'Purgante ', 'Meycos', 1, 40.00, '2023-09-28', 'CGF'),
(8, 50, 'Desparacitante', 'Meycos', 2, 10.00, '2023-09-28', 'CGF'),
(9, 50, 'Paracetamol', 'Galoxona', 1, 50.00, '2023-09-28', 'CGF'),
(10, 51, 'CONGE', 'MED', 1, 100.00, '2023-09-29', 'CGA'),
(11, 51, 'Doloneurobion', 'Galoxona', 2, 10.00, '2023-09-28', 'CGF'),
(13, 52, 'Paracetamol', 'Myecos', 1, 60.00, '2023-09-29', 'CGF'),
(14, 52, 'Desinflamatorio', 'Fyser', 5, 8.00, '2023-09-29', 'CGF'),
(15, 53, 'Tiroidea', 'Fyser', 2, 120.00, '2023-09-30', 'CGF'),
(17, 54, 'CONGE', 'MED', 1, 100.00, '2023-09-30', 'CGA'),
(18, 55, 'CONGE', 'MED', 1, 100.00, '2023-09-30', 'CGA'),
(19, 54, 'Desimflamatorio', 'Nativa', 7, 5.00, '2023-09-30', 'CGF'),
(20, 55, 'Salbutamol Spay', 'Galoxina', 1, 160.00, '2023-09-30', 'CGF'),
(24, 52, 'Lubriderm', 'Meycos', 2, 20.00, '2023-09-30', 'CGF'),
(25, 56, 'CONGE', 'MED', 1, 100.00, '2023-09-30', 'CGA'),
(26, 56, 'Lubriderm', 'Meycos', 3, 20.00, '2023-09-30', 'CGF'),
(27, 58, 'CONGE', 'MED', 1, 150.00, '2023-10-01', 'CGA'),
(28, 58, 'Desinfalmante', 'Meycos', 1, 40.00, '2023-10-01', 'CGF'),
(31, 58, 'Tomografia', 'MED', 1, 450.00, '2023-10-04', 'CGL'),
(32, 59, 'CONGE', 'MED', 1, 100.00, '2023-10-04', 'CGA'),
(33, 59, 'Paracetamol', 'Meycos', 2, 20.00, '2023-10-04', 'CGF');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliconsul`
--
ALTER TABLE `cliconsul`
  ADD PRIMARY KEY (`Idcon`);

--
-- Indices de la tabla `cliusers`
--
ALTER TABLE `cliusers`
  ADD PRIMARY KEY (`IDClie`);

--
-- Indices de la tabla `dochour`
--
ALTER TABLE `dochour`
  ADD PRIMARY KEY (`IDH`);

--
-- Indices de la tabla `fusers`
--
ALTER TABLE `fusers`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `labs`
--
ALTER TABLE `labs`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `pacien`
--
ALTER TABLE `pacien`
  ADD PRIMARY KEY (`IDPa`);

--
-- Indices de la tabla `prods`
--
ALTER TABLE `prods`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `venprod`
--
ALTER TABLE `venprod`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliconsul`
--
ALTER TABLE `cliconsul`
  MODIFY `Idcon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `cliusers`
--
ALTER TABLE `cliusers`
  MODIFY `IDClie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `dochour`
--
ALTER TABLE `dochour`
  MODIFY `IDH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `fusers`
--
ALTER TABLE `fusers`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `labs`
--
ALTER TABLE `labs`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pacien`
--
ALTER TABLE `pacien`
  MODIFY `IDPa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `prods`
--
ALTER TABLE `prods`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `venprod`
--
ALTER TABLE `venprod`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
