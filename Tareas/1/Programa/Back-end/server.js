//Aarón Piñar Mora
//Lenguajes

const express = require("express");
const app = express();
const fs = require("fs"); //modulos de js
const path = require("path");


app.get("/preguntas", (req,res) =>  {
    // Ruta al archivo JSON
    const filePath = path.join(__dirname, "data", "questions.json");

    // Leer el archivo JSON
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error al leer el archivo JSON:", err);
            res.status(500).json({ error: "Error al leer el archivo JSON" });
            return;
        }
   
        // Convertir el contenido del archivo JSON en un objeto JavaScript
        const jsonData = JSON.parse(data);
   
        // Enviar el objeto como respuesta
        res.json(jsonData);
        
    });
   });
   
app.post("/respuestas", express.json(), (req, res) => {
    const userResponses = req.body; // Las respuestas enviadas por el usuario en el body
    res.json(userResponses);
});

app.listen(5000, () => {  //seleccion de puerto
    console.log("Servidor en puerto 5000");
});



