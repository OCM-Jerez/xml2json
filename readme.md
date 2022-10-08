<h2 align='center'> Licitaciones y contratos menores en formato JSON </h2>

<img src='https://res.cloudinary.com/dabrencx7/image/upload/v1628928251/xml2json/plataformaContratacion_xeteka.png'/>

# Motivación
-  Esta <a href= 'https://www.hacienda.gob.es/es-ES/GobiernoAbierto/Datos%20Abiertos/Paginas/licitaciones_plataforma_contratacion.aspx'> página </a> contiene información pública disponible para su reutilización sobre las licitaciones publicadas en la Plataforma de Contratación del Sector Público, desde el 1 de enero de 2014 en adelante, en cumplimiento de las obligaciones de publicidad que establece la Ley de Contratos del Sector Público. 
-  La información contenida en los distintos ficheros es generada por la Dirección General del Patrimonio del Estado a partir de los datos que introducen los órganos de contratación como responsables de sus perfiles del contratante, y estan disponibnles en esta <a href= 'https://www.hacienda.gob.es/es-ES/GobiernoAbierto/Datos%20Abiertos/Paginas/licitaciones_plataforma_contratacion.aspx'> página </a>
<img src='https://res.cloudinary.com/dabrencx7/image/upload/v1628928985/xml2json/licitaciones_nszsoc.png'/>

-  La propia Plataforma ha elaborado la herramienta <a href= 'https://contrataciondelestado.es/wps/portal/!ut/p/b1/04_Sj9Q1tzQyMTU2NrHQj9CPykssy0xPLMnMz0vMAfGjzOKdgi0sHJ0MHQ0MjEMtDBzNAgOdLV0MjAwsjYEKIoEKDHAARwNC-sP1o8BKTI2dTcK8wgLMgj3dDQw8PdxcfEINTQ3cjcygCvBY4eeRn5uqnxuVY-mp66gIAB_9XP8!/dl4/d5/L2dJQSEvUUt3QS80SmtFL1o2X0sxQzhBQjFBMEdBUjUwUUpJR1FDMTRKSDY3/'> OpenPLACSP </a>, para facilitar la transformación de los ficheros de datos abiertos en un documento de hoja de cálculo con los principales datos de las licitaciones seleccionadas.

-  En las pruebas realizadas por nosotros nos ha resultado complicado el uso de esta herramienta, por lo que decidimos generar nuestra propia utilidad.

# Caracteristicas 💿
<ul>
  <li>Genera un único fichero JSON con todos los datos contenidos en el fichero ZIP inicial.</li>
  <li>Genera datos tanto de licitaciones como de contratos menores.</li>
  <li>Es posible filtrar por cualquier Perfil de Contratante de los órganos de contratación alojados en la Plataforma de Contratación del Sector Público. </li>
  <li>Genera fichero JSON intermedio con licitaciones o contratos menores repetidos.</li>
  <li>De las licitaciones o contratos menores repetidos encontrados, conserva unicamente la entrada más reciente.</li>
 <li>Se compone de un único fichero index.js.</li>
   <li>Codigo en Javascript vanilla.</li>
   <li>Se generará una carpeta resultados donde se  encuentrar todos los ficheros JSON con los datos y un log con los datos de la generación.</li>
   <li>Los ficheros intermedios se generan en una carpeta temporal que se borrar al finalizar el proceso.</li>
  <li>Hemos creado una <a href= 'http://con.ocmjerez.org'> app </a> que permite consultar los datos de diferentes formas, y generar graficos con los datos obtenidos.
  <img src='https://res.cloudinary.com/dabrencx7/image/upload/v1633887024/Licitaciones/10-10--2021_19-28-51_cfw2vl.jpg'/>
  </li>
 </ul>

# Datos 📄
- Existe un fichero para las licitaciones y otro para los contratos menores.

# Como ejecutar el código 🖥️
- Clonar el repositorio.
- npm install para instalar referencias.
- En index.js cambiar los Organos de Contratación que se quieren filtar. <a href= 'https://contrataciondelsectorpublico.gob.es/datosabiertos/OrganosContratacion.xlsx'> Excel con todos los  Organos de Contratación </a>
- Ejecutar node index.js.

# Sugerencias nuevas caracteristicas 💎
- Crea una Issue explicando la mejora requerida.

# Issues  🔓
- Si encuentras algun error, por favor, crea una nueva Issue.

# Planes futuras mejoras📆
- Interfaz inicial para permitir seleccionar ficheros ZIP a extraer.
- Interfaz inicial para permitir seleccionar Perfil de contratante  a filtrar.
- Poder seleccionar ubicación carpeta resultados.

# Framework desarrollo 🚀

- [Node](https://nodejs.org/es/) 

# Librerias usadas 📖
- <a href= 'https://www.npmjs.com/package/xml2js' target="_blank">xml2js</a>
- <a href= 'https://www.npmjs.com/package/node-stream-zip' target="_blank">node-stream-zip</a>
- <a href= 'https://www.npmjs.com/package/readline-sync' target="_blank">readline-sync</a>


# Licencia ⚖️
- Distribuido bajo ```MIT License```. Ver LICENSE.TXT para más información.

# Contacto
- <a href= 'mailto:info@ocmjerez.org'> email </a>
- <a href= 'https://ocmjerez.org'> WEB </a>
- <a href= 'https://www.facebook.com/OcmJerez/'> Facebook </a>
- <a href= 'https://twitter.com/ocmjerez'> Twitter </a>




