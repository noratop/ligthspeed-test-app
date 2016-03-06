import React, { Component, PropTypes } from 'react';
import AddContactButton from './AddContactButton';

function ContactToolBar() {
    return (
      <ul>
        <li>
          <AddContactButton/>
        </li>
      </ul>
    )
}

export default ContactToolBar;
