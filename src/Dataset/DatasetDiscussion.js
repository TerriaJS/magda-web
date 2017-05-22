import React, { Component } from "react";
import CrappyChat from '../Components/CrappyChat/CrappyChat'
import './RecordDetails.css';

export default class DatasetDiscussion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dataset-discussion container">
        <CrappyChat datasetId={this.props.params.datasetId} />
      </div>
    );
  }
}

DatasetDiscussion.propTypes = { dataset: React.PropTypes.object };
