import React, { Component } from 'react';
import './ProjectsViewer.css';
class ProjectsViewer extends Component {
    render(){
      return <div className={"projects-viewer"}>
                
             </div>
    }
}

ProjectsViewer.propTypes = {projects: React.PropTypes.array,
                            isFetching: React.PropTypes.bool,
                            error: React.PropTypes.string};


export default ProjectsViewer;
