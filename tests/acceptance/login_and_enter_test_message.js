var loginDialog = require('../components/login_dialog.js');
module.exports = {
  "login successfully" : function (browser) {
     browser
       .url("http://chatyuk.com:8000/public/chat.html")
       .waitForElementVisible('body', 1000);
     loginDialog.init(browser);
     loginDialog.login('testusername', 'testroom');
   },

   "enter test message" : function(browser) {
      browser
        .setValue('.chat-textarea', ['test message', browser.Keys.ENTER])
        .waitForElementVisible('.chat-message', 1000)
        .assert.containsText('.chat-message', 'test message');
    },

    "logout": function(browser) {
      loginDialog.logout();
      browser.end();
    }
};
