const express = require('express');
const reload = require('reload');
const multer = require('multer');

// filename = username + milisecond + extension

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename:(req, file, cb) => {
        const { originalname } = file;
        const startIndex = originalname.lastIndexOf('.') + 1;
        const extension = originalname.substring(startIndex);
        const { username } = req.body;
        const milisecond = Date.now();
        cb(null, `${username}${milisecond}.${extension}`);
    }
});

const upload = multer({ storage });

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
