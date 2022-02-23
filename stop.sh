# development
export NODE_ENV=development
export PORT=8008
export DBPORT=27018
docker-compose -p planet-dev down

# production
export NODE_ENV=production
export PORT=8001
export DBPORT=27011
docker-compose -p planet-prod down