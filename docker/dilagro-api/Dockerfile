FROM node:19.7.0-buster-slim
WORKDIR /home/app

# Copy package and built code
COPY package.json package-lock.json* ./
COPY node_modules ./node_modules
COPY dist/apps/dilagro-api ./

# Run the app
CMD ["node", "main.js"]
