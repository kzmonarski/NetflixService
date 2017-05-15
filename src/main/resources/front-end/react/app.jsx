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
    data: data,

    success: function(response) {
        console.log(response);
        this.setState({movies:response.movies});
    }.bind(this),

    error: function(xhr) {
        console.log(xhr);
        if (xhr.responseJSON) {
          this.setState({errorMessage: xhr.responseJSON.message});
        } else {
          this.setState({errorMessage: "Couldn't connect to Netflix Movies Search"});
        }
    }.bind(this)
	});
  }

  render () {

    return <div className='container'>
              <div className="panel panel-default">
                <div className="panel-heading text-center">
                  <h1 className='text-primary'>Netflix Movies Search</h1>
                </div>
                <div className="panel-body">
                  <QueryForm  getQuery={this.submitRequest}/>
                  <Table movies={this.state.movies} errorMessage={this.state.errorMessage}/>
                </div>
              </div>
           </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
