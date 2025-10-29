// /api/chat 라우트: OpenAI Chat Completions API 호출
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/chat', async (req, res) => {
  // 프론트엔드에서 전달한 전체 메시지 히스토리
  const { messages } = req.body || {};

  if (!Array.isArray(messages)) {
    // 잘못된 요청 처리
    return res.status(400).json({ error: 'INVALID_REQUEST_BODY' });
  }

  try {
    // OpenAI Chat Completions API 호출
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    if (!apiKey) {
      // 키가 없으면 서버 구성 문제
      return res.status(500).json({ error: 'LLM_REQUEST_FAILED' });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 60000,
      }
    );

    const assistantMessage = response?.data?.choices?.[0]?.message?.content || '';

    return res.json({ reply: assistantMessage });
  } catch (err) {
    // 오류 시 500과 에러 코드 반환
    console.error('OpenAI request failed:', err?.response?.data || err?.message || err);
    return res.status(500).json({ error: 'LLM_REQUEST_FAILED' });
  }
});

module.exports = router;


