/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {
    
    //UsersController
    'POST /signup' : {
         controller: 'users',
         action: 'create'
    },

    //AuthsController
    'POST /login' : {
         controller: 'auth',
         action: 'login'
    },
    'POST /logout' : {
         controller: 'auth',
         action: 'logout'
    },

    //FriendsController
    'POST /friends/:id' : {
        controller: 'friends',
        action: 'create'
    },

    'DELETE /friends/:id' : {
        controller: 'friends',
        action: 'destroy'
    },

    //ChatsController
    'POST /chats/:id' : {
        controller: 'chats',
        action: 'create'
    },

    'GET /chats/' : {
        controller: 'chats',
        action: 'find'
    },

    'GET /chats/:id' : {
        controller: 'chats',
        action: 'findOne'
    },

    'DELETE /chats/:id' : {
        controller: 'chats',
        action: 'destroy'
    },

    //Messages Controller
    'GET /messages/:id' : {
        controller: 'messages',
        action: 'find'
    }
};