const express = require("express");
const path = require("path");

const app = express();

// Spécifiez le bon chemin pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'dist', 'assignement-app', 'browser')));

// Assurez-vous que le fichier index.html est bien servi depuis le bon dossier
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'assignement-app', 'browser', 'index.html'));
});

// Démarrer le serveur
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
