import express from 'express';

import { addBook, buyBook, deleteBook, getBook, getBooks, getBooksBySearch, updateBook } from '../controllers/books.js';
import auth from "../middlewares/auth.js";

const router = express.Router();
router.get('/', getBooks);
router.get('/search', getBooksBySearch);
router.post('/', auth, addBook);
router.get('/:id',auth,  getBook);
router.patch('/:id',auth, updateBook);
router.delete('/:id',auth, deleteBook);
router.patch('/:id/buyBook',auth, buyBook);
export default router;