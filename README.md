# Sistema óseo: módulos de estudio

Página web sencilla para estudiar los 206 huesos del esqueleto humano, organizada en módulos por región del cuerpo.

## Qué hace

- Seis módulos colapsables: Cabeza, Columna vertebral, Tórax, Miembros superiores, Pelvis y Miembros inferiores.
- Cada hueso tiene su nombre y un recuadro para subir tu propia imagen.
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
│   └── app.js
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

## Datos guardados

Los huesos marcados se guardan en `localStorage` y las imágenes subidas en `IndexedDB`, ambos del propio navegador. Nada se envía a ningún servidor. Si borras los datos del sitio, se pierden.

## Personalizar

- **Lista de huesos:** edita el arreglo `MODULES` al inicio de `js/app.js`. El total del contador se calcula solo a partir de esa lista.
- **Colores:** cambia las variables CSS al inicio de `css/styles.css`.

## Fuente de los contenidos

Basado en las presentaciones "Sistema óseo" y "El sistema esquelético y el sistema locomotor". El conteo de 206 huesos es el estándar anatómico para un adulto.

## Licencia

MIT
