import React from 'react';
import FORMS from 'newforms';

export default class Queryform extends React.Component {
	constructor(props) {
     super(props);
     this.state = {form : this.getForm(),
     			   message: ''
     			  };
     this.onSubmit = this.onSubmit.bind(this);
     this.onFormChange = this.onFormChange.bind(this);
     this.submitQuery = this.submitQuery.bind(this);
    }

	onFormChange() {
	  this.forceUpdate();
	  this.setState({message: ''});
	}
	
	componentWillReceiveProps (nextProps) {
  	  this.setState({message: nextProps.message})
  	}

    onSubmit (event) {
      event.preventDefault();
     if (!this.state.form.isValid()){
     	this.state.form.addError('','There is an error in the form');
     	this.onFormChange();
     }
      else if (!this.state.form.cleanedData.title && !this.state.form.cleanedData.actor
         	   && !this.state.form.cleanedData.director && !this.state.form.cleanedData.releaseDate) {
        this.state.form.addError('',"You haven't specified any fields");
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
            title: FORMS.CharField({required: false,
            						widget: FORMS.TextInput({attrs: {className: 'form-control'}})}),
            director: FORMS.CharField({required: false,
            						widget: FORMS.TextInput({attrs: {className: 'form-control'}})}),
            actor: FORMS.CharField({required: false,
            						widget: FORMS.TextInput({attrs: {className: 'form-control'}})}),
            releaseDate: FORMS.DateField({required: false,
            						label: "Release Year",
            						inputFormats: ['%Y'],
            						errorMessages: {invalid: "It's not a year"},
            						widget: FORMS.TextInput({attrs: {className: 'form-control'}})}),

      clean() {
		   if (this.cleanedData.releaseDate && !this.cleanedData.title) {
          	throw FORMS.ValidationError("If a release year is specified then a title is also necessary");
       } else if (this.cleanedData.releaseDate && (this.cleanedData.director || this.cleanedData.actor)) {
       			throw FORMS.ValidationError("A release year can only be specified in conjunction with a title");
       			}
	    },

      render: function() {
	     return this.boundFields().map(this.renderField.bind(this))
	  },

	   renderField: function(bf) {
	   var display = <div className="form-group">
      					<label className="control-label col-sm-2" htmlFor="{bf.name}">{bf.label}</label>
      					<div className="col-sm-5">
      						{bf.render()}
      					</div>
      					<div className="control-label col-sm-2">
							<p className="client-error">{bf.errors().messages()[0]}</p>
      					</div>
   					 </div>

	    return display;
  },
    });
    return new form({controlled: true, onChange: this.onFormChange.bind(this)})
    }

  render () {
  console.log('render: ' +  this.state.errorMessage);
      return <div>
      			<form className='form-horizontal' onSubmit={this.onSubmit}>
              		<div className='form-group'>
              			<div className="col-sm-offset-2 col-sm-8 client-error">
              				{this.state.form.nonFieldErrors().messages()}
              			</div>
              		</div>
              		{this.state.form.render()}
              		<div className="form-group">
              			<div className="col-sm-offset-2 col-sm-5">
              				<input className='btn btn-primary' type="submit" value="Submit" />
              			</div>
              		</div>
             	</form>
             	<h2 className='text-center text-danger'>{this.state.message}</h2>
      		 </div>
  }
}
