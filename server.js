const express = require("express")
const app = express()
const data = require("./data.json")

app.use(express.json())

app.get("/clients", (req, res) => {
    res.json(data)
})

app.get("/clients/:id", (req, res) => {
    const { id } = req.params
    const client = data.find(client => String(client.id) === id)

    if (!client) return res.status(404).send("Nenhum cliente encontrado")

    res.json(client)
})

app.post("/clients/:id", (req, res) => {
    const { id } = req.params
    const { name, email } = req.body

    const clientExist = data.find(client => String(client.id) === id)

    if (clientExist) res.status(400).send("Cliente já cadastrado")

    return res.status(201).send("Cliente cadastrado com sucesso")
})

app.put("/clients/:id", (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const clientExist = data.find(client => String(client.id) === id)

    if (!clientExist) {
        return res.status(204).json()
    }

    clientExist.name = name
    return res.json(clientExist)
})

app.delete("/clients/:id", (req, res) => {
    const { id } = req.params
    const clientFiltered = data.filter(client => String(client.id) !== id)

    res.json(clientFiltered)
})

app.listen(3000, () => console.log("Server is running"))