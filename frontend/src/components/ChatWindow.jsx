import React, { useMemo, useRef, useState, useEffect } from 'react';

export default function ChatWindow() {
  // 초기 assistant 인사말
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '안녕하세요! 무엇을 도와드릴까요?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  // API 베이스 URL (환경변수)
  const apiBaseUrl = useMemo(() => {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
  }, []);

  // 메시지 추가 후 자동 스크롤 하단으로 이동
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // 전송 핸들러
  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // 내 메시지 즉시 반영
    const newUserMessage = { role: 'user', content: trimmed };
    const nextMessages = [...messages, newUserMessage];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    // 로딩 상태에서 임시 메시지 표현
    try {
      const res = await fetch(`${apiBaseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        // 오류 응답 처리
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '오류가 발생했어요. 잠시 후 다시 시도해 주세요.' },
        ]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      const reply = data?.reply || '';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '네트워크 오류가 발생했어요.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 16,
    gap: 12,
  };

  const listStyle = {
    flex: 1,
    overflowY: 'auto',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: 12,
    background: '#fafafa',
  };

  const inputRowStyle = {
    display: 'flex',
    gap: 8,
  };

  const inputStyle = {
    flex: 1,
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
  };

  const sendButtonStyle = {
    padding: '10px 16px',
    border: '1px solid #2563eb',
    background: '#2563eb',
    color: 'white',
    borderRadius: 8,
    cursor: 'pointer',
  };

  const messageBubble = (m) => {
    const isUser = m.role === 'user';
    const bubbleStyle = {
      maxWidth: '75%',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      background: isUser ? '#2563eb' : 'white',
      color: isUser ? 'white' : '#111827',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: '8px 12px',
      marginBottom: 8,
      whiteSpace: 'pre-wrap',
    };
    return <div style={bubbleStyle}>{m.content}</div>;
  };

  return (
    <div style={containerStyle}>
      <div ref={listRef} style={listStyle}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
            {messageBubble(m)}
          </div>
        ))}
        {loading && (
          <div style={{ color: '#6b7280', fontStyle: 'italic' }}>assistant typing...</div>
        )}
      </div>

      <div style={inputRowStyle}>
        <textarea
          style={inputStyle}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="메시지를 입력하세요"
        />
        <button style={sendButtonStyle} onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}


