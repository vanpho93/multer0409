const express = require('express');
const reload = require('reload');
const parser = require('body-parser').urlencoded({ extended: false });

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('home'));

app.post('/signup', parser, (req, res) => {
    res.send(req.body);
});

reload(app);

app.listen(3000, () => console.log('Server start!'));
