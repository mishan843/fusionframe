// chatbotConfig.js
import { createChatBotMessage } from 'react-chatbot-kit';
import CustomHeader from './CustomHeader';

const config = {
  botName: "MyBot",
  initialMessages: [createChatBotMessage("Hi, how can I help you?")],
  customComponents: {
    header: (props) => <CustomHeader {...props} />,
  },
};

export default config;