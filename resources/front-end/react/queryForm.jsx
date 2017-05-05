import React from 'react';
import FORMS from 'newforms';

export default class QueryForm extends React.Component {
constructor(props) {
        super(props);
        this.state = {queryForm : this.getQueryForm()};
        this.onSubmit = this.onSubmit.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }
	
	onFormChange() {
	  this.forceUpdate();
	  console.log('data ' + this.state.queryForm.data.title)
	  console.log('cleaned data' + this.state.queryForm.cleanedData.title)
	}
	
    onSubmit (e) {
      e.preventDefault();
      if (this.state.queryForm.isValid()) {
        this.props.getData(this.state.queryForm.data)
      }
      }

    getQueryForm() {
      var QueryForm= FORMS.Form.extend({
            title: FORMS.CharField({required: false}),
            director: FORMS.CharField({required: false}),
            actor: FORMS.CharField({required: false}),
            releaseYear: FORMS.IntegerField({required: false}),

       cleanReleaseYear() {
         if (this.cleanedData.releaseYear  && !this.cleanedData.title) {
          this.addError('releaseYear', "A title is also necessary")
         }
    },

      clean() {
		if (this.data.title===""  && this.data.director==="" && this.data.director==="" && this.data.releaseYear==="") {
		  throw FORMS.ValidationError("You haven't specified any fields");
	  	}

	  },

      render: function() {
	     return this.boundFields().map(this.renderField.bind(this))
	  },

	   renderField: function(bf) {
	    var display = <div>
	    				<div>{bf.errors().render()}</div>
		  				<div>{bf.label}</div>
		  				<div>{bf.render()}</div>
		  			  </div>;
	    return display;
  },
      });
    return new QueryForm({controlled: true, onChange: this.onFormChange.bind(this)})
    }

  render () {
    return  <form>
              {this.state.queryForm.render()}
              <input type="button" onClick={this.onSubmit} value="Submit" />
            </form>;
  }
}
