const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect(
    "mongodb+srv://root:mongodb@cluster0-svg85.gcp.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true ,  useUnifiedTopology: true }
);

app.use(express.json());
app.use(routes);


//app.listen(process.env.PORT); -> AWS
//app.listen(3333);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});