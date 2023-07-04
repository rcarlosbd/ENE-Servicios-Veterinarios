document
  .querySelector("button.button-menu-toggle")
  .addEventListener("click", function () {
    const navbar = document.querySelector(".nav-links");
    navbar.classList.toggle("nav-links-responsive");
  });

const menuToggleButton = document.getElementById("menu-toggle");
const navbar = document.querySelector(".nav-links");

menuToggleButton.addEventListener("click", function () {
  this.classList.toggle("open");

  const menuToggleIcons = document.querySelectorAll(".menu-toggle-icon");
  menuToggleIcons.forEach((icon) => {
    if (this.classList.contains("open")) {
      icon.style.borderRadius = "0";
    } else {
      icon.style.borderRadius = "0";
    }
  });
});

const navLinks = document.querySelectorAll(".nav-links li a");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navbar.classList.remove("nav-links-responsive");
    menuToggleButton.classList.remove("open");
  });
});

// Validación del formulario de contacto con JavaScript
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita el envío del formulario

  // Validar los campos del formulario aquí y realizar las acciones necesarias
  // ...

  // Ejemplo de envío exitoso del formulario de contacto
  alert("El formulario de contacto se ha enviado correctamente.");

  contactForm.reset(); // Resetea el formulario
});

// Redirigir a la sección de inicio al hacer reset del formulario
contactForm.addEventListener("reset", function () {
  window.location.href = "#inicio";
});

// Sección de turnos
// **** Nuevo código bloqueando horas

const nombre = document.querySelector("#nombre");
const mascota = document.querySelector("#mascota");
const motivo = document.querySelector("#motivo");
const fecha = document.querySelector("#fecha");
const hora = document.querySelector("#hora");
const btnEnviar = document.querySelector("#btnEnviar");

// Obtiene la fecha y hora actual
const fechaActual = new Date();
let diaSemana = fechaActual.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado

// Define los horarios de atención de la veterinaria
const horariosAtencion = {
  0: [], // Domingo
  1: ["11:00", "18:00"], // Lunes
  2: ["09:00", "18:00"], // Martes
  3: ["09:00", "18:00"], // Miércoles
  4: ["09:00", "18:00"], // Jueves
  5: ["09:00", "18:00"], // Viernes
  6: ["09:00", "15:00"], // Sábado
};

// Establece la fecha mínima y máxima aceptada
const fechaMinima = new Date(fechaActual);
if (diaSemana === 0 || (diaSemana === 1 && fechaActual.getHours() >= 14)) {
  fechaMinima.setDate(fechaMinima.getDate() + 1);
}
const fechaMaxima = new Date(fechaMinima);
fechaMaxima.setDate(fechaMaxima.getDate() + 30);

const fechaMinimaISO = fechaMinima.toISOString().split("T")[0];
const fechaMaximaISO = fechaMaxima.toISOString().split("T")[0];

fecha.setAttribute("min", fechaMinimaISO);
fecha.setAttribute("max", fechaMaximaISO);

// Genera las opciones de hora en base a los horarios de atención
function generarOpcionesHorario() {
  const horarioDia = horariosAtencion[diaSemana];
  const horaInicio = parseInt(horarioDia[0].split(":")[0]);
  const minutoInicio = parseInt(horarioDia[0].split(":")[1]);
  const horaFin = parseInt(horarioDia[1].split(":")[0]);
  const minutoFin = parseInt(horarioDia[1].split(":")[1]);

  let opciones = "";
  let hora = horaInicio;
  let minuto = minutoInicio;

  while (hora < horaFin || (hora === horaFin && minuto <= minutoFin)) {
    let horaFormateada = hora.toString().padStart(2, "0");
    let minutoFormateado = minuto.toString().padStart(2, "0");
    opciones += `<option value="${horaFormateada}:${minutoFormateado}">${horaFormateada}:${minutoFormateado}</option>`;

    minuto += 30;
    if (minuto >= 60) {
      minuto -= 60;
      hora++;
    }
  }

  hora.innerHTML = opciones;
}

// Actualiza las opciones de hora al cambiar la fecha
fecha.addEventListener("change", () => {
  diaSemana = new Date(fecha.value).getDay();
  generarOpcionesHorario();
});

// Genera las opciones de hora al cargar la página
generarOpcionesHorario();

function enviar(event) {
  event.preventDefault(); // Evita el envío del formulario

  if (
    nombre.value === "" ||
    mascota.value === "" ||
    motivo.value === "" ||
    fecha.value === "" ||
    hora.value === ""
  ) {
    // Si algún campo está vacío, muestra una alerta
    alert("Por favor, completa todos los campos del formulario.");
  } else {
    const fechaSeleccionada = new Date(fecha.value);
    const horaSeleccionada = hora.value.split(":");
    const horaElegida = new Date(
      fechaSeleccionada.getFullYear(),
      fechaSeleccionada.getMonth(),
      fechaSeleccionada.getDate(),
      parseInt(horaSeleccionada[0]),
      parseInt(horaSeleccionada[1])
    );
    const horaInicio = new Date(
      fechaSeleccionada.getFullYear(),
      fechaSeleccionada.getMonth(),
      fechaSeleccionada.getDate(),
      parseInt(horariosAtencion[diaSemana][0].split(":")[0]),
      parseInt(horariosAtencion[diaSemana][0].split(":")[1])
    );
    const horaFin = new Date(
      fechaSeleccionada.getFullYear(),
      fechaSeleccionada.getMonth(),
      fechaSeleccionada.getDate(),
      parseInt(horariosAtencion[diaSemana][1].split(":")[0]),
      parseInt(horariosAtencion[diaSemana][1].split(":")[1])
    );

    if (horaElegida < horaInicio || horaElegida > horaFin) {
      // Si la hora seleccionada no está dentro del horario de atención, muestra una alerta
      const mensajeAlerta = `Estimado usuario, le recordamos que el horario de atención de nuestra veterinaria es de:%0A%0A- Lunes: 11:00 a 18:00 horas%0A- Martes a Viernes: 09:00 a 18:00 horas%0A- Sábados: 09:00 a 15:00 horas%0A%0AMuchas gracias por preferirnos.`;
      alert(decodeURIComponent(mensajeAlerta.replace(/%0A/g, "\n")));
    } else {
      const mensaje = `¡Hola! Me gustaría agendar una consulta veterinaria para mi mascota. A continuación, les envío los detalles correspondientes.%0A%0A- Nombre del dueño: ${nombre.value}%0A- Nombre de la mascota: ${mascota.value}%0A- Motivo de la consulta: ${motivo.value}%0A- Fecha preferida: ${fecha.value}%0A- Hora preferida: ${hora.value}%0A%0AAgradecería que confirmen el turno. ¡Muchas gracias!`;

      const mensajeFormateado = mensaje
        .replace(/%0A/g, "\n")
        .replace(/%0A%0A-/g, "\n-");

      const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=5491122553332&text=${encodeURIComponent(
        mensajeFormateado
      )}`;

      window.open(enlaceWhatsApp, "_blank"); // Abre el enlace de WhatsApp en una nueva pestaña

      // Resetea los campos del formulario después de enviar el mensaje
      nombre.value = "";
      mascota.value = "";
      motivo.value = "";
      fecha.value = "";
      hora.value = "";

      // Redirige a la sección de inicio
      window.location.href = "#inicio";
    }
  }
}

btnEnviar.addEventListener("click", enviar);
