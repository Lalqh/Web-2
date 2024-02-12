const express = require("express")

const app = express();

app.use(express.json());

let games = [
{id: 1, name: 'Mario Wonder'},
{id: 2, name: 'SpiderMan'},
{id: 3, name: 'Left 4 dead'}]

app.get("/games", (req, res) =>{
    res.send(games)
});

app.post("/games", (req, res) => {
    const { body }  = req
    games.push(body)
    res.send("Se agrego el juego")
});

app.patch("/games/:id", (req, res) => {
    const { body }  = req
    const { name } = body
    const { id } = req.params;
    
    let game = games.find((game) => game.id == id)
    game.name = name
    res.send({message: "se elimino el juego", game})
});

app.delete("/games/:id", (req, res) => {
    const { id } = req.params;
    games = games.filter((game) => game.id != id)
    res.send("Se elimino el juego")
});

app.listen(3000)