import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBooksBySearch } from '../../actions/books';
import Books from '../Books/Books';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [search, setSearch] = useState(' ');
    const [genres, setGenres] = useState([]);
    const query = useQuery();
    const navigate =useNavigate();
    const page = query.get('page')|| 1;
    const searchQuery = query.get('searchQuery');
   
    const searchBook =()=>{
      if(search.trim() || genres){
          console.log(search);
          console.log(genres);
          dispatch(getBooksBySearch({search, genres: genres.join(',')}));
          navigate(`/books/search?searchQuery=${search || ' '}&genres=${genres.join(',')}`);
      }else{
        navigate('/');
      }
    }
    const handleAdd=(genre)=>{
          setGenres([...genres, genre]);
    }
    const handleDelete=(genreToDelete)=>{
          setGenres(genres.filter((genre)=> genre!== genreToDelete));
    }
    return (
    <Grow in>
    <Container maxWidth="xl">
      <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={9}>
          <Books setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} md={3} position="static" color="inherit">
            <TextField 
              name="search" 
              variant="outlined" 
              label="Search Books"
              fullWidth
              value={search}
              onChange={(e)=>{setSearch(e.target.value);}}
              />
          <ChipInput
              style={{margin:'10px 0'}}
              value={genres}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search based on Genres"
              variant="outlined"
          />
           <Button onClick={searchBook} className={classes.searchButton} variant="contained" color="primary">Search</Button>
          </AppBar>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          {(!searchQuery && !genres.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home;
