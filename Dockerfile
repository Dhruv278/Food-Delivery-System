FROM node:19
WORKDIR /app
COPY package.json .


ARG NODE_ENV
RUN if [ "$NODE_ENV" = "PRODUCTION" ]; \
        then npm install --only=production; \
        else npm install ; \
        fi

COPY . ./
EXPOSE 3000
