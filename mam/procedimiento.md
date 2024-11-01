node index
Pide mes a tratar, el que hemos bajado los datos.
Confirmar generación de ficheros.
Creará los files del mes en D:\licitaciones\src\assets\data
¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ Por alguna razon, necesita tener los ficheros del mes anterior
Mover los files del mes anterior a C:\Users\Usuario\OneDrive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Copia seguridad assets data
Dejar localeTextESPes.json y entesContratacion-data.ts

En proyecto licitaciones generador-table.component.ts cambiar linea 9
Cambiar fecha package.json

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

NUEVO AÑO

Cambiar en index.js y Y TODOS LOS DEMAS FICHEROS el año
usart search & replace
crear carpetas con nuevoAño
Crear carpetas resultado en
C:\Users\Usuario\OneDrive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\licitaciones\nuevoAño
C:\Users\Usuario\OneDrive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\contratos menores\nuevoAño
C:\Users\Usuario\OneDrive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Tratados con searchRepeat.js\nuevoAño + CARPETAS DE MESES
