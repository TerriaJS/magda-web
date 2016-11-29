import React, { Component } from 'react';
import find from 'lodash.find';


import './SearchRecomendations.css';

class SearchRecomendations extends Component {
  render() {
    let suggestedPublisher =
    this.props.publisherOptions.filter(p=>p.matched == true && !find(this.props.activePublishers, (item)=>item.value === p.value));
    if(suggestedPublisher.length > 0){
      return (
        <div className='search-recomendation' >Are you Search for Items published by:
          <button className='search-recomendation-option-btn btn' onClick={this.props.onTogglePublisherOption.bind(this, suggestedPublisher[0])}>
            {suggestedPublisher[0].value}
          </button> ?
        </div>
      );
    } else{
      return null;
    }
  }
}
SearchRecomendations.propTypes = {};


export default SearchRecomendations;
