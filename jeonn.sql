-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 18-11-2026 a las 17:37:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jeonn`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `simulacro`
--

CREATE TABLE `simulacro` (
  `id_simu` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `simulacro` varchar(20) NOT NULL,
  `resultado` int(11) NOT NULL,
  `intento` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `total` int(11) NOT NULL DEFAULT 50
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `simulacro`
--

INSERT INTO `simulacro` (`id_simu`, `usuario_id`, `simulacro`, `resultado`, `intento`, `fecha`, `total`) VALUES
(5, 4, 'general_2', 2, 1, '2026-11-02 19:13:34', 70),
(7, 4, 'general_1', 1, 1, '2026-11-02 23:39:43', 50),
(8, 4, 'general_1', 3, 2, '2026-11-02 23:41:38', 50),
(9, 4, 'general_1', 1, 3, '2026-11-02 23:42:05', 50),
(10, 4, 'general_2', 0, 2, '2026-11-02 23:52:30', 70),
(11, 4, 'general_2', 1, 3, '2026-11-02 23:53:38', 70),
(12, 5, 'general_1', 1, 1, '2026-11-03 01:06:25', 50),
(13, 5, 'general_1', 0, 2, '2026-11-03 15:24:54', 50),
(15, 4, 'general_1', 41, 4, '2026-11-03 22:04:15', 50),
(17, 4, 'general_1', 0, 5, '2026-11-04 13:35:08', 50),
(18, 4, 'general_1', 0, 6, '2026-11-04 14:19:54', 50),
(19, 7, 'general_1', 1, 1, '2026-11-04 21:41:40', 50),
(20, 7, 'general_1', 0, 2, '2026-11-05 22:38:00', 50),
(21, 4, 'general_1', 1, 7, '2026-11-06 18:58:48', 50),
(22, 4, 'general_1', 0, 8, '2026-11-09 13:53:03', 50),
(23, 4, 'general_1', 6, 9, '2026-11-09 14:02:45', 50),
(24, 4, 'general_1', 0, 10, '2026-11-09 16:47:54', 50),
(25, 4, 'general_1', 0, 11, '2026-11-10 20:52:04', 70),
(26, 4, 'general_1', 0, 12, '2026-11-10 20:52:18', 70),
(27, 4, 'general_1', 0, 13, '2026-11-10 20:52:30', 70),
(28, 4, 'general_1', 1, 14, '2026-11-10 20:52:41', 70),
(29, 4, 'general_1', 2, 15, '2026-11-11 03:34:10', 70),
(30, 4, 'general_1', 0, 16, '2026-11-11 13:58:58', 50),
(31, 4, 'general_1', 2, 17, '2026-11-11 13:59:29', 50),
(32, 4, 'general_1', 1, 18, '2026-11-11 13:59:47', 70),
(33, 10, 'general_1', 2, 1, '2026-11-11 19:23:27', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temas`
--

CREATE TABLE `temas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(150) NOT NULL,
  `modulo` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `archivo` varchar(100) DEFAULT NULL,
  `archivo_nombre` varchar(200) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `temas`
--

INSERT INTO `temas` (`id`, `titulo`, `modulo`, `descripcion`, `archivo`, `archivo_nombre`, `fecha`) VALUES
(2, 'jj', 'Matemáticas', 'prueba', '99361e3922b555b8.pdf', 'TXT.pdf', '2026-11-09 15:31:38'),
(3, 'jj', 'Lectura Crítica', 'prueba', '5a04081400f1d377.pdf', 'TXT.pdf', '2026-11-11 14:03:27'),
(8, 'porcentaje', 'Matemáticas', 'regla de tres', '893086420e6878ad.pdf', 'Jeonn_EXPLICADAS_MATEMATICAS.pdf', '2026-11-11 19:25:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_Usuarios` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(150) NOT NULL,
  `pass` varchar(30) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `rol` varchar(10) NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_Usuarios`, `name`, `email`, `pass`, `activo`, `rol`) VALUES
(4, 'Santiago', 'sanfortans@gmail.com', '0987654321', 1, 'usuario'),
(5, 'rafita', 'enanito@gmail.com', '1234', 0, 'usuario'),
(7, 'Cristina Monsalve', 'ieca.cristinamonsalve@gmail.com', '98765432', 0, 'usuario'),
(9, 'Tomas', 'ieca.tomasvergara@gmail.com', '1045110281', 1, 'admin'),
(10, 'manuela alvarez', 'manuelaalvarez2310@gmail.com', '1234567898', 1, 'usuario'),
(11, 'luci', 'luci@gmail.com', '12345678', 1, 'usuario'),
(12, 'ADMIN', 'admin@gmail.com', '123456789asd', 1, 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `simulacro`
--
ALTER TABLE `simulacro`
  ADD PRIMARY KEY (`id_simu`);

--
-- Indices de la tabla `temas`
--
ALTER TABLE `temas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_Usuarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `simulacro`
--
ALTER TABLE `simulacro`
  MODIFY `id_simu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `temas`
--
ALTER TABLE `temas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_Usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
