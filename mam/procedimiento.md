Datos:
https://www.hacienda.gob.es/es-ES/GobiernoAbierto/Datos%20Abiertos/Paginas/licitaciones_plataforma_contratacion.aspx

Hay tres tipos de ficheros:
1.- ​Licitaciones publicadas en los perfiles del contratante ubicados en la Plataforma de Contratación del Sector Público, excluyendo los contratos menores.

2.- Licitaciones publicadas en la Plataforma mediante mecanismos de agregación, excluyendo los contratos menores.
En estos ficheros estas las licitaciones que ha hecho la Junta de Andalucía. Buscando por Jerez tendremos datos.

3.- Contratos menores publicados en los perfiles del contratante ubicados en la Plataforma de Contratación del Sector Público.

.- Hay que tratar 2 ficheros los del tipo 1 y 3:
Licitaciones
Contratos menores.

Bajar ficheros de la pagina del Ministerio.
Guardar en:
C:\Users\Usuario\OneDrive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\licitaciones\2025
C:\Users\Usuario\OneDrive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\contratos menores\2025

node index
Pide mes a tratar, el que hemos bajado los datos.
Confirmar generación de ficheros.
Creará los files del mes en D:\licitaciones\src\assets\data

¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ Por alguna razon, necesita tener los ficheros del mes anterior !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Mover los files del mes anterior
De:
D:\ocm\src\assets\licitaciones-contratos-menores
a
C:\Users\Usuario\OneDrive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Copia seguridad assets data

Copiar de:
D:\licitaciones\src\assets\data
todo062025NoRepeatOkCIFOK.json
a:
D:\ocm\src\assets\licitaciones-contratos-menores

D:\ocm\src\app\pages\art15\licitaciones-contratos-menores\grid.ts
Cambiar linea 14
grid-agrupado-proveedor.ts
Cambiar linea 11

D:\ocm\src\app\pages\art15\licitaciones-contratos-menores\grid-agrupado-proveedor\grid.-agrupado-proveedor.ts
cambiar lia 12

Cambiar fecha package.json

NO HACE FALTA
En proyecto licitaciones generador-table.component.ts cambiar linea 9

ng build
winSCP
/con/
Mover a E:/copia seguridad
mover ficheros build

NUEVO AÑO
Cambiar en index.js y Y TODOS LOS DEMAS FICHEROS el año
usar search & replace
En Cifrepeat.js linea 42 hay que dejar el año anterior ya que buscara el 122024
const oldData = fs.readFileSync(`${pathApp}/todoAdjudicatarias${month}2025.json`);
Lo mismo en index.js linea 332
const appPathFileData = path.join(appPath, `todo${month}2025NoRepeatOkCIFOK.json`);

Despues de obtener los resultados de enero. CaMBIAR YA ESTAS DOS LINEAS AL AÑO ACTUAL

crear carpetas con nuevoAño
Crear carpetas resultado en con subcarpetas por mes 01,02......
Copiar y pegar en cada uno de estos directorios
C:\Users\Usuario\OneDrive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\licitaciones\nuevoAño
C:\Users\Usuario\OneDrive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\contratos menores\nuevoAño
C:\Users\Usuario\OneDrive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Tratados con searchRepeat.js\nuevoAño + CARPETAS DE MESES
