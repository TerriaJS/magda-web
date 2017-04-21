import React, { Component } from 'react';
import {config} from '../config.js';

class SearchFacets extends Component {
  render() {
    return (
      <div className="row">
        {config.facets.map(c=>
          <div className="col-sm-3">
            <c.component key={c.id}
                       updateQuery={this.props.updateQuery}
                       location={this.props.location}
                       component={'facet'}/>
          </div>
        )}
      </div>
    );
  }
}

export default SearchFacets;
