const config = require('config');

module.exports = (err, req, res, next) => {
    try {
        if(err.code === 'LIMIT_FYLE_TYPES') {
            console.log('Можна завантажити лише зображення')
            res.status(422).json({message: 'Можна завантажити лише зображення'});
            return;
        }
        if(err.code === 'LIMIT_FILE_SIZE') {
            res.status(422).json({message: `Максимальний розмір зображень ${config.get('imageSize') / 1000}КБ`});
            return;
        }
        next();
    } catch(e) {
        res.status(500).json({message: 'Помилка сервера'});
    }
}