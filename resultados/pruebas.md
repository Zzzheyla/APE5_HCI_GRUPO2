# Pruebas técnicas en navegador · APE 5 Fase 2

**Issue:** #3 · **Responsable:** Martín Palacios · **Revisor:** David Pérez
**Versión probada:** `src/index.html` (rama `main` integrada)
**Herramienta:** Chrome DevTools, modo dispositivo, zoom 100 %
**Medición en consola:** `[document.documentElement.scrollWidth, innerWidth]`
**Criterio de aceptación:** `scrollWidth <= innerWidth` (sin desborde horizontal)

## 1. Resultados

| Viewport | scrollWidth | innerWidth | ¿Desborde? | Columnas | Panel «Mi reserva» (top) | Captura |
|---|---|---|---|---|---|---|
| 320 × 720 | 320 | 320 | No ✅ | 1 (288 px) | 565 px | [pruebas-320.png](../evidencias/fase2/pruebas-320.png) |
| 360 × 800 | 360 | 360 | No ✅ | 1 (328 px) | 513 px | [pruebas-360.png](../evidencias/fase2/pruebas-360.png) |
| 768 × 1024 | 768 | 768 | No ✅ | 2 (427 + 285 px) | 160 px | [pruebas-768.png](../evidencias/fase2/pruebas-768.png) |
| 1366 × 768 | 1366 | 1366 | No ✅ | 2 (542 + 362 px) | 160 px | [pruebas-1366.png](../evidencias/fase2/pruebas-1366.png) |

**Comparación con el Boceto A:** a 360 px el boceto tenía `scrollWidth = 960` (600 px de desborde); la versión adaptable tiene 360.

## 2. Pruebas de interacción

| Prueba | Resultado |
|---|---|
| 5 clics seguidos en «Reservar un lugar» | 1 sola reserva; cupos 3 → 2; botón `disabled` ✅ |
| Tarea solo con teclado (Tab + Enter) | Reservar → foco en «Cancelar» → Enter → foco vuelve a «Reservar» ✅ |
| Orden de Tab a 360 y 1366 px | Igual en ambos: Saltar al contenido → Reservar → Cancelar ✅ |
| Región `role="status"` | El mensaje se actualiza en cada estado (< 1 s) ✅ |

## 3. Observación técnica

- **360 × 800:** después de reservar, el mensaje de estado queda dentro de la pantalla (y = 605–682 px) **sin desplazarse**.
- **320 × 720:** el panel «Mi reserva» termina en y = 768 px, más abajo del alto visible (720 px). Al confirmar, el foco pasa a «Cancelar» y el navegador desplaza la página solo, así que el mensaje queda visible (y = 446–523 px). **La confirmación se ve gracias al movimiento del foco, no a la distribución.** Este dato se contrasta con la observación con usuarios (Issue #4).
