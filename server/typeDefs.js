//Create the type definitions for the query and our data

export const typeDefs = `#graphql
  type Query {
    comics(pagenum: Int!): [Comic]
    searchComics(title: String!):[Comic]
    comic(id: Int!): Comic
  }

  type Comic {
    id: Int
    title: String
    description: String
    isbn: String
    pageCount: Int
    resourceURI: String
    urls: [Url]
    series: Series
    dates: [Date]
    prices: [Price]
    thumbnail: Thumbnail
    images: [Image]
    creators: Creators
    characters: Characters
    stories: Stories
  }
  
  
  type Url {
    type: String
    url: String
  }
  
  type Series {
    resourceURI: String
    name: String
  }
  
  
  type Date {
    type: String
    date: String
  }
  
  type Price {
    type: String
    price: Float
  }
  
  type Thumbnail {
    path: String
    extension: String
  }
  
  type Image {
    path: String
    extension: String
  }
  
  type Creators {
    available: Int
    collectionURI: String
    items: [CreatorItem]
    returned: Int
  }
  
  type CreatorItem {
    resourceURI: String
    name: String
    role: String
  }
  
  type Characters {
    available: Int
    collectionURI: String
    items: [CharacterItem]
    returned: Int
  }
  
  type CharacterItem {
    resourceURI: String
    name: String
  }
  
  type Stories {
    available: Int
    collectionURI: String
    items: [StoryItem]
    returned: Int
  }
  
  type StoryItem {
    resourceURI: String
    name: String
    type: String
  }
`;
