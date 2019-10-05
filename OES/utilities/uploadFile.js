const path = require('path');
const multer = require('multer');

exports.upload = ({ destination, fileTypes, maxSize }) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination)
        },
        filename:  (req, file, cb) => {
            const extension = path.extname(file.originalname)
            cb(null, Date.now() + extension)
        }
    })
       
    function fileFilter (req, file, cb) {
        if( !fileTypes.includes(path.extname(file.originalname)) ) {
            cb(null, true)
        } else {
            req.fileValidationError = 'Format non supporté';
            return cb(new Error('Format non supporté'))
        }
    }
    
    return  multer({ 
        storage: storage,
        limits: { 
            fileSize: maxSize
        },
        fileFilter: fileFilter
    })
}