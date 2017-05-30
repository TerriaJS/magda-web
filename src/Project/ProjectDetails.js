import React, { Component } from 'react';
import {config} from '../config.js';
import ReactDocumentTitle from "react-document-title";

class ProjectDetails extends Component {
    render(){
      return <ReactDocumentTitle title={this.props.params.id + " | " + config.appName}>
              <div className="project-details container">
                <div className="col-sm-8">
                  <h1>{this.props.params.id}</h1>
                  <p>Some description of the project</p>
               </div>
             </div>
             </ReactDocumentTitle>
    }
}

ProjectDetails.propTypes = {project: React.PropTypes.array};


export default ProjectDetails;
