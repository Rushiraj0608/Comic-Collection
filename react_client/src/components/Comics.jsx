import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import * as actions from '../actions';
import queries from '../queries.js';
import SearchComic from './SearchComic';
import noImage from '../img/noImage.jpeg';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Grid,
  Button,
  Pagination,
  Skeleton,
  Alert,
  AlertTitle
} from '@mui/material';

function Comics() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { pagenum } = useParams();
  pagenum = parseInt(pagenum.trim(), 10);

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

  const checkPage = (str) => {
    if (/^\d+$/.test(str)) {
      const parsedInt = parseInt(str, 10);
      return parsedInt >= 1;
    }
    return false;
  };

  if (!checkPage(pagenum.toString())) {
    return <Navigate to="/400_error" />;
  }

  const { loading, error, data } = useQuery(queries.GET_COMICS, {
    variables: { pagenum },
    fetchPolicy: 'cache-and-network'
  });

  const totalPages = Math.ceil(58250 / 50);

  const changePage = (pageNumber) => {
    navigate(`/marvel-comics/page/${pageNumber}`);
  };

  if (loading) {
    return (
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {[...Array(12)].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
            <Skeleton variant="rectangular" width={300} height={500} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    );
  }

  if (data) {
    const { comics } = data;

    return (
      <div>
        <SearchComic />
        <br />
        <br />
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {comics.map((comic) => (
            <Grid item xs={12} sm={6} md={3} lg={3} key={comic.id}>
              <Card
                variant='outlined'
                onClick={() => navigate(`/marvel-comics/${comic.id}`)}
                sx={{
                  maxWidth: 550,
                  height: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: 5,
                  border: '1px solid #1e8678',
                  boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
              >
                <CardHeader
                  title={comic.title}
                  sx={{
                    borderBottom: '1px solid #1e8678',
                    fontWeight: 'bold',
                    height: 80,
                    overflow: 'hidden'
                  }}
                />
                <CardMedia
                  component='img'
                  image={comic.images && comic.images[0] ? `${comic.images[0].path}.jpg` : noImage}
                  title='show image'
                  sx={{
                    height: 350,
                    objectFit: 'cover'
                  }}
                />
                
        

                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    isInSubCollection(comic.id)
                      ? giveUpSubCollection(comic)
                      : addSubCollection(comic);
                  }}
                >
                  {isInSubCollection(comic.id) ? 'Give Up' : 'Collect'}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination 
          count={totalPages} 
          page={pagenum} 
          onChange={(event, value) => changePage(value)}
          color="primary"
          size="large"
          sx={{ marginTop: 4, marginBottom: 4, display: 'flex', justifyContent: 'center' }}
        />
      </div>
    );
  }
}

export default Comics;
