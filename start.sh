# development
export NODE_ENV=development
export BACK_PORT=4000
export DBPORT=27018
export FRONT_PORT=3000

docker-compose -p planet-dev up -d --build 

# production
export NODE_ENV=production
export BACK_PORT=4001
export DBPORT=27019
export FRONT_PORT=3001
docker-compose -p planet-prod up -d --build