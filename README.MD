 # Weader app

Este es una aplicación web desarrollada en el stack de MEARN

# Back-end
El proceso de autenticación  se realiza basado en Auth de firebase con correo y contraseña. El resto de la información se guarda en mongodb (mongodb Atlas) a través de nodejs utilizando la librería de mongoose.
En la base de datos de mongodb se tienen 4 colecciones: 
 - [1 ] Colección de Paises 
 -  [2 ] Coleccion de Ciudades
 - [3 ] Colecciones de Usuarios
 - [4 ] Colecciones de favoritos
 Para agregar los datos en las colecciones de paises y ciudades es utilizado el siguiente proyecto: https://github.com/Albert-Gao/world-cities-mongodb.
 Los datos del clima de las distintias ciudades se obtuvieron de la siguiente API: https://www.weatherapi.com/. Con esta api es posible de obtener los datos del clima actual asi como un pronostico de 3 días y como un historico de 7 días desde el momento de la consulta y todo esto en la versión gratuita.
 Se implementa un archivo .env el cual permite guardar los token de las APIs utilizadas
# Front-End
El desarrollo del front-end se lleva a cabo en la librería de react el cual permite crear ui's de una forma rápida y sencilla. 
Se utiliza un context para guardar los datos del usuario que vienen en el proceso de autenticación de firebase, y así como tambien las funciones principales de este proceso.
Se implementa la librería de react-router-dom para el proceso de enrutamiento.
Gracias a la combinación de estas dos librerías se puede crean rutas protegidas que solo pueden ser accedidas por un usuario registrado.
Para los estilos se usa principalmente Materia-ui y algunas clases de Bootstrap.

# Ejecución en desarrollo 
descargar el proyecto y tener yarn descargado.
## Front
Copiar los datos de firebase en `front/src/config.fire.js` por los correspondientes.
Para ejcutar el front ejecutar el siguiente comando `cd front` y `yarn` o `npm i` luego regresar a la raíz del proyecto y ejecutar `npm run dev-front`
## Back
Se debe crear un archivo .env en la carpeta back (mirar .env.example para ver los valores de los token)
Para ejecutar el back ejecutar el siguiente comando `cd back` y `npm i`, regresar a la raíz del proyecto y ejecutar `npm run dev-back`
