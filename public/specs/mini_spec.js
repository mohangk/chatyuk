//simple assert
function assert(expected, actual) {
  if(expected === actual) {
    console.log('OK', expected, 'is', actual);
  } else {
    console.log('FAIL', expected, 'not', actual);
  }
}

//simple it
function it(testCase, testFunc) {
  console.log('Running', testCase);
  testFunc();
}
