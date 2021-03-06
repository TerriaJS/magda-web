import './RegionPopup.css';
import DropDown from '../UI/DropDown';
import defined from '../helpers/defined';
import Facet from './FacetWrapper';
import RegionMap from './RegionMap';
import FacetSearchBox from './FacetSearchBox';
import React from 'react'
import RegionSummray from './RegionSummary';
import {parseRegion} from '../helpers/api';


class RegionPopup extends Facet {
    constructor(props) {
        super(props);
        this.onToggleOption = this.onToggleOption.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
        this.selectRegionType = this.selectRegionType.bind(this);
        this.onFeatureClick = this.onFeatureClick.bind(this);
        /**
         * @type {object}
         * @property {object} activeRegionType current region type, contains an id and a vlaue, fro example, {id: 'LGA', value:'LGAs (Local Goverment Areas)'}
         */
         this.state={
             _activeRegion: {
               regionId: undefined,
               regionType: "LGA"
             }
         }
    }

    componentWillReceiveProps(nextProps){
      if(defined(nextProps.regionType)){
        this.setState({
          _activeRegion: nextProps.activeRegion
        })
      }
    }

    onToggleOption(option){
      this.setState({
        _activeRegion: parseRegion(option),
      })
    }

    selectRegionType(regionType){
      this.setState({
        _activeRegion: Object.assign({}, this.state._activeRegion, {regionType: regionType.id})
      })
    }

    onClickDone(){
      this.props.onToggleOption(this.state._activeRegion);
      this.props.closePopUp();
    }

    onFeatureClick(feature){
      let regionMapping= this.props.regionMapping;
      let regionType = this.state._activeRegion.regionType;

      let regionProp = regionMapping[regionType].regionProp;
      let nameProp = regionMapping[regionType].nameProp;
      this.setState({
        _activeRegion: {
          regionType: regionType,
          regionId: feature.properties[regionProp],
          regionName: feature.properties[nameProp]
        }
      });
    }

    getDropDownOptions(){
      let ids = Object.keys(this.props.regionMapping);
      return ids.map(id=> ({
        id,
        value: this.props.regionMapping[id].description
      }))
    }

    getActiveRegionType(){
      let region = this.state._activeRegion;
      let regionType = "";
      if(this.props.regionMapping){
        if(defined(region.regionType) && this.props.regionMapping[region.regionType] && this.props.regionMapping[region.regionType].description){
          regionType = this.props.regionMapping[region.regionType].description
        }
      }
      return regionType;
    }

    render(){
        let region = this.state._activeRegion;
        return (
            <div className='popup'>
              <div className='popup__inner'>
              <div className='popup__header clearfix'>
                <div className='col-xs-11'>
                  <h4 className='facet-title'>Location</h4>
                </div>
                <div className='col-xs-1'>
                  <button className='btn popup__close-btn' onClick={()=>this.props.closePopUp()}><i className='fa fa-times' aria-hidden='true'></i></button>
                </div>
              </div>
              <div className='popup__body clearfix'>
                  <div className='popup__tools row'>
                    <div className='col-sm-6'>
                      <FacetSearchBox renderOption={this.props.renderOption}
                                      options={this.props.facetSearchResults}
                                      searchFacet={this.props.searchFacet}
                                      onToggleOption={this.onToggleOption}/>

                    </div>
                    <div className='col-sm-6'>
                      {defined(this.props.regionMapping) &&
                                <DropDown activeOption={this.getActiveRegionType()}
                                          options={this.getDropDownOptions()}
                                          select={this.selectRegionType}/>
                      }
                    </div>
                  </div>
                  <RegionSummray regionMapping={this.props.regionMapping} 
                                 region={this.state._activeRegion}/>
                  <div className='popup__map'>
                    <RegionMap title='region'
                               id='region'
                               interaction={true}
                               region={region}
                               regionMapping={this.props.regionMapping}
                               onClick={this.onFeatureClick}
                    />

                  </div>
                  </div>
                  <div className='popup__footer clearfix'>
                    <button className='btn popup__cancel-btn' onClick={()=>this.props.closePopUp()} >Cancel</button>
                    <button className='btn popup__done-btn' disabled={!defined(this.state._activeRegion)} onClick={this.onClickDone} >Apply</button>
                  </div>
              </div>
            </div>
      );
    }
}

export default RegionPopup;
