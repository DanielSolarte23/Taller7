class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
    infoPersona() {
        return `Nombre: ${this.nombre}, Edad: ${this.edad}`;
    }
}

class Empleado extends Persona {
    constructor(nombre, edad, sueldo) {
        super(nombre, edad);
        this.sueldo = sueldo;
    }
    infoEmpleado() {
        return `${this.infoPersona()}, Sueldo: ${this.sueldo}`;
    }
}

class Directivo extends Empleado {
    constructor(nombre, edad, sueldo, categoria) {
        super(nombre, edad, sueldo);
        this.categoria = categoria;
        this.subordinados = [];
    }
    infoDirectivo() {
        return `${this.infoEmpleado()}, Categoría: ${this.categoria}, Subordinados: ${this.subordinados.map(emp => emp.nombre).join(', ')}`;
    }
    agregarSubordinado(empleado) {
        this.subordinados.push(empleado);
    }
}

class Cliente extends Persona {
    constructor(nombre, edad, telefono) {
        super(nombre, edad);
        this.telefono = telefono;
    }
    infoCliente() {
        return `${this.infoPersona()}, Teléfono: ${this.telefono}`;
    }
}

class Empresa {
    constructor(nombre, direccion, telefono, correo, paginaWeb, nit) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo = correo;
        this.paginaWeb = paginaWeb;
        this.nit = nit;
        this.horarios = [];
        this.empleados = [];
        this.clientes = [];
    }
    informacion() {
        return `Empresa: ${this.nombre}, Dirección: ${this.direccion}, NIT: ${this.nit}, Contacto: ${this.telefono}, ${this.correo}, Web: ${this.paginaWeb}`;
    }
    agregarHorario(nuevoHorario) {
        this.horarios.push(nuevoHorario);
    }
    agregarEmpleado(nuevoEmpleado) {
        this.empleados.push(nuevoEmpleado);
    }
    eliminarEmpleado(indiceEmpleado) {
        if (indiceEmpleado >= 0 && indiceEmpleado < this.empleados.length) {
            this.empleados.splice(indiceEmpleado, 1);
        }
    }
    modificarEmpleado(indiceEmpleado, datosEmpleado) {
        if (indiceEmpleado >= 0 && indiceEmpleado < this.empleados.length) {
            this.empleados[indiceEmpleado] = datosEmpleado;
        }
    }
    agregarCliente(nuevoCliente) {
        this.clientes.push(nuevoCliente);
    }
}

// Ejemplo de uso:
const empleado1 = new Empleado("Juan", 30, 2000);
const directivo1 = new Directivo("Ana", 40, 5000, "Gerente");
directivo1.agregarSubordinado(empleado1);

const cliente1 = new Cliente("Luis", 35, "555-5555");
const empresa1 = new Empresa("TechCorp", "Calle", "555", "i@techcorp.com", "www.techcorp.com", "123456789");

empresa1.agregarEmpleado(directivo1);
empresa1.agregarCliente(cliente1);
empresa1.agregarHorario("Lunes a Viernes de 9am a 6pm");

console.log(empresa1.informacion());
console.log(directivo1.infoDirectivo());
console.log(cliente1.infoCliente());
