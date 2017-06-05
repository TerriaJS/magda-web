
//@flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import {config} from '../config.js';
import { bindActionCreators } from "redux";
import { fetchProjectIfNeeded } from '../actions/projectActions';
import ReactDocumentTitle from "react-document-title";
import ErrorHandler from '../Components/ErrorHandler';
import ProgressBar from '../UI/ProgressBar';

class ProjectDetails extends Component {
  componentWillMount(){
    this.props.fetchProjectIfNeeded(this.props.params.projectId);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.params.projectId !== nextProps.params.projectId){
      this.props.fetchProjectIfNeeded(nextProps.params.projectId);
    }
  }

  render(){
    if(this.props.error){
      return <ErrorHandler errorCode={this.props.error}/>
    } else if(!this.props.isFetching && this.props.project){
      return <ReactDocumentTitle title={this.props.project.name + "|" + config.appName}>
              <div className="project-details container">
                <div className="row">
                  <div className="col-sm-8">
                    <h1>{this.props.project.name}</h1>

                    <div className="white-box">
                      <h2> Description </h2>
                      {this.props.project.description}
                    </div>
                 </div>
                 </div>
             </div>
             </ReactDocumentTitle>
    }
    return <ProgressBar/>
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchProjectIfNeeded: fetchProjectIfNeeded,
  }, dispatch);
}

function mapStateToProps(state, ownProps) {
  const project= state.project.project;
  const isFetching= state.project.isFetching;
  const error = state.project.error;
  const location = ownProps.location;
  return {
    project, isFetching, location, error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
