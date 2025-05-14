import { Router } from 'express';
import * as bookController from '../controllers/bookController';
import { importBooks } from '../controllers/importController'; 
import  upload  from '../middleware/fileUpload'; 


const router = Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);


// Bulk import route (CSV upload)
router.post('/import', upload.single('file'), importBooks);  // 'file' is the field name in the form


export default router;
