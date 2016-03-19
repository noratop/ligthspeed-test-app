import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {deleteSelectedContacts} from '../redux/actions';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';


class DeleteButton extends Component {
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

  onConfirm = (e) => {
    e.preventDefault();
    const {userSelection} = this.props;
    this.props.dispatch(deleteSelectedContacts(userSelection)).
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
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onConfirm}
      />,
    ];

    return (
      <div className='toolbar__element'>
        <a href='#' onClick={this.handleOpen}><div className='toolbar__icon'><DeleteIcon style={{height: '100%',width: 'auto',fill:'white'}}/></div></a>
        <Dialog
          className='dialog'
          contentClassName='dialog__content'
          title="Delete contacts"
          contentStyle={{maxWidth:'500px'}}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className='dialog__content'>
            <div className='dialog__content__row'>
              <p>Are you sure you want to delete the selected contacts?</p>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(()=>{return {}})(DeleteButton);
