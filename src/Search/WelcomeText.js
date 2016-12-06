import './WelcomeText.css';
import React, { Component } from 'react';

const examples = [
  'mobile black spots by communication',
  'population from 2002 to 2005',
  'water in Melbourne',
  'health as CSV'
];

class WelcomeText extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(text, event){
    event.preventDefault();
    this.props.onClick(text);
  }
  render(){
    return (<div className='welcome-text'> <div className='intro'>Try searching for</div>
                <ul className='list-unstyled'>{examples.map(e=>
                      <li key = {e}> <a href='#' onClick={this.onClick.bind(this, e)}>{e}</a></li>
                    )}
                </ul>
            </div>);
  }
}

export default WelcomeText;
