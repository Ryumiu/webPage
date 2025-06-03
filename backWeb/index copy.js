const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Puedes cambiar el puerto si lo deseas

// Middleware para analizar noel cuerpo de las peticiones JSON
app.use(bodyParser.json());
// Middleware para habilitar CORS (permite peticiones desde diferentes dominios)
app.use(cors());

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: 'localhost', // Cambia esto si tu base de datos está en otro servidor
  user: 'root', // Reemplaza con tu nombre de usuario de MySQL
  password: '', // Reemplaza con tu contraseña de MySQL
  database: 'mundo_animal', // Reemplaza con el nombre de tu base de datos
  port:'3306'
};

const dbConnection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
dbConnection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});


//Implememtamos un servicio
app.post('/api/registro', (req,res) => {
    const { name,  email, message } = req.body;
   console.log('Registro');
   console.log('Datos recibidos en el servidor como JSON:', req.body);

   if (!name || !email) {
    return res.status(400).json({ error: 'Nombre, email son campos requeridos.' });
  }

  const query = 'INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)';
  dbConnection.query(query, [name, email, message], (error, results) => {
    if (error) {
      console.error('Error al insertar datos en la tabla:', error);
      return res.status(500).json({ error: 'Error al guardar los datos en la base de datos.' });
    }

    res.status(201).json({ message: 'Datos guardados correctamente.', id: results.insertId });
  });
});
//Crear un servicio para obtener todos los registros de la tabla productos
app.get('/api/productos', (req, res) => {
    const query = 'SELECT * FROM productos'; 
    dbConnection.query(query, (error, results) => {
      if (error) {
        console.error('Error al obtener datos de la tabla:', error);
        return res.status(500).json({ error: 'Error al obtener los datos de la base de datos.' });
      }
  
      res.status(200).json(results);
    });
  });


app.get('/', (req, res) => {
    res.send('¡Hola desde mi backend con Express!');
  });
  
  app.get('/servicio', (req, res) => {
    res.send('¡Hola desde mi backend con Express! Servicio');
  });

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Node.js escuchando en el puerto ${port}`);
  });
  