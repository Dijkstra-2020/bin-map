# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4
# Set the working directory to /client
WORKDIR /client
# copy package.json into the container at /client
COPY package*.json /client/
ENV CHOKIDAR_USEPOLLING=true
# install dependencies
RUN npm install -g npm@latest
RUN npm i --unsafe-perm
RUN npm install --save google-maps-react
RUN npm install --save react-router-dom
RUN npm install react-select-search --save
# Copy the current directory contents into the container at /client
COPY . /client/
# Make port 3000 available to the world outside this container
EXPOSE 80 
# Run the app when the container launches
CMD ["npm", "start"]
