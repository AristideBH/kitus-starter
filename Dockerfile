# Dockerfile for building and running a Node.js application.

# This Dockerfile sets up a multi-stage build process:

# 1. The first stage (`sk-build`) installs dependencies, copies the application code, and builds the application.
# 2. The second stage (`node:21-alpine`) copies the built application from the first stage and runs it.

FROM node:21-alpine AS sk-build
WORKDIR /app

ARG TZ=Europe/Paris
ARG PUBLIC_DIRECTUS_URL
ARG PUBLIC_COOKIE_DOMAIN
ARG PUBLIC_SITE_URL

COPY . /app
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm install --force
RUN npm run build

FROM node:21-alpine
WORKDIR /app

ARG TZ=Europe/Paris
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=sk-build /app/package.json /app/package.json
COPY --from=sk-build /app/package-lock.json /app/package-lock.json
COPY --from=sk-build /app/build /app/build

EXPOSE 80
CMD ["node", "build/index.js"]