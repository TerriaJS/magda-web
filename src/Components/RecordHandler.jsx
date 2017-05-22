import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDatasetFromRegistry, fetchDistributionFromRegistry } from "../actions/recordActions";
import Tabs from '../UI/Tabs';
import {config} from '../config';
import { Link } from 'react-router';
import ErrorHandler from '../Components/ErrorHandler';
import CustomIcons from '../UI/CustomIcons';

class RecordHandler extends React.Component {
  componentWillMount(){
    this.props.fetchDataset(this.props.params.datasetId);
    if(this.props.params.distributionId){
      this.props.fetchDistribution(this.props.params.distributionId);
    }
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.params.datasetId !== this.props.params.datasetId){
        nextProps.fetchDataset(nextProps.params.datasetId);
      } 
      if(nextProps.params.distributionId !== this.props.params.distributionId){
        nextProps.fetchDistribution(nextProps.params.distributionId);
      }
  }

  renderByState(){
    if(this.props.error){
      return <ErrorHandler errorCode={this.props.error}/>;
    } else if (this.props.params.distributionId){
      return (
        <div>
          <div className="container">
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="#">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/dataset/${this.props.params.datasetId}`}>Dataset</Link></li>
              </ul>
              <div className="media">
                <div className="media-left">
                  <CustomIcons imageUrl={this.props.dataset.publisherDetails && this.props.dataset.publisherDetails.imageUrl}/>
                </div>
                <div className="media-body">
                  <h1>{this.props.distribution.title}</h1>
                  <a className="dont-break-out">{this.props.distribution.downloadUrl}</a>
                  <div>Updated {this.props.distribution.updatedDate}</div>
                </div>
              </div>
                <Tabs list={config.distributionTabList} baseUrl={`/dataset/${this.props.params.datasetId}/distribution/${this.props.params.distributionId}`}/>
            </div>
            <div className="tab-content">{this.props.children}</div>
            </div>
      )
    }
    return (
      <div>
          <div className="container media">
            <div className="media-left">
              <CustomIcons imageUrl={this.props.dataset.publisherDetails && this.props.dataset.publisherDetails.imageUrl}/>
            </div>
             <div className="media-body">
                <h1>{this.props.dataset.title}</h1>
                <a className="dont-break-out">{this.props.dataset.landingPage}</a>
                <div>Updated {this.props.dataset.updatedDate}</div>
            </div>
          </div>
          <Tabs list={config.datasetTabList} baseUrl={`/dataset/${this.props.params.datasetId}`}/>
          <div className="tab-content">{this.props.children}</div>
      </div>
    );
  }
  
  render() {
    return (
      <div>
          {!this.props.isFetching && this.renderByState()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const record=state.record;
  const dataset=record.dataset;
  const distribution=record.distribution;
  const isFetching=record.isFetching;
  const error=record.error;

  return {
    dataset, distribution, isFetching, error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDataset: fetchDatasetFromRegistry,
    fetchDistribution: fetchDistributionFromRegistry
  }, dispatch);
}

RecordHandler.propTypes = {
  dataset: React.PropTypes.object,
  distribution: React.PropTypes.object,
  location: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  error: React.PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordHandler);




