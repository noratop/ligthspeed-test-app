import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {addContact} from '../redux/actions';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add-circle-outline';
import TextField from 'material-ui/lib/text-field';

class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {open:false};
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {firstname,lastname} = this.state;
    const contact = {
      firstname,
      lastname
    }

    this.props.dispatch(addContact(contact)).
    then(()=>{this.handleClose()});
  }

  onChangeHandler = (e) => {
    e.preventDefault();
    this.setState({[e.target.id]:e.target.value});
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onSubmit}
      />,
    ];

    return (
      <div className='toolbar__element'>
        <a href='#' onClick={()=>{this.handleOpen()}}><div className='toolbar__icon'><AddIcon style={{height: '100%',width: 'auto',fill:'white'}}/></div></a>
        <Dialog
          className='dialog'
          title="Add a new contact"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div><TextField inputStyle={{}} className='dialog__input' hintText="First Name" id='firstname' onChange={this.onChangeHandler}/></div>
          <div><TextField className='dialog__input' hintText="Last Name" id='lastname' onChange={this.onChangeHandler}/></div>
        </Dialog>
      </div>
    )
  }
}

export default connect(()=>{return {}})(AddButton);
