import React from 'react';
import ReactDOM from 'react-dom';
import QueryForm from './queryForm.jsx';
import Table from './table.jsx';

class App extends React.Component {
constructor(props) {
        super(props);
        this.state = {movies : [],
        			  message: {}};
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
      if ($.isEmptyObject(response.movies)) {
      	this.setState({movies: [],
					   message: "There aren't any movies that match the search criteria"
        			});
      } else {
      	this.setState({movies: response.movies,
        			   message: ''
        			 });
        }
    }.bind(this),

    error: function(xhr) {
        console.log(xhr);
        if (xhr.responseJSON) {
          this.setState({message: xhr.responseJSON.message,
          				 movies: []
          			   });
        } else {
          this.setState({message: "Couldn't connect to Netflix Movies Search",
          				 movies: []
          			   });
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
                  <QueryForm  getQuery={this.submitRequest} message={this.state.message}/>
                  <Table movies={this.state.movies}/>
                </div>
              </div>
           </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
