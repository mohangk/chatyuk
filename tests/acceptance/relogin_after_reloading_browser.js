var loginDialog = require('../components/login_dialog.js');
module.exports = {
  "login" : function (browser) {
    browser
    .url("http://chatyuk.com:8000/public/chat.html")
    .waitForElementVisible('body', 1000);
    loginDialog.init(browser);
    loginDialog.login('relogin-user', 'testroom');
  },

  "reload page" : function(browser) {
    browser
    .url("http://chatyuk.com:8000/public/chat.html")
    .waitForElementVisible('body', 1000);
  },

  "relogin" : function(browser) {
    loginDialog.login('relogin-user', 'testroom');
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
