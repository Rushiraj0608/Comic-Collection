import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Modal
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import queries from '../queries.js';

function SearchComic() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { loading, error, data } = useQuery(queries.SEARCH_COMICS, {
    variables: { title: searchTerm },
    skip: !searched,
    fetchPolicy: 'cache-and-network'
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setSearched(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearched(true);
      setModalOpen(true);
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      {/* <Typography variant="h4" gutterBottom>
        Find Comic
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search Term"
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: loading && <CircularProgress size={20} />
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          disabled={loading}
          sx={{ height: 53 }}
        >
          Search
        </Button>
      </Box> */}

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search Results
          </Typography>
          {loading && <CircularProgress />}
          {error && <Typography color="error">Error: {error.message}</Typography>}
          {data && data.searchComics && (
            <ul>
              {data.searchComics.map(comic => (
                <li key={comic.id}>
                  <Link to={`/marvel-comics/${comic.id}`}>{comic.title}</Link>
                </li>
              ))}
            </ul>
          )}
          {data && data.searchComics && data.searchComics.length === 0 && (
            <Typography>No comics found.</Typography>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="warning" onClose={() => setOpenSnackbar(false)}>
          Please enter a search term
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SearchComic;
