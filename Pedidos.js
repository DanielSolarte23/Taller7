// Clase Cliente
class Cliente {
    constructor(nombre, direccion, telefono, email) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.pedidos = [];
    }

    realizarPedido(pedido) {
        this.pedidos.push(pedido);
    }

    mostrarInfoCliente() {
        console.log(`Cliente: ${this.nombre}`);
        console.log(`Dirección: ${this.direccion}`);
        console.log(`Teléfono: ${this.telefono}`);
        console.log(`Email: ${this.email}`);
        console.log(`Pedidos: ${this.pedidos.length}`);
    }
}

// Clase Producto
class Producto {
    constructor(idProducto, nombre, precio, impuesto, cantidad, existencias) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.precio = precio;
        this.impuesto = impuesto;
        this.cantidad = cantidad;
        this.existencias = existencias;
    }

    calcularPrecioConImpuesto() {
        return this.precio + (this.precio * this.impuesto);
    }

    mostrarInfoProducto() {
        console.log(`Producto: ${this.nombre}`);
        console.log(`Precio: $${this.precio}`);
        console.log(`Impuesto: ${this.impuesto * 100}%`);
        console.log(`Cantidad: ${this.cantidad}`);
        console.log(`Existencias: ${this.existencias}`);
    }
}

// Clase EstadoPedido
class EstadoPedido {
    constructor(estado) {
        this.estado = estado; // pendiente, pagado, procesando, enviado, entregado
    }

    mostrarEstado() {
        console.log(`Estado del Pedido: ${this.estado}`);
    }
}

// Clase Pago (Clase base/abstracta)
class Pago {
    constructor(monto, fecha) {
        this.monto = monto;
        this.fecha = fecha;
    }

    realizarPago() {
        console.log("Pago realizado");
    }

    mostrarInfoPago() {
        console.log(`Monto: $${this.monto}`);
        console.log(`Fecha: ${this.fecha}`);
    }
}

// Clases derivadas de Pago
class TarjetaCredito extends Pago {
    constructor(monto, fecha, fechaCaducidad, numero, tipo) {
        super(monto, fecha);
        this.fechaCaducidad = fechaCaducidad;
        this.numero = numero;
        this.tipo = tipo; // VISA o MASTERCARD
    }

    mostrarInfoPago() {
        super.mostrarInfoPago();
        console.log(`Tipo: ${this.tipo}`);
        console.log(`Número: ${this.numero}`);
        console.log(`Fecha de caducidad: ${this.fechaCaducidad}`);
    }
}

class Efectivo extends Pago {
    constructor(monto, fecha, moneda) {
        super(monto, fecha);
        this.moneda = moneda;
    }

    mostrarInfoPago() {
        super.mostrarInfoPago();
        console.log(`Moneda: ${this.moneda}`);
    }
}

class Cheque extends Pago {
    constructor(monto, fecha, nombre, entidadBancaria) {
        super(monto, fecha);
        this.nombre = nombre;
        this.entidadBancaria = entidadBancaria;
    }

    mostrarInfoPago() {
        super.mostrarInfoPago();
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Entidad Bancaria: ${this.entidadBancaria}`);
    }
}

// Clase Pedido
class Pedido {
    constructor(idPedido, fecha, estado) {
        this.idPedido = idPedido;
        this.fecha = fecha;
        this.estado = new EstadoPedido(estado);
        this.productos = [];
        this.pagos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    agregarPago(pago) {
        this.pagos.push(pago);
    }

    calcularCosteTotal() {
        return this.productos.reduce((total, producto) => {
            return total + (producto.calcularPrecioConImpuesto() * producto.cantidad);
        }, 0);
    }

    verificarDisponibilidad() {
        return this.productos.every(producto => producto.existencias >= producto.cantidad);
    }

    cambiarEstado(nuevoEstado) {
        this.estado = new EstadoPedido(nuevoEstado);
    }

    mostrarInfoPedido() {
        console.log(`ID Pedido: ${this.idPedido}`);
        console.log(`Fecha: ${this.fecha}`);
        this.estado.mostrarEstado();
        console.log(`Productos:`);
        this.productos.forEach(producto => producto.mostrarInfoProducto());
        console.log(`Coste Total: $${this.calcularCosteTotal()}`);
        console.log(`Pagos:`);
        this.pagos.forEach(pago => pago.mostrarInfoPago());
    }
}


const cliente = new Cliente("Juan Pérez", "Calle Falsa 123", "555-1234", "juan@example.com");
const producto1 = new Producto("001", "Disco duro", 100, 0.19, 2, 10);
const producto2 = new Producto("002", "Procesador", 500, 0.15, 1, 5);

const pedido = new Pedido("12345", new Date(), "pendiente");
pedido.agregarProducto(producto1);
pedido.agregarProducto(producto2);

const pago1 = new TarjetaCredito(600, new Date(), "12/25", "1234567890123456", "VISA");
pedido.agregarPago(pago1);

cliente.realizarPedido(pedido);

// Mostrar información del cliente
cliente.mostrarInfoCliente();

// Mostrar información del pedido
pedido.mostrarInfoPedido();
