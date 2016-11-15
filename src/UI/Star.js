import React, { Component } from 'react';
import './Star.css';
class Star extends Component {
    constructor(props){
      super(props);
      this.onClick = this.onClick.bind(this);
      this.state = {
        isActive: false,
        showInfo: false
      };
    }

    componentDidMount(){
      window.addEventListener('click', ()=>{
        this.setState({
          showInfo: false
        })
      })
    }

    onClick(event){
      event.stopPropagation();
      this.setState({
        isActive: !this.state.isActive,
        showInfo: true
      })
    }

    render(){
      return <div className='star'>
                <button onClick={this.onClick} className={`btn star-btn ${this.state.isActive ? 'is-active' : ''}`}>
                  <i className="fa fa-star" aria-hidden="true"/>
                </button>
                {this.state.showInfo && <div className='star-info'>
                                            <div className='star-info-text'>
                                              Saved to starred items
                                            </div>
                                          </div>}
             </div>
    }
}
export default Star;
