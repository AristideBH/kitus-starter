FROM directus/directus:latest

# Install MySQL and Redis
RUN apt-get update && apt-get install -y mysql-server redis-server

# Copy configuration files
COPY my.cnf /etc/mysql/my.cnf
COPY redis.conf /etc/redis/redis.conf

# Set up environment variables
ENV KEY=${DIRECTUS_KEY}
ENV SECRET=${DIRECTUS_SECRET}
ENV PUBLIC_URL=${PUBLIC_URL}
ENV DB_CLIENT=mysql
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_DATABASE=${MYSQL_DATABASE}
ENV DB_USER=${MYSQL_USER}
ENV DB_PASSWORD=${MYSQL_PASSWORD}
ENV CACHE_ENABLED=true
ENV CACHE_STORE=redis
ENV CACHE_AUTO_PURGE=${CACHE_AUTO_PURGE}
ENV CACHE_TTL=${CACHE_TTL}
ENV REDIS=redis://localhost:6379
ENV ADMIN_EMAIL=${ADMIN_EMAIL}
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

# Create volumes
VOLUME /directus/uploads
VOLUME /directus/extensions
VOLUME /var/lib/mysql
VOLUME /var/lib/redis

# Expose ports
EXPOSE 8055 3306 6379

# Start MySQL, Redis, and Directus
CMD service mysql start && service redis-server start && npx directus start
