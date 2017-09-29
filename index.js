const express = require('express');
const reload = require('reload');
const upload = require('multer')({ dest: './public' });

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('home'));

app.post('/signup', upload.single('avatar'), (req, res) => {
    console.log(req.file);
    res.send(req.body);
});

reload(app);

app.listen(3000, () => console.log('Server start!'));
