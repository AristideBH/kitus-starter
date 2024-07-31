FROM node:21-alpine AS sk-build
WORKDIR /usr/src/app

ARG TZ=Europe/Paris
ARG PUBLIC_DIRECTUS_URL
ARG PUBLIC_COOKIE_DOMAIN

COPY ./frontend /usr/src/app
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm install --force
RUN npm run build

FROM node:21-alpine
WORKDIR /usr/src/app

ARG TZ=Europe/Paris
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=sk-build /usr/src/app/package.json /usr/src/app/package.json
COPY --from=sk-build /usr/src/app/package-lock.json /usr/src/app/package-lock.json
COPY --from=sk-build /usr/src/app/build /usr/src/app/build

EXPOSE 3000
CMD ["node", "build/index.js"]