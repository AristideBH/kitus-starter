FROM directus/directus:latest

# Switch to root user to install pnpm
USER root

# Install pnpm with --unsafe-perm flag
RUN npm install -g pnpm --unsafe-perm

# Switch back to the node user
USER node

# Set working directory
WORKDIR /directus

# Copy configuration files
COPY package.json .
COPY pnpm-lock.yaml .

# Install dependencies
RUN pnpm install

# Copy the rest of your backend files
COPY ./backend .

# Expose the port Directus runs on
EXPOSE 8055

# Start Directus
CMD ["npx", "directus", "start"]
