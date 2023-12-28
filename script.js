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





// Código de redirección de pagina a castración



 // Obtener referencias a elementos HTML
 const modal = document.getElementById("myModal");
 const castracionLink = document.getElementById("castracionLink");

 // Función para mostrar el modal y redirigir después de un tiempo
 function redirectToAnotherSite() {
   // Mostrar el modal
   modal.style.display = "block";

   // Simular una espera de 2 segundos (ajusta según sea necesario)
   setTimeout(function () {
     // Ocultar el modal
     modal.style.display = "none";

     // Redirigir al usuario a la URL específica
     window.location.href = "https://rcarlosbd.github.io/Mascotas-Plus/";
   }, 5000);
 }

 // Agregar un evento al enlace para activar el modal y redirigir al usuario
 castracionLink.addEventListener("click", function (event) {
   event.preventDefault(); // Evitar la acción predeterminada del enlace

   // Mostrar el modal y redirigir después de un tiempo
   redirectToAnotherSite();
 });
