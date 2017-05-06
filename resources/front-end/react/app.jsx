import React from 'react';
import ReactDOM from 'react-dom';
import QueryForm from './queryForm.jsx';
import Table from './table.jsx';

class App extends React.Component {

  submitRequest(data) {
  	var header = new Headers();
  	header.append("accept", "application/json");
  	var init = { method: 'GET',
               headers: header,
               mode: 'no-cors',
               cache: 'default' };

 	var url = new URL("http://localhost:4567/getMovies.json")
  	var params = {title: 'Attack on titan', director: 'test', actor: '', year: ''}
  	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  	var request = new Request(url, init);
  	console.log(request);
  	fetch(request).then( response => {
  	   response.json().then(function(data) {
        console.log(data);
        })
  	 }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  }

  render () {
  this.submitRequest({});
  const data = [{
      name: 'Attack on Titan',
      poster: 'http:\/\/cdn-2.nflximg.com\/en_us\/boxshots\/ghd\/70299043.jpg'
    },{
    name: 'The Boondocks',
    poster: 'http:\/\/cdn-2.nflximg.com\/en_us\/boxshots\/ghd\/70153391.jpg'
    }]

    return <div>
              <QueryForm getData={this.submitRequest.bind(this)}/>
              <Table data={data}/>
           </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
