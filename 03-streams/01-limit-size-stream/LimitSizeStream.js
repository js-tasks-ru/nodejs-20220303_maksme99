const { codeBlocks } = require('juice');
const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.size = 0;
    this.max = options.limit;
  }

  _transform(chunk, encoding, callback) {
    this.size +=  Buffer.byteLength(chunk);
    if(this.size > this.max)
    {
      callback(new LimitExceededError());
      //throw new LimitExceededError();
    }
    else
    {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
