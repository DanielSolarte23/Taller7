class Hospital {
    constructor() {
      this.pacientes = [];
      this.empleadosSanitarios = [];
    }
  
    registrarPaciente(paciente) {
      this.pacientes.push(paciente);
    }
  
    registrarEmpleado(empleado) {
      this.empleadosSanitarios.push(empleado);
    }
  }
  
  class Paciente {
    constructor(numeroHistoriaClinica, nombre, direccion) {
      this.numeroHistoriaClinica = numeroHistoriaClinica;
      this.nombre = nombre;
      this.direccion = direccion;
      this.medicos = [];
      this.enfermeros = [];
      this.analisis = [];
    }
  
    asignarMedico(medico) {
      this.medicos.push(medico);
    }
  
    asignarEnfermero(enfermero) {
      this.enfermeros.push(enfermero);
    }
  
    agregarAnalisis(analisis) {
      this.analisis.push(analisis);
    }
  }
  
  class EmpleadoSanitario {
    constructor(numeroEmpleado, nombre, tipo) {
      this.numeroEmpleado = numeroEmpleado;
      this.nombre = nombre;
      this.tipo = tipo;
    }
  
    obtenerTipo() {
      return this.tipo;
    }
  }
  
  class Medico extends EmpleadoSanitario {
    constructor(numeroEmpleado, nombre, especialidad) {
      super(numeroEmpleado, nombre, "Medico");
      this.especialidad = especialidad;
    }
  
    solicitarAnalisis(paciente, tipo, fecha, enfermeros) {
      let analisis = new Analisis(Date.now().toString(), tipo, fecha, this, enfermeros);
      paciente.agregarAnalisis(analisis);
      return analisis;
    }
  }
  
  class Enfermero extends EmpleadoSanitario {
    constructor(numeroEmpleado, nombre) {
      super(numeroEmpleado, nombre, "Enfermero");
    }
  
    realizarPrueba(analisis, resultados) {
      analisis.asignarResultados(resultados);
    }
  }
  
  class Analisis {
    constructor(numeroReferencia, tipo, fecha, medicoSolicitante, enfermeros) {
      this.numeroReferencia = numeroReferencia;
      this.tipo = tipo;
      this.fecha = fecha;
      this.medicoSolicitante = medicoSolicitante;
      this.enfermeros = enfermeros;
      this.resultados = null;
    }
  
    asignarResultados(resultados) {
      this.resultados = resultados;
    }
  }
  
  // Ejemplo de uso:
  const hospital = new Hospital();
  
  const paciente1 = new Paciente("001", "María Gómez", "Calle 123, Ciudad");
  const medico1 = new Medico("M001", "Dr. Juan Pérez", "Cardiología");
  const enfermero1 = new Enfermero("E001", "Enf. Laura López");
  
  hospital.registrarPaciente(paciente1);
  hospital.registrarEmpleado(medico1);
  hospital.registrarEmpleado(enfermero1);
  
  paciente1.asignarMedico(medico1);
  paciente1.asignarEnfermero(enfermero1);
  
  const analisis1 = medico1.solicitarAnalisis(paciente1, "Sangre", new Date(), [enfermero1]);
  enfermero1.realizarPrueba(analisis1, "Resultados del análisis de sangre");
  
  console.log(paciente1);
  console.log(analisis1);
  
