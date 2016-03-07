import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {addContact} from '../redux/actions';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add-circle-outline';

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
    const contact = {
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value
    }

    this.props.dispatch(addContact(contact)).
    then(()=>{this.handleClose()});
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
          contentClassName='dialog__content'
          title="Add a new contact"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className='dialog__content'>
            <div className='dialog__content__row'>
              <label htmlFor='firstname'><nobr>First Name:</nobr></label>
              <input type='text' ref='firstname' required='true'/>
            </div>
            <div className='dialog__content__row'>
              <label htmlFor='lastname'><nobr>Last Name:</nobr></label>
              <input type='text' ref='lastname' required='true'/>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(()=>{return {}})(AddButton);
