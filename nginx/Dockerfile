FROM nginx:1.15

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#Build      docker build -t webserver .\nginx\ 
#Run        docker run --name webserver --link frontend:frontend -d -p 8083:80 webserver