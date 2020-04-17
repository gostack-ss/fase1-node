const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");1

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body

  const repositorie = {id: uuid(), title, url, techs, likes: 0}
  
  repositories.push(repositorie)
  
  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const id = request.params.id

  const repositorieIndex = repositories.findIndex((repo) => repo.id === id)

  if(repositorieIndex < 0){
    return response.status(400).json({message: "repositorio nao encontrado"})
  }

  const {title, url, techs} = request.body

  const likes = repositories[repositorieIndex].likes

  const repositorie = {id, title, url, techs, likes}
  
  repositories[repositorieIndex] = repositorie
  
  return response.json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id
  
  const repositorieIndex = repositories.findIndex((repo) => repo.id === id)
  
  if(repositorieIndex < 0){
    return response.status(400).json({message: "repositorio nao encontrado"})
  }
  
  repositories.splice(repositorieIndex, 1)
  
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const id = request.params.id
  
  const repositorieIndex = repositories.findIndex((repo) => repo.id === id)

  if(repositorieIndex < 0){
    return response.status(400).json({message: "repositorio nao encontrado"})
  }

  repositories[repositorieIndex].likes++

  return response.json(repositories[repositorieIndex])
  

});

module.exports = app;
