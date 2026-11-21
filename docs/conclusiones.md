# Conclusiones · APE 5 (Fases 1 y 2)

**Grupo:** 2 · **Asignatura:** Interacción Humano-Computador · **Fecha:** viernes 20 de noviembre de 2026

| Elemento | Contenido |
|---|---|
| **Requisito** | La interfaz debía mantener el estado de la reserva visible y utilizable en móvil, sin desborde horizontal, y permitir reservar y cancelar sin ayuda. |
| **Decisión** | Diseño adaptable con 1 columna en móvil y 2 en tablet y escritorio; panel «Mi reserva» ubicado después del taller con `role="status"`; tras reservar, el foco pasa a «Cancelar». Cancelar no pide confirmación. |
| **Dato observado** | **Pruebas técnicas (#3):** `scrollWidth` = `innerWidth` en los 4 viewports (320, 360, 768 y 1366 px), sin desborde. A 360 px, el Boceto A tenía `scrollWidth` = 960 (600 px de desborde) y la versión adaptable tiene 360. **Observación con usuarios (#4):** 3 de 3 participantes vieron la confirmación sin desplazarse (hipótesis 1 se cumple) y 0 de 3 cancelaron por accidente. Tiempo promedio 56 s (32, 57 y 79 s); 2 de 3 pidieron ayuda; 3 errores de navegación en total. |
| **Limitación** | Solo 3 participantes (el umbral era 5) y solo en celular a 360 px. A 320 × 720, el panel «Mi reserva» termina en y = 768 px, fuera del área visible; la confirmación se ve porque el foco desplaza la página, no por la distribución. No se probó con lector de pantalla real. La defensa cruzada con el grupo retador no se realizó en clase; `docs/preguntas.md` registra la preparación. |
| **Siguiente iteración** | Opción «Deshacer» al cancelar; reducir la carga visual en móvil, porque la saturación creció con el tiempo y los errores (P1 → P3); subir el panel «Mi reserva» para que sea visible sin depender del scroll automático a 320 px; repetir la prueba con 5 o más participantes y con lector de pantalla. |

## Reflexión del grupo

**Lo que funcionó.** La validación técnica confirmó que la versión adaptable elimina el desborde: de 600 px de sobrante a 360 px en el Boceto A a `scrollWidth` igual a `innerWidth` en los cuatro tamaños. Además, los 3 participantes percibieron la confirmación de la reserva sin desplazarse y nadie canceló por accidente, así que la hipótesis principal de la Fase 1 se sostiene con los datos disponibles.

**Lo que no pudimos comprobar.** Una interfaz que cabe en la pantalla no garantiza que se entienda. Aunque todos vieron la confirmación, el tiempo (32, 57 y 79 s), los errores (0, 1 y 2) y los pedidos de ayuda aumentaron con la saturación que percibió cada participante. Además, a 320 px la confirmación depende de que el foco desplace la página, un mecanismo que no probamos con tecnologías de apoyo. Con solo 3 participantes, la muestra no permite generalizar.

**Aprendizaje HCI.** La diferencia entre ajuste geométrico y comprensión real es la lección central de este APE: las mediciones de `scrollWidth` verifican que el diseño cabe, pero solo la observación con usuarios muestra si se entiende. Para la siguiente iteración, la prioridad es reducir la carga visual en móvil y dar a quien cancela una forma de deshacer, y validar ambos cambios con una muestra mayor.
