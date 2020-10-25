# Yawoen Project

## Setup Project

⋅⋅* Clone the Git repository into a local folder
⋅⋅* Edit the file `src/config/db.config.js` with your MySQL credentials;
⋅⋅* Open the folder in terminal and run `npm install` to install dependencies.

## 1 - Load treated company data in a database

```
node src/server.js
```

> This command will start the application and load the data from `q1_catalog.csv` and insert on database

## 2 - Run the API to integrate data using a database

```
curl --request POST \
  --url http://localhost:8080/api/csv/update
```

> This command will migrate the `companies` table with the new column and merge the data from `q2_clientData.csv`

## 3 - Getting companies information

```
curl --request GET \
  --url http://localhost:8080/api/csv/companies \
  --header 'content-type: application/json' \
  --data '{
	"name": "s",
	"zip": "55109"
}'
```

> With this command you will can test the API to find a specific company with a part of company name and your zip code