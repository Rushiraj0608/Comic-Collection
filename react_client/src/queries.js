import {gql} from '@apollo/client';

const GET_COMICS = gql`
query Comics($pagenum: Int!) {
    comics(pagenum: $pagenum) {
      id
      title
      prices {
        price
      }
      images {
        path
      }
    }
}
`
  
const GET_COMIC = gql`
query Comic($comicId: Int!) {
  comic(id: $comicId) {
    id
    title
    description
    prices {
      price
    }
    pageCount
    isbn
    images {
      path
    }
    dates {
      date
    }
    characters {
      items {
        name
      }
    }
    urls {
      url
    }
    thumbnail {
      path
    }
    creators {
      items {
        name
        role
      }
    }
  }
}
`

const SEARCH_COMICS = gql`
query SearchComics($title: String!) {
  searchComics(title: $title) {
    id
    title
    urls {
      url
    }
    prices {
      price
    }
    isbn
    images {
      path
    }
    characters {
      items {
        name
      }
    }
    dates {
      date
    }
  }
}
`
let exported = {
    GET_COMICS,
    GET_COMIC,
    SEARCH_COMICS
  };
  
  export default exported;