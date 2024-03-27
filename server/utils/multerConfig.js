import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()} - ${file.originalname}`);
    },
    
});

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  }).single('uploadImage');
  

const multerConfig = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: 'Multer error occurred' });
        } else if (err) {
            return res.status(500).json({ error: err.message });
        }
        next();
    });
};

export default multerConfig;
