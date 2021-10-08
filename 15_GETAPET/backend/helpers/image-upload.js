const multer = require('multer')

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: 'images',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname),
    )
  },
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Por favor, envie apenas png ou jpg!'))
    }
    cb(undefined, true)
  },
})

module.exports = { imageUpload }
