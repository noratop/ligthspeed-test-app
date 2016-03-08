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
    type: 'REFRESH_CONTACTS'
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
function postEmail(email,id) {
  return fetch(`${apiURL}/Contacts/${id}/emailaddresses`, {
    method: 'post',body: JSON.stringify({emailAddress:email.emailAddress}),headers: new Headers({
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
    return Promise.all([updateContact(contact),Promise.all(contact.newEmails.map((email) => postEmail(email,contact.id)))]).
    // return fetch(`${apiURL}/Contacts/${contact.id}`, {
    //   method: 'put',body: JSON.stringify(contact),headers: new Headers({
		//       'Content-Type': 'application/json'
	  //     })
    //   }).
    // then((response) => {
    //   return Promise.all(contact.newEmails.map((email) => postEmail(email,contact.id)))
    // }).
    // then((response) => {
    //   if (response.ok) {
    //     return dispatch(fetchContacts(true));
    //     // return Promise.resolve();
    //   } else {
    //     return Promise.reject();
    //   }
    // })
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

// //Followers actions
// function requestFollowers(){
//   return {
//     type: 'REQUEST_FOLLOWERS'
//   }
// }
//
// function receivedFollowers(result){
//   return {
//     type: 'SUCCESS_FOLLOWERS',
//     result
//   }
// }
//
// function failedFetchingFollowers(error){
//   return {
//     type: 'FAILURE_FOLLOWERS',
//     error
//   }
// }
//
// export function fetchFollowers() {
//   return (dispatch) => {
//     dispatch(requestFollowers())
//     return fetch(`${apiURL}/followers`).
//       then((response) => response.json()).
//       then((result) => dispatch(receivedFollowers(result))).
//       catch((error) => dispatch(failedFetchingFollowers(error)));
//   };
// }



// MERN examples
// const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${(process.env.PORT || 8000)}`) : '';
//
// export function addPost(post) {
//   return {
//     type: ActionTypes.ADD_POST,
//     name: post.name,
//     title: post.title,
//     content: post.content,
//     slug: post.slug,
//     cuid: post.cuid,
//     _id: post._id,
//   };
// }
//
// export function changeSelectedPost(slug) {
//   return {
//     type: ActionTypes.CHANGE_SELECTED_POST,
//     slug,
//   };
// }
//
// export function addPostRequest(post) {
//   return (dispatch) => {
//     fetch(`${baseURL}/api/addPost`, {
//       method: 'post',
//       body: JSON.stringify({
//         post: {
//           name: post.name,
//           title: post.title,
//           content: post.content,
//         },
//       }),
//       headers: new Headers({
//         'Content-Type': 'application/json',
//       }),
//     }).then((res) => res.json()).then(res => dispatch(addPost(res.post)));
//   };
// }
//
// export function addSelectedPost(post) {
//   return {
//     type: ActionTypes.ADD_SELECTED_POST,
//     post,
//   };
// }
//
// export function getPostRequest(post) {
//   return (dispatch) => {
//     return fetch(`${baseURL}/api/getPost?slug=${post}`, {
//       method: 'get',
//       headers: new Headers({
//         'Content-Type': 'application/json',
//       }),
//     }).then((response) => response.json()).then(res => dispatch(addSelectedPost(res.post)));
//   };
// }
//
// export function deletePost(post) {
//   return {
//     type: ActionTypes.DELETE_POST,
//     post,
//   };
// }
//
// export function addPosts(posts) {
//   return {
//     type: ActionTypes.ADD_POSTS,
//     posts,
//   };
// }
//
// export function fetchPosts() {
//   return (dispatch) => {
//     return fetch(`${baseURL}/api/getPosts`).
//       then((response) => response.json()).
//       then((response) => dispatch(addPosts(response.posts)));
//   };
// }
//
// export function deletePostRequest(post) {
//   return (dispatch) => {
//     fetch(`${baseURL}/api/deletePost`, {
//       method: 'post',
//       body: JSON.stringify({
//         postId: post._id,
//       }),
//       headers: new Headers({
//         'Content-Type': 'application/json',
//       }),
//     }).then(() => dispatch(deletePost(post)));
//   };
// }
