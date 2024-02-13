const express = require("express")

const app = express();

app.use(express.json());

let games = [
{id: 1, name: 'Mario Wonder'},
{id: 2, name: 'SpiderMan'},
{id: 3, name: 'Left 4 dead'}]
const port = 3080;

app.get("/games", (req, res) =>{
    res.send(games)
});

app.get("/games/:id", (req, res) =>{
    const { params } = req
    const { id } = params
    const game = games.find((game) => game.id == id)
    if(game == undefined) res.send("No se encontro un juego con ese id")
    res.send({message: "El juego encontrado es: ", game})
});

app.post("/games", (req, res) => {
    const { body }  = req
    games.push(body)
    res.send("Se agrego el juego")
});

app.patch("/games/:id", (req, res) => {
    const { body }  = req
    const { name } = body
    const { params } = req
    const { id } = params
    if(name === "" || name == undefined) res.send("Ingresa el nombre para poder actualizar")
    const game = games.find((game) => game.id == id)
    game.name = name
    res.send({message: "se actualizo el juego", game})
});

app.delete("/games/:id", (req, res) => {
    const { id } = req.params;
    games = games.filter((game) => game.id != id)
    res.send("Se elimino el juego")
});

app.listen(port, ()=>{
    console.log(`Aplicacion iniciada en el puerto ${port}...`)
})