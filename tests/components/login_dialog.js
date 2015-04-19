module.exports = {
  init: function(browser) {
    this.browser = browser;
  },

  login: function(username, room) {
    this.browser.clearValue('input[name=username]')
      .setValue('input[name=username]', username)
      .clearValue('input[name=room]')
      .setValue('input[name=room]', room)
      .click('input[type=submit]')
      .waitForElementVisible('.chat-content', 1000)
      .assert.containsText('#chatyuk', 'Logged in as '+username+' in '+room)
  },

  logout: function() {
    this.browser.click('input[value=Logout]')
    .waitForElementVisible('input[name=username]', 1000);
  }
};
