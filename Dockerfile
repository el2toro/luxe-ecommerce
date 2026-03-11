FROM nginx:alpine
COPY dist/luxe-ecommerce/browser /usr/share/nginx/html
EXPOSE 80