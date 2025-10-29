## ChatGPT API 기반 간단 웹 챗봇 (React + Express)

### 개요
- **프론트엔드**: React (Vite) SPA
- **백엔드**: Node.js + Express
- **실행**: Docker Compose로 로컬에서 두 컨테이너 동시 실행
- **언어**: JavaScript (TypeScript 미사용)

### 디렉토리 구조
- `backend/`: Express 서버 (`/api/chat`)
- `frontend/`: React SPA (간단한 채팅 UI)

### 사전 준비 (환경변수)
- 백엔드 OpenAI 키는 컨테이너 환경변수로 주입합니다. 예시는 아래 `docker-compose.yml` 참고.
- 로컬 개발시 별도로 `.env`를 사용할 수도 있습니다. (예시 파일: `backend/env.example`의 내용을 참고하여 `backend/.env`로 생성하세요.)

예시 값:
```
OPENAI_API_KEY=__FILL_ME__
OPENAI_MODEL=gpt-4o-mini
```

프론트엔드 API 베이스 URL (개발 기본값은 `http://localhost:3000`):
```
VITE_API_BASE_URL=http://localhost:3000
```

### 실행 방법
1) 환경변수 준비
- `docker-compose.yml`의 `OPENAI_API_KEY` 값을 실제 키로 변경하세요 (`__FILL_ME__` -> 실제 키).
- 필요시 프론트엔드의 `VITE_API_BASE_URL`을 변경할 수 있습니다.

2) Docker Compose로 실행
```bash
docker compose up --build
```

3) 접속
- 프론트엔드: `http://localhost:3000`
- 백엔드: `http://localhost:3001`

### 주요 기능
- 프런트에서 입력한 대화 메시지를 백엔드로 전달
- 백엔드는 OpenAI Chat Completions API 호출 후 모델 응답 텍스트를 반환
- 프론트는 대화 히스토리를 화면에 렌더링 (메모리 상태 유지)

### 주의사항
- OpenAI API Key는 프론트엔드에 노출되지 않습니다. 반드시 백엔드 컨테이너에 주입하세요.
- 오류 발생 시 백엔드는 `500`과 `{ error: "LLM_REQUEST_FAILED" }`를 반환합니다.


