import React, { Component } from 'react';
import {RouterContext } from 'react-router';
import SearchResults from './SearchResults/SearchResults';
import SearchFilters from './SearchFilters/SearchFilters';
import SearchBox from './SearchBox';
import ProgressBar from './ProgressBar';
import getTemporals from './dummyData/getTemporals';
import getFormats from './dummyData/getFormats';
import debounce from 'lodash.debounce';
import './Search.css';
import getJSON from'./getJSON';


class Search extends Component {
  constructor(props) {
    super(props);
    this.updateSearchText=this.updateSearchText.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.transferComplete = this.transferComplete.bind(this);
    this.transferFailed = this.transferFailed.bind(this);
    this.transferCanceled = this.transferCanceled.bind(this);

    this.debouncedSearch = debounce(this.doSearch, 150);
    this.debouncedGetFacets = debounce(this.getFacets, 150);

    this.state = {
      searchResults: [],
      filterPublisher: [],
      filterTemporal: [],
      filterJurisdiction: [],
      filterFormat: [],
      loadingProgress: 0,
      isLoading: false
    };
  }

  updateSearchText(newText) {
    this.context.router.push({
      pathname: this.props.location.pathname,
      query: { q: newText },
    });
    this.debouncedGetFacets();
    this.debouncedSearch();
  }

  componentWillMount(){
    if(this.props.location.query.q && this.props.location.query.q.length > 0){
      this.doSearch();
      this.debouncedGetFacets();
    }
  }

  getFacets(){
    let query = this.props.location.query;
    let keyword = query.q.split(' ').join('+');

    getJSON(`http://thunderer.it.csiro.au:9000/datasets/search?query=${keyword}`).then((data)=>{
      this.setState({
        filterPublisher: data.facets[1].options,
        filterTemporal: data.facets[0].options,
        filterFormat: getFormats()
      })
    }, (err)=>{console.warn(err)});
  }

  doSearch(){
      let query = this.props.location.query;
      let keyword = query.q.split(' ').join('+');

      // loading starts
      this.setState({
        isLoading: true
      })

      getJSON(`http://thunderer.it.csiro.au:9000/datasets/search?query=${keyword}`,
        this.updateProgress,
        this.transferComplete,
        this.transferFailed,
        this.transferCanceled).then((data)=>{
        let results= [];
        if(keyword.length > 0){
          results = data.dataSets;
        }
        this.setState({
            searchResults: results,
          });
        }, (err)=>{console.warn(err)});
  }


  updateQuery(query){
    this.context.router.push({
      pathname: this.props.location.pathname,
      query: Object.assign(this.props.location.query, query)
    });
    // uncomment this when facet search is activated
    // this.debouncedSearch();
  }

  getSummaryText(){
    if(this.state.searchResults.length){
      return (
          <div className='summary'>
            <p>{this.state.searchResults.length} results found</p>
          </div>);
    }
    return null;
  }

  // progress on transfers from the server to the client (downloads)
  updateProgress (oEvent) {
    if (oEvent.lengthComputable) {
      this.setState({
        loadingProgress: oEvent.loaded / oEvent.total
      })
    } else {
      // Unable to compute progress information since the total size is unknown
      console.log('Unable to compute progress information since the total size is unknown');
    }
  }

  transferComplete(evt) {
    this.setState({
      isLoading: false
    })
    console.log("The transfer is complete.");
  }

  transferFailed(evt) {
    console.warn("An error occurred while transferring the file.");
    this.setState({
      isLoading: false
    })
  }

  transferCanceled(evt) {
    console.warn("The transfer has been canceled by the user.");
    this.setState({
      isLoading: false
    })
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <ProgressBar progress={this.state.loadingProgress}/>}
        <div className='search container'>
          <div className='search-header jumbotron'>
            <SearchBox searchValue={this.props.location.query.q}
                       updateSearchText={this.updateSearchText}
                       />
          </div>
          <div className='search-body row'>
            {this.props.location.query.q && this.props.location.query.q.length > 0 && <div className='col-sm-4'>
                          <SearchFilters
                            filterPublisher={this.state.filterPublisher}
                            filterTemporal={this.state.filterTemporal}
                            filterFormat={this.state.filterFormat}
                            filterJurisdiction={[]}
                            filters={this.state.filters}
                            location={this.props.location}
                            updateQuery={this.updateQuery} />
                      </div>}
            <div className='col-sm-8'>
                {this.getSummaryText()}
                <SearchResults
                  searchResults={this.state.searchResults}
                  location={this.props.location}
                  />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.contextTypes ={
  router: React.PropTypes.object.isRequired
}


export default Search;
