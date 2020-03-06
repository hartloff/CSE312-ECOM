FROM ubuntu:18.04

RUN apt-get update

# Set the home directory to /root and cd into that directory
ENV HOME /root
WORKDIR /root

# Install Node
RUN apt-get update --fix-missing
RUN apt-get install -y nodejs
RUN apt-get install -y npm

# Copy all app files into the image
COPY . .

# Download dependancies
RUN npm install

# Allow port 8000 to be accessed from outside the container
EXPOSE 8000

# Run the app
CMD ["node", "ecom_app.py"]
