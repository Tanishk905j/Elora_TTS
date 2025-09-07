# Base image jisme Node.js + Python dono milega
FROM nikolaik/python-nodejs:python3.11-nodejs22

# Working directory
WORKDIR /app

# Copy package.json aur package-lock.json
COPY package*.json ./

# Dependencies install karo
RUN npm install

# Baaki files copy karo
COPY . .

# Port expose karo (same jo tum server.js me use karte ho)
EXPOSE 3000

# Start command
CMD ["node", "server.js"]
