import React from 'react';
import ReactDOM from 'react-dom';
import QueryForm from './queryForm.jsx';

class App extends React.Component {

  submitRequest(data) {
  console.log('Submit Request called' + data.title);
  }

  render () {
    return <div>
      <QueryForm getData={this.submitRequest.bind(this)}/>
    </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
