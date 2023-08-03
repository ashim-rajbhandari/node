const express = require('express');
const router = express.Router();
const employeeValidation = require('../../validators/employeeValidation');
const validate = require('../../middleware/api/validate');
const EmployeeController = require('../../controllers/api/employee/employeeController');
const employeeController = new EmployeeController();
const passport = require('passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null,'src/public/storage')
      //cb(null, path.join(__dirname, '../../public/storage'))
  
    },
    filename: function (req, file, cb) {
        const originalExtension = file.originalname.split('.').pop();  
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.'+ originalExtension)
    }
  });
  
  const imageFileFilter = (req, file, cb) => {
    const allowedExtensions = ['.png' , '.jpg'];
    const fileExtension = '.' + file.originalname.split('.').pop().toLowerCase();
  
    if (!allowedExtensions.includes(fileExtension)) {
      // Reject the file if it has an invalid extension
      return cb(new Error('Invalid file format. Allowed formats are: jpg, jpeg, png, gif'), false);
    }

    // Accept the file if it passed the validation
    cb(null, true);
  };
  
const upload = multer({ storage : storage , fileFilter : imageFileFilter ,  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB in bytes
  }, })
  


router.get('/',  passport.authenticate('bearer', { session: false }), employeeController.get);
router.post('/', employeeValidation,validate, employeeController.store);
router.put('/:id', employeeValidation,validate, employeeController.update);
router.delete('/:id', employeeController.delete);

router.get('/:id' , passport.authenticate('bearer', { session: false }), employeeController.getDetail)
router.post('/:id/upload', (req, res) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
            // Custom error message for file size limit exceeded
            return res.status(400).json({ error: 'File size should not exceed 2 MB.' });
        }

        if (err instanceof Error) {
                 return res.status(400).json({ error: err.message });
        }

        // For other errors, you can handle them accordingly
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Call the controller function with the uploaded file
      employeeController.upload(req, res);
    });
  });
  
module.exports = router;