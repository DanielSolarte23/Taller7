class ClinicaVeterinaria {
    constructor() {
      this.clientes = [];
    }
  
    registrarCliente(cliente) {
      this.clientes.push(cliente);
    }
  
    registrarMascota(cliente, mascota) {
      cliente.agregarMascota(mascota);
    }
  }
  
  class Veterinario {
    constructor(nombre, identificacion) {
      this.nombre = nombre;
      this.identificacion = identificacion;
    }
  
    diagnosticarEnfermedad(mascota, enfermedad, fecha) {
      mascota.agregarEnfermedad(new Enfermedad(enfermedad, fecha));
    }
  
    registrarVacuna(mascota, enfermedad, fecha) {
      mascota.agregarVacuna(new Vacuna(enfermedad, fecha));
    }
  }
  
  class Cliente {
    constructor(codigo, primerApellido, numeroCuentaBancaria, direccion, telefono) {
      this.codigo = codigo;
      this.primerApellido = primerApellido;
      this.numeroCuentaBancaria = numeroCuentaBancaria;
      this.direccion = direccion;
      this.telefono = telefono;
      this.personas = [];
      this.mascotas = [];
    }
  
    agregarPersona(persona) {
      this.personas.push(persona);
    }
  
    agregarMascota(mascota) {
      this.mascotas.push(mascota);
    }
  }
  
  class Persona {
    constructor(nombre, identificacion) {
      this.nombre = nombre;
      this.identificacion = identificacion;
    }
  
    asociarConCliente(cliente) {
      cliente.agregarPersona(this);
    }
  }
  
  class Mascota {
    constructor(codigo, alias, especie, raza, colorPelo, fechaNacimiento, pesoActual) {
      this.codigo = codigo;
      this.alias = alias;
      this.especie = especie;
      this.raza = raza;
      this.colorPelo = colorPelo;
      this.fechaNacimiento = fechaNacimiento;
      this.pesoActual = pesoActual;
      this.pesoMedioUltimasVisitas = 0;
      this.historialMedico = new HistorialMedico();
    }
  
    actualizarPeso(peso) {
      this.pesoActual = peso;
      this.pesoMedioUltimasVisitas = (this.pesoMedioUltimasVisitas + peso) / 2;
    }
  
    agregarEnfermedad(enfermedad) {
      this.historialMedico.agregarEnfermedad(enfermedad);
    }
  
    agregarVacuna(vacuna) {
      this.historialMedico.agregarVacuna(vacuna);
    }
  }
  
  class HistorialMedico {
    constructor() {
      this.enfermedades = [];
      this.vacunas = [];
    }
  
    agregarEnfermedad(enfermedad) {
      this.enfermedades.push(enfermedad);
    }
  
    agregarVacuna(vacuna) {
      this.vacunas.push(vacuna);
    }
  }
  
  class Enfermedad {
    constructor(nombre, fecha) {
      this.nombre = nombre;
      this.fecha = fecha;
    }
  }
  
  class Vacuna {
    constructor(enfermedad, fecha) {
      this.enfermedad = enfermedad;
      this.fecha = fecha;
    }
  }
  
  // Ejemplo de uso:
  const clinica = new ClinicaVeterinaria();
  
  const cliente1 = new Cliente("001", "Pérez", "12345678", "Calle Falsa 123", "555-1234");
  const persona1 = new Persona("Juan Pérez", "12345678A");
  const mascota1 = new Mascota("M001", "Firulais", "Perro", "Labrador", "Marrón", new Date("2015-05-20"), 25.0);
  
  cliente1.agregarPersona(persona1);
  cliente1.agregarMascota(mascota1);
  
  clinica.registrarCliente(cliente1);
  
  const veterinario1 = new Veterinario("Dr. López", "V001");
  
  veterinario1.diagnosticarEnfermedad(mascota1, "Parvovirus", new Date());
  veterinario1.registrarVacuna(mascota1, "Rabia", new Date());
  
  console.log(cliente1);
  console.log(mascota1.historialMedico);
  