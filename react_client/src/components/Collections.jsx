import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Container,
  Box,
  IconButton,
  Collapse,
  AppBar,
  Toolbar,
  Paper,InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Collection from "./Collection";
import AddCollection from "./AddCollection";

function Collections() {
  const navigate = useNavigate();
  const allCollections = useSelector((state) => state.collections);
  const [comicId, setComicId] = useState("");
  const [isAddingCollection, setIsAddingCollection] = useState(false);


  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedComicId = comicId.trim();
    
    if (trimmedComicId) {
      if (/^\d+$/.test(trimmedComicId)) {
        navigate(`/marvel-comics/${trimmedComicId}`);
      } else {
    
        alert("Please enter a valid integer for the comic ID.");
        
      }
    } else {
  
      alert("Please enter a comic ID.");
     
    }
  };
  

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Collections
          </Typography>
          <Button
            variant="contained"
            startIcon={isAddingCollection ? <CloseIcon /> : <AddIcon />}
            onClick={() => setIsAddingCollection(!isAddingCollection)}
            sx={{ backgroundColor: "#1e8678" }}
          >
            {isAddingCollection ? "Cancel" : "Add Collection"}
          </Button>
        </Box>

        {/* Add Collection Section */}
        <Collapse in={isAddingCollection}>
          <Box sx={{ mb: 3 }}>
            <AddCollection onComplete={() => setIsAddingCollection(false)} />
          </Box>
        </Collapse>

        {/* Collections Grid */}
        <Grid container spacing={3}>
          {allCollections.map((collection) => (
            <Grid item key={collection.id} xs={12} sm={6} lg={4}>
              <Collection collection={collection} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h4" sx={{display:"flex", fontWeight: "bold", mb: 2 , mt: 10}}>
          Collect Comics
        </Typography>
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            label="Search Comic by ID"
            variant="outlined"
            value={comicId}
            onChange={(e) => setComicId(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button type="submit" variant="contained">
                    <SearchIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      </Container>


      {/* <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h4" sx={{ fontWeight: "bold" }}>
          Collect Comics
        </Typography>
        <TextField
          label="Search Comic by ID"
          variant="outlined"
          value={comicId}
          onChange={(e) => setComicId(e.target.value)}
          sx={{ width: "300px" }}
        />
        <IconButton type="submit" sx={{ ml: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      </Container> */}


    </>
  );
}

export default Collections;


