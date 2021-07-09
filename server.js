// server/index.js

const path = require('path');
const express = require("express");
const http = require("http");
const { Pool, Client } = require('pg')


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sampledb',
  password: 'adminzuka',
  port: 5432,
})

client.connect()

client.query('CREATE TABLE imdb_table (imdb_id VARCHAR(50) NOT NULL PRIMARY KEY, title VARCHAR(200), year int, type varchar(50))', (err, res) => {})

client.query('CREATE TABLE posters (imdb_id VARCHAR(50) NOT NULL PRIMARY KEY, url VARCHAR(300))', (err, res) => {
  // if (err) console.log(err);
})

const app = express();
const PORT = process.env.PORT || 3001;

const publicPath = path.join(__dirname, 'client', 'build');
app.use(express.static(publicPath));

app.get('/api/*', (req, res) => {
  let url1 = "http://www.omdbapi.com/?s=Matrix&apikey=720c3666";
  let url2 = "http://www.omdbapi.com/?s=Matrix%20Reloaded&apikey=720c3666";
  let url3 = "http://www.omdbapi.com/?s=Matrix %20Revolutions&apikey=720c3666";
 
  //Not the best approach but using url path to determine which url to fetch from
  let url = '';
  switch(req.path.split("/")[2]){
    case 'btn1': 
      url = url1;
      break;
    case 'btn2': 
      url = url2;
      break;
    case 'btn3':
      url = url3;
      break;
  }
  
  console.log(req.originalUrl);
  if (!url){
    res.json({"Response": "False"})
    return;
  }
  

  let data = "";
  http.get(url, resp =>{
    resp.on("data", chunk=>{
      data += chunk;
    })

    resp.on("end", () => {
      let json_resp = JSON.parse(data);
      
      res.json(json_resp);

      if (json_resp.Search){
        json_resp.Search.forEach(element => {
            client.query('INSERT INTO imdb_table (imdb_id, title, year, type) VALUES($1, $2, $3, $4) ON CONFLICT (imdb_id) DO UPDATE SET title=$2, year=$3, type=$4',[element.imdbID, element.Title, element.Year, element.Type], (err, res) => {
              if (err) console.log(err);
            });
            if('N/A'.localeCompare(element.Poster) != 0){
              client.query('INSERT INTO posters (imdb_id,url) VALUES ($1,$2) ON CONFLICT (imdb_id) DO UPDATE SET url=$2',
              [element.imdbID, element.Poster], (err, res) => {
                if (err) console.log(err);
              });
             ;
            }
        });
      }
      
    });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});