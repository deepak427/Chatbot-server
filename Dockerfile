FROM ghcr.io/puppeteer/puppeteer:21.7.0

# Install D-Bus
RUN apt-get update && apt-get install -y dbus

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD ["nodemon", "index.js"]