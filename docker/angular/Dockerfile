FROM node:18.10-alpine as dev

# Add .bin folder in node_modules folder to path
# Needed to use local ng etc.
ENV PATH="/usr/src/node_modules/.bin:${PATH}"

# Set timezone
RUN ln -sf /usr/share/zoneinfo/Europe/Oslo /etc/localtime

# Create app directory
WORKDIR /usr/src
