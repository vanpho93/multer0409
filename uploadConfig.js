const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename:(req, file, cb) => {
        const { originalname } = file;
        const startIndex = originalname.lastIndexOf('.') + 1;
        const extension = originalname.substring(startIndex);
        const { username } = req.body;
        const milisecond = Date.now();
        const random = Math.random();
        cb(null, `${username}${milisecond}${random}.${extension}`);
    }
});

function fileFilter(req, file, cb) {
    const dk = file.mimetype === 'image/png' || file.mimetype === 'image/jpeg';
    if (!dk) return cb(new Error('File type'));
    cb(null, true);
}

const limits = {
    fileSize: 50000
}

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
