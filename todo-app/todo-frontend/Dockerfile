FROM node:20 AS test_stage

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000/

RUN npm ci

RUN CI=true npm test


FROM node:20 AS build_stage

WORKDIR /usr/src/app

COPY --from=test_stage /usr/src/app .

ENV VITE_BACKEND_URL=http://localhost:3000/

RUN npm ci

RUN npm run build


FROM nginx:1.25-alpine

COPY --from=build_stage /usr/src/app/dist /usr/share/nginx/html