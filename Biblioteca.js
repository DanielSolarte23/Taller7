class Biblioteca {
    constructor(nombre) {
        this.nombre = nombre;
        this.libros = [];
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    }

    prestarLibro(nombreLibro) {
        let index = this.libros.findIndex(libro => libro.nombre === nombreLibro && libro.estado === 'en biblioteca');
        if (index !== -1) {
            this.libros[index].estado = 'prestado';
            this.libros[index].fechaPrestamo = '2024-08-01';
            return `El libro "${nombreLibro}" está disponible`;
        } else {
            return `Este libro no está disponible.`;
        }
    }

    devolverLibro(nombreLibro, fechaDevolucion) {
        let index = this.libros.findIndex(libro => libro.nombre === nombreLibro && libro.estado === 'prestado');
        if (index !== -1) {
            let diasRetraso = this.libros[index].calcularDiasRetraso(fechaDevolucion);
    
            if (diasRetraso > 0) {
                this.libros[index].estado = 'con retraso';
            } else {
                this.libros[index].estado = 'en biblioteca';
            }
    
            if (diasRetraso > 0) {
                return `El libro "${nombreLibro}" se devolvio con ${diasRetraso} dias de retraso.`;
            } else {
                return `El libro "${nombreLibro}" se devolvio correctamente.`;
            }
        } else {
            return `Este libro no está en prestamo`;
        }
    }
    

    mostrarLibros() {
        this.libros.forEach(libro => {
            console.log(libro.infoLibro());
        });
    }
}

class Libro {
    constructor(nombre, tipo, editorial, año, autor) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.editorial = editorial;
        this.año = año;
        this.autor = autor;
        this.estado = 'en biblioteca'; 
        this.fechaPrestamo = null; 
    }

    infoLibro() {
        return `Nombre: ${this.nombre}, Tipo: ${this.tipo}, Editorial: ${this.editorial}, Año: ${this.año}, Autor: ${this.autor}, Estado: ${this.estado}`;
    }

    calcularDiasRetraso(fechaDevolucion) {
        if (!this.fechaPrestamo) return 0;
    
        // Convertir las fechas a objetos Date
        let [añoDevolucion, mesDevolucion, diaDevolucion] = fechaDevolucion.split('-').map(Number);
        let [añoPrestamo, mesPrestamo, diaPrestamo] = this.fechaPrestamo.split('-').map(Number);
    
        let fechaDevolucionDate = new Date(añoDevolucion, mesDevolucion - 1, diaDevolucion);
        let fechaPrestamoDate = new Date(añoPrestamo, mesPrestamo - 1, diaPrestamo);
    
        // Calcular la diferencia en milisegundos
        let diferenciaEnMilisegundos = fechaDevolucionDate - fechaPrestamoDate;
    
        // Convertir la diferencia a días
        let diasPrestamo = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    
        // Retornar la cantidad de días de retraso, si es mayor a 30
        return Math.max(0, diasPrestamo - 30); // 30 días de préstamo
    }
}    

class Autor {
    constructor(nombre, nacionalidad, fechaNacimiento) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
        this.fechaNacimiento = fechaNacimiento;
    }

    infoAutor() {
        return `Nombre: ${this.nombre}, Nacionalidad: ${this.nacionalidad}, Fecha de Nacimiento: ${this.fechaNacimiento}`;
    }
}

class Lector {
    constructor(nombre, direccion, telefono) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.librosPrestados = 0;
        this.multas = 0;
    }

    infoLector() {
        return `Nombre: ${this.nombre}, Dirección: ${this.direccion}, Teléfono: ${this.telefono}`;
    }

    cantidadLibrosPrestados() {
        return this.librosPrestados;
    }

    prestarLibro() {
        if (this.librosPrestados >= 3) {
            return `No se pueden prestar más libros.`;
        }
        this.librosPrestados++;
        return `Libro prestado con éxito.`;
    }

    devolverLibro() {
        this.librosPrestados = Math.max(0, this.librosPrestados - 1);
        return `Libro devuelto con éxito.`;
    }

    calcularMultas(diasRetraso) {
        if (diasRetraso > 0) {
            this.multas += diasRetraso * 2; 
            return `Multa de ${diasRetraso * 2} días`;
        }
        return `No hay multas.`;
    }
}


const autor1 = new Autor('Gabriel García Márquez', 'Colombiano', '1927-03-06');
const autor2 = new Autor('J.K. Rowling', 'Británica', '1965-07-31');

const libro1 = new Libro('Cien años de soledad', 'novela', 'Editorial Sudamericana', 1967, autor1);
const libro2 = new Libro('Harry Potter y la piedra filosofal', 'novela', 'Salamandra', 1997, autor2);


const biblioteca = new Biblioteca('Biblioteca Nacional');


biblioteca.agregarLibro(libro1);
biblioteca.agregarLibro(libro2);

console.log('Libros en la biblioteca:');
biblioteca.mostrarLibros();


const lector = new Lector('Juan Pérez', 'Calle 123', '555-1234');


console.log(lector.prestarLibro());
libro1.estado = 'en biblioteca'; 
console.log(biblioteca.prestarLibro('Cien años de soledad')); 

const fechaDevolucionConRetraso = '2024-08-35'; 
console.log(biblioteca.devolverLibro('Cien años de soledad', fechaDevolucionConRetraso));


console.log(autor1.infoAutor());


console.log(libro1.infoLibro());


console.log(lector.infoLector());


let diasRetraso = libro1.calcularDiasRetraso('2024-09-05'); 
console.log(lector.calcularMultas(diasRetraso)); 

console.log('Información del lector ');
console.log(lector.infoLector());

