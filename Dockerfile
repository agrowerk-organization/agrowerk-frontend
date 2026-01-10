FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli && npm install --unsafe-perm

COPY . .

RUN ng build --configuration production

FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/agrowerk-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]