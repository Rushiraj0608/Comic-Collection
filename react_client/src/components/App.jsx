// import React from 'react';
// import './App.css';
// import {NavLink, Route, Routes} from 'react-router-dom';
// import { AppBar, Toolbar, Typography, Button, Box, TextField, IconButton } from '@mui/material';
// import Home from './Home';
// import Comics from './Comics';
// import Comic from './comic';
// import Collection from './Collections';
// import Error_404 from './Error_404';
// import Error_400 from './Error_400'
// import Check_Error from './Check_Error';
// function App() {

//   return (
//     <div>
//       <AppBar position="static">
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         <Button color="inherit" component={NavLink} to="/">
//           Home
//         </Button>
//         <Typography variant="h6" component="div">
//           MARVEL-COMICS COLLECTION
//         </Typography>
//         <Button color="inherit" component={NavLink} to="/marvel-comics/page/1">
//           Explore Comics
//         </Button>
//       </Toolbar>
//     </AppBar>

//       <Routes>
//         <Route path='/' element={<Collection />} />
//         <Route path='/marvel-comics/page/:pagenum' element={<Comics />} />
//         <Route path='/marvel-comics/:id' element={<Comic />} />
//         <Route path='/marvel-comics/collections' element={<Collection />} />
//         <Route path='/404_error' element = {<Error_404/>}/>
//         <Route path='/400_error' element = {<Error_400/>}/>
//         <Route path='/error' element = {<Check_Error/>}/>
//       </Routes>

//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './Home';
import Comics from './Comics';
import Comic from './comic';
import Collection from './Collections';
import Error_404 from './Error_404';
import Error_400 from './Error_400'
import Check_Error from './Check_Error';

function App() {
  return (
    <div>
      <AppBar position="static" className="app-bar">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button color="inherit" component={NavLink} to="/" className="nav-button">
            Home
          </Button>
          <Typography variant="h6" component="div" className="app-title">
            MARVEL-COMICS COLLECTION
          </Typography>
          <Button color="inherit" component={NavLink} to="/marvel-comics/page/1" className="nav-button">
            Explore Comics
          </Button>
        </Toolbar>
      </AppBar>

      <div className="content-container">
        <Routes>
          <Route path='/' element={<Collection />} />
          <Route path='/marvel-comics/page/:pagenum' element={<Comics />} />
          <Route path='/marvel-comics/:id' element={<Comic />} />
          <Route path='/marvel-comics/collections' element={<Collection />} />
          <Route path='/404_error' element={<Error_404/>}/>
          <Route path='/400_error' element={<Error_400/>}/>
          <Route path='/error' element={<Check_Error/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
