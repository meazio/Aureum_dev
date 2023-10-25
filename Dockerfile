# 기본 이미지로부터 시작합니다. 이 예시에서는 Node.js를 사용합니다.
FROM node:14 as build

# 작업 디렉토리를 생성하고 해당 디렉토리로 이동합니다.
WORKDIR /app

# 프로젝트의 package.json 및 package-lock.json을 복사하여 종속성을 설치합니다.
COPY package*.json ./
RUN npm install

# 프로젝트 소스 코드를 컨테이너 내부의 작업 디렉토리로 복사합니다.
COPY . .

# React 프로젝트를 빌드합니다.
RUN npm run build

# Nginx 이미지를 사용하여 최종 이미지를 빌드합니다.
FROM nginx:latest

# Nginx 설정 파일을 컨테이너 내부로 복사합니다.
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 React 애플리케이션을 Nginx의 웹 루트 디렉토리로 복사합니다.
COPY --from=build /app/build /usr/share/nginx/html

# 80번 포트를 열어 웹 애플리케이션을 서빙합니다.
EXPOSE 80

# 컨테이너가 시작될 때 Nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]