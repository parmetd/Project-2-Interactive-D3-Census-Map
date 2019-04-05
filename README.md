# Project-2-Interactie-D3-Census-Map
Census data from 2005 to 2017 was used for Age, Income and Race to create a D3 / Leaflet interactive Charts and map website.

Team MSSD
Project ready to be deployed locally via download.
1) Go to https://account.mapbox.com/access-tokens/create and gain a Leaflet API token.
2) place the API token into config.js and place that in the /static/js/ folder
3) use gitbash or command prompt to go to the cloned repo and type python app.py to activate the flask server.

Optionally, to deploy to the internet deploy to Heroku and gain a leaflet API token.

About the project:
We took census data by years for 2005-2017 on Race, Age and Income of 492 cities.
We transformed this data into one dataset for each year which was then loaded into a SQLITE file.
We used the SQLITE file to be hosted by a flask server in python for Javascript to call.
d3 interactive charts were created (one for each of Income, Race and Age).
Leaflet was used to have a map to show you what was going on.
CSS styling was done via bootstrap.

Version 1.0 4/4/2019.

Future edits:
1) Jupyternotebook: Use census to call in Gender as well as that was in the dataset but cut for time.
2) Jupyternotebook: Fix the column headers as the census column headers are such a pain and too long for SQL. For our project SQLITE was fine but for purposes of going forward it would be nice to access SQL. SQL schema and Queries were built but not used.
3) Jupyternotebook: Also call in the missing age group from X years (75-x). Due to time we weren't able to go back.
4) HTML/D3: Remove titles from html tag and put it into d3 for each chart.
5) Possibly a pure d3 to do: Animations for the d3 charts using anime.js or some other library in order to show the transformation visually from 2005 to 2017 ala: https://bost.ocks.org/mike/nations/
6) Leaflet: bring the control layers for both different Leaflet tilings and layer control heatmaps for Age, Race, Income and Gender. 
7) Deploy to Heroku