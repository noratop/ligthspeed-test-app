import React, { Component, PropTypes } from 'react';
import Contact from './Contact';

function ContactListView({list,onCheckedContactItem}){
  return (
    <div>
      <h2>Contacts</h2>
      <ul>{list.map((contact)=>
          <Contact key={contact.id} contact={contact} onCheckedContactItem={onCheckedContactItem}/>
      )}</ul>
    </div>
  )
}

export default ContactListView;
