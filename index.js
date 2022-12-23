const express = require("express");
const cors = require("cors");
const serveur = express();
const path = require("path");

serveur.use(express.static(path.join(__dirname, "public", "build")));

// on autorise l'acces au dossier public
serveur.use(express.static("public"));

// methode utilise pour evité les probleme de domaine
serveur.use(cors());

// requette pour la methode GET sur le chemin / afin de recuperer la page principale
serveur.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "build/index.html"));
});

// ecoute du serveur
serveur.listen(1416);
