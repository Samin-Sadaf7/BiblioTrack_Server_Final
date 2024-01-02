import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import Book from './Book/Book';
import useStyles from './styles';

const Books = ({ setCurrentId }) => {
  const {books, isLoading}= useSelector((state) => state.books);
  const classes = useStyles();
  if(!books.length && !isLoading) return 'No Books';
  return (
      isLoading? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {books.map((book) => (
          <Grid key={book._id} item xs={12} sm={12} md={6} lg={4}>
            <Book book={book} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Books;