# Backend Challenge

Crear un servicio en el cual se permita filtra los datos obtenidos desde un API externa la cual no permite filtrado de ningun tipo, lo datos de esta misma se actualizan cada N horas, en la actualizacion pueden desaparecer o agregarce elementos.

Tomando como base el ejemplo crear crear los filtros por cada una de estas categorias `id`, `eyeColor`, `tags`,

Para completar el ejecicio se deve trabajar sobre el folder `./src` se pueden agregar tantos archivos y dependencias como se requiera. De igual forma se pueden agregar imagenes al dockerfile de ser requerido algun servicio ej: bases de datos.

Puedes incluir bases de datos, cronjobs, systemscripts etc. de ser necesarios, lo importante es brindar velocidad en el filtrado, datos actualizados y consistentes.

### URLs

Se debe completar el codigo base para que las siguientes URLs funcionen de manera correcta, el primero retorna un unico elemento, el segundo todas las coincidencias

- `/users/:id`
- `/users?filter=value`

Puedes explorar las pruebas para conocer un poco sobre el funcionamiento esperado.

### Sample data

```json
[{
  "_id": "5f7e0c4bc17a34141a957b59",
  "index": 0,
  "guid": "8e4ba647-a4da-4d45-b92a-6d9230484227",
  "isActive": false,
  "balance": "$2,648.30",
  "picture": "http://placehold.it/32x32",
  "age": 23,
  "eyeColor": "blue", // one of ("blue", "brown", "green")
  "name": {
    "first": "Roslyn",
    "last": "Pickett"
  },
  "company": "EWAVES",
  "email": "roslyn.pickett@ewaves.me",
  "phone": "+1 (856) 400-3165",
  "address": "479 Sumner Place, Vowinckel, Puerto Rico, 4398",
  "about": "Mollit eu voluptate qui do duis elit officia anim.",
  "registered": "Friday, July 24, 2015 8:18 PM",
  "latitude": "-28.502876",
  "longitude": "-64.265012",
  "tags": [ "irure", "est", "aute", "cillum", "dolore" ], // dynamic dic
  "range": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
  "friends": [
    { "id": 0, "name": "Sandoval Sawyer" },
    { "id": 1, "name": "Bernadine Bass" },
    { "id": 2, "name": "Bobbie Lee" }
  ],
  "greeting": "Hello, Roslyn! You have 9 unread messages.",
  "favoriteFruit": "strawberry" // one of ('apple', 'banana', 'strawberry')
}]
```

### Extra points

Entre mas extra points agregues mejor sera la calificacion.

- Filtrado por geozone `[latitude, longitude]`
- Rango de fechas sobre `registered`
- Filtrado por `friends` by name
- Filtrado por multiples `tags` (like `/users?tags=value1,value2,value3`)
- Poder combinar dos o mas filtros (like `/users?filter=value&filter2=value2`)
- Ordenamiento por fecha de registro `registered`
- Incluir cache y/o optimizacion sobre las busquedas
- Complementar los test
- Entender y apegarce al code style

### Ejecutar el entorno

```sh
git clone https://
cd backend-challenge
docker-compose build
docker-compose up

# Si se requiere correr los test
docker ps # para ver el id con contenerdor `backend-challenge_src`
docker exec -it container_id bash
npm run test
```
