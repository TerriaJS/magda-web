import React from 'react';

export default class NotFoundHandler extends React.Component {
  render() {
    return (
      <div className="container 404">
        <h2>{this.props.displayText}</h2>
      </div>
    );
  }
}




