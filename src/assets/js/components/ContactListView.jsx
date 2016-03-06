import React, { Component, PropTypes } from 'react';
import Contact from './Contact';
import ContactToolBar from './ContactToolBar';

function ContactListView({list}){
  return (
    <div>
      <h2>Contacts</h2>
      <ContactToolBar/>
      <ul>{list.map((contact)=>
          <Contact key={contact.id} contact={contact}/>
      )}</ul>
    </div>
  )
}

export default ContactListView;
