
const mongoose = require('mongoose');
const port = 3000
const app = require('./app');
const moongoose = require('mongoose');
const marioModel = require('./models/marioChar');
mongoose.connect('mongodb://localhost/testaroo', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.once('open', () =>{
    console.log('connection established')
    // const obj = [{
    //     id: 12,
    //     name: "Ranjit",
    //     weight: 24,
    // }]
    // marioModel.insertMany(obj);
}).on('connectionError',(err) =>{
    console.log(err);
})

app.listen(port, () => console.log(`App listening on port ${port}!`));