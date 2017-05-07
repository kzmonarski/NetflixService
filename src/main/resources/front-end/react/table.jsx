import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Poster from './poster.jsx'

export default class Table extends React.Component {
  constructor(props) {
        super(props);
    }

  render () {
  	var renderShowsTotal = function(start, to, total) {
    return (
      <p className='total'>
        From {start} to {to}, total is {total}
      </p>
    );
  }

    const options = {
      page: 1,
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      },{
        text: '15', value: 10
      },
      {
        text: 'All', value: this.props.data.length
      } ],
      sizePerPage: 5,
      pageStartIndex: 1,
      prePage: 'Prev',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      paginationShowsTotal: renderShowsTotal,
      paginationPosition: 'top'
    };

    var getPoster = function(cell, row){
      return (<Poster src={cell}/>)
    }

  return <div>
              <BootstrapTable data={this.props.data} striped={true} pagination={true} dataSort={true} options={options}>
                <TableHeaderColumn dataField='show_title' isKey={true}>Movie Name</TableHeaderColumn>
                <TableHeaderColumn dataField='poster' dataFormat={getPoster}>Poster</TableHeaderColumn>
              </BootstrapTable>
          </div>
  }
}
