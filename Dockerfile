FROM node:17

# Working Dir
WORKDIR /usr/src/app

# Copy package Json Files
COPY package*.json ./

# install Prettirer

# Install Files
RUN npm install

# install yarn
RUN npm install yarn --force --location=global

# Copy source Files
COPY . .

# Build
RUN npm run build

#Expose the API Port
EXPOSE 3000

CMD ["yarn", "dev:server"]