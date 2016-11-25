import defined from '../helpers/defined';
import React from 'react';

function RegionSummary(props){
  if (defined(props.region)){
  	const name = props.region.regionName || '';
  	const typeName = props.regionMapping && props.regionMapping[props.region.regionType] ? props.regionMapping[props.region.regionType].description : '';
    return <div className='active-region'>
              {name}
              <div className='region-type'>
              	{typeName}
              </div>
            </div>
  } else{
    return null;
  }
}

export default RegionSummary;
