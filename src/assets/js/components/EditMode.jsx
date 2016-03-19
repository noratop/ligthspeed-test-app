import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {saveContact} from '../redux/actions';
import RaisedButton from 'material-ui/lib/raised-button';
import EditEmail from './EditEmail';

class EditMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEmails:[],
      deletedEmail:[]
    };
  }
  addEmail = (email) => {
    console.log(email);
    this.setState({newEmails:[...this.state.newEmails,email]})
  }
  deleteEmail = (emailId) => {

  }
  getCurrentEmailList(){
    const emailList=this.props.emailaddresses;
  }
  onCancelHandler = (e) => {
    e.preventDefault();
    this.props.exitEditMode();
  }
  onSaveHandler = (e) => {
    e.preventDefault();
    const {newEmails} = this.state;
    const contact = Object.keys(this.refs).reduce((obj,key)=>{
      obj[key]=this.refs[key].value;
      return obj;
    },{newEmails,id: this.props.id});

    this.props.dispatch(saveContact(contact)).
    then(()=>{this.props.exitEditMode()});
  }
  renderInput({label,type,name,required,defaultValue}){
    return (
      <div className='dialog__content__row'>
        <label htmlFor={name}><nobr>{label}</nobr></label>
        <input type='text' ref={name} required={required} defaultValue={defaultValue}/>
      </div>
    )
  }

  render() {
    const {firstname,lastname,job,emailaddresses} = this.props;
    return (
      <div>
        <div className='contact-edit__editButton'>
          <RaisedButton label="Cancel" onClick={this.onCancelHandler} style={{margin: 5}}/>
          <RaisedButton label="Save" primary={true} onClick={this.onSaveHandler} style={{margin: 5}}/>
        </div>
        <div className='dialog__content'>
          {this.renderInput({
            label:'First Name',
            type:'text',
            name:'firstname',
            required:true,
            defaultValue:firstname
          })}
          {this.renderInput({
            label:'Last Name',
            type:'text',
            name:'lastname',
            required:true,
            defaultValue:lastname
          })}
          {this.renderInput({
            label:'Job Title',
            type:'text',
            name:'job',
            required:true,
            defaultValue:job
          })}
        </div>
        <h4>Emails</h4>
        <EditEmail emails={emailaddresses} addEmail={this.addEmail} deleteEmail={this.deleteEmail} />
      </div>
    )

  }
}

export default connect(()=>{return {}})(EditMode);
