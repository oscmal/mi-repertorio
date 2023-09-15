const express = require ("express");
const fs = require ("fs");

const app = express ();
const port = 3000;

app.use(express.json());

app.listen(port, console.log("servidor corriendo en puerto 3000"));

app.get("/", (req, res) => {
    res.sendFile( __dirname + "/index.html");
});

app.get('/canciones', (req, res) => {
    const songs = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    res.json(songs);
});

app.post("/canciones", (req, res) => {
    const nuevaCancion = req.body;
    const songs =JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    songs.push(nuevaCancion);
    fs.writeFileSync("repertorio.json", JSON.stringify(songs));
    res.send('Cancion agregada correctamente');
});

app.delete("/canciones/:id", (req, res) => {
    const {id} = req.params;
    const songs = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    const index = songs.findIndex(cancion => cancion.id == id);
    songs.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(songs));
    res.send('Cancion eliminada exitosamente');
});

app.put("/canciones/:id", (req, res) => {
    const {id} = req.params;
    const song = req.body;
    const songs = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
    const index = songs.findIndex(cancion => cancion.id == id);
    songs[index]= song;
    fs.writeFileSync("repertorio.json", JSON.stringify(songs));
    res.send('Cancion actualizada exitosamente');
});