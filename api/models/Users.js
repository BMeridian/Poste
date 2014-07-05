/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {

    name: {
    	type: 'string',
    	required: true
    },
    email:{
      type: 'email',
      required: true,
      unique: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    chats: {
      collection: 'chats',
      via: 'participants',
      dominant: true
    },
    friends: {
      collection: 'Users',
      via: 'id'
    },
    tokens: {
      collection: 'Tokens',
      via: 'user'
    },

    /**
     * Strips the password out of the json
     * object before its returned from waterline.
     * @return {object} the model results in object form
     */
    toJSON: function() {
      // this gives you an object with the current values
      var obj = this.toObject();

      delete obj.password;
      delete obj.tokens;

      // return the new object without password
      return obj;
    },
  },

  /**
   * Hash the users password with bcrypt
   * @param  {object}   user            the object of the submitted user data
   * @param  {Function} cb[err, user]   the callback to be used when bcrypts done
   */
  beforeCreate: function(user, cb) {  
    crypto.generate({saltComplexity: 10}, user.password, function(err, hash){
      if(err){
        return cb(err);
      }else{
        user.password = hash;
        //user.activationToken = crypto.token(new Date().getTime()+user.email);
        return cb(null, user);
      }
    });
  },

  beforeDestroy: function(criteria, cb) {
    var isdone = {tokens: false, friends: false, chats: false};
    function cbCheck(test) {
      if (test.tokens && test.friends && test.chats) {
        return cb();
      }
    }

    sails.log.debug('Criteria')
    sails.log.debug(criteria)
    Users.findOne(criteria)
    .populate('chats')
    .populate('tokens')
    .populate('friends')
    .exec(function (err, user){
      sails.log.debug('User')
      sails.log.debug(user)
      if (err) return cb(err);
      if (!user) return cb('User not found')  
      //Destroy all tokens
      user.tokens.forEach(function(token){
        Tokens.destroy(token.token).exec(function(err){
          if (err) return cb(err)/*
          sails.log.debug('Tokens Done')
          isdone.tokens = true
          return cbCheck(isdone);
          */
          return
        })
        return
      })
      //Disassociate All Friends
      user.friends.forEach(function(friend){
        sails.log.info('Friends Running')
        Users.findOne(friend.id).exec(function(err, dbfriend){
          if (err) return cb(err);
          dbfriend.friends.remove(user.id);
          dbfriend.save(function(err){
            if (err) return cb(err);
            /*
            sails.log.debug('Friends Done')
            isdone.friends = true
            return cbCheck(isdone);
            */
          })
        })
      })
      // Delete All Chats
      user.chats.forEach(function (chat) {
        Chats.destroy(chat.id).exec(function(err){
          if(err) return cb(err);
          /*
          sails.log.debug('Chats Done')
          isdone.chats = true
          return cbCheck(isdone);*/
        })
      })
    })
  }
};