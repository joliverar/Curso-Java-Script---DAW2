const datos = {
    "autores": [
        {
            "autorId": 1,
            "nombre": "Isabel Allende",
            "nacionalidad": "Chilena",
            "biografia": "Escritora chilena conocida por su obra literaria que mezcla elementos hist\u00f3ricos y de realismo m\u00e1gico.",
            "libros": [
                "La Casa de los Esp\u00edritus",
                "Eva Luna",
                "El Amante Japon\u00e9s"
            ]
        },
        {
            "autorId": 2,
            "nombre": "Mario Vargas Llosa",
            "nacionalidad": "Peruana",
            "biografia": "Novelista, ensayista y pol\u00edtico peruano, galardonado con el Premio Nobel de Literatura.",
            "libros": [
                "La Ciudad y los Perros",
                "Conversaci\u00f3n en La Catedral",
                "La Fiesta del Chivo"
            ]
        },
        {
            "autorId": 3,
            "nombre": "Laura Esquivel",
            "nacionalidad": "Mexicana",
            "biografia": "Escritora mexicana famosa por su novela 'Como Agua para Chocolate', una obra de realismo m\u00e1gico.",
            "libros": [
                "Como Agua para Chocolate",
                "Tan Veloz como el Deseo",
                "A Lupita le Gustaba Planchar"
            ]
        },
        {
            "autorId": 4,
            "nombre": "Jorge Volpi",
            "nacionalidad": "Mexicana",
            "biografia": "Escritor mexicano conocido por sus novelas de ficci\u00f3n hist\u00f3rica y ensayos literarios.",
            "libros": [
                "En Busca de Klingsor",
                "No Ser\u00e1 la Tierra",
                "Una Novela Criminal"
            ]
        }
    ],
    "libros": [
        {
            "libroId": 101,
            "titulo": "La Casa de los Esp\u00edritus",
            "ISBN": "ISBN-0025",
            "autorId": 1,
            "bibliotecaId": 1,
            "prestamos": [
                {
                    "fechaPrestamo": "2024-02-01",
                    "fechaDevolucion": "2024-02-15"
                },
                {
                    "fechaPrestamo": "2024-03-01",
                    "fechaDevolucion": "2024-03-10"
                }
            ]
        },
        {
            "libroId": 102,
            "titulo": "Eva Luna",
            "ISBN": "ISBN-0026",
            "autorId": 1,
            "bibliotecaId": 1,
            "prestamos": []
        },
        {
            "libroId": 103,
            "titulo": "El Amante Japon\u00e9s",
            "ISBN": "ISBN-0027",
            "autorId": 1,
            "bibliotecaId": 3,
            "prestamos": [
                {
                    "fechaPrestamo": "2024-04-01"
                }
            ]
        },
        {
            "libroId": 104,
            "titulo": "La Ciudad y los Perros",
            "ISBN": "ISBN-0028",
            "autorId": 2,
            "bibliotecaId": 1,
            "prestamos": []
        },
        {
            "libroId": 105,
            "titulo": "Conversaci\u00f3n en La Catedral",
            "ISBN": "ISBN-0029",
            "autorId": 2,
            "bibliotecaId": 2,
            "prestamos": [
                {
                    "fechaPrestamo": "2024-02-15",
                    "fechaDevolucion": "2024-02-28"
                },
                {
                    "fechaPrestamo": "2024-03-10",
                    "fechaDevolucion": "2024-03-20"
                }
            ]
        },
        {
            "libroId": 106,
            "titulo": "La Fiesta del Chivo",
            "ISBN": "ISBN-0030",
            "autorId": 2,
            "bibliotecaId": 3,
            "prestamos": []
        },
        {
            "libroId": 107,
            "titulo": "Como Agua para Chocolate",
            "ISBN": "ISBN-0031",
            "autorId": 3,
            "bibliotecaId": 2,
            "prestamos": []
        },
        {
            "libroId": 108,
            "titulo": "Tan Veloz como el Deseo",
            "ISBN": "ISBN-0032",
            "autorId": 3,
            "bibliotecaId": 3,
            "prestamos": [
                {
                    "fechaPrestamo": "2024-03-01"
                }
            ]
        },
        {
            "libroId": 109,
            "titulo": "A Lupita le Gustaba Planchar",
            "ISBN": "ISBN-0033",
            "autorId": 3,
            "bibliotecaId": 1,
            "prestamos": []
        },
        {
            "libroId": 110,
            "titulo": "En Busca de Klingsor",
            "ISBN": "ISBN-0034",
            "autorId": 4,
            "bibliotecaId": 2,
            "prestamos": [
                {
                    "fechaPrestamo": "2024-01-05",
                    "fechaDevolucion": "2024-01-15"
                },
                {
                    "fechaPrestamo": "2024-02-05",
                    "fechaDevolucion": "2024-02-20"
                }
            ]
        },
        {
            "libroId": 111,
            "titulo": "No Ser\u00e1 la Tierra",
            "ISBN": "ISBN-0035",
            "autorId": 4,
            "bibliotecaId": 3,
            "prestamos": []
        },
        {
            "libroId": 112,
            "titulo": "Una Novela Criminal",
            "ISBN": "ISBN-0036",
            "autorId": 4,
            "bibliotecaId": 1,
            "prestamos": []
        }
    ],
    "bibliotecas": [
        {
            "bibliotecaId": 1,
            "nombre": "Biblioteca Central",
            "ubicacion": "Calle Principal 123, Ciudad G"
        },
        {
            "bibliotecaId": 2,
            "nombre": "Biblioteca del Este",
            "ubicacion": "Avenida Secundaria 456, Ciudad H"
        },
        {
            "bibliotecaId": 3,
            "nombre": "Biblioteca del Norte",
            "ubicacion": "Calle Norte 789, Ciudad J"
        }
    ]
};

export default datos;