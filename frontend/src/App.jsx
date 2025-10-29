import React from 'react';
import ChatWindow from './components/ChatWindow.jsx';

// 간단한 레이아웃과 헤더
export default function App() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  };

  const headerStyle = {
    padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: '600',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>My Chatbot</div>
      <ChatWindow />
    </div>
  );
}


