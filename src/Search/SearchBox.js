import React, { Component } from 'react';


import './SearchBox.css';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.onClearSearch = this.onClearSearch.bind(this);
    this.state = {
      searchText: ''
    }
  }

  searchBoxMounted(searchBox) {
    searchBox.focus();
  }

  onChange(event){
    this.setState({
      searchText: event.target.value
    });
    this.debounceSearch(event.target.value);
  }

  onClearSearch(){
    this.props.onClearSearch();
  }

  render() {
    return (
      <form className="search-box">
        <div className='search-input'>
        <input
          type="text"
          name="search"
          className='form-control'
          placeholder="Enter a search term"
          value={this.props.value}
          onChange={(e)=>{this.props.onChange(e.target.value)}}
          onKeyPress={this.props.onKeyPress}
          ref={this.searchBoxMounted}
        />
        {this.props.value.length > 0 &&
          <button type='button' className='btn btn-clear-search' onClick={this.onClearSearch}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        }
        </div>
        <span className="search-icon"><i className="fa fa-search" aria-hidden="true"></i> </span>
      </form>
    );
  }
}
SearchBox.propTypes = {onChange: React.PropTypes.func, value: React.PropTypes.string, onKeyPress: React.PropTypes.func};



export default SearchBox;
