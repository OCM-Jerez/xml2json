CRTL + ALT + B  para formatear como json LECUESTA MUCHO TIEMPO.
Borrar todas estas lineas de inicio y dos }} al final. GRABAR

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
Copio entre   <entry></entry>
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
      "entry":  DEJAR [
Borro ultima { 
crtl + alt + v para comprobar json valido

Buscar y quitar  \" en textos.
Guardar.


Copiar el json, crear const con la matriz:
lici =  ([] ya esta en el fichero)
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
      // URL:  elem.ContractFolderStatus.ValidNoticeInfo.AdditionalPublicationStatus.AdditionalPublicationDocumentReference[1].Attachment.ExternalReference.URI
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
      // URL:  elem.ContractFolderStatus.ValidNoticeInfo.AdditionalPublicationStatus.AdditionalPublicationDocumentReference[1].Attachment.ExternalReference.URI
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



TypeCode:
1 = Suministros
2 = Servicios
3 = Obras
??    Gestion de servicios públicos

SubTypeCode
1 = alquiler
2 - Adquision

UrgencyCode
1 = ordinaria
2 = Urgente
3 = Emergencia



En la pagina de Gobierto
https://gobiernoabierto.getafe.es/visualizaciones/contratos
tienen:
Categorias:
  Construccion y mantenimiento
  Arquitectura e ingenieria
  Transporte
  ...
  ...

ProcedureCode
  1 = Abierto
  2 Restringido
  3 Negociado sin publicidad
  4 Negociado con publicidad 
  5 Diálogo competitivo
  6 Contrato menor
  7 Derivado de acuerdo marco
Entidades:







Datos del mes en curso:
https://www.hacienda.gob.es/es-ES/GobiernoAbierto/Datos%20Abiertos/Paginas/licitaciones_plataforma_contratacion.aspx
