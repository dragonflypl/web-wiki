const RandomNumber = require.requireActual('../RandomNumber').default;
RandomNumber.prototype.generate = function() {
  return this.min;
};
export default RandomNumber;

// or via full mock

// const RandomNumberMock = jest.genMockFromModule('../RandomNumber').default;
// RandomNumberMock.prototype.generate.mockReturnValue(10);
// export default RandomNumberMock;

// or via mock class

// RandomNumberMock.mockImplementation(function() {
//   return {
//     generate: () => 10
//   }
// });
