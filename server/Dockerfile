FROM node:20-bookworm-slim AS dependencies

WORKDIR /app
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci
COPY prisma ./prisma
RUN npx prisma generate

FROM dependencies AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

FROM dependencies AS production-dependencies
RUN npm prune --omit=dev

FROM node:20-bookworm-slim AS production
ENV NODE_ENV=production \
    PORT=5000
WORKDIR /app
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /app/uploads /app/backups \
    && chown node:node /app/uploads /app/backups

COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node src ./src
USER node
EXPOSE 5000
CMD ["node", "src/server.js"]
