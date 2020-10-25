run:
	npm install
	node src/server.js
update:
	curl --request POST \
  --url http://localhost:8080/api/csv/update
get:
	curl --request GET \
  --url http://localhost:8080/api/csv/companies \
  --header 'content-type: application/json' \
  --data '{"name": "s","zip": "55109"}'