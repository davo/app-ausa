
App realtime.
==================

## Descripcion

Muestra en tiempo real el estado del flujo trafico de lo sensores de AUSA.

Arquitectura, seguimos la logica de la siguiente imagen.

![alt tag](http://cdn.venublog.com/wp-content/uploads/2013/06/realtime.png)

### Instalacion

```
npm install 
Configurar variable config en el archivo model/db.js con datos de MongoDB.
tener instalado y ejecutando, Redis y MongoDB.
```

### Modo de visualización.

Browser, single page, carpeta client.
Archivo app.js levanta web-app que visualiza en single page, los diferentes estados.

Scripts in backgrounds, son tres archivos JavaScript, carpeta ausa-estado.

Trafic Time, trafictime.js.
Levanta daemon, que busca la informacion de los 90 sensores, "ws" de ausa, cada intervalo de 50 segundos.

Trafic Save, traficsave.js.
Efectua persistencias de datos para futuro analis.

Trafic Post, traficpost.js.
Twit cuando sucede un evento, (trafico demorado, congestionado, etc).

```
forever start app.js
http://localhost:8080

cd ausa-estado
forever start trafictime.js
```
