const express = require('express')
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Contact API');
})

app.use('/api/contacts/', require('./routes/contacts'));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));