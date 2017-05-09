import React, { Component } from 'react';
import { Link } from 'react-router';

class PublisherSummray extends Component {
    render(){
      return <div className="publisher-summray">
                <Link to={"publishers/" + encodeURI(this.props.publisher.value)}><h3>{this.props.publisher.value}</h3></Link>
             </div>
    }
}

PublisherSummray.propTypes = {publisher: React.PropTypes.object};


export default PublisherSummray;
