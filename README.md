# Recetario

Aplicación web personal (PWA) para guardar recetas, instalable en el ordenador (Chrome) y en Android.

**Dirección:** https://carlosmera10.github.io/recetario/

## Funciones (fase 1)

- **Recetas** con título, categoría, etiquetas, descripción, raciones, tiempos de preparación y cocción, ingredientes, pasos, notas y enlace de origen.
- **Ingredientes estructurados**: cantidad + unidad (`g`, `kg`, `ml`, `l`, `cda`, `cdta`, `ud`) + ingrediente del catálogo. Cantidad vacía = «al gusto». Admite coma, punto y fracciones (`1/2`, `1 1/2`).
- **Catálogo de ingredientes** con sección del súper. Renombrar un ingrediente lo cambia en todas las recetas; no se puede borrar si alguna receta lo usa.
- **Ficha de receta** con selector de raciones que escala las cantidades y pasos que se tachan al tocarlos.
- **Búsqueda** por título, ingrediente, etiqueta o categoría; filtros por categoría y etiquetas combinables; orden A-Z, más recientes o más rápidas.
- **Categorías** (con orden) y **etiquetas** editables.
- **Deshacer** en cada cambio (aviso con «Deshacer», Ctrl+Z en el ordenador).
- **Copias de seguridad**: exportar JSON, importar con «Fusionar» o «Sustituir», recordatorio periódico, exportar todas las recetas en Markdown y copiar una receta como texto.
- Tema automático, claro u oscuro.

Próximas fases: macros por ración, lista de la compra, modo cocina, importar recetas pegando texto, fotos y sincronización.

## Instalación

### Ordenador (Chrome)
1. Abre https://carlosmera10.github.io/recetario/ en Chrome.
2. Pulsa el icono de instalar a la derecha de la barra de direcciones, o el menú **⋮** (arriba a la derecha) → **«Transmitir, guardar y compartir»** → **«Instalar página como aplicación…»** (el nombre exacto puede variar según la versión de Chrome).
3. Confirma con **«Instalar»**.

### Android (Chrome)
1. Abre la dirección en **Chrome** (no en otro navegador).
2. Menú **⋮** (arriba a la derecha) → **«Instalar aplicación»** (o **«Añadir a la pantalla de inicio»** → **«Instalar»**).
3. Confirma. El icono aparece en la pantalla de inicio y abre la app a pantalla completa.

No abras `index.html` desde el disco (`file://`): no se instala ni funciona el service worker.

## Datos

- Se guardan **solo en el dispositivo**, en IndexedDB (base de datos `recetario_v1`). Las preferencias de la interfaz van en `localStorage` con la clave `recetario_v1_ui`.
- El repositorio solo contiene código, nunca datos.
- El origen `carlosmera10.github.io` se comparte con otras apps: **no uses «borrar datos del sitio»**. Para vaciar el recetario usa **Ajustes y avisos → Vaciar**.
- Para pasar recetas entre el móvil y el ordenador: exporta en uno e importa con «Fusionar» en el otro.

## Notas técnicas

- HTML, CSS y JS vanilla en un único `index.html`, sin librerías ni compilación.
- Service worker «primero la red» (`cache: 'no-store'`), registrado con `updateViaCache: 'none'`. **Subir el número de `CACHE` en `sw.js` cada vez que se cambie ese archivo.**
- Ganchos de prueba en `window.__recetario` (`state`, `normalizeState`, `convertUnit`, `parseQty`, `mergeStates`, `undo`, `setState(json)`).
