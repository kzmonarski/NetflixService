import React from 'react';
import ReactDOM from 'react-dom';
import QueryForm from './queryForm.jsx';
import Table from './table.jsx';

class App extends React.Component {
constructor(props) {
        super(props);
        this.state = {movies : [],
        			  errorMessage: ''};
        this.submitRequest = this.submitRequest.bind(this);
    }

  submitRequest(data) {
  	console.log('Submit request gets called: ' + data);
  	$.ajax({
    url: "getMovies.json",
    type: "get",
    dataType: "json",
    data: {title: data.title, director: data.director, actor: data.actor, year: data.releaseYear},
    
    success: function(response) {
        console.log(response);
        this.setState({movies:response.movies});
    }.bind(this),
    
    error: function(xhr) {
        console.log(xhr);
        this.setState({errorMessage: xhr.responseJSON.message});
    }.bind(this)
	});
  }

  render () {
  
    return <div>
              <QueryForm getQuery={this.submitRequest}/>
              <Table movies={this.state.movies} errorMessage={this.state.errorMessage}/>
           </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
