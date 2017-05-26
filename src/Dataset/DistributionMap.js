// @flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import generatePreviewData from "../helpers/generatePreviewData";

class DistributionMap extends Component {
  constructor(props){
    super(props)

    this.state = {
      mapData : null
    }
  }
  componentWillMount(){
    if(this.props.distribution.id && this.props.datasetId){
      const data = generatePreviewData(this.props.distribution, this.props.datasetId);
      this.setState({
        mapData: data
      })
    }
  }

  render(){
    return <div className="dataset-details container" >
            {this.state.mapData && <iframe name='FRAME1' src={`https://nationalmap.gov.au/#clean&hideExplorerPanel=1&start=${this.state.mapData }`} width= "100%" height='600px' scrolling='auto' frameBorder='0'/>}
          </div>
  }
}

function mapStateToProps(state, ownProps) {
  const distribution = state.record.distribution;
  const datasetId = ownProps.params.datasetId
  return {
    distribution, datasetId
  };
}

export default connect(mapStateToProps)(DistributionMap);
