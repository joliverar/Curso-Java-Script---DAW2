import datos from './datos.js';

const $negocio = (function () {
  if (!localStorage.getItem('pacientes')) {
    localStorage.setItem('pacientes', JSON.stringify(datos.pacientes));
    localStorage.setItem('expedientes', JSON.stringify(datos.expedientes));
    localStorage.setItem('usuarios', JSON.stringify(datos.usuarios));
  }
  let pacientes = JSON.parse(localStorage.getItem('pacientes'));
  let expedientes = JSON.parse(localStorage.getItem('expedientes'));
  let usuarios = JSON.parse(localStorage.getItem('usuarios'));

  function siguientePacienteId() {
    let maxId = Math.max(...pacientes.map(p => p.id), 0);
    return maxId + 1;
  }

  /*   function siguienteExpedienteId() {
      let maxId = Math.max(...expedientes.map(e => e.id), 0);
      return maxId + 1;
    } */

  function siguienteUsuarioId() {
    let maxId = Math.max(...usuarios.map(u => u.id), 0);
    return maxId + 1;
  }

  async function obtenerPacientes(filtro = '', inicio = 0, limite) {
    let filtrados = [...pacientes];
    if (filtro != '') {
      filtro.toLowerCase();
      filtrados = filtrados.filter(paciente => {
        return Object.keys(paciente).some(key => {
          return paciente[key] && paciente[key].toString().toLowerCase().includes(filtro);
        });
      })
    }
    if (inicio > 0) {
      filtrados = filtrados.slice(inicio);
    }
    if (limite !== undefined) {
      filtrados = filtrados.slice(0, limite);
    }
    return filtrados;
  }

  async function obtenerPaciente(pacienteId) {
    let index = pacientes.findIndex(p => p.id == pacienteId);
    if (index !== -1) {
      return pacientes[index];
    }
    return null;
  }

  async function crearPaciente(objPaciente) {
    //un paciente tiene un expediente 1:1
    objPaciente.id = siguientePacienteId();

    const hoy = new Date();
    const anno = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaFormateada = `${anno}-${mes}-${dia}`;

    //exdiente nuevo vacio
    let objExpediente = {
      id: objPaciente.id,
      pacienteId: objPaciente.id,
      fechaApertura: fechaFormateada,
      antecedentes: "",
      diagnosticos: "",
      tratamientos: "",
      observaciones: "",
    };

    pacientes.push(objPaciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    expedientes.push(objExpediente);
    localStorage.setItem('expedientes', JSON.stringify(expedientes));

    return objPaciente.id;
  }

  async function actualizarPaciente(objPaciente) {
    let index = pacientes.findIndex(p => p.id == objPaciente.id);
    if (index !== -1) {
      pacientes[index] = objPaciente;
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
      return true;
    }
    return false;
  }

  async function eliminarPaciente(pacienteId) {
    //eliminar el paciente y eliminar el expediente.
    let indexPaciente = pacientes.findIndex(p => p.id == pacienteId);
    let indexExpediente = expedientes.findIndex(e => e.pacienteId == pacienteId);

    if (indexPaciente === -1 || indexExpediente === -1) {
      return false;
    }

    pacientes.splice(indexPaciente, 1);
    expedientes.splice(indexExpediente, 1);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    localStorage.setItem('expedientes', JSON.stringify(expedientes));

    return true;
  }

  // No hace falta, en expedientes busco por paciente
  /*   async function obtenerExpedientes(filtro = '', inicio = 0, limite) {
      let filtrados = [...expedientes];
      if (filtro != '') {
        filtro.toLowerCase();
        filtrados = filtrados.filter(expediente => {
          return Object.keys(expediente).some(key => {
            return expediente[key] && expediente[key].toString().toLowerCase().includes(filtro);
          });
        })
      }
      if (inicio > 0) {
        filtrados = filtrados.slice(inicio);
      }
      if (limite !== undefined) {
        filtrados = filtrados.slice(0, limite);
      }
      return filtrados;
    }
   */
  async function obtenerExpediente(pacienteId) {
    let index = expedientes.findIndex(e => e.pacienteId == pacienteId);
    if (index !== -1) {
      return expedientes[index];
    }
    return null;
  }

  /*   async function crearExpediente(objExpediente) {
      objExpediente.id = siguienteExpedienteId();
      expedientes.push(objExpediente);
      localStorage.setItem('expedientes', JSON.stringify(expedientes));
      return objExpediente.id;
    } */

  async function actualizarExpediente(objExpediente) {
    let index = expedientes.findIndex(e => e.id == objExpediente.id);
    if (index !== -1) {
      expedientes[index] = objExpediente;
      localStorage.setItem('expedientes', JSON.stringify(expedientes));
      return true;
    }
    return false;
  }

  async function obtenerUsuarios() {
    //no hay parámetros...
    return [...usuarios];
  }

  async function obtenerUsuario(usuarioId) {
    let index = usuarios.findIndex(u => u.id == usuarioId);
    if (index !== -1) {
      return usuarios[index];
    }
    return null;
  }

  async function crearUsuario(objUsuario) {
    objUsuario.id = siguienteUsuarioId();
    usuarios.push(objUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return objUsuario.id;
  }

  async function actualizarUsuario(objUsuario) {
    let index = usuarios.findIndex(u => u.id == objUsuario.id);
    if (index !== -1) {
      usuarios[index] = objUsuario;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      return true;
    }
    return false;
  }

  async function eliminarUsuario(usuarioId) {
    let index = usuarios.findIndex(u => u.id == usuarioId);
    if (index !== -1) {
      usuarios.splice(index, 1);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      return true;
    }
    return false;
  }

  async function validarUsuario(username, password) {
    let index = usuarios.findIndex(u => u.username == username && u.password == password);
    if (index !== -1) {
      return usuarios[index];
    }
    return false;
  }

  function limpiarLocalStorage() {
    localStorage.removeItem('pacientes');
    localStorage.removeItem('expedientes');
    localStorage.removeItem('usuarios');
  }

  return {
    obtenerPacientes,
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente,

    obtenerExpediente,
    actualizarExpediente,

    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,

    validarUsuario,
    limpiarLocalStorage,
  };
})();

window.$negocio = $negocio;
export default $negocio;

/* FUNCION DE PRUEBA, NO TE HACE FALTA */
export async function pruebas() {
  // Test obtenerPacientes
  const pacientes = await $negocio.obtenerPacientes();
  console.log('obtenerPacientes: ', pacientes);

  // Test obtenerPaciente
  const paciente1 = await $negocio.obtenerPaciente(1);
  console.log('obtenerPaciente: ', paciente1);

  // Test crearPaciente
  const nuevoPaciente = { nombre: 'Juan', apellido: 'Perez' };
  const nuevoPacienteId = await $negocio.crearPaciente(nuevoPaciente);
  const pacienteCreado = await $negocio.obtenerPaciente(nuevoPacienteId);
  console.log('crearPaciente: ', pacienteCreado !== null && pacienteCreado.nombre === 'Juan' && pacienteCreado.apellido === 'Perez');

  // Test actualizarPaciente
  const pacienteActualizado = { id: nuevoPacienteId, nombre: 'Juan', apellido: 'Perez' };
  const resultActualizarPaciente = await $negocio.actualizarPaciente(pacienteActualizado);
  const pacienteActualizadoObtenido = await $negocio.obtenerPaciente(nuevoPacienteId);
  console.log('actualizarPaciente: ', resultActualizarPaciente === true && pacienteActualizadoObtenido.nombre === 'Juan' && pacienteActualizadoObtenido.apellido === 'Perez');

  // Test eliminarPaciente
  const resultEliminarPaciente = await $negocio.eliminarPaciente(nuevoPacienteId);
  const pacienteEliminado = await $negocio.obtenerPaciente(nuevoPacienteId);
  console.log('eliminarPaciente: ', resultEliminarPaciente === true && pacienteEliminado === null);

  // Test obtenerExpediente
  const expediente1 = await $negocio.obtenerExpediente(1);
  console.log('obtenerExpediente: ', expediente1);

  // Test actualizarExpediente
  const expedienteActualizado = { id: 1, pacienteId: 1, fechaApertura: '2023-01-01' };
  const resultActualizarExpediente = await $negocio.actualizarExpediente(expedienteActualizado);
  const expedienteActualizadoObtenido = await $negocio.obtenerExpediente(1);
  console.log('actualizarExpediente: ', resultActualizarExpediente === true && expedienteActualizadoObtenido.fechaApertura === '2023-01-01');

  // Test obtenerUsuarios
  const usuarios = await $negocio.obtenerUsuarios();
  console.log('obtenerUsuarios: ', Array.isArray(usuarios));

  // Test obtenerUsuario
  const usuario1 = await $negocio.obtenerUsuario(1);
  console.log('obtenerUsuario: ', usuario1);

  // Test crearUsuario
  const nuevoUsuario = { username: 'jdoe', password: '1234' };
  const nuevoUsuarioId = await $negocio.crearUsuario(nuevoUsuario);
  const usuarioCreado = await $negocio.obtenerUsuario(nuevoUsuarioId);
  console.log('crearUsuario: ', usuarioCreado !== null && usuarioCreado.username === 'jdoe');

  // Test actualizarUsuario
  const usuarioActualizado = { id: nuevoUsuarioId, username: 'jdoe', password: '1234' };
  const resultActualizarUsuario = await $negocio.actualizarUsuario(usuarioActualizado);
  const usuarioActualizadoObtenido = await $negocio.obtenerUsuario(nuevoUsuarioId);
  console.log('actualizarUsuario: ', resultActualizarUsuario === true && usuarioActualizadoObtenido.username === 'jdoe');

  // Test eliminarUsuario
  const resultEliminarUsuario = await $negocio.eliminarUsuario(nuevoUsuarioId);
  const usuarioEliminado = await $negocio.obtenerUsuario(nuevoUsuarioId);
  console.log('eliminarUsuario: ', resultEliminarUsuario === true && usuarioEliminado === null);

  // Test validarUsuario
  const usuarioValidado = await $negocio.validarUsuario('ana', 'medico123');
  console.log('validarUsuario (datos correctos): ', usuarioValidado);

  const usuarioValidadoFallo = await $negocio.validarUsuario('jdoe', '1234');
  console.log('validarUsuario (datos incorrectos): ', usuarioValidadoFallo === false);

  // Test limpiarLocalStorage
  $negocio.limpiarLocalStorage();
  console.log('limpiarLocalStorage: ', localStorage.getItem('pacientes') === null && localStorage.getItem('expedientes') === null && localStorage.getItem('usuarios') === null);
}