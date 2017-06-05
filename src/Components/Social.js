//@flow
import React from 'react';
import './Social.css';


export default class Social extends React.Component {
  render() {
    const url: string = window.location.href;
    return (
      <div className="social">
        <div><button className='btn btn-default'><i className="fa fa-rss" aria-hidden="true"></i>Subscribe<span className="count">0</span></button></div>
        <div>
          <a className="twitter-share-button btn btn-default" href={`https://twitter.com/intent/tweet?url=${url}`}
          data-size="large"><i className="fa fa-twitter" aria-hidden="true"></i>Tweet</a>
        </div>
      </div>
    );
  }
}
