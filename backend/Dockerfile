# 베이스 이미지: Node 18
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package.json package-lock.json* ./
RUN npm install

# 소스 복사
COPY src ./src

# 포트 노출
EXPOSE 3001

# 서버 시작
CMD ["npm", "start"]


