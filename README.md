
App realtime.
==================

## Descripcion

Muestra en tiempo real el estado del flujo trafico de lo sensores de AUSA.

Arquitectura, seguimos la logica de la siguiente imagen.

![alt tag](http://cdn.venublog.com/wp-content/uploads/2013/06/realtime.png)

### Instalacion

```
npm install 
configurar variable config en model/db.js con datos de mongodb
```

### Modo de visualización.

archivo app.js levanta web-app
Browser, single page.

archivo trafictime.js levanta daemon, 
con opcion de twitteo, dump-db, cuando sucede un evento, (trafico demorado, congestionado, etc), intervalo de 50segundos.

```
forever start app.js
http://localhost:8080

cd ausa-estado
forever start trafictime.js
```
