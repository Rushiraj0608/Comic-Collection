import {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import './App.css'

function AddSubCollection (props){

  const addSubCollection = () => {
    dispatch(actions.addSubCollection(formData.name));
    document.getElementById('name').value = '';
  };
  return (
    <div className='add'>
      <div className='input-selection'>
   
        <br />
      </div>
      <button onClick={addSubCollection}>Add to Collections</button>
    </div>
  );
}

export default AddSubCollection

