# B1: cài môi trường Node
FROM --platform=arm64 node:16 as build_stage

# tạo folder /app
WORKDIR /app

# COPY file package.json và package-lock.json vào image
# . : copy 2 file package.json vào folder app
COPY package*.json .

# npm install
RUN npm install

# copy toàn bộ source code BE vào image
# . đầu tiên: copy toàn bộ folder cùng cấp với Dockerfile
# . thứ hai: copy toàn bộ folder đó vào trong folder /app của images
COPY . .

EXPOSE 8080

# npm run start
CMD ["npm", "run", "start"]

# docker build . -t node36
# . : tìm file Dockerfile để build image

# build container dựa vào image
# docker run -d -p 8081:8080 --name node36_container node36