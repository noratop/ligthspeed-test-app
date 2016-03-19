import React, { Component, PropTypes } from 'react';
import SortIcon from 'material-ui/lib/svg-icons/content/sort';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {connect} from 'react-redux';
import {sortContact} from '../redux/actions';

class SortButton extends Component {
  onTouchHandler = (e,sort) => {
    e.preventDefault();
    this.props.dispatch(sortContact(sort));
  }
  render() {
    return (
        <IconMenu className='toolbar__element toolbar__icon'
            iconButtonElement={<SortIcon style={{height: '100%',width: 'auto',fill:'white'}}/>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <MenuItem primaryText="First Name" onTouchTap={(e)=>this.onTouchHandler(e,'firstname')}/>
            <MenuItem primaryText="Last Name" onTouchTap={(e)=>this.onTouchHandler(e,'lastname')}/>
        </IconMenu>
    )
  }
}

export default connect(()=>{return {}})(SortButton);
