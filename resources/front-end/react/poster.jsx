import React from 'react';

export default class Table extends React.Component {
constructor(props) {
        super(props);
    }

  render () {
    return  <img className='poster' src={this.props.src}/>
  }
}
