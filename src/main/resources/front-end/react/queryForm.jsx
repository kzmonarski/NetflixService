import React from 'react';
import FORMS from 'newforms';

export default class Queryform extends React.Component {
	constructor(props) {
     super(props);
     this.state = {form : this.getForm()};
     this.onSubmit = this.onSubmit.bind(this);
     this.onFormChange = this.onFormChange.bind(this);
     this.submitQuery = this.submitQuery.bind(this);
    }

	onFormChange() {
	  this.forceUpdate();
	}

    onSubmit (event) {
      event.preventDefault();
      if (!this.state.form.cleanedData.title && !this.state.form.cleanedData.actor
         && !this.state.form.cleanedData.director && !this.state.form.cleanedData.releaseDate) {
         
          this.state.form.addError('',"You haven't specified any valid fields");
          this.onFormChange();
      }
      else if (this.state.form.isValid()) {
      	this.submitQuery();
        }
    }
    
    submitQuery() { 
      var releaseYear = this.state.form.cleanedData.releaseDate ? this.state.form.cleanedData.releaseDate.getFullYear(): '';
      var formCleanedData = this.state.form.cleanedData
      var query = {title: formCleanedData.title,
      			   director: formCleanedData.director,
      			   actor: formCleanedData.actor,
      			   releaseYear: releaseYear
      			   } 		  
      this.props.getQuery(query);
    }

    getForm() {
      var form= FORMS.Form.extend({
            title: FORMS.CharField({required: false}),
            director: FORMS.CharField({required: false}),
            actor: FORMS.CharField({required: false}),
            releaseDate: FORMS.DateField({required: false,label: "Release Year", inputFormats: ['%Y'],errorMessages: {invalid: "It's not a year"}}),

      clean() {
		   if (this.cleanedData.releaseDate && !this.cleanedData.title) {
          	throw FORMS.ValidationError("If release year is specified then a title is also necessary");
       } else if (this.cleanedData.releaseDate && (this.cleanedData.director || this.cleanedData.actor)) {
       			throw FORMS.ValidationError("Release year can be only specified in conjunction with a title");	
       			}
	    },

      render: function() {
	     return this.boundFields().map(this.renderField.bind(this))
	  },

	   renderField: function(bf) {
	    var display = <div>
		  				 {bf.labelTag()}{bf.render()}<span className='client-error'>{bf.errors().messages()}</span>
		  			  </div>;
	    return display;
  },
      });
    return new form({controlled: true, onChange: this.onFormChange.bind(this)})
    }

  render () {
      return <form className='form-label' onSubmit={this.onSubmit}>
              	<div className='client-error'>
              		{this.state.form.nonFieldErrors().messages()}
              	</div>
              	{this.state.form.render()}
              	<input className='btn button-center' type="submit" value="Submit" />
            </form>
  }
}
