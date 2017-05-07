import React from 'react';
import ReactDOM from 'react-dom';
import QueryForm from './queryForm.jsx';
import Table from './table.jsx';

class App extends React.Component {
constructor(props) {
        super(props);
        this.state = {movies : [{}]};
        this.submitRequest = this.submitRequest.bind(this);
    }

  submitRequest(data) {
  	console.log('submit request gets called: ' + data);
  	$.ajax({
    url: "getMovies.json",
    type: "get",
    dataType: "json",
    data: {title: data.title, director: data.director, actor: data.actor, year: data.year},
    
    success: function(response) {
        console.log(response);
        this.setState({movies:response.movies});
    }.bind(this),
    
    error: function(xhr) {
        console.log(xhr);
    }.bind(this)
	});
  }

  render () {
 
  const data = [{
      show_title: 'Attack on Titan',
      poster: 'http:\/\/cdn-2.nflximg.com\/en_us\/boxshots\/ghd\/70299043.jpg'
    },{
    show_title: 'The Boondocks',
    poster: 'http:\/\/cdn-2.nflximg.com\/en_us\/boxshots\/ghd\/70153391.jpg'
    }]

    return <div>
              <QueryForm getData={this.submitRequest}/>
              <Table data={this.state.movies}/>
           </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
