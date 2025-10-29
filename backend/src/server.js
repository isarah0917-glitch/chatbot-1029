// 간단한 Express 서버 설정
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// .env 로드 (컨테이너에서는 docker-compose 환경변수로 주입됨)
dotenv.config();

const app = express();
const PORT = 3001;

// 프론트엔드 도메인에서의 접근 허용 (개발용)
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}));

// JSON 바디 파싱
app.use(express.json());

// 라우트 설정
const chatRouter = require('./routes/chat');
app.use('/api', chatRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});


