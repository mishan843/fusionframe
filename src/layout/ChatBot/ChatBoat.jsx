import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './chatbotConfig';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import CustomHeader from './CustomHeader';

function ChatbotComponent({ setShowOptions }) {
  const handleBackClick = () => {
    setShowOptions(true)
  };
  
  return (
    <div style={{ maxWidth: '300px' }}>
      <Chatbot
        config={{ ...config, customComponents: { header: (props) => <CustomHeader {...props} onBackClick={handleBackClick} /> } }}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default ChatbotComponent;