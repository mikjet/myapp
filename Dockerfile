FROM node AS build

WORKDIR /react-app

COPY package*.json .

RUN yarn install

COPY . .

RUN mkdir -p /react-app/test-reports

RUN yarn run test --coverage --coverageDirectory=/react-app/test-coverage --watchAll=false

RUN yarn run build

FROM nginx 

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build  /react-app/build /usr/share/nginx/html