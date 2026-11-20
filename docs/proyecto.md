# Ficha de aplicación al proyecto · APE 5 Fase 1

**Proyecto:** Aula Abierta, reserva de talleres (a partir del Boceto A de escritorio)
**Pantalla trabajada:** «Elige tu taller»
**Asignatura:** Interacción Humano–Computador · UTA FISEI · 5.º Software «B»

## 1. Diagnóstico del Boceto A a 360 px

| Medición | Boceto A | Versión adaptable |
|---|---|---|
| Ancho de la página (`scrollWidth`) a 360 px | **960 px**: desborde de 600 px | **360 px**: sin desborde |
| Posición del panel «Mi reserva» a 360 px | Empieza en x = 600 px, **fuera de la pantalla** | Debajo del taller, en el orden de lectura |
| Tarjeta del taller a 360 px | Mide 580 px, **se corta** a la derecha | Ocupa el ancho disponible |
| Botón «Reservar un lugar» | Deshabilitado, la tarea no se puede completar | Activo, con estados y foco |

**Qué se pierde:** a 360 px el estudiante ve solo el inicio de la tarjeta del taller. **El panel de estado «Mi reserva» queda totalmente fuera de la pantalla**, así que después de reservar nunca sabría si su reserva se confirmó, salvo que se desplace hacia la derecha, algo que casi nadie hace en un celular. Además, los anchos fijos (`body { width: 960px }` y `grid-template-columns: 580px 360px`) impiden que el contenido se adapte.

## 2. Secuencia de la tarea

| Paso | Contenido |
|---|---|
| **Actor** | Estudiante de la FISEI que quiere asistir a un taller |
| **Tarea** | Reservar un lugar en el taller «Interfaces web accesibles» y, si lo necesita, cancelarlo |
| **Dato decisivo** | **Cupos disponibles** (3 de 20), junto con el día, horario y lugar |
| **Acción principal** | Pulsar **«Reservar un lugar»** |
| **Estado final** | **Confirmada**: el panel «Mi reserva» muestra «✓ Confirmada» con los datos del taller, y los cupos bajan a 2. Si cancela, pasa a **Cancelada** y el cupo se devuelve |

## 3. Regla de negocio

Un estudiante puede tener **como máximo una reserva activa** por taller, y no se puede reservar cuando los **cupos disponibles son 0**. Al cancelar, el cupo se devuelve al taller.

## 4. Criterio de aceptación medible

- **Sin duplicados:** al pulsar «Reservar un lugar» 5 veces seguidas, existe **1 sola reserva** y los cupos bajan **exactamente 1** (de 3 a 2). El botón queda `disabled` después del primer clic.
- **Estado visible:** a **360 px** la página no tiene desplazamiento horizontal (`scrollWidth` = 360) y el mensaje de estado se actualiza en **menos de 1 segundo** después de la acción.
- **Teclado:** la tarea completa (reservar y cancelar) se realiza **solo con teclado**. Después de confirmar, el foco queda en «Cancelar reserva», y después de cancelar vuelve a «Reservar un lugar».

## 5. Decisión HCI justificada

**Decisión:** ubicar el panel «Mi reserva» **inmediatamente después del taller en el HTML**. En móvil queda debajo, en una sola columna, y desde 768 px queda al lado, en dos columnas. Cada cambio se comunica con `role="status"` y el foco se mueve al botón que sigue disponible.

**Justificación:**

- **Visibilidad del estado del sistema (Nielsen 1):** en el boceto, el estado de la reserva desaparecía en móvil. Ahora siempre se puede encontrar siguiendo el orden natural de lectura, y el lector de pantalla lo anuncia sin que el usuario tenga que buscarlo.
- **Prevención de errores (Nielsen 5):** «Reservar» se desactiva al confirmar, lo que hace imposible una reserva duplicada, y «Cancelar» solo está activo cuando existe una reserva.
- **Orden de lectura constante:** el CSS cambia la distribución, pero no el orden del HTML. El usuario de teclado o de lector de pantalla recorre la información en la misma secuencia en móvil y en escritorio: primero el taller, luego la acción y al final el estado.

## 6. Hipótesis para la Fase 2

> En móvil (360 px), después de pulsar «Reservar un lugar», el panel «Mi reserva» queda debajo de la tarjeta del taller. **Hipótesis:** al menos 4 de 5 estudiantes notarán la confirmación sin necesidad de desplazarse. Si no se cumple, en la Fase 2 se evaluará mostrar un mensaje de confirmación junto al botón.

**Problema detectado en la revisión entre pares:** «Cancelar reserva» se ejecuta sin pedir confirmación, así que un toque accidental anularía la reserva. Se validará en la Fase 2 si conviene agregar una opción de **deshacer**.
