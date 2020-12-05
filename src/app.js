const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const object = [
  {
    id: 1,
    name: "Luigi",
    weight: 60,
  },
  {
    id: 2,
    name: "Ben",
    weight: 50,
  },
  {
    id: 3,
    name: "Agrigor",
    weight: 200,
  },
];
// your code goes here
app.get("/mario", (req, res) => {
  marioModel.find({},(err,mario)=>{
      if(err)
      {
          res.status(400).send({message: err.message})
      }
      else{
          res.status(200).send(mario);
      }
  })
});
app.get("/mario/:id", (req, res) => {
  const id = req.params.id;
  marioModel.find({ id: id }, (err, mario) => {
    if (err) {
      res.status(400).send({ message: error.message });
    } else {
      if (mario[0].id == id) {
        res.status(200).send(mario);
      } else {
        res.status(400).send({ message: error.message });
      }
    }
  });
  // object.forEach((obj)=>{
  //     if(id == obj.id)
  //     {
  //         res.status(200).send(obj);
  //     }
  //     else{
  //         res.status(400).send({message: error.message});
  //     }
  // })
});
app.post("/mario", (req, res) => {
  const newObj = {
    id: req.body.id,
    name: req.body.name,
    weight: req.body.weight,
  };
  const mario = new marioModel(newObj);
  mario.save((err) => {
    if (err) {
      res.status(400).send({ message: "either name or weight is missing" });
    } else {
      res.status(201).send(newObj);
    }
  });
});

module.exports = app;
