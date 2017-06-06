import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {config} from '../config.js';
import { bindActionCreators } from 'redux';
import { fetchProjectsIfNeeded } from '../actions/projectActions';
import ReactDocumentTitle from 'react-document-title';
import ProjectSummary from './ProjectSummary';
import Pagination from '../UI/Pagination';
import ErrorHandler from '../Components/ErrorHandler';
import getPageNumber from '../helpers/getPageNumber';
import ProgressBar from '../UI/ProgressBar';


import './ProjectsViewer.css';
class ProjectsViewer extends Component {
    componentWillMount(){
      this.props.fetchProjectsIfNeeded(getPageNumber(this.props)|| 1);
    }

    componentWillReceiveProps(nextProps){
      if(getPageNumber(this.props) !== getPageNumber(nextProps)){
        nextProps.fetchProjectsIfNeeded(getPageNumber(nextProps) || 1);
      }
    }

    renderContent(){
      if(this.props.error){
        return <ErrorHandler errorCode={this.props.error}/>
      }
      return (<div className='col-sm-8'>
                {this.props.projects.map(p=>
                <ProjectSummary project={p} key={p.id}/>)}
                {this.props.hitCount > config.resultsPerPage &&
                  <Pagination
                    currentPage={+getPageNumber(this.props) || 1}
                    maxPage={Math.ceil(this.props.hitCount/config.resultsPerPage)}
                    location={this.props.location}
                  />
                }
              </div>);
    }

    render(){
      return  <ReactDocumentTitle title={'Projects | ' + config.appName}>
                <div className='container projects-viewer'>
                  {this.props.isFetching && <ProgressBar/>}
                  <div className='row'>
                    {!this.props.isFetching && this.renderContent()}
                    <div className='col-sm-4'>
                      <Link className='btn btn-primary' to='/project/new'> Create new project </Link>
                    </div>
                  </div>
               </div>
             </ReactDocumentTitle>
    }
}

ProjectsViewer.propTypes = {projects: React.PropTypes.array,
                            isFetching: React.PropTypes.bool,
                            error: React.PropTypes.string};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchProjectsIfNeeded: fetchProjectsIfNeeded,
  }, dispatch);
}

function mapStateToProps(state, ownProps) {
  const projects= state.project.projects;
  const isFetching= state.project.isFetching;
  const hitCount= state.project.hitCount;
  const error = state.project.error;
  const location = ownProps.location;
  return {
    projects, isFetching, hitCount, location, error
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsViewer);
