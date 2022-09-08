### STAGE 1: Build ###
FROM node:18.4.0 as build
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY . /usr/src/app
RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx:1.22.0-alpine
COPY deployment_assets/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY deployment_assets/localhost.crt /etc/ssl/
COPY deployment_assets/localhost.key /etc/ssl/
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]