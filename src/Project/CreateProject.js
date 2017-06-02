// @flow
import React, { Component } from 'react';
import ReactDocumentTitle from "react-document-title";
import queryString from 'query-string';
import type {Project } from '../types';
import { connect } from "react-redux";
import {config} from '../config.js';
import { bindActionCreators } from "redux";
import { validateFields, resetProjectFields } from '../actions/projectActions';
import Notification from '../UI/Notification';
import './CreateProject.css';


class CreateProject extends Component {
    state: Project
    props: {
      location: Location
    }
    constructor(props: props) {
      super(props);
      this.state = {project: {
        title: '',
        description: '',
        id: '',
        members: [],
        datasets:[],
        status: 'open'
      }};
    }


    onDismissError(){
      // reset form on error
      this.props.resetFields();

    }

    handleChange(event: MouseEvent, id: string){
      const project: Project = Object.assign({}, this.state.project, {
          [id]: event.target.value
      })
      this.setState({
        project
      })
    }

    handleSubmit(e){
      e.preventDefault();
      // dispatch validating and submission
      this.props.validateFields(this.state.project);
    }
    render(){
      const datasetId: string = queryString.parse(this.props.location.search).dataset;
      return <ReactDocumentTitle title={"New project | " + config.appName}>
              <div className="create-project container">
              <div className="row">
                {!this.props.isFetching && this.props.error &&
                   <Notification content={this.props.error}
                                 type="error"
                                 onDismiss={()=>this.onDismissError()}/>
                }
                <div className="col-sm-8">
                  <h1>Create project</h1>
                  <form>
                    <label className="input-group">
                      Project title * :
                      {this.props.fieldErrors.title && <div className="field-error">{this.props.fieldErrors.title}</div>}
                      <input type="text" name="title" className={`form-control ${this.props.fieldErrors.title ? "form-error" : ""}`} value={this.state.title} onChange={(e: MouseEvent)=>this.handleChange(e, "title")}/>
                    </label>
                    <label className="input-group">
                      Project description * :
                      {this.props.fieldErrors.description && <div className="field-error">{this.props.fieldErrors.description}</div>}
                      <input type="text" name="description" className={`form-control ${this.props.fieldErrors.description ? "form-error" : ""}`} value={this.state.description} onChange={(e: MouseEvent)=>this.handleChange(e, "description")}/>
                    </label>

                    <input type="submit" value="Submit" className='btn btn-primary'  onClick={(e: MouseEvent)=>this.handleSubmit(e)}/>
                  </form>
               </div>
               <div className="col-sm-4">
                  <h2>Datasets</h2>

               </div>
             </div>
             </div>
             </ReactDocumentTitle>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<*>)=>{
  return bindActionCreators({
    validateFields: validateFields,
    resetFields: resetProjectFields
  }, dispatch);
}

function mapStateToProps(state, ownProps) {
  const isFetching= state.project.isFetching;
  const error = state.project.error;
  const fieldErrors = state.project.fieldErrors;
  return {
    isFetching, error, fieldErrors
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
