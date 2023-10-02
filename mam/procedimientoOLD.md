// Meses
// const ficheroZIP = "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/licitaciones/2022/licitacionesPerfilesContratanteCompleto3_202206.zip";

// Años
// const ficheroZIP = "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/contratos menores/2020/contratosMenoresPerfilesContratantes_2020.zip";
// const ficheroZIP = "C:/Users/Usuario/Google Drive/OCM/Plataforma de contratacion del sector publico/Datos abiertos/licitaciones/2020/licitacionesPerfilesContratanteCompleto3_2020.zip";

LICITACIONES
Guardar enlace como => C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\licitaciones\2022\
 HAY QUE CONFIRMAR DESCARGA
1.- En index.js cambiar nombre del fichero del mes correspondiente.
2.- GRABAR
3.- Borrar carpeta resultados
4.- node index.js
5.- Se generaran ficheros de resultados en la carpeta resultados de la app.
6.- Mover la carpeta resultados a C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\ CARPETA CORRESPONDIENTE.
7.- finalNoRepeat.json es el fichero con los duplicados encontrados tratados para dejar unicamente los más recientes.
8.- Abrir finalNoRepeat.json
9.- CTRL + b para formatatear JSON

CONTRATOS MENORES
Guardar enlace como => C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\contratos menores\2021\
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
9.- Copiar fichero anterior a C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Obsoletos\Obsoletos xml2json
10.- Mover todoXX2022NoRepeat.json a C:\Users\Usuario\Google Drive\Node.js\xml2json

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
10.- Copiar fichero anterior a C:\Users\Usuario\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Obsoletos\Obsoletos xml2json
11.- Copiar todo{mes actual}2022NoRepeatOK.json a C:\Users\Usuario\Google Drive\Node.js\xml2json

CIFrepeat.js
1.- En CIFrepeat.js
2.- Cambiar las referencias mes actual en lineas 4-51-52 y 96
3.- GRABAR
4.- Tratar todo{mes actual}2021NoRepeatOK.json con CIFrepeat.js
5.- node CIFrepeat.js
6.- Comienza a solicitar seleccionar CIF adecuado
7.- Genera todo{mes actual}2021NoRepeatOkCIFOK.json
8.- Crear carpeta "tratados con CIFRepeat.js"
9.- Mover todos los ficheros de "Resultados" a la carpeta creada en punto anterior.
10.- Copiarlo a C:\Users\Usuario\Google Drive\Angular\plataforma-contratacion-estado\src\assets\data
11.- En app plataforma-contratacion-estado indice.component.ts cambiar fichero de datos en linea 15.

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

CRTL + ALT + B para formatear como json LE CUESTA MUCHO TIEMPO.
Borrar todas estas lineas de inicio y dos }} al final. desde "entry": hasta el principio GRABAR

{
"feed": {
"$": {
            "xmlns": "http://www.w3.org/2005/Atom",
            "xmlns:cbc-place-ext": "urn:dgpe:names:draft:codice-place-ext:schema:xsd:CommonBasicComponents-2",
            "xmlns:cac-place-ext": "urn:dgpe:names:draft:codice-place-ext:schema:xsd:CommonAggregateComponents-2",
            "xmlns:cbc": "urn:dgpe:names:draft:codice:schema:xsd:CommonBasicComponents-2",
            "xmlns:cac": "urn:dgpe:names:draft:codice:schema:xsd:CommonAggregateComponents-2",
            "xmlns:ns1": "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"
        },
        "author": [
            {
                "name": [
                    "Plataforma de Contratación del Sector Público"
                ],
                "uri": [
                    "https://contrataciondelestado.es"
                ],
                "email": [
                    "contrataciondelestado@hacienda.gob.es"
                ]
            }
        ],
        "id": [
            "https://contrataciondelestado.es/sindicacion/sindicacion_1143/contratosMenoresPerfilesContratantes.atom"
        ],
        "link": [
            {
                "$": {
"href": "contratosMenoresPerfilesContratantes_20210504_041227.atom",
"rel": "self"
}
},
{
"$": {
                    "href": "contratosMenoresPerfilesContratantes.atom",
                    "rel": "first"
                }
            },
            {
                "$": {
"href": "contratosMenoresPerfilesContratantes_20210505_041337_1.atom",
"rel": "prev"
}
},
{
"$": {
                    "href": "contratosMenoresPerfilesContratantes_20210504_041227_1.atom",
                    "rel": "next"
                }
            }
        ],
        "title": [
            "Licitaciones publicadas en la Plataforma de Contratación del Sector Público: DatosAbiertosMenores"
        ],
        "updated": [
            "2021-05-04T04:12:27.860+02:00"
        ],
        "at:deleted-entry": [
            {
                "$": {
"ref": "https://contrataciondelestado.es/sindicacion/datosAbiertosMenores/6574547",
"when": "2021-05-03T11:38:27.315+02:00",
"xmlns:at": "http://purl.org/atompub/tombstones/1.0"
}
},
{
"$": {
"ref": "https://contrataciondelestado.es/sindicacion/datosAbiertosMenores/7157497",
"when": "2021-05-03T11:06:03.563+02:00",
"xmlns:at": "http://purl.org/atompub/tombstones/1.0"
}
}
],
"entry":

Bajar fichero zip
Descomprimir
C:\Users\pc\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Contratos menores\2021\contratosMenoresPerfilesContratantes_202103

Crear nuevo fichero.
Guardar como contratosMenores2021XX.txt
En carpeta:
C:\Users\pc\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Contratos menores\2021\xml

Arrastrar fichero a VScode
CRLR + SHIF - P => Fold level 3
Buscar
Órgano de Contratación: Junta de Gobierno Local del Ayuntamiento de Jerez
Minimizo <entry></entry>
Copio entre <entry></entry>
Pego en el fichero txt donde voy recopilando entradas.
Busco siguiente.

Crear nuevo fichero.
Guardar como contratosMenores2021XX.json
En carpeta
C:\Users\pc\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Contratos menores\2021\json

https://codebeautify.org/xmltojson
Copio todo el contenido del fichero txt
Lo pego en la WEB
Copio todo el resultado de la conversión en la WEB

Lo pego en el fichero json que estoy creando
crtl + alt + v para comnprobar json valido
Borro:
{
"entry": DEJAR [
Borro ultima {
crtl + alt + v para comprobar json valido

Buscar y quitar \" en textos.
Guardar.

Copiar el json, crear const con la matriz:
lici = ([] ya esta en el fichero)
Iterar con map() en RunJS

const result = lici.map((elem) => {
if (Array.isArray(elem.ContractFolderStatus.TenderResult)) {
return {
id: elem.ContractFolderStatus.ContractFolderID,
status: elem.ContractFolderStatus.ContractFolderStatusCode,
titulo: elem.title,
// objeto: elem.ContractFolderStatus.ProcurementProject.Name,
sinIVA: Math.trunc(
elem.ContractFolderStatus.ProcurementProject.BudgetAmount
.TaxExclusiveAmount
),
fecha: elem.ContractFolderStatus.TenderResult[0].AwardDate,
CIF:
elem.ContractFolderStatus.TenderResult[0].WinningParty
.PartyIdentification.ID,
adjudicatario:
elem.ContractFolderStatus.TenderResult[0].WinningParty.PartyName.Name,
CIF1:
elem.ContractFolderStatus.TenderResult[1].WinningParty
.PartyIdentification.ID,
adjudicatario1:
elem.ContractFolderStatus.TenderResult[1].WinningParty.PartyName.Name,
// CIF2: elem.ContractFolderStatus.TenderResult[2].WinningParty.PartyIdentification.ID,
// Adjudicatario2: elem.ContractFolderStatus.TenderResult[2].WinningParty.PartyName.Name,
// fecha1: elem.ContractFolderStatus.ValidNoticeInfo.AdditionalPublicationStatus.AdditionalPublicationDocumentReference[0].IssueDate,
// URL: elem.ContractFolderStatus.ValidNoticeInfo.AdditionalPublicationStatus.AdditionalPublicationDocumentReference[1].Attachment.ExternalReference.URI
};
} else {
return {
id: elem.ContractFolderStatus.ContractFolderID,
status: elem.ContractFolderStatus.ContractFolderStatusCode,
titulo: elem.title,
// objeto: elem.ContractFolderStatus.ProcurementProject.Name,
sinIVA: Math.trunc(
elem.ContractFolderStatus.ProcurementProject.BudgetAmount
.TaxExclusiveAmount
),
fecha: elem.ContractFolderStatus.TenderResult.AwardDate,
CIF:
elem.ContractFolderStatus.TenderResult.WinningParty.PartyIdentification
.ID,
adjudicatario:
elem.ContractFolderStatus.TenderResult.WinningParty.PartyName.Name,
TipoContrato: elem.ContractFolderStatus.ProcurementProject.TypeCode,
tipoLicitacion: elem.ContractFolderStatus.TenderingProcess.ProcedureCode,
urgencia: elem.ContractFolderStatus.TenderingProcess.UrgencyCode,
// fecha1: elem.ContractFolderStatus.ValidNoticeInfo.AdditionalPublicationStatus.AdditionalPublicationDocumentReference[0].IssueDate,
// URL: elem.ContractFolderStatus.ValidNoticeInfo.AdditionalPublicationStatus.AdditionalPublicationDocumentReference[1].Attachment.ExternalReference.URI
};
}
});

// console.log(JSON.stringify(result));
console.log(result);

Cuando hay varios adjudicatarios, tengo que iterar sobre su array conociendo la cantidad de ellos.
Crear un objeto para cada uno de ellos, en la tabla mostrare una misma licitación con los diferentes adjudicatarios.

QUITAR `` DE INICIO Y FINAL.
crtl + shift + p
JSON beatifu.
Si es correcto, grabar.

Sino consigo un JSON valido, crearlo sin // console.log(JSON.stringify(result));
Copiar de RUNJS
Crear nuevo fichero.
Guardar como contratosMenores2021XXmap.json
En carpeta
C:\Users\pc\Google Drive\OCM\Plataforma de contratacion del sector publico\Datos abiertos\Contratos menores\2021\json
Añadir "" a los keys y values.
crtl + alt + v para comprobar json valido
Guardar

añadir , al ultimo {
borrar ]
Añadir mes al ficero JSON con meses anteriores
crtl + alt + v para comprobar json valido
Guardar.
