const prefix = '[CanvasSelector]';

class Log {
  info(...str) {
    console.log(prefix, ...str);
  }
  error(...str) {
    console.error(prefix, ...str);
  }
}

export default Log;