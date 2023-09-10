-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8080
-- Tiempo de generación: 09-09-2023 a las 10:27:18
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
(11, 6, 'MED', 'Maria De Los Angeles García Del Cid', '2023-08-30', '17:00', 'Nauseas y Mareos', 'Nauseas y Mareos por 3 dias tomo parecetamol', 'Y', 'Y', 'Y', 'NEU', 'Oscar Alexis García Del Cid', 'Laboratorio: Tomografia de Craneo\r\nPlan Terapeutico: Caminata de 30 Minutos, 30 Minutos de Natacion', 'Se Refiere a Neurologia por indicios de espina bifida', 'P'),
(12, 3, 'MED', 'Oscar Alexis García Del Cid', '2023-09-04', '16:00', 'Mareo y Fatiga', 'Mareo y Fatiga', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(13, 6, 'MED', 'Maria De Los Angeles García Del Cid', '2023-09-04', '12:00', 'Mareo y Fatiga', 'Mareo y Fatiga', 'N', 'N', 'Y', 'NEU', 'Oscar Alexis García Del Cid', '1 Inyeccion de Complejo B 2 al día', 'Se refiere a Neurologia por posible desarrme', 'P'),
(14, 3, 'MED', 'Oscar Alexis García Del Cid', '2023-09-04', '13:00', 'Fiebre y Vomito', 'Fiebre y Vomito', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(15, 6, 'MED', 'Maria De Los Angeles García Del Cid', '2023-09-05', '16:00', 'Nauseas y Falta de Sueño', 'Nauseas y Falta de Sueño', 'N', 'N', '', 'GEN', '', NULL, '', 'P'),
(16, 8, 'MED', 'Jose Antonio Gonzalez Gonzalez', '2023-09-05', '16:00', 'Fatiga, Mareo y Migraña', 'Fatiga, Mareo y Migraña', 'Y', 'N', '', 'GEN', '', 'Se solicita Examen de Sangre\r\n\r\n1 inyeccion de Completjo B', '', 'A'),
(17, 8, 'MED', 'Jose Antonio Gonzalez Gonzalez', '2023-09-05', '16:00', 'Mareo y Fatiga y Fiebre', 'Mareo y Fatiga y Fiebre', 'N', 'N', 'Y', 'NEU', 'Oscar Alexis García Del Cid', NULL, 'Se refiere por golpe de craneo', 'P'),
(19, 3, 'MED', 'Oscar Alexis García Del Cid', '2023-09-05', '12:00', 'Dolor de Cabeza y Fiebre', 'Dolor de Cabeza y Fiebre', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(20, 3, 'MED', 'Oscar Alexis García Del Cid', '2023-09-05', '13:00', 'Dolor de Cabeza y Fiebre Aguda', 'Dolor de Cabeza y Fiebre Aguda', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(21, 3, 'MED', 'Oscar Alexis García Del Cid', '2023-09-05', '07:00', 'Dolor de Gargante y Tos', 'Dolor de Gargante y Tos', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(22, 3, 'MED', 'Oscar Alexis García Del Cid', '2023-09-05', '09:00', 'Malestar estomacal', 'Dolor despues de comer tacos al pastor', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(23, 3, 'MED', 'Oscar Alexis García Del Cid', '2023-09-05', '08:00', 'Dolor de cabeza y Vomito', 'Dolor de cabeza y Vomito', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(24, 3, 'MED', 'Oscar Alexis García Del Cid', '2023-09-06', '07:00', 'Dolor de Espalda ', 'Dolor de Espalda Jugando Footbal', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(25, 3, 'MED', 'Oscar Alexis García Del Cid', '2023-09-06', '08:00', 'Sangrado De Ojos', 'Accidente con acido en el trabajo', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(26, 4, 'MED', 'Gabriel Oscar Adrian García Cua', '2023-09-06', '09:00', 'Dermatitis y Hongos en los pies', 'Picason insesante despues de ir a piscinas.', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(27, 3, 'MED', 'Oscar Alexis García Del Cid', '2023-09-08', '14:00', 'Dolor de Cabeza y Nauseas', 'Dolor de Cabeza y Nauseas', 'N', 'N', '', 'GEN', 'Jose Antonio Gonzalez Ramirez', NULL, '', 'G'),
(28, 6, 'MED', 'Maria De Los Angeles García Del Cid', '2023-09-08', '13:00', 'Dolor de Rodillas', 'Dolor de Rodillas', 'Y', 'N', '', 'GEN', '', 'Paracetamol 1 cada 6 horas\r\nLaboratorio: Examen de acido lactico', '', 'A');

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
(14, 4, 'MED', 'Jose Antonio Gonzalez Ramirez', '', '', '', '', '', '', '', ' ', '15:00', '', '', '2023-09-08');

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
  `Fecingre` varchar(255) DEFAULT NULL,
  `Rol` varchar(10) DEFAULT NULL,
  `Dresp` varchar(20) DEFAULT NULL,
  `drestat` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `fusers`
--

INSERT INTO `fusers` (`ID`, `Empcod`, `Nuser`, `User`, `Pass`, `DPI`, `Fecingre`, `Rol`, `Dresp`, `drestat`) VALUES
(2, 'MED', 'Gabriel Adrían García Cua', 'ggarcia', '$2a$08$jnzxTwc9fxd.6aUd933skO6l4acWurpxhG5YsjmeQ.PemHrz5h18u', 212598677901, '2023-07-19', 'DR', 'CAR', ''),
(3, 'MED', 'Oscar Alexis García Del Cid', 'odelcid', '$2a$08$1w3OvW5J.8QoIEfxbpNGkOVzg9wYHDDqMT2XoBF238hgrvCxspIHa', 2125915760101, '2023-08-29', 'DR', 'NEU', ''),
(4, 'MED', 'Jose Antonio Gonzalez Ramirez', 'jgonzalez', '$2a$08$.Dwn5E.6TpHHViuFoJnMUeOrFJwFo/Nf6RbeLcc7xkvYG7Uy7jfKq', 2125916770101, '2023-08-29', 'DR', 'GEN', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacien`
--

CREATE TABLE `pacien` (
  `IDPa` int(11) NOT NULL,
  `Empcod` varchar(10) NOT NULL DEFAULT 'MED',
  `Noclie` varchar(50) DEFAULT NULL,
  `Cliedad` int(11) DEFAULT NULL,
  `Fecna` varchar(100) DEFAULT NULL,
  `Sexo` char(1) DEFAULT NULL,
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

INSERT INTO `pacien` (`IDPa`, `Empcod`, `Noclie`, `Cliedad`, `Fecna`, `Sexo`, `clidia`, `clipre`, `clihipe`, `clitipsa`, `climed`, `cliquiru`, `clitrauma`, `clialerg`, `clihistobst`, `clihabit`, `clistat`, `cliotr`) VALUES
(6, 'MED', 'Maria De Los Angeles García Del Cid', 30, '1993-08-29', 'F', 'N', 'N', 'N', 'O-', 'odelcid', 'Y', 'N', 'N', 'No Aplica', 'N', 'GEN', 'Cirugia De Nariz'),
(7, 'MED', 'Karla Viviana García Del Cid', 28, '1995-04-29', 'F', 'N', 'N', 'N', 'O+', 'odelcid', 'N', 'N', 'Y', 'No Aplica', 'N', 'GEN', 'Paciente Alergico a la Penicilina'),
(8, 'MED', 'Jose Antonio Gonzalez Gonzalez', 34, '2023-09-05', 'M', 'N', 'N', 'N', 'O+', 'odelcid', 'Y', 'N', 'Y', 'No aplica', 'N', 'GEN', 'Cirugias: Apendice\r\nAlergias: Penisina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prods`
--

CREATE TABLE `prods` (
  `ID` bigint(20) NOT NULL,
  `Noprod` varchar(100) DEFAULT NULL,
  `Casprod` varchar(100) DEFAULT NULL,
  `Resprod` char(5) DEFAULT NULL,
  `Preprod` decimal(10,0) DEFAULT NULL,
  `Unidisp` int(11) DEFAULT NULL,
  `Improd` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `prods`
--

INSERT INTO `prods` (`ID`, `Noprod`, `Casprod`, `Resprod`, `Preprod`, `Unidisp`, `Improd`) VALUES
(1, 'Salbutamol', 'Galoxona', 'N', '60', 20, 'NO'),
(2, 'Lubriderm', 'Meycos', 'N', '20', 100, 'Image (4).jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venprod`
--

CREATE TABLE `venprod` (
  `ID` bigint(20) NOT NULL,
  `Clnomb` varchar(100) DEFAULT NULL,
  `Nit` varchar(50) DEFAULT NULL,
  `Prod` varchar(100) DEFAULT NULL,
  `Casprod` varchar(100) DEFAULT NULL,
  `Cantprod` int(11) DEFAULT NULL,
  `Preprod` decimal(10,0) DEFAULT NULL,
  `Stcompr` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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
  MODIFY `Idcon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `cliusers`
--
ALTER TABLE `cliusers`
  MODIFY `IDClie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `dochour`
--
ALTER TABLE `dochour`
  MODIFY `IDH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `fusers`
--
ALTER TABLE `fusers`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pacien`
--
ALTER TABLE `pacien`
  MODIFY `IDPa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `prods`
--
ALTER TABLE `prods`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `venprod`
--
ALTER TABLE `venprod`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
