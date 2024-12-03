const express = require("express");
const path = require("path");

const app = express();

// Spécifiez le chemin vers le répertoire "browser" dans "dist/assignement-app"
app.use(express.static(path.join(__dirname, 'dist', 'assignement-app', 'browser')));

// Servir index.html à toutes les requêtes
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'assignement-app', 'browser', 'index.html'));
});

// Utiliser le port fourni par Render ou 8081 si local
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
