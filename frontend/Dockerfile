# 베이스 이미지: Node 18
FROM node:18

# 작업 디렉토리
WORKDIR /app

# 패키지 파일 설치
COPY package.json package-lock.json* ./
RUN npm install

# 소스 복사
COPY . .

# 개발 서버 포트 노출
EXPOSE 3000

# Vite 개발 서버 실행 (컨테이너 내에서 dev 서버 동작)
CMD ["npm", "run", "dev"]


