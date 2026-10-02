# Sistema óseo: módulos de estudio

Página web sencilla para estudiar los 206 huesos del esqueleto humano, organizada en módulos por región del cuerpo.

## Qué hace

- Seis módulos colapsables: Cabeza, Columna vertebral, Tórax, Miembros superiores, Pelvis y Miembros inferiores.
- Cada hueso tiene su nombre y un recuadro con su imagen. Puedes reemplazarla subiendo la tuya, que siempre tiene prioridad sobre la incluida en el repositorio.
- Al tocar el nombre de un hueso el contador suma +1; si lo tocas de nuevo, resta -1.
- Los pares (derecho e izquierdo), las vértebras, las costillas y las falanges cuentan por separado.
- Responsive: funciona en celular, tableta y escritorio, con modo claro y oscuro automático.

## Estructura

```
sistema-oseo/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── imagenes.js        (lo genera el script de descarga)
├── img/                   (aquí quedan las imágenes descargadas)
├── tools/
│   └── descargar_imagenes.py
├── CREDITOS.md            (lo genera el script de descarga)
├── .nojekyll
├── .gitignore
├── LICENSE
└── README.md
```

## Uso local

No necesita instalación ni dependencias. Abre `index.html` en el navegador.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube estos archivos a la raíz.
2. Ve a **Settings > Pages**.
3. En **Source** elige **Deploy from a branch**, selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. En un par de minutos la página queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

Comandos para subirlo desde la terminal:

```bash
git init
git add .
git commit -m "Primera versión: módulos del sistema óseo"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/NOMBRE-DEL-REPO.git
git push -u origin main
```

## Imágenes de los huesos

Las imágenes salen de Wikimedia Commons (licencias libres, la mayoría láminas de dominio público de *Gray's Anatomy*). El script toma la imagen principal del artículo de Wikipedia de cada hueso, la descarga a `img/` y guarda autor y licencia.

```bash
python3 tools/descargar_imagenes.py
```

1. Abre `tools/descargar_imagenes.py` y cambia `CONTACTO` por tu correo (Wikimedia lo pide para identificar quién usa su API).
2. Ejecútalo desde la raíz del proyecto. Necesita internet y Python 3.8 o superior, sin instalar nada más.
3. Al terminar genera `js/imagenes.js` y `CREDITOS.md`, y lista los huesos que no pudo obtener. Esos se reintentan con `--solo clave1 clave2`.
4. Sube `img/`, `js/imagenes.js` y `CREDITOS.md` al repositorio junto con el resto.

Opciones útiles: `--solo femur humero` procesa solo esas claves y `--forzar` descarga todo de nuevo.

Detalles a tener en cuenta:

- Se descargan unas 55 imágenes distintas, no 206: una misma imagen sirve para el lado derecho e izquierdo, y para todas las vértebras de un mismo tipo, costillas o falanges.
- La imagen principal de algunos artículos es una lámina del grupo (por ejemplo, las falanges o los cuneiformes), no del hueso aislado. Si quieres una mejor, súbela desde la página, o guarda el archivo en `img/` con el nombre de la clave y edita su entrada en `js/imagenes.js`.
- Si una imagen no carga, la página vuelve sola al recuadro para subir la tuya.
- Al ampliar una imagen se muestra su autor y licencia. Revisa `CREDITOS.md` antes de reutilizarlas fuera de este proyecto.

## Datos guardados

Los huesos marcados se guardan en `localStorage` y las imágenes que subas tú en `IndexedDB`, ambos del propio navegador. Las imágenes del repositorio viven en `img/`. Nada se envía a ningún servidor. Si borras los datos del sitio, se pierden.

## Personalizar

- **Lista de huesos:** edita el arreglo `MODULES` al inicio de `js/app.js`. El total del contador se calcula solo a partir de esa lista.
- **Colores:** cambia las variables CSS al inicio de `css/styles.css`.

## Fuente de los contenidos

Imágenes: Wikimedia Commons (ver `CREDITOS.md` una vez descargadas). Basado en las presentaciones "Sistema óseo" y "El sistema esquelético y el sistema locomotor". El conteo de 206 huesos es el estándar anatómico para un adulto.

## Licencia

MIT
