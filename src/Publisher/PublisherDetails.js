import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import  ErrorHandler from "../Components/ErrorHandler";
import { fetchPublisherIfNeeded } from "../actions/publisherActions";
import "./PublisherDetails.css";

class PublisherDetails extends Component {
    componentWillMount(){
        this.props.fetchPublisherIfNeeded(this.props.params.publisherId);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.params.publisherId !== this.props.params.publisherId){
            nextProps.fetchPublisherIfNeeded(nextProps.params.publisherId);
        }
    }
    
    renderContent(){
      return <div className="publisher-details container">
                <h1>{this.props.publisher.title}</h1>
             </div>
    }

    render(){
        if(this.props.error){
            return <ErrorHandler errorCode ={this.props.error} />
        }
        return this.renderContent();
    }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPublisherIfNeeded: fetchPublisherIfNeeded,
  }, dispatch);
}

function mapStateToProps(state, ownProps) {
  const publisher= state.publisher.publisher;
  const isFetching= state.publisher.isFetchingPublisher;
  const error = state.publisher.errorFetchingPublisher;
  const location = ownProps.location;
  return {
    publisher, isFetching, location, error
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(PublisherDetails);