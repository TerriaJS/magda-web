// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import './Statistics.css';

// Total number of datasets
// - Total number of harvested sources
// - Total number of spatial datasets
// - If time, ElasticSearch query for total number of open licensed datasets


export default function Statistics(props: Object){
  return (
    <div className='white-box statistics'>
      <div className='inner'>

          <ul className='list-unstyled'>
              <li>
                  <strong><span>49,455</span></strong>
                  discoverable datasets
              </li>
              <li>
                  <strong><span>773</span></strong>
                  harvested sources
              </li>
              <li>
                  <strong><span>23,000</span></strong>
                  spatial datasets
              </li>
          </ul>
      </div>
  </div>
  )
}
