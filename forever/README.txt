To start the production server run:

PORT=80 forever start forever/prod.json

PORT=80 forever start -a -l /opt/rasterfy/logs/log.log forever/prod.json

To stop:

forever stop app
