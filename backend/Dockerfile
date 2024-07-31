FROM directus/directus:latest

# Install pnpm
RUN npm install -g pnpm

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