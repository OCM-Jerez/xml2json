Datos:
https://www.hacienda.gob.es/es-ES/GobiernoAbierto/Datos%20Abiertos/Paginas/licitaciones_plataforma_contratacion.aspx

Hay tres tipos de ficheros:
1.- ​Licitaciones publicadas en los perfiles del contratante ubicados en la Plataforma de Contratación del Sector Público, excluyendo los contratos menores.

2.- Licitaciones publicadas en la Plataforma mediante mecanismos de agregación, excluyendo los contratos menores.
    En estos ficheros estas las licitaciones que ha hecho la Junta de Andalucía. Buscando por Jerez tendremos datos.

3.- Contratos menores publicados en los perfiles del contratante ubicados en la Plataforma de Contratación del Sector Público.    

.- Hay que tratar 2 ficheros los del tipo 1 y 3:
    Contratos menores.
    Licitaciones

Guardar enlace como.
Puede ser necesario seleccionar guardar en la parte inferior de la página.


CONTRATOS MENORES
1.- En index.js cambiar nombre del fichero del mes correspondiente.
2.- Se generaran ficheros de resultados en la carpeta resultados.
3.- finalNoRepeat.json es el fichero con los duplicados encontrados tratados para dejar unicamente los más recientes.
4.- Mover la carpeta resultados a C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\ CARPETA CORRESPONDIENTE.
8.- Agregar contratos092021.json a contratosYlicitaciones082021.json.
    NO COPIAR LOS [] 
9.- Anotar dato en el indice.txt
10.- Guardar como todosContratosHasta092021.json. SE VA INCREMENTANDO EL MES, en C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\contratos menores

LICITACIONES
1.- En index.js cambiar nombre del fichero del mes correspondiente.
2.- Se generaran ficheros de resultados en la carpeta resultados.
3.- finalNoRepeat.json es el fichero con los duplicados encontrados tratados para dejar unicamente los más recientes.
4.- Mover la carpeta resultados a C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\ CARPETA CORRESPONDIENTE.
8.- Agregar licitaciones092021.json a contratosYlicitaciones082021.json.
    NO COPIAR LOS [] 
9.- Anotar dato en el indice.txt
10.- Guardar como todasLicitaciones092021.json. SE VA INCREMENTANDO EL MES, en C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\licitaciones

CREAR JSON CON TODOS LOS CONTRATOS Y LICITACIONES
1.- Añadir a todosContratosHasta092021.json y todasLicitaciones092021.json.
2.- Anotar dato en el indice.txt
3.- Tratar este fichero con searchRepeat.js
4.- Genera contratosYlicitaciones092021NoRepeat.json
5.- Tratar contratosYlicitaciones092021NoRepeat.json con CIFrepeat.js
6.- Genera todo092021NoRepeatOkCIF.json
7.- Copiarlo a C:\Users\Usuario\Google Drive\Angular\plataforma-contratacion-estado\src\assets\data
8.- Copiarlo a C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos





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