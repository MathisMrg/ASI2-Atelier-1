ARG NODE_VERSION=20.17.0
FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV production
ENV BACKEND_URL "http://localhost:4040"
WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
USER node
COPY . .
EXPOSE 4040
CMD ["node", "index.js"]
