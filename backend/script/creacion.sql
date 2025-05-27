USE Restaurante;
GO


CREATE TABLE Rol (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL UNIQUE,    
);
GO



CREATE TABLE Estado (
    id INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(100) NOT NULL UNIQUE,
    
);
GO

CREATE TABLE Usuario (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombreUsuario VARCHAR(50) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    tipoUsuario VARCHAR(20) NOT NULL CHECK (tipoUsuario IN ('cliente', 'empleado', 'administrador')),
    idRol INT NOT NULL,
	idEstado INT NOT NULL,
    
    
    FOREIGN KEY (idRol) REFERENCES Rol(id),		
		 
	FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);
GO

CREATE TABLE ClienteWeb (
    idUsuario INT NOT NULL PRIMARY KEY ,
    puntosFidelidad INT NOT NULL DEFAULT 0,
    direccion VARCHAR(200),
    
    
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id) 
		 
		 
);
GO

CREATE TABLE Empleado (
    idUsuario INT NOT NULL PRIMARY KEY ,
    ci VARCHAR(20) NOT NULL UNIQUE,
    
    
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id) 
		 
		 
);
GO

CREATE TABLE Horario (
    id INT PRIMARY KEY IDENTITY(1,1),
    horaInicio TIME(0) NOT NULL,
    horaFin TIME(0) NOT NULL,
);
GO


CREATE TABLE TipoPedido (
    id INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(100) NOT NULL UNIQUE,
);
GO

CREATE TABLE Mesa(
	id INT PRIMARY KEY IDENTITY(1,1),
	nro TINYINT NOT NULL,
	capacidad TINYINT NOT NULL,
	idEstado INT NOT NULL
	FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);
GO

CREATE TABLE Categoria (
    id INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(100) NOT NULL UNIQUE,
    idCategoria INT,
    
    FOREIGN KEY (idCategoria) REFERENCES Categoria(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);
GO

CREATE TABLE UnidadMedida (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(50) NOT NULL UNIQUE,
    abreviatura VARCHAR(10) NOT NULL UNIQUE     
);
GO

CREATE TABLE Stock (
    id INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(100) NOT NULL,
    stockActual FLOAT NOT NULL DEFAULT 0,
    stockMinimo FLOAT NOT NULL DEFAULT 0,
    
);
GO

CREATE TABLE Ingrediente (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL UNIQUE,
    idUnidadMedida INT NOT NULL,
    idStock INT NOT NULL,
    idEstado INT NOT NULL,
    
    
    FOREIGN KEY (idUnidadMedida) REFERENCES UnidadMedida(id),	
		 
    FOREIGN KEY (idStock) REFERENCES Stock(id),	
		 
		 
    FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);
GO

CREATE TABLE Producto (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL UNIQUE,
    precio DECIMAL(10,2) NOT NULL,
    descripcion VARCHAR(MAX),
	tiempoPreparacion TIME(0),
    idCategoria INT NOT NULL,
    idStock INT, 
	idEstado INT NOT NULL,
    
    
    FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
    FOREIGN KEY (idCategoria) REFERENCES Categoria(id),	
	FOREIGN KEY (idStock) REFERENCES Stock(id)
		 
		 
);
GO

CREATE TABLE Descuento (
    id INT PRIMARY KEY IDENTITY(1,1),
    descuento DECIMAL(5,2) NOT NULL,
    costoFidelidad INT
);
GO

CREATE TABLE Reserva (
    id INT PRIMARY KEY IDENTITY(1,1),
    fecha DATE NOT NULL,
    hora TIME(0) NOT NULL,

	idClienteWeb INT ,
    idEstado INT NOT NULL,
       
    FOREIGN KEY (idClienteWeb) REFERENCES Usuario(id),	
		 		 
    FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);
GO

CREATE TABLE Pedido (
    id INT PRIMARY KEY IDENTITY(1,1),
	fecha DATE NOT NULL,
	hora TIME(0) NOT NULL,
    idClienteWeb INT ,
    idEstado INT NOT NULL,
    idEmpleado INT, 
	CHECK(idEmpleado != idClienteWeb) ,
    idTipoPedido INT NOT NULL,
    idDescuento INT,
	idReserva INT,
    
    FOREIGN KEY (idClienteWeb) REFERENCES ClienteWeb(idUsuario),				
		 
    FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
    FOREIGN KEY (idEmpleado) REFERENCES Empleado(idUsuario),		
    FOREIGN KEY (idTipoPedido) REFERENCES TipoPedido(id),
	FOREIGN KEY (idReserva) REFERENCES Reserva(id),		 
	FOREIGN KEY (idDescuento) REFERENCES Descuento(id)	
);
GO

CREATE TABLE EmpresaDelivery (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL ,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    idEstado INT NOT NULL,
    
    
    FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION

);
GO

CREATE TABLE MetodoPago (
    id INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(100) NOT NULL UNIQUE
);
GO



CREATE TABLE Ticket (
    id INT PRIMARY KEY IDENTITY(1,1),
    nro VARCHAR(50) NOT NULL ,
	fecha DATE DEFAULT CONVERT(DATE, GETDATE()),  -- Solo la fecha actual
    hora TIME(0) DEFAULT CONVERT(TIME, GETDATE()),   -- Solo la hora actual
    monto DECIMAL(10,2) NOT NULL,
    idPedido INT NOT NULL,
    idEstado INT NOT NULL,
	idMetodoPago INT ,
	idEmpleado INT ,
    
    
    FOREIGN KEY (idPedido) REFERENCES Pedido(id),	
		 
		 
    FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	
	FOREIGN KEY (idMetodoPago) REFERENCES MetodoPago(id),

	FOREIGN KEY (idEmpleado) REFERENCES Empleado(idUsuario)
);
GO



CREATE TABLE Permisos (
    id INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(100) NOT NULL ,
);
GO

CREATE TABLE Tarjeta (
    id INT PRIMARY KEY IDENTITY(1,1),
	titular VARCHAR(100),
    nroTarjeta VARCHAR(50) NOT NULL,
    fechaVenc DATE NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('credito', 'debito')),
    createdAt DATETIME2 DEFAULT GETDATE()
);
GO

CREATE TABLE Proveedor (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(100),
    direccion VARCHAR(200) NOT NULL,
    idEstado INT NOT NULL,
    
    
    FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);
GO

CREATE TABLE Compra (
    id INT PRIMARY KEY IDENTITY(1,1),
	fecha DATE not NULL,
    idproveedor INT NOT NULL,
    idUsuario INT NOT NULL,
    
    
    FOREIGN KEY (idproveedor) REFERENCES proveedor(id),		
		 
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id)		
		 
);
GO

CREATE TABLE Receta (
    idProducto INT NOT NULL,
    idIngrediente INT NOT NULL,
    cantidad FLOAT NOT NULL,
    PRIMARY KEY (idProducto, idIngrediente),
    FOREIGN KEY (idProducto) REFERENCES Producto(id) ,
		 
		 
    FOREIGN KEY (idIngrediente) REFERENCES Ingrediente(id)		
		 
);
GO

CREATE TABLE DetalleDescuento (
    idDescuento INT NOT NULL,
    idUsuario INT NOT NULL,
    codigo VARCHAR(50) NOT NULL,
    idEstado INT NOT NULL,
    
    PRIMARY KEY (idDescuento, idUsuario),
    FOREIGN KEY (idDescuento) REFERENCES Descuento(id),		
		 
    FOREIGN KEY (idUsuario) REFERENCES ClienteWeb(idUsuario),
		 
		 
    FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);
GO

CREATE TABLE DetallePermiso (
    idRol INT NOT NULL,
    idPermisos INT NOT NULL,
    PRIMARY KEY (idRol, idPermisos),
    FOREIGN KEY (idRol) REFERENCES Rol(id), 		
		 
    FOREIGN KEY (idPermisos) REFERENCES Permisos(id) 		
		 
);
GO

CREATE TABLE DetalleTarjeta (
    idTarjeta INT NOT NULL,
    idCliente INT NOT NULL,
    
    PRIMARY KEY (idTarjeta, idCliente),
    FOREIGN KEY (idTarjeta) REFERENCES Tarjeta(id) ,		 
    FOREIGN KEY (idCliente) REFERENCES ClienteWeb(idUsuario)
		 
		 
);
GO

CREATE TABLE MesasReserva (
    idReserva INT NOT NULL,
    idMesa INT NOT NULL,
    PRIMARY KEY (idReserva, idMesa),
    FOREIGN KEY (idReserva) REFERENCES Reserva(id), 
		 		 
    FOREIGN KEY (idMesa) REFERENCES Mesa(id)		
		 
);
GO

CREATE TABLE MesasPedido (
    idPedido INT NOT NULL,
    idMesa INT NOT NULL,
    PRIMARY KEY (idPedido, idMesa),
    FOREIGN KEY (idPedido) REFERENCES Pedido(id), 
		 		 
    FOREIGN KEY (idMesa) REFERENCES Mesa(id)		
		 
);
GO

CREATE TABLE Menu (
	id INT PRIMARY KEY IDENTITY(1,1),
	dia VARCHAR(20) NOT NULL CHECK (dia IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')),
	idEstado INT NOT NULL,
	FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);
GO



CREATE TABLE DetalleMenu (
    idMenu INT NOT NULL,
    idProducto INT NOT NULL,
    PRIMARY KEY (idMenu, idProducto),
    FOREIGN KEY (idMenu) REFERENCES Menu(id), 
		 		 
    FOREIGN KEY (idProducto) REFERENCES Producto(id)		
		 
);
GO


CREATE TABLE DetalleHorario (
	id INT IDENTITY(1,1),
    idEmpleado INT NOT NULL,
    idHorario INT NOT NULL,
    dia VARCHAR(20) NOT NULL CHECK (dia IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')),
	idEstado INT NOT NULL,
    PRIMARY KEY (id,idEmpleado, idHorario),
    FOREIGN KEY (idEmpleado) REFERENCES Empleado(idUsuario),		
		 
    FOREIGN KEY (idHorario) REFERENCES Horario(id),
	FOREIGN KEY (idEstado) REFERENCES Estado(id)	 
		 
);
GO

CREATE TABLE DetallePedido (
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad SMALLINT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (idPedido, idProducto),
    FOREIGN KEY (idPedido) REFERENCES Pedido(id), 
		 
		 
    FOREIGN KEY (idProducto) REFERENCES Producto(id)		
		 
);
GO

CREATE TABLE ExclusionIngrediente (
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    idIngrediente INT NOT NULL,

    PRIMARY KEY (idPedido, idProducto, idIngrediente),
    FOREIGN KEY (idPedido, idProducto) REFERENCES DetallePedido(idPedido, idProducto), 	
		 
		 
    FOREIGN KEY (idIngrediente) REFERENCES Ingrediente(id)	
		 
);
GO

CREATE TABLE Ofrece (
    idIngrediente INT NOT NULL,
    idProveedor INT NOT NULL,
    precioEstimado FLOAT NOT NULL,
    PRIMARY KEY (idIngrediente, idProveedor),
    FOREIGN KEY (idIngrediente) REFERENCES Ingrediente(id),
		 
    FOREIGN KEY (idProveedor) REFERENCES proveedor(id) 	
		 
		 
);
GO

CREATE TABLE OfreceBebida (
	idProducto INT NOT NULL,
    idProveedor INT NOT NULL,
    precioEstimado FLOAT NOT NULL,
    PRIMARY KEY (idProducto, idProveedor),
    FOREIGN KEY (idProducto) REFERENCES Producto(id),
		 
    FOREIGN KEY (idProveedor) REFERENCES proveedor(id) 	
		 
		 
);
GO

CREATE TABLE DetalleCompraBebida (
    idCompra INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad FLOAT NOT NULL,
    precio FLOAT NOT NULL,
    PRIMARY KEY (idCompra, idProducto),
    FOREIGN KEY (idCompra) REFERENCES Compra(id),
		 
		 
    FOREIGN KEY (idProducto) REFERENCES Producto(id)
		 
);
GO

CREATE TABLE DetalleCompra (
    idCompra INT NOT NULL,
    idIngrediente INT NOT NULL,
    cantidad FLOAT NOT NULL,
    precio FLOAT NOT NULL,
    PRIMARY KEY (idCompra, idIngrediente),
    FOREIGN KEY (idCompra) REFERENCES Compra(id),
		 
		 
    FOREIGN KEY (idIngrediente) REFERENCES Ingrediente(id)
		 
);
GO

CREATE TABLE Envio (
    id INT PRIMARY KEY IDENTITY(1,1),
    ubicacion VARCHAR(255) NOT NULL,
    idEmpresaDelivery INT NOT NULL,
    idPedido INT NOT NULL,
    idEstado INT NOT NULL,
    
    
    FOREIGN KEY (idEmpresaDelivery) REFERENCES EmpresaDelivery(id),		
		 
    FOREIGN KEY (idPedido) REFERENCES Pedido(id),
		 
		 
    FOREIGN KEY (idEstado) REFERENCES Estado(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
);
GO

INSERT INTO Rol (nombre) VALUES
	('Administrador'),
	('Cocinero'),
	('Mesero'),
	('Cliente'),
	('Cajero');
GO

INSERT INTO Estado (descripcion) VALUES
--CODIGO DESCUENTO
	('Canjeado'), 
	('Sin Canjear'),
--ESTADO DE LOS USUARIOS
	('Activo'),
	('Suspendido'),
	('Despedido'),
--ESTADO DE LOS PEDIDOS
	('Cancelado'),
	('Completado'),
--ESTADO DEL TICKET
	('Pagado'),
	('Sin Pagar'),
--ESTADO DE LOS ENVIOS,PEDIDO
	('Pendiente'),
	('Enviado'),
--ESTADO DE LAS MESAS
	('Disponible'),
	('No disponible');
GO

INSERT INTO Usuario (nombreUsuario, nombre, password, correo, telefono, tipoUsuario, idRol, idEstado) 
VALUES 
--USUARIOS ACTIVOS
('carlos789', 'Carlos Gómez', 'admin', 'carlos@gmail.com', '78679856', 'administrador', 1, 3),
('ana', 'Ana López', 'ana123', 'ana@gmail.com', '65465713', 'empleado', 2, 3),
('rodrigo321', 'Rodrigo Suárez', 'rodrigo123', 'rodrigo@gmail.com', '71829384', 'empleado', 3, 3),
('juan123', 'Juan Pérez', 'juanperez', 'juan@gmail.com', '74565345', 'cliente', 4, 3),
('marta321', 'Marta Silva', 'martasilva', 'marta@gmail.com', '76329812', 'cliente', 4, 3),
--USUARIOS SUSPENDIDOS
('roberto654', 'Roberto Sánchez', 'robertosanchez', 'roberto@gmail.com', '75483920', 'cliente', 4, 4),
--USUARIOS DESPEDIDOS
('lucia321', 'Lucia Mamani', 'lucia123', 'lucia@gmail.com', '79812346', 'empleado', 3, 5),
--CAJERO
('mario321', 'Mario Lopez', 'mario123', 'mario@gmail.com', '73452343', 'empleado', 5, 3);
GO



INSERT INTO ClienteWeb (idUsuario, puntosFidelidad, direccion) 
VALUES 
(4, 150, 'Av. Cristo Redentor #1450, Barrio Equipetrol Norte'),
(5, 200, 'Calle Ñuflo de Chávez #232, Zona Centro'),
(6, 250, 'Calle Aroma #342, Zona Mercado Mutualista');--Suspendido
GO

INSERT INTO Empleado (idUsuario, ci) 
VALUES 
(2, '8545677'),--Cocinero
(3, '8374561'),--Mesero
(7, '7465987'),--Despedido
(8, '8459433');--Cajero
GO



INSERT INTO Horario (horaInicio, horaFin) 
VALUES 
('07:00:00', '15:00:00'),
('15:00:00', '23:00:00');
GO


INSERT INTO TipoPedido (descripcion) 
VALUES 
('Delivery'),
('Presencial');
GO


INSERT INTO Mesa (nro, capacidad, idEstado) 
VALUES 
(1, 8, 12),
(2, 8, 12),
(3, 4, 12),
(4, 4, 12),
(5, 4, 12),
(6, 6, 12);
GO

INSERT INTO Categoria (descripcion, idCategoria) 
VALUES 
('Bebidas', NULL),
('Platos', NULL),
('Postres', NULL),
--TIPO BEBIDAS
('Bebidas Alcohólicas', 1),
('Gaseosas',1),
('Refrescos', 1),
--TIPO PLATOS
('CHANCHO', 2),
('VACA', 2),
('POLLO', 2),
('MIXTO', 2);
GO




INSERT INTO UnidadMedida (nombre, abreviatura) 
VALUES 
('Unidad', 'u'),
('Gramo', 'g'),
('Kilogramo', 'kg'),
('Litro', 'L'),
('Mililitro', 'mL');
GO


INSERT INTO Stock (descripcion, stockActual, stockMinimo) 
VALUES 
-- Carnes
('Carne de chancho', 20, 5),       -- kg
('Carne de res', 30, 2),          -- kg
('Pollo', 25, 3),                  -- kg

-- Verduras
('Papa', 100, 20),                 -- kg
('Cebolla', 60, 15),               -- kg
('Tomate', 50, 10),                -- kg
('Ajo', 40, 10),                   -- kg
('Locoto', 30, 5),                 -- kg
('Zanahoria', 40, 10),             -- kg
('Arveja', 20, 5),                 -- kg

-- Condimentos (pequeñas raciones)
('Sal', 1000, 50),                 -- g
('Comino', 500, 20),               -- g
('Pimienta', 300, 10),             -- g
('Orégano', 200, 10),              -- g
('Ají colorado', 300, 20),         -- g
('Aceite', 15, 3),                 -- L

-- Otros
('Arroz', 80, 20),                 -- kg
('Yuca', 50, 10),                  -- kg
('Chuño', 30, 5),                 -- kg

-- Bebidas alcohólicas
('Cerveza', 20, 5),                -- unidades
('Vino tinto', 21, 5),             -- unidades
('Singani', 22, 5),                -- unidades
('Ron', 23, 5),                    -- unidades
('Sidra', 24, 5),                  -- unidades

-- Gaseosas
('Coca-Cola 3ltrs', 25, 5),         -- unidades
('Coca-Cola 2ltrs', 26, 5),         -- unidades
('Pepsi 3ltrs', 27, 5),            -- unidades
('Fanta 2ltrs', 28, 5),            -- unidades
('Sprite 2ltrs', 29, 5),           -- unidades

-- Refrescos
('Jugo de naranja', 30, 5),        -- unidades
('Jugo de tamarindo', 31, 5),      -- unidades
('Refresco de limón', 32, 5),      -- unidades
('Refresco de lima', 33, 5);       -- unidades
GO

INSERT INTO Ingrediente (nombre, idUnidadMedida, idStock, idEstado) 
VALUES 
-- Carnes
('Carne de chancho',3, 1, 12),       -- kg
('Carne de res',3, 2, 12),          -- kg
('Pollo',3, 3, 12),                  -- kg

-- Verduras
('Papa',3, 4, 12),                 -- kg
('Cebolla',3, 5, 12),               -- kg
('Tomate',3, 6, 12),                -- kg
('Ajo',3, 7, 12),                   -- kg
('Locoto',3, 8, 12),                 -- kg
('Zanahoria',3, 9, 12),             -- kg
('Arveja',3, 10, 12),                 -- kg

-- Condimentos (pequeñas raciones)
('Sal',2, 11, 12),                 -- g
('Comino',2, 12, 12),               -- g
('Pimienta',2, 13, 12),             -- g
('Orégano', 2,14, 12),              -- g
('Ají colorado',2, 15, 12),         -- g
('Aceite', 4,16, 12),                 -- L

-- Otros
('Arroz', 3,17, 12),                 -- kg
('Yuca',3, 18, 12),                  -- kg
('Chuño', 3,19, 12);                  -- kg
GO

INSERT INTO Producto (nombre, precio, descripcion, tiempoPreparacion, idCategoria,idStock, idEstado) 
VALUES 
-- POSTRES
('Crema asada', 5, 'Postre tradicional de leche y huevo', '00:20', 3,NULL,3),
('Carlota', 6, 'Postre frío a base de galletas y crema', '00:30', 3,NULL,3),
('Budín', 6, 'Budín de pan con frutas', '00:25', 3,NULL,3),

-- BEBIDAS ALCOHÓLICAS
('Cerveza', 4, 'Bebida alcohólica de malta', '00:00', 4,20,3),
('Vino tinto', 15, 'Vino de uvas fermentadas', '00:00', 4,21,3),
('Singani', 13, 'Licor destilado de uvas', '00:00', 4,22,3),
('Ron', 15, 'Licor destilado a base de caña de azúcar', '00:00', 4,23,3),
('Sidra', 15, 'Bebida alcohólica a base de manzana', '00:00', 4,24,3),

-- GASEOSAS
('Coca-Cola 3ltrs',16, 'Refresco de cola', '00:00', 5,25,3),
('Coca-Cola 2ltrs', 12, 'Refresco de cola', '00:00', 5,26,3),
('Pepsi 3ltrs', 14, 'Refresco de cola', '00:00', 5,27,3),
('Fanta 2ltrs', 11, 'Refresco de naranja', '00:00', 5,28,3),
('Sprite 2ltrs', 12, 'Refresco de lima-limón', '00:00', 5,29,3),

-- REFRESCOS
('Jugo de naranja', 10, 'Jugo natural de naranja', '00:05', 6,30,3),
('Jugo de tamarindo', 10, 'Jugo natural de tamarindo', '00:05', 6,31,3),
('Refresco de limón', 10, 'Bebida refrescante de limón', '00:00', 6,32,3),
('Refresco de lima', 10, 'Bebida refrescante de lima', '00:00', 6,33,3),

-- CHANCHO
('Chancho al horno', 30, 'Carne de cerdo al horno con condimentos', '01:30', 7,NULL,3),

-- VACA
('Keperi', 30, 'Carne de res guisada con vegetales', '01:00', 8,NULL,3),
('Pollerita', 30, 'Carne de res estofada con arroz', '01:15', 8,NULL,3),
('Bife Chorizo', 35, 'Corte de carne de res a la parrilla', '00:30', 8,NULL,3),

-- POLLO
('Picante de pollo', 20, 'Guiso picante de pollo con vegetales', '00:45', 9,NULL,3),
('Pollo a la parrilla', 25, 'Pollo a la parrilla con salsa picante', '00:40', 9,NULL,3),

-- MIXTO
('Picante Mixto', 40, 'Combinación de carne de res, cerdo y pollo picante', '01:00', 10,NULL,3);
GO

INSERT INTO Descuento (descuento, costoFidelidad) 
VALUES 
(0.05, 100),
(0.10, 200);
GO

INSERT INTO Reserva (fecha, hora,  idClienteWeb, idEstado) 
VALUES 
('2025-04-07', '20:00', 4, 7),
('2025-04-07', '21:00', 2, 6);
GO

INSERT INTO Pedido (fecha, hora,  idClienteWeb, idEstado, idEmpleado, idTipoPedido,idDescuento,idReserva) 
VALUES 
('2025-04-08', '13:00',  NULL,  7, 2, 2,NULL,NULL),--pedido que tomó empleado
('2025-04-08', '12:30',  NULL,  7, 3, 2,1,NULL),--pedido que tomó empleado

('2025-04-07', '20:00',  6, 7, NULL, 2,NULL,1),--pedido a partir de reserva completada
--('2025-04-08', '15:00',  5,NULL, 6, NULL, 2,NULL,2),--pedido a partir de reserva cancelada

('2025-04-08', '16:00',  4, 7, NULL, 1,2,NULL),--pedido por envio
('2025-04-08', '17:00',  5, 6, NULL, 1,NULL,NULL);--pedido por envio cancelado
GO


INSERT INTO EmpresaDelivery (nombre, telefono, correo, idEstado) 
VALUES 
('Pedidos Ya', '78675423', 'contacto@pedidosya.com', 3),
('Yango', '68794565', 'contacto@yango.com', 4);
GO


INSERT INTO MetodoPago (descripcion) 
VALUES 
('Tarjeta de Crédito'),
('Tarjeta de Débito'),
('Efectivo');
GO

INSERT INTO Ticket (nro, fecha, hora, monto, idPedido, idEstado,idMetodoPago,idEmpleado) 
VALUES 
('TCK0001', '2025-04-08', '13:20', 106, 1, 8,3,8),
('TCK0002', '2025-04-08', '13:15', 68.4, 2, 8,3,8),
('TCK0003', '2025-04-08', '14:30', 111, 3, 8,2,8),
('TCK0004', '2025-04-08', '16:00', 97.2, 4, 8,1,NULL),
('TCK0005', '2025-04-08', '17:00', 62, 5, 9,NULL,NULL); 
GO


INSERT INTO Permisos (descripcion) 
VALUES 
('Visualizar pedidos'),
('Realizar pedidos'),
('Administrar usuarios');
GO



INSERT INTO Tarjeta (titular, nroTarjeta, fechaVenc, tipo) 
VALUES 
('Juan Pérez', '1234567890123456', '2026-12-01', 'credito'),
('Marta Silva', '4567890123456789', '2025-05-30', 'debito');

GO


-- Proveedor de bebidas
INSERT INTO Proveedor (nombre, telefono, correo, direccion, idEstado)
VALUES ('Bebidas Tropicales SRL', '755123456', 'contacto@tropicales.com', 'Av. Banzer, Zona Norte, Santa Cruz', 3);
GO

-- Proveedor de ingredientes 1
INSERT INTO Proveedor (nombre, telefono, correo, direccion, idEstado)
VALUES ('Ingredientes del Oriente', '756987321', 'ventas@ingredoriente.com', 'Calle Aroma #123, Santa Cruz', 3);
GO

-- Proveedor de ingredientes 2
INSERT INTO Proveedor (nombre, telefono, correo, direccion, idEstado)
VALUES ('Sabores Naturales Bolivia', '753456789', 'info@saboresbo.com', 'Av. Roca y Coronado, Santa Cruz', 4);

GO


INSERT INTO Compra (fecha, idproveedor, idUsuario) 
VALUES 
('2025-04-07', 1, 1),
('2025-04-07', 2, 1),
('2025-04-07', 3, 1),
('2025-04-07', 2, 1);
GO



INSERT INTO Receta (idProducto, idIngrediente, cantidad) 
VALUES 
-- POSTRES
-- Crema asada
(1, 3, 0.1),   -- Carne de chancho
(1, 4, 0.1),   -- Papa
(1, 6, 0.05),  -- Tomate
(1, 10, 0.01), -- Arveja
(1, 11, 0.02), -- Sal
(1, 16, 0.05), -- Aceite

-- Carlota
(2, 3, 0.15),  -- Carne de chancho
(2, 5, 0.1),   -- Cebolla
(2, 6, 0.1),   -- Tomate
(2, 7, 0.05),  -- Ajo
(2, 11, 0.01), -- Sal

-- Budín
(3, 5, 0.2),   -- Cebolla
(3, 7, 0.05),  -- Ajo
(3, 9, 0.1),   -- Zanahoria
(3, 12, 0.02), -- Comino
(3, 16, 0.05), -- Aceite

-- CHANCHO
-- Chancho al horno
(18, 1, 1),     -- Carne de chancho
(18, 4, 0.5),   -- Papa
(18, 5, 0.2),   -- Cebolla
(18, 6, 0.2),   -- Tomate
(18, 7, 0.05),  -- Ajo
(18, 11, 0.02), -- Sal
(18, 13, 0.03), -- Pimienta

-- VACA
-- Keperi
(19, 2, 1),     -- Carne de res
(19, 5, 0.1),   -- Cebolla
(19, 6, 0.1),   -- Tomate
(19, 8, 0.1),   -- Locoto
(19, 11, 0.02), -- Sal
(19, 12, 0.01), -- Comino

-- Pollerita
(20, 2, 1),     -- Carne de res
(20, 5, 0.1),   -- Cebolla
(20, 6, 0.1),   -- Tomate
(20, 9, 0.2),   -- Zanahoria
(20, 12, 0.02), -- Comino
(20, 11, 0.03), -- Sal

-- Bife Chorizo
(21, 2, 1),     -- Carne de res
(21, 5, 0.1),   -- Cebolla
(21, 9, 0.1),   -- Zanahoria
(21, 11, 0.02), -- Sal
(21, 16, 0.05), -- Aceite

-- POLLO
-- Picante de pollo
(22, 3, 1),     -- Pollo
(22, 5, 0.1),   -- Cebolla
(22, 6, 0.1),   -- Tomate
(22, 7, 0.05),  -- Ajo
(22, 8, 0.05),  -- Locoto
(22, 9, 0.1),   -- Zanahoria
(22, 11, 0.02), -- Sal
(22, 13, 0.02), -- Pimienta

-- Pollo a la parrilla
(23, 3, 1),     -- Pollo
(23, 5, 0.1),   -- Cebolla
(23, 6, 0.1),   -- Tomate
(23, 7, 0.05),  -- Ajo
(23, 11, 0.02), -- Sal
(23, 13, 0.02), -- Pimienta

-- MIXTO
-- Picante Mixto
(24, 1, 0.3),   -- Carne de chancho
(24, 2, 0.3),   -- Carne de res
(24, 3, 0.3),   -- Pollo
(24, 5, 0.1),   -- Cebolla
(24, 6, 0.1),   -- Tomate
(24, 7, 0.05),  -- Ajo
(24, 8, 0.05),  -- Locoto
(24, 9, 0.1),   -- Zanahoria
(24, 11, 0.03), -- Sal
(24, 13, 0.02); -- Pimienta
GO

INSERT INTO DetalleDescuento (idDescuento, idUsuario, codigo, idEstado) 
VALUES 

(2, 4, 'DESC0001', 1),
(1, 6, 'DESC0002', 1),
(1, 5, 'DESC0003', 2);
GO


--------------------------------------------------------------------------------------------------------------- DETALLE PERMISO


INSERT INTO DetallePermiso (idRol, idPermisos) 
VALUES 
(1, 3),
(2, 1),
(3, 2),
(4, 2);
GO

----------------------------------------------------------------------------------------------------


INSERT INTO DetalleTarjeta (idTarjeta, idCliente) 
VALUES 
(1, 4),
(2, 5);
GO

INSERT INTO MesasPedido(idPedido, idMesa) 
VALUES 
(1, 1),
(2, 4),
(3, 2),
(3, 3);
GO

INSERT INTO MesasReserva (idReserva, idMesa) 
VALUES 
(1, 2),
(1, 3),
(2, 1);
GO


INSERT INTO MENU (dia,idEstado)
VALUES
('Lunes',3), --activo isEstado -> 3
('Martes',3),
('Miércoles',3),
('Jueves',3),
('Viernes',3),
('Sábado',3),
('Domingo',3),
('Lunes',4);  -- Suspendido
GO

--------------------------------------------------------------------------------------------------------------------------------------------------

INSERT INTO DetalleMenu(idMenu,idProducto)
VALUES 
-- LUNES
(1, 18), -- Chancho al horno
(1, 19), -- Keperi
(1, 20), -- Pollerita
(1, 1),  -- Crema asada

-- MARTES
(2, 21), -- Bife Chorizo
(2, 22), -- Picante de pollo
(2, 23), -- Pollo a la parrilla
(2, 2),  -- Carlota

-- MIÉRCOLES
(3, 19), -- Keperi
(3, 24), -- Picante Mixto
(3, 20), -- Pollerita
(3, 3),  -- Budín

-- JUEVES
(4, 18), -- Chancho al horno
(4, 21), -- Bife Chorizo
(4, 22), -- Picante de pollo
(4, 1),  -- Crema asada

-- VIERNES
(5, 23), -- Pollo a la parrilla
(5, 24), -- Picante Mixto
(5, 20), -- Pollerita
(5, 2),  -- Carlota

-- SÁBADO
(6, 18), -- Chancho al horno
(6, 19), -- Keperi
(6, 21), -- Bife Chorizo
(6, 3),  -- Budín

-- DOMINGO
(7, 22), -- Picante de pollo
(7, 23), -- Pollo a la parrilla
(7, 24), -- Picante Mixto
(7, 1),  -- Crema asada

--LUNES (MENU INACTIVO)
(8, 21), -- Bife Chorizo
(8, 22), -- Picante de pollo
(8, 24), -- Picante Mixto
(8, 2);  -- Carlota
GO


INSERT INTO DetalleHorario (idEmpleado, idHorario, dia,idEstado) 
VALUES 
(2, 2, 'Lunes',3),
(2, 2, 'Miércoles',3),
(2, 2, 'Viernes',3),
(2, 2, 'Sábado',3),

(2, 1, 'Domingo',4),
(2, 2, 'Domingo',4),

(3,2, 'Lunes',3),
(3,2, 'Miércoles',3),
(3,2, 'Viernes',3),
(3,2, 'Sábado',3),


(7, 2, 'Domingo',4),
(7, 2, 'Domingo',4),

(8,2, 'Lunes',3),
(8,2, 'Miércoles',3),
(8,2, 'Viernes',3),
(8,2, 'Sábado',3);
GO


INSERT INTO DetallePedido (idPedido, idProducto, cantidad, precio) 
VALUES 
(1, 18, 1, 30),
(1, 20, 2, 40),
(1, 9, 1, 16),

(2, 4, 3, 4),
(2, 23, 1,25),
(2, 21, 1, 35),

(3, 22, 1, 20),
(3, 24, 2, 40),
(3, 12, 1, 11),

(4, 18, 2, 30),
(4, 19, 1, 6),
(4, 2, 3, 5),


(5, 11, 1, 12),
(5, 14, 1, 10),
(5, 22, 2, 20);
GO

INSERT INTO ExclusionIngrediente (idPedido, idProducto, idIngrediente) 
VALUES 
(1, 20, 6),


(3, 22, 5),
(3, 24, 6),

(4, 19, 8);
GO

-------------------------------------------------------------------------------------
INSERT INTO Ofrece (idIngrediente, idProveedor, precioEstimado) 
VALUES 
(1, 3, 20.00),  -- Carne de chancho, Proveedor 1, Precio estimado 20.00
(2, 2, 30.00),  -- Carne de res, Proveedor 2, Precio estimado 30.00
(3, 2, 25.00),  -- Pollo, Proveedor 2, Precio estimado 25.00

-- Verduras
(4, 3, 5.00),   -- Papa, Proveedor 1, Precio estimado 5.00
(4, 2, 4.50),   -- Papa, Proveedor 2, Precio estimado 4.50

(5, 2, 6.00),   -- Cebolla, Proveedor 2, Precio estimado 6.00
(5, 3, 5.80),   -- Cebolla, Proveedor 1, Precio estimado 5.80
(6, 3, 7.00),   -- Tomate, Proveedor 1, Precio estimado 7.00
(7, 3, 3.00),   -- Ajo, Proveedor 1, Precio estimado 3.00
(8, 2, 4.50),   -- Locoto, Proveedor 2, Precio estimado 4.50
(9, 2, 2.50),   -- Zanahoria, Proveedor 2, Precio estimado 2.50
(10, 3, 4.00),  -- Arveja, Proveedor 1, Precio estimado 4.00

-- Condimentos
(11, 2, 0.50),  -- Sal, Proveedor 2, Precio estimado 0.50
(12, 3, 1.00),  -- Comino, Proveedor 1, Precio estimado 1.00
(13, 3, 1.50),  -- Pimienta, Proveedor 1, Precio estimado 1.50
(14, 2, 0.75),  -- Orégano, Proveedor 2, Precio estimado 0.75
(15, 2, 1.20),  -- Ají colorado, Proveedor 2, Precio estimado 1.20
(16, 3, 3.00),  -- Aceite, Proveedor 1, Precio estimado 3.00

-- Otros
(17, 2, 10.00), -- Arroz, Proveedor 2, Precio estimado 10.00
(18, 3, 8.00),  -- Yuca, Proveedor 1, Precio estimado 8.00
(19, 3, 12.00); -- Chuño, Proveedor 1, Precio estimado 12.00
GO


INSERT INTO DetalleCompra (idCompra, idIngrediente, cantidad, precio) 
VALUES 
(3, 1, 20, 20),
(3, 5, 20, 5.80),
(3, 6, 20, 7),
(3, 7, 10, 3),


(2, 2, 20, 30),
(2, 3, 20, 30),


(4, 4, 20, 4.50),
(4, 8, 10, 4.50),
(4, 9, 30, 2.50),
(4, 17, 50, 10);
GO

INSERT INTO OfreceBebida (idProducto, idProveedor, precioEstimado) 
VALUES
(4, 1, 3.00),  -- Cerveza, Proveedor 1, Precio estimado 3.00
(5, 1, 12.00), -- Vino tinto, Proveedor 1, Precio estimado 12.00
(6, 1, 10.00), -- Singani, Proveedor 1, Precio estimado 10.00
(7, 1, 12.00), -- Ron, Proveedor 1, Precio estimado 12.00
(8, 1, 12.00), -- Sidra, Proveedor 1, Precio estimado 12.00
(9, 1, 14.00), -- Coca-Cola 3ltrs, Proveedor 1, Precio estimado 14.00
(10, 1, 10.00), -- Coca-Cola 2ltrs, Proveedor 1, Precio estimado 10.00
(11, 1, 12.00), -- Pepsi 3ltrs, Proveedor 1, Precio estimado 12.00
(12, 1, 9.00),  -- Fanta 2ltrs, Proveedor 1, Precio estimado 9.00
(13, 1, 10.00), -- Sprite 2ltrs, Proveedor 1, Precio estimado 10.00
(14, 1, 8.00),  -- Jugo de naranja, Proveedor 1, Precio estimado 8.00
(15, 1, 8.00),  -- Jugo de tamarindo, Proveedor 1, Precio estimado 8.00
(16, 1, 8.00),  -- Refresco de limón, Proveedor 1, Precio estimado 8.00
(17, 1, 8.00);  -- Refresco de lima, Proveedor 1, Precio estimado 8.00
GO


INSERT INTO DetalleCompraBebida (idCompra,idProducto,cantidad,precio) 
VALUES
(1, 4, 10, 3.50),   -- Cerveza, cantidad 10, precio 3.50
(1, 5, 15, 13.00),  -- Vino tinto, cantidad 15, precio 13.00
(1, 6, 12, 11.00),  -- Singani, cantidad 12, precio 11.00
(1, 7, 8, 12.00),   -- Ron, cantidad 8, precio 12.00
(1, 8, 20, 12.50),  -- Sidra, cantidad 20, precio 12.50
(1, 9, 30, 14.00),  -- Coca-Cola 3ltrs, cantidad 30, precio 14.00
(1, 10, 25, 11.00), -- Coca-Cola 2ltrs, cantidad 25, precio 11.00
(1, 11, 20, 12.00), -- Pepsi 3ltrs, cantidad 20, precio 12.00
(1, 12, 15, 10.50), -- Fanta 2ltrs, cantidad 15, precio 10.50
(1, 13, 10, 11.00), -- Sprite 2ltrs, cantidad 10, precio 11.00
(1, 14, 25, 9.00),  -- Jugo de naranja, cantidad 25, precio 9.00
(1, 15, 30, 9.00),  -- Jugo de tamarindo, cantidad 30, precio 9.00
(1, 16, 20, 9.00),  -- Refresco de limón, cantidad 20, precio 9.00
(1, 17, 18, 9.50);  -- Refresco de lima, cantidad 18, precio 9.50
GO


INSERT INTO Envio (ubicacion, idEmpresaDelivery, idPedido, idEstado) 
VALUES 
('Av. Cristo Redentor, Zona Equipetrol, Santa Cruz de la Sierra, Bolivia', 1, 5, 11);
GO


