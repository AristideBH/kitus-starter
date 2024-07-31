FROM directus/directus:latest
COPY . /directus
WORKDIR /directus
RUN pnpm install
EXPOSE 8055
CMD ["npx", "directus", "start"]