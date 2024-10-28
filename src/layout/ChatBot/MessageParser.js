// MessageParser.js
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      console.log(message);
      // Add parsing logic here
      if (message.includes("hello")) {
        this.actionProvider.handleHello();
      }
    }
  }
  
  export default MessageParser;  