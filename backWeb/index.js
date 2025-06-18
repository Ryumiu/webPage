const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios"); // <--- IMPORTANTE

const app = express();
const port = 3001;

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

// Endpoint: guardar contacto
app.post("/api/registro", (req, res) => {
  const { nombre, email, pais, telefono, mensaje } = req.body;
  console.log("📩 Datos recibidos en /api/registro:", req.body);

  if (!nombre || !email || !pais || !telefono) {
    return res.status(400).json({ error: "Nombre, email, país y teléfono son obligatorios." });
  }

  const query = "INSERT INTO contactos (nombre, email, pais, telefono, mensaje) VALUES (?, ?, ?, ?, ?)";
  dbConnection.query(query, [nombre, email, pais, telefono, mensaje], (error, results) => {
    if (error) {
      console.error("❌ Error al insertar datos en la tabla:", error);
      return res.status(500).json({ error: "Error al guardar los datos." });
    }

    res.status(201).json({
      message: "Datos guardados correctamente.",
      id: results.insertId,
    });
  });
});

// Chatbot con Ollama sin streaming (compatible con React)
app.post("/ollama-prompt", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Se requiere un prompt" });
    }

    // Configuración del sistema para el modelo
    const systemPrompt = `Eres un asistente virtual de una veterinaria llamada Mundo Animal. 
Responde preguntas sobre servicios veterinarios, cuidados de mascotas y productos.
Si te preguntan por precios específicos, indica que los precios son referenciales y pueden variar.
Siempre sé amable y profesional.`;

    // Combinar el system prompt con la pregunta del usuario
    const fullPrompt = `${systemPrompt}\n\nUsuario: ${prompt}\n\nAsistente:`;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt: fullPrompt,
        stream: false // Cambiado a false para una respuesta única
      }
    );

    res.json({ response: response.data.response });
  } catch (error) {
    console.error("Error al procesar la solicitud de Ollama:", error);
    res.status(500).json({ 
      error: "Error al procesar la solicitud",
      details: error.message 
    });
  }
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

// Endpoint base
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
