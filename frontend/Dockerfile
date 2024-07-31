FROM node:16
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY ./frontend .
RUN pnpm build
EXPOSE 3000
CMD ["node", "build"]