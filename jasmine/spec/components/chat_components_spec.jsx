describe("UI Components", function() {
  var instance;
  var TestUtils = React.addons.TestUtils;

  describe("LoggedInBox", function() {

    describe('render', function() {

      it('displays the logout button that is bound to props.logout', function() {

        logoutSpy = jasmine.createSpy('fakeLogout');

        instance = TestUtils.renderIntoDocument(<LoggedInBox username="fake_username" room="fake_room" logout={logoutSpy} />);
        var loggedInButton = TestUtils.findRenderedDOMComponentWithTag(instance, "input");
        TestUtils.Simulate.click(loggedInButton.getDOMNode());
        expect(logoutSpy).toHaveBeenCalled();

      });

      it('displays the username and room', function() {

        instance = TestUtils.renderIntoDocument(<LoggedInBox username="fake_username" room="fake_room" />)
        var loggedInSpan = TestUtils.findRenderedDOMComponentWithTag(instance, "span");
        expect(loggedInSpan.getDOMNode().textContent.trim()).toEqual('Logged in as fake_username in fake_room')

      });
    });

  });

  describe("LoginForm", function() {

    describe("render", function() {
      describe('on submit', function(){

        it('passes the username, room to loggedInAs', function() {
          var fakeLoggedInAs = jasmine.createSpy('fakeLoggedInAs');

          instance = TestUtils.renderIntoDocument(<LoginForm loggedInAs={fakeLoggedInAs} username="test" room="testroom"  />)
          instance.refs.room.getDOMNode().value = "Fake Room";
          instance.refs.username.getDOMNode().value = "Fake Username";
          TestUtils.Simulate.submit(instance.getDOMNode());
          expect(fakeLoggedInAs).toHaveBeenCalledWith("Fake Username", "Fake Room");
        });
      });
    });
  });

  describe("Emoticon", function() {

    describe('render', function() {

      it('renders the emoticon for the specifed type', function() {
        instance = TestUtils.renderIntoDocument(<Emoticon type="smiley" />)
        expect(instance.getDOMNode().className).toEqual(instance.emoticonClass());
      });


    });
  })

  describe("Message", function() {
    describe('formatSender', function() {
      it('appends a ":" to the sender', function() {
        instance = TestUtils.renderIntoDocument(<Message sender="FakeSender" body="FakeBody"  />)
        expect(instance.formatSender('FakeSender')).toEqual("FakeSender:");
      });

    });

    describe('formatBody', function() {
      describe('when the string is empty or undefined', function() {
        it('returns an empty string', function() {
          instance = TestUtils.renderIntoDocument(<Message />)
          expect(instance.formatBody()).toEqual('');
        });
              
              
      });
      describe('when there is no formatting',function() {
        it('returns the original body in an array', function() {
          instance = TestUtils.renderIntoDocument(<Message sender="FakeSender" body="FakeBody"  />)
          expect(instance.formatBody('FakeBody')).toEqual(['FakeBody']);
        });
      });

      describe('when there is formatting', function() {
        it('replaces the formatting with the appropriate Emoticon elements', function() {
          instance = TestUtils.renderIntoDocument(<Message />)
          expect(instance.formatBody('Hi :) nice to see you again :( !')).toEqual(['Hi ',<Emoticon type="smiley"/>,' nice to see you again ',<Emoticon type="disappointed"/>,' !']);
        })

      });
    });

    describe("tokenize", function() {

      describe('when there is no matching emoticon', function() {
        it('returns the text as a single element in an array', function() {
            instance = TestUtils.renderIntoDocument(<Message />)
            expect(instance.tokenize(':(','disappointed','Hi :) nice to see you again!')).toEqual([ 'Hi :) nice to see you again!']);
        });
      });


      describe('when there is one or more of the same emoticon', function() {
        it('splits the string at the token and adds a emoticon element in its place', function() {
            instance = TestUtils.renderIntoDocument(<Message />)
            expect(instance.tokenize(':)','smiley','Hi :) nice to see you again!')).toEqual(['Hi ',<Emoticon type="smiley"/>,' nice to see you again!']);
            expect(instance.tokenize(':)','smiley', 'Hi :) nice to :) see you again!')).toEqual(['Hi ',<Emoticon type="smiley"/>,' nice to ', <Emoticon type="smiley"/>,' see you again!']);
        });
      });
    })

    describe('tokenizeTextArray', function() {
      it('passes each element in textArray that is a string to tokenize', function() {
        instance = TestUtils.renderIntoDocument(<Message />)

        var originalTextArray = ['Hi :) nice to :) see you again!'];
        var expectedTextArray = ['Hi ',<Emoticon type="smiley"/>,' nice to ', <Emoticon type="smiley"/>,' see you again!'];

        expect(instance.tokenizeTextArray(':)','smiley', originalTextArray)).toEqual(expectedTextArray);
        
        var originalTextArray = ['Hi ',<Emoticon type="smiley"/>,' me sad :( !'];
        var expectedTextArray = ['Hi ',<Emoticon type="smiley"/>,' me sad ',<Emoticon type="sad"/>,' !'];

        expect(instance.tokenizeTextArray(':(','sad', originalTextArray)).toEqual(expectedTextArray);
      });
    });

    describe('spliceTextArray', function() {

      it('splices in the newtextarray at the specified index', function() {

        instance = TestUtils.renderIntoDocument(<Message />)
        var textArray = ['hi', 'me :)','now woo'];
        var newTextArrayElement = ['woi', 'woo wow'];
        instance.spliceTextArray(textArray, 1, newTextArrayElement);
        expect(textArray).toEqual(['hi', 'woi', 'woo wow','now woo']);
      });
    });

    describe("render", function() {
      it('calls formatSender and formatBody with the right params', function() {

        var formatSenderSpy = jasmineReact.spyOnClass(Message, "formatSender").and.returnValue('fakeSenderFormatted');
        var formatBodySpy = jasmineReact.spyOnClass(Message, "formatBody").and.returnValue('fakeBodyFormatted');

        instance = TestUtils.renderIntoDocument(<Message sender="FakeSender" body="FakeBody"  />)

        expect(instance.refs.sender.getDOMNode().textContent).toEqual("fakeSenderFormatted");
        expect(instance.refs.body.getDOMNode().textContent).toEqual("fakeBodyFormatted");

        expect(formatSenderSpy).toHaveBeenCalledWith("FakeSender");
        expect(formatBodySpy).toHaveBeenCalledWith("FakeBody");
      });
    });
  });
});
