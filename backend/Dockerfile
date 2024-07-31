FROM directus/directus:latest
COPY ./backend /directus
WORKDIR /directus
RUN pnpm install
EXPOSE 8055
CMD ["npx", "directus", "start"]