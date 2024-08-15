class Persona {
    constructor(Nombre, Apellido, Edad, Sexo, Domicilio, Fecha, lugarCelebracion, tipo) {
        this.nombre = Nombre;
        this.apellido = Apellido;
        this.edad = Edad;
        this.sexo = Sexo;
        this.domicilio = Domicilio;
        this.matrimonio = new Matrimonio(Fecha, lugarCelebracion, tipo, this);
    }

    informacionPersona() {
        return `La persona ${this.nombre} ${this.apellido}, de edad ${this.edad}, de género ${this.sexo}, y su dirección es ${this.domicilio}`;
    }

    obtenerNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
}

class Autoridad extends Persona {
    constructor(Nombre, Apellido, Edad, Sexo, Domicilio, Cargo) {
        super(Nombre, Apellido, Edad, Sexo, Domicilio);
        this.cargo = Cargo;
    }

    obtenerDatos() {
        return `${this.obtenerNombreCompleto()}, cargo: ${this.cargo}`;
    }
}

class Matrimonio {
    constructor(Fecha, lugarCelebracion, tipo, parejaa) {
        this.fecha = Fecha;
        this.lugarCelebracion = lugarCelebracion;
        this.tipo = tipo;
        this.pareja1 = [parejaa];
        this.autoridades = [];
    }

    agregarPareja(pareja2) {
        if (this.pareja1.length < 2) {
            this.pareja1.push(pareja2);
        } else {
            console.log('Ya se han registrado ambas peronas.');
        }
    }

    agregarAutoridad(autoridad) {
        this.autoridades.push(autoridad);
    }

    registrarMatrimonio() {
        let nombresPareja = this.pareja1.map(persona => person-a.obtenerNombreCompleto()).join(' y ');
        let nombresAutoridades = this.autoridades.map(autoridad => autoridad.obtenerDatos()).join(', ');

        return `Se registró el matrimonio de ${nombresPareja} en la fecha ${this.fecha} en ${this.lugarCelebracion}, matrimonio tipo ${this.tipo}. Autoridades presentes: ${nombresAutoridades}.`;
    }

}


let persona1 = new Persona("Ricardo", "Erazo", 20, "Masculino", "Calle 1", "2024-08-06", "Notaria 1", "civil");
let persona2 = new Persona("Mafe", "Anaya", 22, "Femenino", "Calle 2", "2024-08-06", "Notaria 1", "civil");

let autoridad1 = new Autoridad("Jaun", "Sanchez", 18, "Masculino", "Calle 7", "Juez", "2024-08-06", "Notaria 1", "civil");
let autoridad2 = new Autoridad("Catalina", "Rivera", 23, "Femenino", "Calle 5", "Notaria", "2024-08-06", "Notaria 1", "civil");

persona1.matrimonio.agregarPareja(persona2);
persona1.matrimonio.agregarAutoridad(autoridad1);
persona1.matrimonio.agregarAutoridad(autoridad2);
console.log(persona1.matrimonio.registrarMatrimonio());
 

// console.log(persona1.informacionPersona());
// console.log(persona2.informacionPersona());

