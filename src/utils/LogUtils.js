export class Logger {
  static debug(msg, data) {
    __DEV__ && console.log(msg);
    __DEV__ && !!data && console.log(JSON.stringify(data));
  }
}
