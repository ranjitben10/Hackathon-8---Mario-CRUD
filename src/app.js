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
// const object = [
//   {
//     id: 1,
//     name: "Luigi",
//     weight: 60,
//   },
//   {
//     id: 2,
//     name: "Ben",
//     weight: 50,
//   },
//   {
//     id: 3,
//     name: "Agrigor",
//     weight: 200,
//   },
// ];
// your code goes here


app.get("/mario", async (req, res) => {
  res.send(await marioModel.find());
  // marioModel.find({},(err,mario)=>{
  //     if(err)
  //     {
  //         res.status(400).send({message: err.message})
  //     }
  //     else{
  //         res.status(200).send(mario);
  //     }
  // })
});

app.get("/mario/:id", (req, res) => {
  const id = req.params.id;
  try{
    res.send(await marioModel.findById(id));
  }
  catch(e)
  {
    res.status(400).send({message: e.message});
  }
  // marioModel.find({id: id}, (err, mario) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).send({message: err.message});
  //   } else {
  //     res.status(200).send(mario[0]);
      // if (mario.id == id) {
      //   res.status(200).send(mario);
      // } else {
      //   res.status(400).send({ message: err.message });
      // }
    // }
  });
const isNullOrUndefined = val => val === null || val === undefined;
app.post("/mario", (req, res) => {
  const newMario = req.body;
  if(isNullOrUndefined(newMario.name) || isNullOrUndefined(newMario.weight))
  {
    res.status(400).send({message: 'either name or weight is missing'});
  }
  else
  {
    const newMarioDocument = new marioModel(newMario);
    await newMarioDocument.save();
    res.status(201).send(newMarioDocument);
  }

  // console.log(req.body.name);
  // const newObj = {
  //   id: req.body.id,
  //   name: req.body.name,
  //   weight: req.body.weight,
  // };
  // const mario = new marioModel(newObj);
  // mario.save((err) => {
  //   if (err || (mario.name == null || mario.weight == null) || (mario.name == undefined || mario.weight == undefined)) {
  //     res.status(400).send({ message: "either name or weight is missing" });
  //   } else {
  //     res.status(201).send(newObj);
  //   }
  // });
});

app.patch('/mario/:id',(req,res)=>{
  const id = req.params.id;
  const newMario = req.body;
  try{
    const existingMarioDoc = await marioModel.findById(id);
    if(isNullOrUndefined(newMario.name) && isNullOrUndefined(newMario.weight))
  {
    res.status(400).send({message: 'both name and weight is missing'});
  }
  else{
    if(!isNullOrUndefined(newMario.name)){
      existingMarioDoc.name = newMario.name;
    }
    if(!isNullOrUndefined(newMario.weight)){
      existingMarioDoc.weight = newMario.weight;
    }
    await existingMarioDoc.save();
    res.send(existingMarioDoc);
  }
  }
  catch(e)
  {
    res.status(400).send({message: e.message});
  }
  // marioModel.find({id: id},(err,doc)=>{
  //   if(err || doc == null)
  //   {
  //     res.status(400).send({message: err.message})
  //   }
  //   else
  //   {
  //     doc.weight = 56;
  //     res.send(doc);
  //   }
  // })
})

app.delete('/mario/:id',(req,res)=>{
  const id = req.params.id;
  try{
    await marioModel.findById(id);
    await marioModel.deleteOne({id: id});
    res.status(200).send({message: 'character deleted'});
  }
  catch(e)
  {
    res.status(400).send({message: e.message});
  }
  // marioModel.deleteOne(id,(err,doc)=>{
  //   if(err || doc == null)
  //   {
  //     res.status(400).send({message: err.message});
  //   }
  //   else
  //   {
  //     res.status(200).send({message: 'character deleted'});
  //   }
  // })
})
  // object.forEach((obj)=>{
  //     if(id == obj.id)
  //     {
  //         res.status(200).send(obj);
  //     }
  //     else{
  //         res.status(400).send({message: error.message});
  //     }
  // })



module.exports = app;
