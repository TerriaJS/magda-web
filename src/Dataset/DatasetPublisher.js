import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router";
import OverviewBox from '../UI/OverviewBox';

class DatasetPublisher extends Component {
  renderPublisher(publisher){
      return (<div className="col-sm-8">
                <h2>{publisher.title}</h2>
                <h3 className="section-heading">Overview</h3>
                <OverviewBox content={publisher.description}/>
                <Link to={`/search?publisher=${encodeURIComponent(publisher.title)}&q=${encodeURIComponent("*")}`}>View all datasets from {publisher.title}</Link>
              </div>)
  }

  render(){
    const publisher = this.props.dataset.publisher || '';
    return <div className="dataset-publisher container" >
            <div className="row">
                {this.props.dataset.publisher && this.renderPublisher(this.props.dataset.publisherDetails)}
            </div>
          </div>
  }
}

function mapStateToProps(state) {
  const record= state.record;
  const dataset = record.dataset;
  return {
    dataset
  };
}

DatasetPublisher.propTypes = {dataset: React.PropTypes.object};



export default connect(mapStateToProps)(DatasetPublisher);
