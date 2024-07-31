FROM node:18-bullseye

# Install PostgreSQL and Redis
RUN apt-get update && apt-get install -y postgresql redis-server

# Clear npm cache and install Directus
RUN npm cache clean --force && \
    npm init -y && \
    npm install directus

# Set up PostgreSQL
USER postgres
RUN /etc/init.d/postgresql start && \
    psql --command "CREATE USER directus WITH SUPERUSER PASSWORD 'directus';" && \
    createdb -O directus directus

# Switch back to root
USER root

# Set environment variables
ENV KEY=${DIRECTUS_KEY}
ENV SECRET=${DIRECTUS_SECRET}
ENV DB_CLIENT=pg
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_DATABASE=directus
ENV DB_USER=directus
ENV DB_PASSWORD=directus
ENV CACHE_ENABLED=true
ENV CACHE_STORE=redis
ENV REDIS=redis://localhost:6379
ENV ADMIN_EMAIL=${ADMIN_EMAIL}
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

# Create volumes
VOLUME /directus/uploads
VOLUME /directus/extensions
VOLUME /var/lib/postgresql/data
VOLUME /data

# Expose ports
EXPOSE 8055 5432 6379

# Start PostgreSQL, Redis, and Directus
CMD service postgresql start && service redis-server start && npx directus start
