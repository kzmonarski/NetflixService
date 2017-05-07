import React from 'react';
import FORMS from 'newforms';

export default class Queryform extends React.Component {
constructor(props) {
        super(props);
        this.state = {form : this.getform()};
        this.onSubmit = this.onSubmit.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
    }

	onFormChange() {
	  this.forceUpdate();
	}

    onSubmit (event) {
      event.preventDefault();
      if (!this.state.form.cleanedData.title && !this.state.form.cleanedData.actor
         && !this.state.form.cleanedData.director && !this.state.form.cleanedData.year) {
          this.state.form.addError('',"You haven't specified any valid fields");
          this.onFormChange();
      }
      else if (this.state.form.isValid()) {
        this.props.getData(this.state.form.cleanedData);
        }
    }

    getform() {
      var form= FORMS.Form.extend({
            title: FORMS.CharField({required: false}),
            director: FORMS.CharField({required: false}),
            actor: FORMS.CharField({required: false}),
            year: FORMS.DateField({required: false,label: "Release Year", inputFormats: ['%Y'],errorMessages: {invalid: "It's not a year"}}),

      clean() {
		   if (this.cleanedData.year && !this.cleanedData.title) {
          throw FORMS.ValidationError("If release year is specified then a title is also necessary");
       }
	    },

      render: function() {
	     return this.boundFields().map(this.renderField.bind(this))
	  },

	   renderField: function(bf) {
	    var display = <div>
		  				         {bf.labelTag()}{bf.render()}<span className='error'>{bf.errors().messages()}</span>
		  			        </div>;
	    return display;
  },
      });
    return new form({controlled: true, onChange: this.onFormChange.bind(this)})
    }

  render () {
      return <form className='form-field'>
              <div className='error'>{this.state.form.nonFieldErrors().messages()}</div>
              {this.state.form.render()}
              <input className='center' type="button" onClick={this.onSubmit} value="Submit" />
            </form>
  }
}
