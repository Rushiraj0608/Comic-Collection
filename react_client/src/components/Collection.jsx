import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
import noImage from "../img/noImage.jpeg";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Stack,
  TextField,
} from "@mui/material";




import { ErrorBoundary } from "react-error-boundary";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";


import SearchIcon from "@mui/icons-material/Search";


// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Box role="alert" p={3}>
      <Typography color="error" variant="h2">
        Something went wrong:
      </Typography>
      <Typography color="error">{error.message}</Typography>
      <Button variant="contained" onClick={resetErrorBoundary} sx={{ mt: 2 }}>
        Try again
      </Button>
    </Box>
  );
}

function Collection({ collection }) {
  const dispatch = useDispatch();
  const [subCollection, setSubCollection] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const collections = useSelector((state) => state.collections);
  const selectedCollection = useSelector((state) =>
    state.collections.find((c) => c.selected)
  );

  useEffect(() => {
    const fetchSubCollection = () => {
      const selectedCollection = collections.find(
        (c) => c.id === collection.id
      );
      const newSubCollection = selectedCollection
        ? selectedCollection.subCollection
        : [];
      setSubCollection(newSubCollection);
    };

    fetchSubCollection();
  }, [collection.id, collections]);

  const handleSubCollectionAction = (comic) => {
    if (isInSubCollection(comic.id)) {
      dispatch(actions.giveUpSubCollection(comic));
    } else {
      dispatch(actions.addSubCollection(comic));
    }
  };

  const isInSubCollection = (comicId) => {
    return (
      selectedCollection &&
      selectedCollection.subCollection.some((c) => c.id === comicId)
    );
  };


  



  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setIsModalOpen(false);
      }}
    >
      <Card
        elevation={3}
        sx={{
          width: "100%", // Change from fixed width to 100%
          height: "100%", // Optional: if you want all cards in a row to have the same height
          marginBottom: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{
              borderBottom: "1px solid #eee",
              paddingBottom: 1,
              display: "flex",
              // bold
              
            }}
          >
            {collection.name}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              marginTop: 2,
              // justifyContent: 'space-between'
              justifyContent: "center",
            }}
          >
            <Button
              variant={
                selectedCollection?.id === collection.id
                  ? "contained"
                  : "outlined"
              }
              color="primary"
              startIcon={<CheckCircleIcon />}
              onClick={() => dispatch(actions.selectCollection(collection.id))}
              size="small"
              sx={{ flex: 1 }}
            >
              Select
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              startIcon={<VisibilityIcon />}
              onClick={() => setIsModalOpen(true)}
              size="small"
              sx={{ flex: 1 }}
            >
              View
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => dispatch(actions.deleteCollection(collection.id))}
              size="small"
              sx={{ flex: 1 }}
            >
              Delete
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #eee",
          }}
        >
          <Typography variant="h4" component="h4">Collected Comics</Typography>
  
          <IconButton onClick={() => setIsModalOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>


  
        <DialogContent sx={{ padding: 2 }}>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            {subCollection.map((comic) => (
              <Grid item xs={12} sm={6} md={4} key={comic.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      comic.images?.[0]
                        ? `${comic.images[0].path}.jpg`
                        : noImage
                    }
                    alt={comic.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" noWrap>
                      {comic.title || "N/A"}
                    </Typography>
                    <Button
                      fullWidth
                      variant={
                        isInSubCollection(comic.id) ? "contained" : "outlined"
                      }
                      color="primary"
                      onClick={() => handleSubCollectionAction(comic)}
                      sx={{ marginTop: 1 }}
                    >
                      {isInSubCollection(comic.id) ? "Give Up" : "Collect"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </ErrorBoundary>
  );
}

export default Collection;

