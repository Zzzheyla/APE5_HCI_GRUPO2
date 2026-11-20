# Defensa cruzada QA/UX · APE 5 Fase 2

**Issue:** #5 · **Responsable:** Martín Palacios · **Revisor:** David Pérez
**Grupo retador asignado:** G3

> ℹ️ **Nota:** la dinámica de defensa cruzada con el grupo retador no se realizó en clase. Este documento registra la **preparación del Grupo 2**: las respuestas que sustentaríamos ante G3, cada una respaldada por código, mediciones y principios HCI.

---

## Pregunta técnica 1 · Punto de corte en CSS y orden con Tab

> **G3:** ¿Por qué el punto de corte está en 48rem y cómo garantizan que al cambiar a dos columnas no se altere el orden de navegación con Tab?

**Respuesta:**

1. **Por qué 48rem (768 px):** a partir de ese ancho caben el taller (≈ 427 px) y el panel de estado (≈ 285 px) uno al lado del otro sin comprimir el texto. Por debajo, dos columnas dejarían el panel de estado en menos de 200 px de ancho. Usamos `rem` y no `px` para que el punto de corte respete el tamaño de letra que configura el usuario: si aumenta la fuente base, el cambio a dos columnas llega más tarde y el texto no se aprieta.
2. **Orden preservado:** el HTML define el orden de lectura (taller → acción → estado) y el CSS solo cambia la distribución. No usamos `order`, `grid-area`, `flex-direction: row-reverse` ni `tabindex` positivos.

~~~css
/* src/estilos.css */
.distribucion { display: grid; grid-template-columns: 1fr; }            /* base móvil */
@media (min-width: 48rem) {
  .distribucion { grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); }
}
~~~

**Evidencia:**
- `resultados/pruebas.md`: el orden de Tab es idéntico a 360 y a 1366 px (Saltar al contenido → Reservar → Cancelar).
- Una columna a 320 y 360 px, dos columnas a 768 y 1366 px, sin desborde en ninguno.

**Principios:** WCAG 1.3.2 (secuencia significativa), WCAG 2.4.3 (orden del foco), consistencia (Nielsen 4).

---

## Pregunta técnica 2 · Envíos duplicados y gestión del foco

> **G3:** ¿Cómo evitan que el estudiante reserve dos veces y qué pasa con el foco cuando el botón que pulsó se deshabilita?

**Respuesta:**

1. **Doble protección contra duplicados:**
   - **Interfaz:** al confirmar, `btnReservar.disabled = true`.
   - **Lógica:** `reservar()` sale de inmediato si el estado ya es `confirmada` o si no hay cupos, aunque el evento llegue igual.
2. **Gestión del foco:** cuando un botón con foco se deshabilita, el navegador pierde el foco y el usuario de teclado queda "perdido" al inicio de la página. Por eso lo movemos de forma explícita al único botón útil:
   - Tras **confirmar**, el foco pasa a «Cancelar reserva».
   - Tras **cancelar**, el foco vuelve a «Reservar un lugar».
3. **Anuncio del cambio:** el mensaje está en `<p role="status">`, así que el lector de pantalla lo lee sin mover el foco.

~~~js
// src/reserva.js
function reservar() {
  if (reserva.estado === "confirmada" || reserva.cupos === 0) return; // bloqueo lógico
  reserva.estado = "confirmada";
  reserva.cupos -= 1;
  dibujar();             // aplica disabled a «Reservar»
  btnCancelar.focus();   // el foco no se pierde
}
~~~

**Evidencia:**
- `resultados/pruebas.md`: con 5 clics seguidos en «Reservar» queda 1 sola reserva y los cupos bajan solo de 3 a 2.
- La tarea completa se hace solo con teclado (Tab + Enter) y el foco termina siempre en un botón activo.

**Principios:** prevención de errores (Nielsen 5), visibilidad del estado (Nielsen 1), WCAG 2.4.3 (orden del foco), WCAG 4.1.3 (mensajes de estado).

---

## Objeción de diseño · Ajuste geométrico vs. comprensión real

> **G3:** Que `scrollWidth` sea igual a `innerWidth` solo demuestra que la página "cabe" en la pantalla, no que el estudiante entienda que su reserva se confirmó.

**Respuesta:**

Aceptamos la objeción: **el ajuste geométrico es necesario, pero no suficiente.** Por eso separamos dos tipos de evidencia.

| Tipo de evidencia | Qué demuestra | Fuente |
|---|---|---|
| **Geométrica** | No hay desborde y el panel de estado está en el flujo de lectura | `resultados/pruebas.md` (4 viewports) |
| **Comprensión** | El usuario nota y entiende la confirmación | `resultados/checklist.md` (observación, Issue #4) |

**Qué hicimos en el diseño para ir más allá del ajuste geométrico:**
- El estado se comunica de forma **redundante**: ícono + texto + color (✓ Confirmada), nunca solo color.
- El mensaje repite los **datos del taller** (día, hora, lugar), así que el usuario confirma *qué* reservó y no solo *que* reservó.
- El dato decisivo (cupos) cambia de 3 a 2 a la vista.

**Lo que las mediciones no resuelven:** a **320 × 720** el panel «Mi reserva» termina por debajo del área visible (y = 768 px). La confirmación se ve porque el foco desplaza la página, no por la distribución. Esto **le da parte de razón a G3**, y por eso lo contrastamos con usuarios reales.

**Dato observado con usuarios (Issue #4):**
- Participantes que notaron la confirmación sin desplazarse: **__ de __** *(completar con `resultados/checklist.md`)*
- Cancelaciones accidentales: **__** *(completar)*

**Decisión según el resultado:**
- Si **≥ 4 de 5** notan la confirmación → se mantiene el diseño actual.
- Si **< 4 de 5** → en la siguiente iteración se agrega un mensaje de confirmación junto al botón «Reservar» y una opción **Deshacer** al cancelar.

**Principios:** visibilidad del estado (Nielsen 1), correspondencia con el mundo real (Nielsen 2), evaluación centrada en el usuario (Cañas, Granollers y Lorés, 2012).
