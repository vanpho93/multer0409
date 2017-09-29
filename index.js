const express = require('express');
const reload = require('reload');
const upload = require('./uploadConfig');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('home'));

app.post('/signup', upload.array('avatar'), (req, res) => {
    const { username, password } = req.body;
    // const { filename } = req.file;
    const { filename } = req.files[0];
    console.log(req.files.length);
    res.render('show', { username, password, filename });
});

app.use((error, req, res, next) => res.send(error.message));

reload(app);

app.listen(3000, () => console.log('Server start!'));
