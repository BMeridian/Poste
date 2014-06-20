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

    /**
     * Strips the password out of the json
     * object before its returned from waterline.
     * @return {object} the model results in object form
     */
    toJSON: function() {
      // this gives you an object with the current values
      var obj = this.toObject();
      delete obj.password;

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
  }
};