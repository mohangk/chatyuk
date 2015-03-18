module.exports = {
  "Test login page" : function (browser) {
    browser
      .url("http://chatyuk.com:8000/public/chat.html")
      .waitForElementVisible('body', 1000)
      .clearValue('input[name=username]')
      .setValue('input[name=username]', 'testusername')
      .clearValue('input[name=room]')
      .setValue('input[name=room]', 'testroom')
      .click('input[type=submit]')
      .waitForElementVisible('.chat-content', 1000)
      .assert.containsText('.chat-area', 'Logged in as testusername in testroom')
      .setValue('.chat-textarea', ['test message', browser.Keys.ENTER])
      .waitForElementVisible('.chat-message', 1000)
      .assert.containsText('.chat-message', 'test message')
      .click('input[value=Logout]')
      .end();
  }
};
