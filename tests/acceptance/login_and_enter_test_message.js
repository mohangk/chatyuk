var loginDialog = require('../components/login_dialog.js');

module.exports = {

  "login successfully" : function (browser) {
     browser
       .url("http://chatyuk.com:8000/public/chat.html")
       .waitForElementVisible('body');

     loginDialog.init(browser);
     loginDialog.login('testusername', 'testroom');
   },

   "enter test message" : function(browser) {
      browser
        .setValue('.chat-textarea', ['test message', browser.Keys.ENTER])
        .waitForElementVisible('.chat-message')
        .assert.containsText('.chat-message', 'test message');
    },
  
   "it maintains session after reloading page" : function(browser) {
      browser
      .url("http://chatyuk.com:8000/public/chat.html")
      .waitForElementVisible('body');
    },

    "enter test message 2" : function(browser) {
      browser
      .setValue('.chat-textarea', ['test message 2', browser.Keys.ENTER])
      .waitForElementVisible('.chat-message')
      .assert.containsText('.chat-message', 'test message 2');
    },

    "logout": function(browser) {
      loginDialog.logout();
      browser.end();
    }
};
