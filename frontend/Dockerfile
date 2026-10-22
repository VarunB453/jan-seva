FROM node:20-alpine AS dependencies

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS development
COPY . .
ENV HOST=0.0.0.0 \
    BROWSER=none
EXPOSE 3000
CMD ["npm", "start"]

FROM dependencies AS build
ARG REACT_APP_API_URL=""
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.29-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /app/build /usr/share/nginx/html
EXPOSE 8080
