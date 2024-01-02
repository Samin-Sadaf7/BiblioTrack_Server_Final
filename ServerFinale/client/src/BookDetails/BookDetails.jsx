import { CircularProgress, Divider, Paper, Typography } from '@material-ui/core/';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getBook, getBooksBySearch } from '../../actions/books';
import useStyles from './styles';

const BookDetails = () => {
  const { book, books, isLoading } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBook(id));
  }, [id]);

  useEffect(() => {
    if (book) {
      dispatch(getBooksBySearch({ search: 'none', tags: book?.genres.join(',') }));
    }
  }, [book]);

  if (!book) return null;

  const openBook = (_id) => navigate(`/books/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedBooks = books.filter(({ _id }) => _id !== book._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{book.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{book.genres.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{book.description}</Typography>
          <Typography variant="h6">Written by: {book.writer}</Typography>
          <Typography variant="body1">{moment(book.postedAt).fromNow()}</Typography>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={book.imgFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={book.title} />
        </div>
      </div>
      {!!recommendedBooks.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedBooks.map(({ title, writer, description, buyers, imgFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openBook(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{writer}</Typography>
                <Typography gutterBottom variant="subtitle2">{description}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {buyers.length}</Typography>
                <img src={imgFile} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default BookDetails;