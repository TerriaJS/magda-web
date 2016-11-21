import './RegionPopup.css';
import DropDown from '../UI/DropDown';
import defined from '../helpers/defined';
import Facet from './FacetWrapper';
import RegionMap from './RegionMap';
import FacetSearchBox from './FacetSearchBox';
import React from 'react'
import RegionSummray from './RegionSummary';


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
               regionType: undefined
             }
         }
    }

    componentWillMount(){

    }

    onToggleOption(option){
      this.setState({
        _activeRegion: option,
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
      console.log(feature)
      this.setState({
        _activeRegion: Object.assign({}, this.state._activeRegion, {regionId: feature.id})
      })
    }

    getDropDownOptions(){
      let ids = Object.keys(this.props.regionMapping);
      return ids.map(id=> ({
        id,
        value: this.props.regionMapping[id].description
      }))
    }

    getRegion(){
      if(defined(this.state._activeRegion.regionType)){
        return this.state._activeRegion;
      } else if(defined(this.props.activeRegion.regionType)){
        return  this.props.activeRegion;
      } else{
        return {
          regionType: '',
          regionId: ''
        }
      }
    }

    render(){
        let region = this.getRegion();
        return (
            <div className='popup'>
              <div className='popup-inner'>
              <div className='popup-header clearfix'>
                <div className='col-xs-11'>
                  <h4 className='facet-title'>Location</h4>
                </div>
                <div className='col-xs-1'>
                  <button className='btn popup-close-btn' onClick={()=>this.props.closePopUp()}><i className='fa fa-times' aria-hidden='true'></i></button>
                </div>
              </div>
              <div className='popup-body clearfix'>
                  <div className='popup-tools row'>
                    <div className='col-sm-6'>
                      <FacetSearchBox renderOption={this.props.renderOption}
                                      options={this.props.facetSearchResults}
                                      searchFacet={this.props.searchFacet}
                                      onToggleOption={this.onToggleOption}/>

                    </div>
                    <div className='col-sm-6'>
                      <If condition={ defined(this.props.regionMapping) }>
                          <DropDown activeOption={defined(this.props.regionMapping[region.regionType]) ? this.props.regionMapping[region.regionType].description : ''}
                                    options={this.getDropDownOptions()}
                                    select={this.selectRegionType}/>
                      </If>
                    </div>
                  </div>
                  <RegionSummray region={this.state._activeRegion}/>
                  <div className='popup-map'>
                    <RegionMap title='region'
                               id='region'
                               interaction={true}
                               region={region}
                               regionMapping={this.props.regionMapping}
                               onClick={this.onFeatureClick}
                    />

                  </div>
                  </div>
                  <div className='popup-footer clearfix'>
                    <button className='btn popup-cancel-btn' onClick={()=>this.props.closePopUp()} >Cancel</button>
                    <button className='btn popup-done-btn' disabled={!defined(this.state._activeRegion)} onClick={this.onClickDone} >Done</button>
                  </div>
              </div>
            </div>
      );
    }
}

export default RegionPopup;
