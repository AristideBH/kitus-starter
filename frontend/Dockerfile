FROM node:21-alpine AS sk-build
WORKDIR /app

ARG TZ=Europe/Paris
ARG PUBLIC_DIRECTUS_URL
ARG PUBLIC_COOKIE_DOMAIN

COPY ./frontend /app
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm install --force
RUN npm run build
RUN ls -la /app

FROM node:21-alpine
WORKDIR /app

ARG TZ=Europe/Paris
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=sk-build /app/package.json /app/package.json
COPY --from=sk-build /app/package-lock.json /app/package-lock.json
COPY --from=sk-build /app/build /app/build

EXPOSE 3000
CMD ["node", "build/index.js"]