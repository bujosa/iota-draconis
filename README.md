## Description
Hi my Name is David Bujosa.
This is a very simple project related with:
- mongodb, nodejs with express for the backend. 
- react and bootstrap for the frontend.
- k6, grafana and influxdb for the test perfomances.
- heroku, docker, k8s and okteto for the deployment and development step.

If you wanna run this project you can use the start file <br>
```./start.sh``` <br>
If you wanna stop this project you can use the stop file <br>
```./stop.sh``` <br>

## Steps to use k6 with influxdb and grafana

You need to turn on the backend, if you have used start.sh it will already be turned on along with everything. Otherwise you need to go to the backend folder to install the dependencies.

```npm install```
```npm run start```

Check which PORT the backend is running on and make sure the main.js from the script folder is on that port.

If so, you can run the following command, if you have influxdb running since the path that the command points to is to that database. <br>

```k6 run -e HOSTNAME=http://localhost:4000 -e PLANETS=5000 -e STAGE_ID=1 --out influxdb=http://locahost:8086/myk6db script/main.js```

## Grafana Steps:

   [Click here for more information](https://k6.io/docs/results-visualization/influxdb-+-grafana/) 