// @flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import generatePreviewData from "../helpers/generatePreviewData";
import fetch from 'isomorphic-fetch';
import ol from "openlayers";

class DistributionMap extends Component {
  constructor(props){
    super(props)

    this.state = {
      mapData : null
    }
  }
  componentWillMount(){
    const parser = new ol.format.WMSCapabilities();
    if(this.props.distribution.id){
      // preload the data to figure out how to display
      // generate url config
      fetch(this.props.distribution.downloadUrl).then(response => response.text()).then(text=>{
        const result = parser.read(text);
        this.setState({
          mapData: generatePreviewData(this.props.distribution.downloadUrl, result)
        })
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
  return {
    distribution
  };
}

export default connect(mapStateToProps)(DistributionMap);
