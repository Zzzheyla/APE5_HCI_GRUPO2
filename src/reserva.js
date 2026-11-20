// =========================================================
// AULA ABIERTA · CONTROLADOR DE LA RESERVA
// Tres momentos de la tarea: Disponible → Confirmada → Cancelada
// =========================================================
"use strict";

// Estado único: la interfaz siempre se dibuja a partir de estos datos
const reserva = {
  estado: "disponible",   // "disponible" | "confirmada" | "cancelada"
  cupos: 3,
};

const btnReservar = document.querySelector("#btn-reservar");
const btnCancelar = document.querySelector("#btn-cancelar");
const cupos = document.querySelector("#cupos");
const panel = document.querySelector("#mi-reserva");
const insigniaIcono = document.querySelector("#insignia-icono");
const insigniaTexto = document.querySelector("#insignia-texto");
const mensaje = document.querySelector("#estado");

// Texto, ícono y mensaje de cada estado (ícono + texto, no solo color)
const VISTAS = {
  disponible: {
    icono: "○",
    insignia: "Sin reserva",
    mensaje: "Aún no tienes una reserva.",
  },
  confirmada: {
    icono: "✓",
    insignia: "Confirmada",
    mensaje: "Reserva confirmada: Interfaces web accesibles, jueves de 14:00 a 16:00 en el Laboratorio 2.",
  },
  cancelada: {
    icono: "✕",
    insignia: "Cancelada",
    mensaje: "Reserva cancelada. Tu lugar volvió a quedar disponible; puedes reservar de nuevo.",
  },
};

function dibujar() {
  const vista = VISTAS[reserva.estado];
  const tieneReserva = reserva.estado === "confirmada";

  panel.dataset.estado = reserva.estado;
  insigniaIcono.textContent = vista.icono;
  insigniaTexto.textContent = vista.insignia;
  mensaje.textContent = vista.mensaje;      // role="status" lo anuncia
  cupos.textContent = String(reserva.cupos);

  // Prevención de errores: no se puede reservar dos veces ni sin cupos,
  // ni cancelar algo que no existe.
  btnReservar.disabled = tieneReserva || reserva.cupos === 0;
  btnCancelar.disabled = !tieneReserva;
}

function reservar() {
  if (reserva.estado === "confirmada" || reserva.cupos === 0) return;  // acción duplicada bloqueada
  reserva.estado = "confirmada";
  reserva.cupos -= 1;
  dibujar();
  btnCancelar.focus();   // el foco pasa al único botón disponible
}

function cancelar() {
  if (reserva.estado !== "confirmada") return;
  reserva.estado = "cancelada";
  reserva.cupos += 1;
  dibujar();
  btnReservar.focus();   // el foco vuelve al botón disponible
}

// Se pasa la referencia de la función: reservar, no reservar()
btnReservar.addEventListener("click", reservar);
btnCancelar.addEventListener("click", cancelar);

dibujar();
