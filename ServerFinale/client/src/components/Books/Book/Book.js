import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';

import { buyBook, deleteBook } from '../../../actions/books';
import useStyles from './styles';

const Book = ({ book, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleBuyBook = () => {
    dispatch(buyBook(book._id)); 
  };
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={book.imgFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={book.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{book.writer}</Typography>
        <Typography variant="body2">{moment(book.postedAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId== book?.seller || user?.result?._id == book?.seller )&& (
      <div className={classes.overlay2}>
        <Button 
          style={{ color: 'white' }} 
          size="small" 
          onClick={() => setCurrentId(book._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {`Amount needed: ${book.amount}`}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="h2">
          {`Available stock: ${book.stock}`} 
        </Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{book.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{book.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button 
          size="small" 
          color="primary" 
          disabled={!user?.result}
          onClick={handleBuyBook}>
          Buy
        </Button>
        {(user?.result?.googleId== book?.seller || user?.result?._id == book?.seller )&&
        (<Button 
          size="small" 
          color="primary" 
          onClick={() => dispatch(deleteBook(book._id))}>
         <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Book;
