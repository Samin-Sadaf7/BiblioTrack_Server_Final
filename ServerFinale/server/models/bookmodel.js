import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    title: String,
    description: String,
    writer: String,
    genres: [String],
    imgFile: String,
    amount: {
        type: Number, 
    },
    stock: {
        type: Number,
        default: 0,
    },
    buyers:{
        type:[String],
        default:[]
    },
    seller:{
        type:String
    },
    postedAt: {
        type: Date,
        default: new Date(),
    },
})

var bookModel = mongoose.model('bookModel', bookSchema);

export default bookModel;