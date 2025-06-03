const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración de la conexión a MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "3333",
  database: "mundo_animal",
  port: "3306",
};

const dbConnection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
dbConnection.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err);
    return;
  }
  console.log("✅ Conexión a la base de datos MySQL establecida");
});

// Endpoint: guardar contacto (por ejemplo desde formulario)
app.post("/api/registro", (req, res) => {
  const { nombre, email, mensaje } = req.body;
  console.log("📩 Datos recibidos en /api/registro:", req.body);

  if (!nombre || !email) {
    return res.status(400).json({ error: "Nombre y email son obligatorios." });
  }

  const query = "INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)";
  dbConnection.query(query, [nombre, email, mensaje], (error, results) => {
    if (error) {
      console.error("❌ Error al insertar datos en la tabla:", error);
      return res.status(500).json({ error: "Error al guardar los datos." });
    }

    res.status(201).json({
      message: "✅ Datos guardados correctamente.",
      id: results.insertId,
    });
  });
});

// Endpoint duplicado: puedes mantener solo uno si lo deseas
app.post("/api/save", (req, res) => {
  const { nombre, email, mensaje } = req.body;
  console.log("📩 Datos recibidos en /api/save:", req.body);

  if (!nombre || !email) {
    return res.status(400).json({ error: "Nombre y email son obligatorios." });
  }

  const query = "INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)";
  dbConnection.query(query, [nombre, email, mensaje], (error, results) => {
    if (error) {
      console.error("❌ Error al insertar datos en la tabla:", error);
      return res.status(500).json({ error: "Error al guardar los datos." });
    }

    res.status(201).json({
      message: "✅ Datos guardados correctamente.",
      id: results.insertId,
    });
  });
});

// Obtener todos los productos
app.get("/api/productos", (req, res) => {
  const query = "SELECT * FROM productos";
  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error("❌ Error al obtener productos:", error);
      return res.status(500).json({ error: "Error al obtener productos." });
    }

    res.status(200).json(results);
  });
});

// Endpoints base
app.get("/", (req, res) => {
  res.send("¡Hola desde mi backend con Express!");
});

app.get("/servicio", (req, res) => {
  res.send("¡Hola desde mi backend con Express! Servicio");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
