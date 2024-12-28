import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

function AddCollection() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
    setError('');
  };

  const addCollection = () => {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      setError("Collection Name cannot be empty!");
    } else if (trimmedName.length > 255) {
      setError("Collection Name cannot be more than 255 characters!");
    } else if (/^\d+$/.test(trimmedName)) {
      setError("Collection Name cannot be only digits!");
    } else if (!/[a-zA-Z]/.test(trimmedName)) {
      setError("Collection Name must contain at least one letter!");
    } else {
      dispatch(actions.addCollection(trimmedName));
      setName('');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Collection
      </Typography>
      <TextField
        fullWidth
        label="Collection Name"
        variant="outlined"
        value={name}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={addCollection}
        fullWidth
        sx={{ mt: 2 }}
      >
        Add to Collections
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default AddCollection;
