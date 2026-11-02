# Recetario

Aplicación web personal (PWA) para guardar recetas, instalable en el ordenador (Chrome) y en Android.

**Dirección:** https://carlosmera10.github.io/recetario/

## Funciones

- **Recetas** con título, categoría, etiquetas, descripción, raciones, tiempos de preparación y cocción, ingredientes, pasos, notas y enlace de origen.
- **Ingredientes estructurados**: cantidad + unidad (`g`, `kg`, `ml`, `l`, `cda`, `cdta`, `ud`) + ingrediente del catálogo. Cantidad vacía = «al gusto». Admite coma, punto y fracciones (`1/2`, `1 1/2`).
- **Catálogo de ingredientes** con sección del súper. Renombrar un ingrediente lo cambia en todas las recetas; no se puede borrar si alguna receta lo usa.
- **Ficha de receta** con selector de raciones que escala las cantidades y pasos que se tachan al tocarlos. En cada paso, los ingredientes que nombra salen resaltados y, debajo, con su cantidad escalada (se reconocen solos, en singular o plural y sin importar tildes).
- **Búsqueda** por título, ingrediente, etiqueta o categoría; filtros por categoría y etiquetas combinables; orden A-Z, más recientes o más rápidas.
- **Categorías** (con orden) y **etiquetas** editables.
- **Deshacer** en cada cambio (aviso con «Deshacer», Ctrl+Z en el ordenador).
- **Copias de seguridad**: exportar JSON, importar con «Fusionar» o «Sustituir», recordatorio periódico, exportar todas las recetas en Markdown y copiar una receta como texto.
- **Thermomix TM5**: cada receta es «Tradicional» o «Thermomix TM5». En las de Thermomix, cada paso lleva uno o varios programas (tiempo, temperatura 37-120 °C o Varoma, velocidad cuchara o 0,5-10, velocidad progresiva, giro inverso, Amasar, Turbo con veces) y accesorios (mariposa, cestillo, recipiente Varoma, sin cubilete). Se muestran como «5 min/100 °C/giro inverso/vel cuchara». Avisos de lo que la TM5 no puede hacer (más de 120 °C, más de 99 min, modos de TM6/TM7).
- **Duplicar** una receta para adaptarla (por ejemplo, de tradicional a Thermomix).
- **Pegar receta**: analiza un texto copiado (Cookidoo, blogs, notas) y abre el editor sin guardar. Reconoce título, raciones, tiempos, ingredientes (g, kg, ml, cucharadas, fracciones, «1.000 g», latas con peso), pasos con programas de Thermomix, consejos y enlace.
- **Macros**: cada ingrediente del catálogo guarda sus valores por 100 g en crudo, la densidad y el peso por unidad. La ficha calcula los macros por ración y el total, con aviso «Incompleto» y la lista de lo que falta; las tarjetas muestran las kcal por ración. Open Food Facts es una ayuda opcional para copiar los datos de productos envasados.
- **Lista de la compra**: marca recetas con el carrito de la tarjeta o desde la ficha (con las raciones elegidas). Suma los ingredientes entre recetas (500 g, 3 huevos, 3 dientes de ajo), los agrupa por sección del súper, cada una con su color e icono, y permite tachar, ocultar lo que ya tienes, añadir artículos sueltos, copiar como texto lo que falta y vaciar la lista. Las secciones del súper se editan (nombre, orden, añadir y borrar).
- Tema automático, claro u oscuro.

Próximas fases: modo cocina, fotos y sincronización.

## Instalación

La forma más sencilla es el botón **«Instalar app»** de la propia aplicación (abierta en Chrome):
- **Móvil:** franja verde arriba, en Recetas.
- **Ordenador:** en la barra lateral, encima de «Deshacer».
- **Los dos:** en **Ajustes y avisos → Aplicación**, que además dice si ya está instalada.

El botón solo aparece cuando Chrome permite instalarla (no si ya está instalada). Si no aparece, usa el menú de Chrome:

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

- Se guardan **solo en el dispositivo**, en IndexedDB (base de datos `recetario_v1`). Las preferencias de la interfaz van en `localStorage` con la clave `recetario_v1_ui`. Cada cambio se apunta también en `recetario_v1_pending` hasta que IndexedDB confirma la escritura, para no perderlo si la app se cierra en ese instante.
- El repositorio solo contiene código, nunca datos.
- El origen `carlosmera10.github.io` se comparte con otras apps: **no uses «borrar datos del sitio»**. Para vaciar el recetario usa **Ajustes y avisos → Vaciar**.
- Para pasar recetas entre el móvil y el ordenador: exporta en uno e importa con «Fusionar» en el otro.

## Notas técnicas

- HTML, CSS y JS vanilla en un único `index.html`, sin librerías ni compilación.
- Service worker «primero la red» (`cache: 'no-store'`), registrado con `updateViaCache: 'none'`. **Subir el número de `CACHE` en `sw.js` cada vez que se cambie ese archivo.**
- Ganchos de prueba en `window.__recetario` (`state`, `normalizeState`, `convertUnit`, `toGrams`, `parseQty`, `fmtQty`, `mergeStates`, `undo`, `parseRecipeText`, `extractPrograms`, `parseIngLine`, `fmtProgram`, `stepWarnings`, `stepIngredients`, `ingCandidates`, `fold`, `buildShoppingList`, `shoppingText`, `computeMacros`, `parseOff`, `setState(json)`).
