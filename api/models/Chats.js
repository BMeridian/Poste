/**
* Chats.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	participants: {
  		collection: 'users',
  		via: 'chats'
  	},
  	messages: {
  		collection: 'messages',
  		via: 'chat'
  	}
  },
  afterDestroy: function(dChats, cb) {
  	// Delete Associated Messages
    dChats.forEach(function(dChat){
      Messages.destroy({chat: dChat.id}).exec(function(err){
        if (err) return cb(err);
        return cb();
      })
    })
  	
  }
};

