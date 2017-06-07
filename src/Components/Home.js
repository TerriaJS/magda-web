// @flow
import React from 'react';
import Statistics from '../Components/Statistics';
import News from '../Components/News';
import {config} from '../config'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchFeaturedDatasetsFromRegistry} from '../actions/featuredDatasetsActions';
import {fetchNewsfromRss} from '../actions/NewsActions';
import DatasetSummary from '../Dataset/DatasetSummary';
import ReactDocumentTitle from 'react-document-title';
import './Home.css';

class Home extends React.Component {
  componentWillMount(){
    this.props.fetchFeaturedDatasets(config.featuredDatasets);
    this.props.fetchNewsfromRss();
  }
  render() {
    return (
      <ReactDocumentTitle title={'Welcome | ' + config.appName}>
      <div className='container home'>
        <div className='row'>
          <div className='col-sm-8'>
            <h2>Featured datasets</h2>
            <div className='white-box'>
              {this.props.datasets.map(d=><DatasetSummary key={d.identifier} dataset={d}/>)}
            </div>
            <h2>News</h2>
            <News isFetching={this.props.isNewsFetching} error={this.props.newsFetchingError} newsItems={this.props.newsItems}/>
          </div>
          <div className='col-sm-4'>
            <h2>data.gov.au statistics</h2>
            <Statistics/>
          </div>
        </div>
      </div>
      </ReactDocumentTitle>
    );
  }
}

const mapStateToProps = (state) => {
  const datasets= state.featuredDatasets.records;
  const isFetching= state.featuredDatasets.isFetching;
  const error = state.featuredDatasets.error;
  const isNewsFetching = state.news.isFetching;
  const newsItems = state.news.news;
  const newsFetchingError = state.news.error;
  return {datasets, isFetching, error, isNewsFetching, newsItems, newsFetchingError}
}

const mapDispatchToProps = (dispatch: Dispatch<*>) => {
  return bindActionCreators({
    fetchFeaturedDatasets: fetchFeaturedDatasetsFromRegistry,
    fetchNewsfromRss: fetchNewsfromRss
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
