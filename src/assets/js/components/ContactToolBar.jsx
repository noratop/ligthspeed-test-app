import React, { Component, PropTypes } from 'react';
import AddContactButton from './AddContactButton';
import DeleteContactButton from './DeleteContactButton';

function ContactToolBar({userSelection}) {
    return (
      <div>
        <h2>Tool Bar</h2>
        <AddContactButton/>
        <DeleteContactButton userSelection={userSelection}/>
      </div>
    )
}

export default ContactToolBar;
