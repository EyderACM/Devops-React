FROM node:14 as build

WORKDIR /app

COPY . .

# building the app
RUN npm i
RUN npm install
RUN npm run build
# Test the app
RUN CI=true npm test
# Running the app
CMD [ "npm", "start" ]
#Build      docker build -t frontend  .
#Run        docker run --name frontend -d -p 3000:3000 frontend