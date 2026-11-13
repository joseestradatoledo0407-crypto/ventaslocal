# Venta de software

Sitio estático en español para presentar un catálogo de software, servicios de implementación y soporte en San Isidro, Lima. Hecho con HTML, CSS y JavaScript.

## Archivos

- `index.html`: página, catálogo, contacto y carrito.
- `styles.css`: diseño adaptable a móvil y escritorio.
- `app.js`: catálogo, filtros, vendedores, carrito, ventas y descarga de Excel.
- `ventas-y-vendedores.xlsx`: libro inicial con las tablas `ventas` (50 filas de muestra) y `vendedor` (5 filas). La columna `Vendedor` relaciona ambas.
- `create-workbook.ps1`: genera de nuevo el libro inicial.

## Uso

Abre `index.html` en un navegador. Añade productos al carrito, elige vendedor e indica el cliente. Al registrar la venta, el navegador conserva los registros en `localStorage` y descarga `ventas-y-vendedores.xlsx` con las hojas actualizadas `ventas` y `vendedor`.

Las ilustraciones y el diseño están incluidos en el código: la página abre sin cargar fuentes, imágenes o scripts de terceros. Solo al pedir la descarga del Excel se carga SheetJS desde jsDelivr, por lo que esa acción requiere Internet. Un sitio estático no puede modificar en silencio un archivo Excel que ya esté guardado en el equipo. Cada venta descarga un libro actualizado, que el vendedor puede guardar en la ubicación compartida acordada. Los datos de `localStorage` pertenecen al navegador y perfil donde se registraron.

Los productos, precios y ventas del libro son ejemplos referenciales; confirma condiciones, disponibilidad, licencias e IGV antes de operar. El teléfono se presenta como +51 943 094 835.
