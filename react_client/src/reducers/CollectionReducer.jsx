import { useState } from 'react';
import {v4 as uuid} from 'uuid';
import { GIVE_UP_SUB_COLLECTION } from '../actions';
import { VIEW_SUB_COLLECTION } from '../actions';
import { SELECT_COLLECTION } from '../actions';
const initalState = [
  {
    id: uuid(),
    name: 'Default Collection',
    subCollection:[],
    selected: true
  }
];

let copyState = null;
let index = 0;

const CollectionReducer = (state = initalState, action) => {
  const {type, payload} = action;
  
  switch (type) {
    case 'CREATE_COLLECTION':
      
      copyState = [...state];
      const existingCollection = state.find((collection) => collection.name.toLowerCase().trim() === payload.name.toLowerCase().trim());
      console.log(payload.name.toLowerCase(),"enk")
      if(copyState.length === 0){
        return [...state,
          {
            id: uuid(),
            name: payload.name,
            subCollection:[],
            selected: true
          }
        ];
      }else if(existingCollection){
        alert('Collection with this name already exists!');
        return state;
      }else{
        return [...state,
          {
            id: uuid(),
            name: payload.name,
            subCollection:[],
            selected: false
          }
        ];
      }
      
        
      case SELECT_COLLECTION:
      const selectedCollectionId = action.payload.collectionId;

      const newState = state.map((item) => ({
        ...item,
        selected: item.id === selectedCollectionId,
      }));

      return newState;

    case 'DELETE_COLLECTION':
      copyState = [...state];
      index = copyState.findIndex((x) => x.id === payload.id);
      if(copyState[index].selected === true){
        alert("You can not delete selected collection!");
        return[...copyState]
      }
      copyState.splice(index, 1);
      return [...copyState];
    
    case 'VIEW_SUB_COLLECTION':
      console.log('payload', payload);
      return [...state,
        {
          subCollection:payload.subCollection,
        }
      ];

    case 'SEARCH_COMIC':
      console.log('payload', payload);
      return [...state,
        {
          subCollection:payload.subCollection,
        }
      ];

  case 'ADD_SUB_COLLECTIONS':
  copyState = [...state];
  let searchIndex = copyState.findIndex((x) => x.selected === true);
  const existingSubCollection = copyState[searchIndex].subCollection;
  const isDuplicate = existingSubCollection.some(item => item.id === payload.comic.id);
  const isLimitReached = existingSubCollection.length >= 20;

  if (!isDuplicate && !isLimitReached) {
    const newSubCollection = [...existingSubCollection, payload.comic];
    const newState = copyState.map((item, index) => {
      if (index === searchIndex) {
        return {
          ...item,
          subCollection: newSubCollection,
        };
      }
      return item;
    });

    return newState;
  } else {
    if (isDuplicate) {
      alert("This comic is already in the sub-collection!");
    } else {
      alert("The sub-collection can have up to 20 comics.");
    }

    return state;
  }

  case GIVE_UP_SUB_COLLECTION:
  const { comic } = action.payload;
  const newState2 = state.map((item) => {
    if (item.selected) {
      const updatedSubCollection = item.subCollection.filter((c) => c.id !== comic.id);
      return {
        ...item,
        subCollection: updatedSubCollection,
      };
    } else {
      return item;
    }
  });

  return newState2;


  case VIEW_SUB_COLLECTION:
      const { collectionId } = action.payload;
      console.log("ggg")
      const newState11 = state.map((item) => ({
        ...item,
        selected: item.id === collectionId,
      }));
      return newState11;
    default:
      return state;
  }
};

export default CollectionReducer;