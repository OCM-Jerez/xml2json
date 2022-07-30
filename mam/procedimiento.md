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

LICITACIONES
 Guardar enlace como  => C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\licitaciones\2022\
 HAY QUE CONFIRMAR DESCARGA
1.- En index.js cambiar nombre del fichero del mes correspondiente.
2.- GRABAR
3.- Borrar carpeta resultados
4.- node index.js
5.- Se generaran ficheros de resultados en la carpeta resultados.
6.- Mover la carpeta resultados a C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\ CARPETA CORRESPONDIENTE.
7.- finalNoRepeat.json es el fichero con los duplicados encontrados tratados para dejar unicamente los más recientes.
8.- Abrir finalNoRepeat.json
9.- CTRL + b para formatatear JSON


CONTRATOS MENORES
Guardar enlace como  => C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\contratos menores\2021\
 HAY QUE CONFIRMAR DESCARGA
1.- En index.js cambiar nombre del fichero del mes correspondiente.
2.- GRABAR
3.- Borrar carpeta resultados
4.- node index.js
5.- Se generaran ficheros de resultados en la carpeta resultados.
6.- Mover la carpeta resultados a C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\ CARPETA CORRESPONDIENTE.
7.- finalNoRepeat.json es el fichero con los duplicados encontrados tratados para dejar unicamente los más recientes.
8.- Abrir finalNoRepeat.json
9.- CTRL + b para formatatear JSON


CREAR JSON CON TODOS LOS CONTRATOS Y LICITACIONES
1.- Copiar todo{ultimo mes existente}2022NoRepeatOkCIFOK.json en carpeta C:\Users\Usuario\Google Drive\Angular\plataforma-contratacion-estado\src\assets\data
2.- Pegar como todo{mes que estamos tratando}2022NoRepeat.json IMPORTANTE sin OK..... al final
3.- Mover a C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Obsoletos LOS FICHEROS del mes anterior
4.- Abrir fichero creado en punto anterior. EL RENOMBRADO CON EL MES ACTUAL
5.- CTRL + b para formatatear JSON
6.- Añadir finalNoRepeat.json de licitaciones a todo{mes que estamos tratando}2021NoRepeat.json. NO COPIAR []
7.- Añadir coma al final fichero anterior
8.- Añadir finalNoRepeat.json de contratos a todo{mes que estamos tratando}2021NoRepeat.json. NO COPIAR []
9.- Mover todoXX2022NoRepeat.json a C:\Users\Usuario\Google Drive\Node.js\xml2json


searchRepeat.js
1.- Abrir searchRepeat.js
21.- Cambiar todos las referencia a mes actual en lineas 2-44-45-46 y 72
3.- GRABAR
4.- BORRAR CARPETA RESULTADOS
5.- node searchRepeat.js
6.- Genera todo{mes actual}2021NoRepeatOK.json y demas ficheros en subdirectorio Resultados
7.- Crear carpeta del mes correspondiente en directorio "Tratados con searchRepeat.js"
8.- Mover todos los ficheros de "Resultados" a la carpeta creada en punto anterior.
9.- Borrar todo{mes actual}2022NoRepeat.json en C:\Users\Usuario\Google Drive\Node.js\xml2json
10.- Copiar todo{mes actual}2022NoRepeatOK.json a C:\Users\Usuario\Google Drive\Node.js\xml2json

CIFrepeat.js
1.- En CIFrepeat.js
2.- Cambiar las referencias  mes actual en lineas 4-51-52 y 96
3.- GRABAR
4.- Tratar todo{mes actual}2021NoRepeatOK.json con CIFrepeat.js
5.- node CIFrepeat.js
6.- Comienza a solicitar seleccionar CID adecuado
7.- Genera todo{mes actual}2021NoRepeatOkCIFOK.json
8.- Crear carpeta "tratados con CIFRepeat.js"
9.- Mover todos los ficheros de "Resultados" a la carpeta creada en punto anterior.
10.- Copiarlo a C:\Users\Usuario\Google Drive\Angular\plataforma-contratacion-estado\src\assets\data
11.- En app plataforma-contratacion-estado   indice.component.ts cambiar fichero de datos en linea 15.











11.- Filtrar los repetidos conjs (en index.json filtramos los repetidos dentro del 
         fichero ZIP tratado, pero necesitamos el segundo paso con searchRepeat() para eliminar    
              los repetidos del mes añadido que ya estaban en todosContratosHasta082021.json

.- En años ya cerrados, por ejemplo 2020, trataremos los ficheros anuales que estan en la pagina del Ministerio.
  


"C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/licitaciones/2021/licitacionesPerfilesContratanteCompleto3_202107.zip";
Repetidas:
2 tienen el mismo valor en "updated"

 {
        "link": "https://contrataciondelestado.es/wps/poc?uri=deeplink:detalle_licitacion&idEvl=FLXNUYgqbS57h85%2Fpmmsfw%3D%3D",
        "summary": "Id licitación: 1333; Órgano de Contratación: Junta de Gobierno Local del Ayuntamiento de Jerez; Importe: 575482 EUR; Estado: RES",
        "title": "Suministro por precios unitarios y por lotes (2), de vestuario, calzado, complementos y útiles diversos para el personal del Ayuntamiento de Jerez",
        "updated": "2021-07-08T15:42:49.355+02:00",
        "ContractFolderID": "1333",
        "ContractFolderStatusCode": "RES",
        "Name": "Suministro por precios unitarios y por lotes (2), de vestuario, calzado, complementos y útiles diversos para el personal del Ayuntamiento de Jerez",
        "TypeCode": "1",
        "SubTypeCode": "2",
        "TotalAmount": 696333,
        "TaxExclusiveAmount": 575482,
        "DurationMeasure": "4",
        "unitCode": "ANN",
        "arrayTenderResult": [
            {
                "ResultCode": "3",
                "AwardDate": "2021-07-01",
                "ReceivedTenderQuantity": "1",
                "PartyIdentification": "Sin dato",
                "PartyName": "Sin dato",
                "TaxExclusiveAmount": "Sin dato",
                "PayableAmount": "Sin dato"
            },
            {
                "ResultCode": "3",
                "AwardDate": "2021-07-01",
                "ReceivedTenderQuantity": "1",
                "PartyIdentification": "Sin dato",
                "PartyName": "Sin dato",
                "TaxExclusiveAmount": "Sin dato",
                "PayableAmount": "Sin dato"
            }
        ]
    },
      {
        "link": "https://contrataciondelestado.es/wps/poc?uri=deeplink:detalle_licitacion&idEvl=FLXNUYgqbS57h85%2Fpmmsfw%3D%3D",
        "summary": "Id licitación: 1333; Órgano de Contratación: Junta de Gobierno Local del Ayuntamiento de Jerez; Importe: 575482 EUR; Estado: RES",
        "title": "Suministro por precios unitarios y por lotes (2), de vestuario, calzado, complementos y útiles diversos para el personal del Ayuntamiento de Jerez",
        "updated": "2021-07-08T15:42:49.355+02:00",
        "ContractFolderID": "1333",
        "ContractFolderStatusCode": "RES",
        "Name": "Suministro por precios unitarios y por lotes (2), de vestuario, calzado, complementos y útiles diversos para el personal del Ayuntamiento de Jerez",
        "TypeCode": "1",
        "SubTypeCode": "2",
        "TotalAmount": 696333,
        "TaxExclusiveAmount": 575482,
        "DurationMeasure": "4",
        "unitCode": "ANN",
        "arrayTenderResult": [
            {
                "ResultCode": "3",
                "AwardDate": "2021-07-01",
                "ReceivedTenderQuantity": "1",
                "PartyIdentification": "Sin dato",
                "PartyName": "Sin dato",
                "TaxExclusiveAmount": "Sin dato",
                "PayableAmount": "Sin dato"
            },
            {
                "ResultCode": "3",
                "AwardDate": "2021-07-01",
                "ReceivedTenderQuantity": "1",
                "PartyIdentification": "Sin dato",
                "PartyName": "Sin dato",
                "TaxExclusiveAmount": "Sin dato",
                "PayableAmount": "Sin dato"
            }
        ]
    },
      {
        "link": "https://contrataciondelestado.es/wps/poc?uri=deeplink:detalle_licitacion&idEvl=VE7%2BmeKHYZqmq21uxhbaVQ%3D%3D",
        "summary": "Id licitación: 1333 NSP; Órgano de Contratación: Junta de Gobierno Local del Ayuntamiento de Jerez; Importe: 575482 EUR; Estado: EV",
        "title": "Suministro por precios unitarios y por lotes (2), de vestuario, calzado, complementos y útiles diversos para el personal del Ayuntamiento de Jerez",
        "updated": "2021-07-14T12:40:57.252+02:00",
        "ContractFolderID": "1333 NSP",
        "ContractFolderStatusCode": "EV",
        "Name": "Suministro por precios unitarios y por lotes (2), de vestuario, calzado, complementos y útiles diversos para el personal del Ayuntamiento de Jerez",
        "TypeCode": "1",
        "SubTypeCode": "2",
        "TotalAmount": 696333,
        "TaxExclusiveAmount": 575482,
        "DurationMeasure": "4",
        "unitCode": "ANN"
    },