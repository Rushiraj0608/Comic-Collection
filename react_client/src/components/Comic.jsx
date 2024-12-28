import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CircularProgress,
  Container,
  CardActions,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as actions from '../actions';
import queries from '../queries.js';
import noImage from '../img/noImage.jpeg';

function Comic() {
  const { id } = useParams();
  const comicId = parseInt(id);
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(queries.GET_COMIC, {
    variables: { comicId },
    fetchPolicy: 'cache-and-network',
  });

  const selectedCollection = useSelector((state) =>
    state.collections.find((collection) => collection.selected)
  );

  const addSubCollection = (comic) => {
    dispatch(actions.addSubCollection(comic));
  };

  const giveUpSubCollection = (comic) => {
    dispatch(actions.giveUpSubCollection(comic));
  };

  const isInSubCollection = (currentComicId) => {
    return (
      selectedCollection &&
      selectedCollection.subCollection.some((c) => c.id === currentComicId)
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
 
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        {error.message}
      </Alert>
    
      <Button component={Link} to="/" variant="contained" color="primary">
        Go Back Home
      </Button>
    </Box>
    );
  }

  if (!data || !data.comic) {
    return <Navigate to="/404_error" />;
  }

  const { comic } = data;

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          maxWidth: 550,
          margin: '20px auto',
          borderRadius: 4,
          boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image={comic.images && comic.images[0] ? `${comic.images[0].path}.jpg` : noImage}
          alt={comic.title || 'Comic cover'}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {comic.title || 'N/A'}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            {comic.description || 'No description available.'}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            <strong>On sale date:</strong> {comic.dates[0]?.date || 'N/A'}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            <strong>Print price:</strong> ${comic.prices[0]?.price || '0'}
          </Typography>
        </CardContent>
        <CardActions  sx={{ justifyContent: 'center', padding: '16px' }}>
          <Button
            variant="contained"
            color={isInSubCollection(comic.id) ? "secondary" : "primary"}
            startIcon={isInSubCollection(comic.id) ? <RemoveIcon /> : <AddIcon />}
            onClick={() => {
              isInSubCollection(comic.id)
                ? giveUpSubCollection(comic)
                : addSubCollection(comic);
            }}
            sx={{
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
               
              },
            }}
          >
            {isInSubCollection(comic.id) ? 'Remove from Collection' : 'Add to Collection'}
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Comic;
