// @flow
import React, { Component } from 'react';
import { connect } from "react-redux";

class ResourcetMap extends Component {
  componentWillMount(){
    debugger
    // get catalog json

  }
  componentDidMount(){
    // render a terria map

  }

  render(){
    return <div className="dataset-details container" >
                <div className='terria-map' ref={(c) => {this._c = c}}/>
                <iframe name='FRAME1' src='https://nationalmap.gov.au/#clean&hideExplorerPanel=1&start=%7B%22version%22%3A%220.0.03%22%2C%22initSources%22%3A%5B%7B%22catalog%22%3A%5B%7B%22type%22%3A%22group%22%2C%22name%22%3A%22User-Added%20Data%22%2C%22description%22%3A%22The%20group%20for%20data%20that%20was%20added%20by%20the%20user%20via%20the%20Add%20Data%20panel.%22%2C%22isUserSupplied%22%3Atrue%2C%22isOpen%22%3Atrue%2C%22items%22%3A%5B%7B%22type%22%3A%22wms%22%2C%22name%22%3A%22User%20Data%22%2C%22isUserSupplied%22%3Atrue%2C%22isOpen%22%3Atrue%2C%22isEnabled%22%3Atrue%2C%22url%22%3A%22http%3A%2F%2Fdata.gov.au%2Fgeoserver%2Fnative-title-determinations-national-native-title-register%2Fwms%3Frequest%3DGetCapabilities%22%2C%22layers%22%3A%22ckan_ecdbbb6c_c374_4649_9cd3_0677f44182c9%22%7D%5D%7D%5D%2C%22catalogIsUserSupplied%22%3Atrue%2C%22homeCamera%22%3A%7B%22west%22%3A114.529628002%2C%22south%22%3A-38.788788%2C%22east%22%3A153.626466%2C%22north%22%3A-9.08798899999994%7D%7D%5D%7D' width= "100%" height='600px' scrolling='auto' frameBorder='0'/>
          </div>
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(ResourcetMap);
