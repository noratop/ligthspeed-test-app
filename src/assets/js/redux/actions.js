import * as ActionTypes from './constants';
import fetch from 'isomorphic-fetch';

// Github examples
const apiURL = 'https://ligthspeed-test-api.herokuapp.com/api';

//Contacts actions
function requestContacts(){
  return {
    type: 'REQUEST_CONTACTS'
  }
}

function refreshContacts(){
  return {
    type: 'SYNC_CONTACTS'
  }
}

function receivedContacts(result){
  console.log(result);
  return {
    type: 'SUCCESS_CONTACTS',
    result
  }
}

function failedFetchingContacts(error){
  return {
    type: 'FAILURE_CONTACTS',
    error
  }
}

export function fetchContacts(refresh=false) {
  return (dispatch) => {
    if (refresh) {dispatch(refreshContacts());}
    else {dispatch(requestContacts());}
    return fetch(`${apiURL}/Contacts?filter={"include":["addresses","emailaddresses","phones"]}`).
    then((response) => response.json()).
    then((result) => dispatch(receivedContacts(result))).
    catch((error) => dispatch(failedFetchingContacts(error)));
  };
}


//Create contact
export function addContact(contact){
  return (dispatch) => {
    return fetch(`${apiURL}/Contacts`, {
      method: 'post',body: JSON.stringify(contact),headers: new Headers({
		      'Content-Type': 'application/json'
	      })
      }).
    then((response) => {
      if (response.ok) {
        return dispatch(fetchContacts(true));
      } else {
        return Promise.reject();
      }
    })
  }
}

//Delete contact
function setContactChecked(newResult){
  return {
    type:'CHECK_CONTACT',
    result:newResult
  }
}

export function checkContact(contactId){
  console.log(contactId);
  return (dispatch,getState) => {
    const {result} = getState().contacts;

    const newResult = result.map((contact)=>{
      if (contact.id === contactId){
        return {...contact,checked:!contact.checked}
      }
      return contact;
    })

    dispatch(setContactChecked(newResult));
  }
}

function deleteRequest(){
  return {
    type: 'DELETE_REQUEST'
  }
}

function deleteContact(contact){
  return fetch(`${apiURL}/Contacts/${contact.id}`, {method: 'delete'}).
  then((response) => {
    if (response.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
}

export function deleteSelectedContacts(contacts){
  return (dispatch,getState) => {
    dispatch(deleteRequest());
    const selection = getState().contacts.result.filter((contact)=>contact.checked);
    return Promise.all(selection.map(deleteContact)).
    then(() => dispatch(fetchContacts(true))).
    catch(() => Promise.reject())
  }
}


//edit contacts
function updateOrCreateEmail(email,id) {
  let endpoint = '';
  let method = '';

  if (!email.isNew) {
      endpoint = `${apiURL}/Contacts/${id}/emailaddresses/${email.id}`;
      method = 'put';
  }
  else {
      endpoint = `${apiURL}/Contacts/${id}/emailaddresses`;
      method = 'post';
  }

  return fetch(endpoint, {
    method: method,body: JSON.stringify({emailAddress:email.emailAddress}),headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).
  then((response) => {
    if (response.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
}

function deleteEmail(emailId,id) {
  return fetch(`${apiURL}/Contacts/${id}/emailaddresses/${emailId}`, {
    method: 'delete',
  }).
  then((response) => {
    if (response.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
}

function updateContact(contact) {
  return fetch(`${apiURL}/Contacts/${contact.id}`, {
    method: 'put',body: JSON.stringify(contact),headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).
  then((response) => {
    if (response.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  })
}

export function saveContact(contact){
  return (dispatch) => {
    return Promise.all([
      updateContact(contact),
      Promise.all(contact.deletedEmailIds.map((emailId) => deleteEmail(emailId,contact.id))),
      Promise.all(contact.emailaddresses.map((email) => updateOrCreateEmail(email,contact.id)))
    ]).
    then(() => dispatch(fetchContacts(true))).
    catch(() => Promise.reject())
  }
}

export function sortContact(sort) {
  return {
    type: 'SORT_CONTACTS',
    sort
  }
}
