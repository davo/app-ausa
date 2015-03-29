
demo app-ausa
==================

## Descripcion

Muestra en tiempo real el estado del flujo trafico de lo sensores de AUSA.

### Instalacion

```
npm install 
configurar variable config en model/db.js con datos de mongodb
```

### Modo de visualización.

Browser, single page.

```
forever start app.js
http://localhost:8080
```

Consola, con opcion de twitteo, dump-db, cuando sucede un evento, (trafico demorado, congestionado, etc), intervalo de 50segundos.

```
cd ausa-estado
forever start trafictime.js
```
