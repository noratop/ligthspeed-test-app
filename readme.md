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

[code](https://github.com/noratop/ligthspeed-test-api)

### Available features
* Contacts list view
* Add a new contact
* Delete contacts (multiple)
* Contact details view
* Edit contact (only root properties:First Name, Last Name, Job title)
* Add email addresses
* Sort contact list by first name (default) or last name


### Additional comments
The react router is supposed to handle pagination, which is not yet coded.

There is still a lot of features to code but the general design/principle for each of them is set.

Design for tablet/desktop will have a slightly different layout, by basically breaking down the actual toolbar: filter/sort features will have its own panel on the left of the contact list, and all icon buttons will be turned into text buttons.
