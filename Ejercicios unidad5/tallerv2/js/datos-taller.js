const datos = {
  "vehiculos": [
    {
      "vehiculoId": 1,
      "matricula": "1234ABC",
      "marca": "Toyota",
      "modelo": "Corolla",
      "año": 2018,
      "motor": "1.8 Híbrido",
      "propietario": {
        "nombre": "Juan Pérez",
        "telefono": "654321987",
        "email": "juan.perez@example.com"
      }
    },
    {
      "vehiculoId": 2,
      "matricula": "5678DEF",
      "marca": "Ford",
      "modelo": "Focus",
      "año": 2020,
      "motor": "2.0 EcoBoost",
      "propietario": {
        "nombre": "Ana García",
        "telefono": "612345678",
        "email": "ana.garcia@example.com"
      }
    },
    {
      "vehiculoId": 3,
      "matricula": "9101GHI",
      "marca": "Honda",
      "modelo": "Civic",
      "año": 2019,
      "motor": "1.5 Turbo",
      "propietario": {
        "nombre": "Carlos Sánchez",
        "telefono": "678912345",
        "email": "carlos.sanchez@example.com"
      }
    },
    {
      "vehiculoId": 4,
      "matricula": "2345JKL",
      "marca": "BMW",
      "modelo": "X5",
      "año": 2021,
      "motor": "3.0 Diesel",
      "propietario": {
        "nombre": "Laura Gómez",
        "telefono": "654987321",
        "email": "laura.gomez@example.com"
      }
    }
  ],
  "reparaciones": [
    {
      "reparacionId": 1,
      "vehiculoId": 1,
      "descripcion": "Cambio de aceite y revisión general",
      "fecha": "2024-11-10",
      "kilometros": 45000,
      "presupuesto": true,
      "aprobada": false,
      "pagado": false,
      "terminado": false,
      "trabajos": [
        {
          "concepto": "Aceite sintético",
          "precioUnitario": 50,
          "cantidad": 1,
          "totalTrabajo": 50
        },
        {
          "concepto": "Filtro de aire",
          "precioUnitario": 30,
          "cantidad": 1,
          "totalTrabajo": 30
        }
      ]
    },
    {
      "reparacionId": 2,
      "vehiculoId": 1,
      "descripcion": "Cambio de pastillas de freno",
      "fecha": "2024-11-12",
      "kilometros": 46000,
      "presupuesto": false,
      "aprobada": true,
      "pagado": false,
      "terminado": false,
      "trabajos": [
        {
          "concepto": "Pastillas de freno",
          "precioUnitario": 100,
          "cantidad": 4,
          "totalTrabajo": 400
        }
      ]
    },
    {
      "reparacionId": 3,
      "vehiculoId": 2,
      "descripcion": "Sustitución de neumáticos",
      "fecha": "2024-11-13",
      "kilometros": 15000,
      "presupuesto": true,
      "aprobada": true,
      "pagado": false,
      "terminado": true,
      "trabajos": [
        {
          "concepto": "Neumático delantero",
          "precioUnitario": 120,
          "cantidad": 2,
          "totalTrabajo": 240
        },
        {
          "concepto": "Neumático trasero",
          "precioUnitario": 120,
          "cantidad": 2,
          "totalTrabajo": 240
        }
      ]
    },
    {
      "reparacionId": 4,
      "vehiculoId": 3,
      "descripcion": "Reparación del sistema de frenos ABS",
      "fecha": "2024-11-15",
      "kilometros": 70000,
      "presupuesto": false,
      "aprobada": true,
      "pagado": true,
      "terminado": true,
      "trabajos": [
        {
          "concepto": "Sensor ABS",
          "precioUnitario": 200,
          "cantidad": 1,
          "totalTrabajo": 200
        }
      ]
    },
    {
      "reparacionId": 5,
      "vehiculoId": 4,
      "descripcion": "Reemplazo de batería",
      "fecha": "2024-11-14",
      "kilometros": 20000,
      "presupuesto": true,
      "aprobada": false,
      "pagado": false,
      "terminado": false,
      "trabajos": [
        {
          "concepto": "Batería AGM",
          "precioUnitario": 180,
          "cantidad": 1,
          "totalTrabajo": 180
        }
      ]
    }
  ]
}

export default datos;