FROM node:18-bullseye

# Install PostgreSQL, Redis, and Yarn
RUN apt-get update && apt-get install -y postgresql redis-server yarn

# Install Directus using Yarn
RUN yarn init -y && yarn add directus && yarn add sharp --ignore-engines

# Set up PostgreSQL
USER postgres
RUN /etc/init.d/postgresql start && \
    psql --command "CREATE USER directus WITH SUPERUSER PASSWORD 'directus';" && \
    createdb -O directus directus

# Switch back to root
USER root
RUN service postgresql start && \
    DB_CLIENT=pg \
    DB_HOST=localhost \
    DB_PORT=5432 \
    DB_DATABASE=directus \
    DB_USER=directus \
    DB_PASSWORD=directus \

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
CMD service postgresql start && service redis-server start && yarn directus start
