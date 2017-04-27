import React, { Component } from 'react';
import defined from '../helpers/defined';
import MarkdownViewer from '../UI/MarkdownViewer';
import Star from '../UI/Star';
import { Link } from 'react-router';
import { connect } from "react-redux";

class DatasetDetails extends Component {
  renderDistribution(distribution, datasetId){
    return <div className="" key={distribution.id}>
              <h4><Link to={`/dataset/${datasetId}/distribution/${distribution.id}`}>{distribution.title}({distribution.format})</Link></h4>
              <div>{distribution.description}</div>
              <div>{distribution.licence}</div>
            </div>
  }

  render(){
    const dataset = this.props.dataset;
    const datasetId = dataset.id;
    return <div className="dataset-details row" >
                <div className='dataset-details__body col-sm-9'>
                  <div className='dataset-details-overview'>
                    <h3>Overview</h3>
                    {dataset.datasetDescription && <MarkdownViewer markdown={dataset.datasetDescription}/>}
                  </div>

                  <div className='dataset-details-source'>
                      <h3>Data and APIs</h3>
                      {
                        dataset.datasetSource && dataset.datasetSource.map(s=> this.renderDistribution(s, datasetId))
                      }
                  </div>
              </div>

              <div className='dataset-details__sidebar col-sm-3'>
                  <div><button className='btn btn-primary'>Add to project</button></div>
                  <div><button className='btn btn-default'>Star</button></div>
                  <div><button className='btn btn-default'>Subscribe</button></div>
                  <div><button className='btn btn-default'>Share</button></div>
                  <div className="tags">
                    <h5>Tags</h5>
                    {
                      dataset.datasetTags && dataset.datasetTags.map(t=><span className="badge" key={t}>{t}</span>)
                    }
                  </div>
              </div>
          </div>
  }
}

function mapStateToProps(state) {
  const record= state.record;
  const dataset = record.data;
  return {
    dataset
  };
}


DatasetDetails.propTypes = {dataset: React.PropTypes.object};

export default connect(mapStateToProps)(DatasetDetails);