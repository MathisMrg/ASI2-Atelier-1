#WARNING: IL FAUT LANCER LE DOCKER FILE AVEC LE CONTEXTE GLOBAL DE L'APPLICATION

FROM node:lts-alpine AS build
WORKDIR /app
COPY ../asi2-atelier-front/package*.json ./
RUN npm ci
COPY ../asi2-atelier-front/. .
ENV NODE_ENV=production
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /var/www/html
COPY ./proxy/conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]