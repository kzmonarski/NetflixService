import React from 'react';

export default class Poster extends React.Component {
	constructor(props) {
        super(props);
        this.state = {isError: false};
        this.onError = this.onError.bind(this);
    }
	
	onError() {
		this.setState({isError: true});
	}
	
  	render () {
  		if (this.state.isError) {
  			return <p className='poster-error'>Unavailable</p>;
  		} else {
    			return  <img  src={this.props.src} onError={this.onError}/>
    			}
  }
}
