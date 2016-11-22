import React, { Component } from 'react';
import {fetchSearchResultsIfNeeded} from '../actions/results';
import {fetchRegionMapping} from '../actions/regionMapping';
import {connect} from 'react-redux';
import config from '../config.js';
import debounce from 'lodash.debounce';
import defined from '../helpers/defined';
import './Search.css';
// eslint-disable-next-line
import {RouterContext } from 'react-router';
// eslint-disable-next-line
import Pagination from '../UI/Pagination';
import ProgressBar from '../UI/ProgressBar';
import SearchBox from './SearchBox';
import SearchFacets from '../SearchFacets/SearchFacets';
import SearchResults from '../SearchResults/SearchResults';

class Search extends Component {

  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.goToPage=this.goToPage.bind(this);
    this.onClickTag = this.onClickTag.bind(this);
    this.handleSearchFieldEnterKeyPress = this.handleSearchFieldEnterKeyPress.bind(this);
    this.debounceUpdateSearchQuery = debounce(this.updateSearchQuery, 3000);
    // it needs to be undefined here, so the default value should be from the url
    // once this value is set, the value should always be from the user input
    this.state={
      searchText: undefined
    }
  }

  componentWillMount(){
    this.props.dispatch(fetchRegionMapping());
    this.props.dispatch(fetchSearchResultsIfNeeded(this.props.location.query));
  }

  componentWillReceiveProps(nextProps){
    this.props.dispatch(fetchSearchResultsIfNeeded(this.props.location.query));
  }

  onSearchTextChange(text){
    this.setState({
      searchText: text
    });
    this.debounceUpdateSearchQuery(text);
  }

  onClickTag(tag){
    this.setState({
      searchText: tag
    });
    this.updateSearchQuery(tag);
  }

  updateSearchQuery(text){
    this.updateQuery({
      q: text,
      publisher: [],
      regionID: undefined,
      regionType: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      format: [],
      page: undefined
    });
  }

  handleSearchFieldEnterKeyPress(event) {
    // when user hit enter, no need to submit the form
    if(event.charCode===13){
        event.preventDefault();
        this.updateSearchQuery(this.state.searchText)
    }
  }

  goToPage(index){
    this.updateQuery({
      page: index
    })
  }

  updateQuery(query){
    let {router} = this.context;
    router.push({
      pathname: this.props.location.pathname,
      query: Object.assign(this.props.location.query, query)
    });
  }

  getSearchBoxValue(){
    if(defined(this.state.searchText)){
      return this.state.searchText;
    } else if(defined(this.props.location.query.q)){
      return this.props.location.query.q
    }
    return '';
  }

  noMatchText(){
    if(defined(this.props.location.query.q) &&
       this.props.location.query.q > 0 &&
       this.props.strategy == 'match-part'){
      return <div className='no-match'>
              Sorry we can not find what you were looking for, you might find the following related datasets useful?
            </div>
    }
  }


  render() {
    return (
      <div>
        {this.props.isFetching && <ProgressBar progress={this.props.progress}/>}
        <div className='search'>
          <div className='search__search-header'>
            <div className='container'>
              <SearchBox value={this.getSearchBoxValue()}
                         onChange={this.onSearchTextChange}
                         onKeyPress={this.handleSearchFieldEnterKeyPress}/>
            </div>
          </div>
          <div className='search__search-body container'>
            <div className='col-sm-4'>
                <SearchFacets updateQuery={this.updateQuery} keyword={this.props.location.query.q}/>
            </div>
            <div className='col-sm-8'>
                {!this.props.isFetching && !this.props.hasError && <div>
                  {this.noMatchText()}
                  <SearchResults
                      searchResults={this.props.datasets}
                      totalNumberOfResults={this.props.hitCount}
                      onClickTag={this.onClickTag}
                  />
                  {this.props.hitCount > 20 &&
                      <Pagination
                        currentPage={+this.props.location.query.page || 1}
                        maxPage={Math.ceil(this.props.hitCount/config().resultsPerPage)}
                        goToPage={this.goToPage}
                      />
                   }
                 </div>
               }
               {!this.props.isFetching && this.props.hasError &&
                 <div className='search-error'> error in request </div>
               }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.contextTypes ={
  router: React.PropTypes.object.isRequired,
}

Search.propTypes = {
  datasets: React.PropTypes.array.isRequired,
  hitCount: React.PropTypes.number.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  progress: React.PropTypes.number.isRequired,
  hasError: React.PropTypes.bool.isRequired,
  strategy: React.PropTypes.string.isRequired,
}


function mapStateToProps(state) {
  let { results } = state;
  return {
    datasets: results.datasets,
    hitCount: results.hitCount,
    isFetching: results.isFetching,
    progress: results.progress,
    hasError: results.hasError,
    strategy: results.strategy
  }
}

export default connect(mapStateToProps)(Search);
