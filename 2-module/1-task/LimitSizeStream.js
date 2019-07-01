const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.options = options;
    this.chunks = [];
  }
  _transform(chunk, encoding, callback) {
    this.chunks.push(chunk);
    if (Buffer.byteLength(Buffer.concat(this.chunks)) > this.options.limit) {
      callback( new LimitExceededError() );
    }
    this.push(chunk);
    callback();
  }
}

module.exports = LimitSizeStream;
