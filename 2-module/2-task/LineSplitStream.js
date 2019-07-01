const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
  }

  _initInternalStream() {
    this._internalStream = new stream.PassThrough();
    this._buffer_parts = [];
    this._lines = [];
    this._internalStream.on('data', chunk => {
      this.push(chunk);
    });
    this._internalStream.on('error', err => {
      console.log('error', err);
    });
  }

  _transform(chunk, encoding, callback) {
    if (!this._internalStream) {
      this._initInternalStream();
    }
    this._buffer_parts.push(chunk);
    callback();
  }

  _flush(callback) {
    const buffer = Buffer.concat(this._buffer_parts);
    this._lines = buffer.toString().split(`${os.EOL}`);
    this._lines.forEach((item) => this._internalStream.write(item));
    callback();
  }
}

module.exports = LineSplitStream;
