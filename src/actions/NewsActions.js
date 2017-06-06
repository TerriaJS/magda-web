import {config} from '../config'
import fetch from 'isomorphic-fetch'
import {actionTypes} from '../constants/ActionTypes';
import type { Action } from '../types';
var parse = require('xml-parser');


export function requestNews():Action {
  return {
    type: actionTypes.REQUEST_NEWS,
  }
}

export function receiveNews(news: Object): Action {
  return {
    type: actionTypes.RECEIVE_NEWS,
    news,
  }
}

export function requestNewsError(error: number): Action {
  return {
    type: actionTypes.REQUEST_NEWS_ERROR,
    error,
  }
}



export function fetchNewsfromRss(){
  return (dispatch: Function, getState: Function)=>{
      // check if we need to fetch
      // if(getState().news.isFetching || getState.news.news){
      //   return false;
      // }
      const url = config.rssUrl;
      fetch("https://nationalmap.gov.au/proxy/_0d/https://blog.data.gov.au/blogs/rss.xml")
      .then(response=>{
        if (response.status !== 200) {
          console.log("error")
        }
        else {
          return response.text()
        }
      }).then(text=>{
        return parse(text)
      });


  }
}
