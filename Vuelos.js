class Compañia {
    constructor(nombre) {
      this.nombre = nombre;
      this.vuelos = [];
    }
  
    ofertarVuelo(vuelo) {
      this.vuelos.push(vuelo);
    }
  }
  
  class Vuelo {
    constructor(fecha, numPlazas, avion) {
      this.fecha = fecha;
      this.numPlazas = numPlazas;
      this.plazasOcupadas = 0;
      this.avion = avion;
      this.pasajeros = [];
    }
  
    reservarAsiento(pasajero) {
      if (this.plazasOcupadas < this.numPlazas && this.avion.Capacidad(this.numPlazas)) {
        this.plazasOcupadas++;
        let billete = new Billete(this, pasajero, this.plazasOcupadas);
        this.pasajeros.push(pasajero);
        return billete;
      } else {
        console.log('No hay plazas disponibles.');
        return null;
      }
    }
  
    cancelarReserva(pasajero) {
      let index = this.pasajeros.indexOf(pasajero);
      if (index > -1) {
        this.pasajeros.splice(index, 1);
        this.plazasOcupadas--;
      }
    }
  }
  
  class Avion {
    constructor(modelo, capacidad) {
      this.modelo = modelo;
      this.capacidad = capacidad;
    }
  
    Capacidad(numPlazas) {
      return numPlazas <= this.capacidad;
    }
  }
  
  class Pasajero {
    constructor(nombre, apellidos, edad) {
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.edad = edad;
    }
  
    comprarBillete(vuelo) {
      return vuelo.reservarAsiento(this);
    }
  }
  
  class Billete {
    constructor(vuelo, pasajero, numAsiento) {
      this.vuelo = vuelo;
      this.pasajero = pasajero;
      this.numAsiento = numAsiento;
    }
  
    generar() {
      return `Billete: Vuelo ${this.vuelo.fecha}, Pasajero: ${this.pasajero.nombre} ${this.pasajero.apellidos}, Asiento: ${this.numAsiento}`;
    }
  }
  
  
  let avion1 = new Avion("Boeing 737", 180);
  let vuelo1 = new Vuelo("2024-09-15", 150, avion1);
  
  let compañia = new Compañia("Vuelos Felices");
  compañia.ofertarVuelo(vuelo1);
  
  let pasajero1 = new Pasajero("Juan", "Pérez", 30);
  let billete1 = pasajero1.comprarBillete(vuelo1);
  
  console.log(billete1.generar());
  


