import mongoose from 'mongoose';
import bookModel from '../models/bookmodel.js';

export const getBooks = async (req, res) => { 
    const {page} = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page)-1)*LIMIT; 
        const total= await bookModel.countDocuments({});
        const books = await bookModel.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
                
        res.status(200).json({data:books , currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBook = async (req, res) => { 
    const { id } = req.params;

    try {
        const book = await bookModel.findById(id);
        
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addBook = async (req, res) => {
    const { title, description, imgFile, writer, genres, stock,amount} = req.body;
    if(!req.userId)
        return res.json({ message:'Unauthenticated'});
    
    const newBook = new bookModel({ title, description, imgFile,writer, genres,stock,amount, 
                                    seller : req.userId,
                                    postedAt: new Date().toISOString()});
    try {
        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const {  title, description, imgFile, writer, genres, stock,amount} = req.body;
    
    
    if(!req.userId)
        return res.json({ message:'Unauthenticated'});

    if (!mongoose.Types.ObjectId.isValid(id)){ 
            return res.status(404).send(`No book with id: ${id}`);
    }
    const book = await bookModel.findById(id);
    if(book.seller !== req.userId){
        return res.status(404).send("You are not authorized to update this book");
    }
    const updatedBook = { 
            title, 
            description, 
            imgFile, writer,
            seller: req.userId,
            genres, 
            stock ,amount, _id: id };

    await bookModel.findByIdAndUpdate(id, updatedBook, { new: true });
    res.json(updatedBook);
}

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No book with id: ${id}`);

    try {
        console.log(id);
        console.log(req.userId);
        if(!req.userId)
            return res.json({ message:'Unauthenticated'});
        const deletedBook = await bookModel.findById(id);
        console.log(deletedBook);
        if(deletedBook.seller !== req.userId) 
                return res.status(404).send("You are not authorized to delete this book");
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found." });
        }
        await bookModel.deleteOne(deletedBook);
        res.json({ message: "Book deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const buyBook = async (req, res) => {
    const { id } = req.params;

    if(!req.userId)
        return res.json({ message:'Unauthenticated'});

    if (!mongoose.Types.ObjectId.isValid(id)) 
            return res.status(404).send(`No book with id: ${id}`);

    const book = await bookModel.findById(id);
    if(book.stock <=0)
            return res.status(400).send({message:'Book is out of stock wait for the seller to update'});
    
    const updatedBook = await bookModel.findByIdAndUpdate(id, { stock: book.stock-1 },{ new: true });
    
    res.json(updatedBook);
}

export const getBooksBySearch = async (req, res) => {
    const { searchQuery, genres } = req.query;
    console.log(searchQuery, genres);
    try {
        const title = new RegExp(searchQuery, "i");
        console.log(title); 
        console.log(genres.split(','));   
        const books = await bookModel.find({ $or: [ { title }, { genres: { $in: genres.split(',') } } ]});
        console.log(books);
        res.json({ data: books });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
  };
  