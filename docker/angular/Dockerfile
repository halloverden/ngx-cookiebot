FROM node:22.20.0-alpine AS dev

# Add .bin folder in node_modules folder to path
# Needed to use local ng etc.
ENV PATH="/usr/src/node_modules/.bin:${PATH}"

# Set timezone
RUN ln -sf /usr/share/zoneinfo/Europe/Oslo /etc/localtime

RUN apk add --no-cache --virtual dev-deps g++ make py3-pip bash acl

# Gives the node user the ability to use npm link
RUN setfacl -R -m u:node:rwx /usr/local/lib/node_modules
RUN setfacl -dR -m u:node:rwx /usr/local/lib/node_modules

# Create app directory
WORKDIR /usr/src
