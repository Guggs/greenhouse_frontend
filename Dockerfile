#FROM node:13.12.0-alpine

# set working directory
##WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH
#ENV PATH /app/public:$PATH


# install app dependencies
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm install --silent
#RUN npm install react-scripts@5.0.1 -g --silent

# add app
#COPY . ./

# start app
#CMD ["npm", "start","--host", "0.0.0.0", "--port", "3000"]

# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
#FROM tiangolo/node-frontend:10 as build-stage
#WORKDIR /app
#COPY package*.json /app/
#CMD ["npm", "start","--host", "0.0.0.0"]
#RUN npm install
#COPY ./ /app/
#RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
#FROM nginx:1.15
#COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]