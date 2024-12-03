const express = require("express");
const path = require("path");

const app = express();

// Mettez à jour le chemin ici pour inclure "browser"
app.use(express.static(path.join(__dirname, 'dist', 'assignement-app', 'browser')));

// Modifier la ligne suivante pour pointer vers le bon répertoire contenant index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'assignement-app', 'browser', 'index.html'));
});

app.listen(process.env.PORT || 8081, () => {
  console.log("Server is running on port 8081");
});
