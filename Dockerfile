FROM nginx:alpine
COPY dist/luxe-ecommerce /usr/share/nginx/html
EXPOSE 80