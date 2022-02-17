# development
export NODE_ENV=development
export PORT=8008
export DBPORT=27018
docker-compose -p planets-dev up -d --build

# production
export NODE_ENV=production
export PORT=8001
export DBPORT=27011
docker-compose -p planets-prod up -d --build