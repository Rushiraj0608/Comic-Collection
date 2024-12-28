
const addCollection = (name) => ({
    type: 'CREATE_COLLECTION',
    payload: {
      name: name
    }
  });
  
const deleteCollection = (id) => ({
    type: 'DELETE_COLLECTION',
    payload: {id: id}
  });
  

export const SELECT_COLLECTION = 'SELECT_COLLECTION';

export const selectCollection = (collectionId) => ({
  type: SELECT_COLLECTION,
  payload: {
    collectionId,
  },
});
 
 const addSubCollection = (comic) => ({
    type: 'ADD_SUB_COLLECTIONS',
    payload: {
        comic: comic
    }
 }) 

export const GIVE_UP_SUB_COLLECTION = 'GIVE_UP_SUB_COLLECTION';

export const giveUpSubCollection = (comic) => ({
  type: GIVE_UP_SUB_COLLECTION,
  payload: {
    comic,
  },
});

export const VIEW_SUB_COLLECTION = 'VIEW_SUB_COLLECTION';

export const viewSubCollection = (collectionId) => ({
  type: VIEW_SUB_COLLECTION,
  payload: {
    collectionId,
  },
});

const searchComic = (id) => ({
  type: 'SEARCH_COMIC',
  payload: {id: id}
});


  export {addCollection, deleteCollection, addSubCollection, searchComic};