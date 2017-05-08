import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Poster from './poster.jsx'

export default class Table extends React.Component {
  	constructor(props) {
        super(props);
        this.state = {emptyTableMessage: ( () => { return <p></p> } )()};
    }

    componentWillReceiveProps (nextProps) {
    console.log('next movies props ' + nextProps.movies.length)
    	if ($.isEmptyObject(nextProps.movies)) {
  			this.setState({emptyTableMessage: this.getEmptyTableMessage("There aren't any movies that match search criteria")})
  		};
  	}

	getEmptyTableMessage (message) {
		return <p className='no-items'>{message}</p>
	}

  	render () {

  	const renderShowsTotal = function(start, to, total) {
    	return (
      		<p className='total'>
        		From {start} to {to}, total is {total}
      		</p>
    	);
  	}

  	const emptyTable = <div><p className='no-items'>'There aren't any movies to display'</p></div>;

	const getPoster = function(cell, row){
      return <Poster src={cell}/>
    }

	const options = {
      page: 1,
      sizePerPageList: [{
        text: '5', value: 5
      }, 
      {
        text: '10', value: 10
      },{
        text: '20', value: 20
      },
      {
        text: '30', value: 30
      },
      {
        text: 'All', value: this.props.movies.length
      }],
      sizePerPage: 5,
      pageStartIndex: 1,
      paginationSize: 0,
      prePage: 'Prev',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      paginationShowsTotal: renderShowsTotal,
      paginationPosition: 'top'
    };

  	const moviesTable =  <div>
       		 				<BootstrapTable data={this.props.movies} striped={true} pagination={true} options={options}>
         						<TableHeaderColumn dataField='show_title' width="400px" dataSort={true} isKey={true}>Movie Name</TableHeaderColumn>
         						<TableHeaderColumn dataField='poster' dataFormat={getPoster}>Poster</TableHeaderColumn>
       		 				</BootstrapTable>
    	   				 </div>

  	const errorMessage = <p className='server-error'>{this.props.errorMessage}</p>;

    const display = () => {
      if (this.props.errorMessage) {
  			return errorMessage;
  			}
  			else if ($.isEmptyObject(this.props.movies)) {
  					return this.state.emptyTableMessage;
  					} else {
  						return moviesTable;
  					}
  	}
  	return display();
  }
}
