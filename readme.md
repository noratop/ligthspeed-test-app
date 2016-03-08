# Lightspeed technical test

## live demo [here](http://noratop.github.io/ligthspeed-test-app/)

## Install
1. git clone
2. npm install
3. grunt dev (for local preview at http://localhost:42000/)

## Technologies
Front end:
* React
* Redux
* Sass
* Grunt
* Webpack

Back end:
* MySQL
* Loopback

## Description

The app is still currently in development and is only designed for mobile for now.

### REST API

I build my own API with Loopback, deployed on heroku.
Root URL : https://ligthspeed-test-api.herokuapp.com/api
available endpoints:
* /Contacts
* /Contacts/{id}
* /Contacts/{id}/addresses
* /Contacts/{id}/emailaddresses
* /Contacts/{id}/phones

### Available features
* Contacts list view
* Add a new contact
* Delete contacts (multiple)
* Contact details view
* Edit contact (only root properties:First Name, Last Name, Job title)
* Add email addresses
* Sort contact list by first name (default) or last name
