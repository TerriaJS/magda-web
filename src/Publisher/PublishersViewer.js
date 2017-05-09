import React, { Component } from 'react';
import { connect } from "react-redux";
import {config} from '../config.js';
import { bindActionCreators } from "redux";
import {fetchPublishersIfNeeded} from '../actions/publisherActions';
import PublisherSummray from './PublisherSummray';
import Pagination from '../UI/Pagination';


import './PublishersViewer.css';
class PublishersViewer extends Component {
    componentWillMount(){
      this.props.fetchPublishersIfNeeded(this.props.location.query.page);
    }
    
    componentWillReceiveProps(nextProps){
      debugger
      nextProps.fetchPublishersIfNeeded(nextProps.location.query.page);
    }

    render(){
      return <div className="container publishers-viewer">
              {this.props.publishers.map(p=>
                <PublisherSummray publisher={p} key={p.value}/>
              )}  
              {this.props.hitCount > 20 &&
                <Pagination
                  currentPage={+this.props.location.query.page || 1}
                  maxPage={Math.ceil(this.props.hitCount/config.resultsPerPage)}
                  location={this.props.location}
                />
              }
             </div>
    }
}

PublishersViewer.propTypes = {publishers: React.PropTypes.array,
                            isFetching: React.PropTypes.bool,
                            error: React.PropTypes.string};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPublishersIfNeeded: fetchPublishersIfNeeded,
  }, dispatch);
}

function mapStateToProps(state, ownProps) {
  const publishers= state.publisher.publishers;
  const isFetching= state.publisher.isFetching;
  const hitCount= state.publisher.hitCount;
  const location = ownProps.location;
  return {
    publishers, isFetching, hitCount, location
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishersViewer);