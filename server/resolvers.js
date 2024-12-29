import { GraphQLError } from 'graphql';
import { RESTDataSource } from '@apollo/datasource-rest';
import md5 from 'blueimp-md5';
import { client } from './server.js';
import dotenv from 'dotenv';
dotenv.config();

const publickey = process.env.PUBLIC_KEY;
const privatekey = process.env.PRIVATE_KEY;  
// const publickey = import.meta.env.VITE_PUBLIC_KEY;
// const privatekey = import.meta.env.VITE_PRIVATE_KEY;
export class ComicAPI extends RESTDataSource {

  async getComic(pagenum) {
    let offset = 0
    const limit = 50
    const total = 58250
    if (pagenum > total / limit) {
      throw "Invalid Page number"
    }
    if (pagenum < 1) {
      throw "Invalid Page Number"
    }
    offset = ((pagenum - 1) * limit)

    try {
      const getKey = `page/${pagenum}`
      let exists = await client.exists(getKey)
      if (exists) {
        console.log("Got this from the cache!")
        let searchResults = await client.get(getKey)

        if (!searchResults) throw 'could not find data!'
        return JSON.parse(searchResults)
      } else {


        console.log("Ahhh, had to get it from server!");
        const key = `page/${pagenum}`;
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';

        const url = `${baseUrl}?ts=${encodeURIComponent(ts)}&apikey=${encodeURIComponent(publickey)}&hash=${encodeURIComponent(hash)}&offset=${encodeURIComponent(offset)}&limit=${encodeURIComponent(limit)}`;
        let data = await this.get(`${url}`);
        console.log(data.data.results);
        await client.set(key, JSON.stringify(data.data.results));
        return data.data.results;
      }
    } catch (e) {
      return res.status(404).json({ error: e })
    }
  }


  async getComicsByTitle(title) {
    const limit = 50;
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';

    const encodedTitle = encodeURIComponent(title.toLowerCase());

    const url = `${baseUrl}?ts=${ts}&apikey=${publickey}&hash=${hash}&titleStartsWith=${encodedTitle}&limit=${limit}`;

    try {
      let data = await this.get(url);
      console.log(data.data.results);
      return data.data.results;
    } catch (error) {
      console.error('Error fetching comics:', error);
      throw error;
    }
  }


  async getComicById(id) {
    try {
      const getKey = `comic/${id}`
      let exists = await client.exists(getKey)
      if (exists) {
        console.log("Got this from the cache!")
        let searchResults = await client.get(getKey)
        if (!searchResults) throw 'could not find data!'
        return JSON.parse(searchResults)
      } else {

        console.log("Ahhh, had to get it from server!");
        const ts = new Date().getTime();
        const stringToHash = ts + privatekey + publickey;
        const hash = md5(stringToHash);
        const baseUrl = `https://gateway.marvel.com:443/v1/public/comics/${encodeURIComponent(id)}`;
        const url = `${baseUrl}?ts=${encodeURIComponent(ts)}&apikey=${encodeURIComponent(publickey)}&hash=${encodeURIComponent(hash)}`;
        let data = await this.get(`${url}`);
        console.log(data.data.results);
        await client.set(getKey, JSON.stringify(data.data.results[0]));
        return data.data.results[0];

      }
    } catch (e) {
      return res.status(404).json({ error: e })
    }
  }
}
export const resolvers = {
  Query: {

    comics: async (_, { pagenum }, { dataSources }) => {
      return dataSources.comicAPI.getComic(pagenum);
    },
    comic: async (_, { id }, { dataSources }) => {
      return dataSources.comicAPI.getComicById(id);
    },
    searchComics: async (_, { title }, { dataSources }) => {
      return dataSources.comicAPI.getComicsByTitle(title);
    },
  }
}