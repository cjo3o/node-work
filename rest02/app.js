const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Get');
})

app.post('/', (req, res) => {
    res.send('Hello Post');
})

app.put('/', (req, res) => {
    res.send('Hello Put');
})

app.delete('/', (req, res) => {
    res.send('Hello Delete');
})

app.listen(8080, () => {
    console.log('Server is running on port 8080!');
})