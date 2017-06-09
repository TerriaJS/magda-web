//@flow
import React from 'react';
import {config} from '../config';
import './Social.css';


export default class Social extends React.Component {
  render() {
    const url: string = window.location.href;
    return (
      <div className='social'>
        <div><a className='btn btn-default' href={config.rssUrl} target='_blank'><i className='fa fa-rss' aria-hidden='true'></i>Subscribe</a></div>
        <div>
          <a className='twitter-share-button btn btn-default' href={`https://twitter.com/intent/tweet?url=${url}`}
          data-size='large'><i className='fa fa-twitter' aria-hidden='true'></i>Tweet</a>
        </div>
      </div>
    );
  }
}
