import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, updateBook } from '../../actions/books';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [bookData, setBookData] = useState({
    writer: '',
    title: '',
    description: '',
    genres: '',
    imgFile: '',
    videoFile: '',
    stock: '',
    amount: '',
  });

  const book = useSelector((state) => (currentId ? state.books.books.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (book) setBookData(book);
  }, [book]);

  const clear = () => {
    setCurrentId(0);
    setBookData({
      writer: '',
      title: '',
      description: '',
      genres: '',
      imgFile: '',
      videoFile: '',
      stock: '',
      amount: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(addBook(bookData));
      clear();
    } else {
      dispatch(updateBook(currentId, bookData));
      clear();
    }
    window.location.reload();
  };

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in 
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${book.title}"` : 'Adding a Book'}</Typography>
        <TextField
          name="writer"
          variant="outlined"
          label="Writer"
          fullWidth
          value={bookData.writer}
          onChange={(e) => setBookData({ ...bookData, writer: e.target.value })}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={bookData.title}
          onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
        />
        <TextField
          name="stock"
          variant="outlined"
          label="Stock"
          fullWidth
          value={bookData.stock}
          onChange={(e) => setBookData({ ...bookData, stock: e.target.value })}
        />
        <TextField
          name="amount"
          variant="outlined"
          label="Amount"
          fullWidth
          value={bookData.amount}
          onChange={(e) => setBookData({ ...bookData, amount: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          minRows={4}
          value={bookData.description}
          onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
        />
        <TextField
          name="genres"
          variant="outlined"
          label="Genres (comma separated)"
          fullWidth
          value={bookData.tags}
          onChange={(e) => setBookData({ ...bookData, genres: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <Typography variant="body2" color="textSecondary">Choose Image File:</Typography>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setBookData({ ...bookData, imgFile: base64 })} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
