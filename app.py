# setting up the dependencies

import os

import pandas as pd
import numpy as np
import json

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_cors import CORS


#setting up the engine
engine = create_engine("sqlite:///db/map_db.sqlite")

app = Flask(__name__)
CORS(app)

#creating data frames from the SQLITE file

Y2005_df = pd.read_sql_query("select * from Y2005", engine)
Y2006_df = pd.read_sql_query("select * from Y2006", engine)
Y2007_df = pd.read_sql_query("select * from Y2007", engine)
Y2008_df = pd.read_sql_query("select * from Y2008", engine)
Y2009_df = pd.read_sql_query("select * from Y2009", engine)
Y2010_df = pd.read_sql_query("select * from Y2010", engine)
Y2011_df = pd.read_sql_query("select * from Y2011", engine)
Y2012_df = pd.read_sql_query("select * from Y2012", engine)
Y2013_df = pd.read_sql_query("select * from Y2013", engine)
Y2014_df = pd.read_sql_query("select * from Y2014", engine)
Y2015_df = pd.read_sql_query("select * from Y2015", engine)
Y2016_df = pd.read_sql_query("select * from Y2016", engine)
Y2017_df = pd.read_sql_query("select * from Y2017", engine)


yearList = [0,0,0,0,0,Y2005_df, Y2006_df, Y2007_df,Y2008_df, Y2009_df, Y2010_df, Y2011_df, Y2012_df, Y2013_df, Y2014_df, Y2015_df, Y2016_df, Y2017_df]

@app.route("/")
def home():
    return render_template("index.html")    

@app.route("/places")
def places():
    """Return a place names from database."""
    results = Y2005_df[['Geography', 'Latitude', 'Longitude']]

    # Return a list of the column names (sample names)
    return results.to_json(orient = 'records')

@app.route("/income/<yearIndex>")
def income(yearIndex):
    x = int(yearIndex)
    df = yearList[x]
    if x < 10:
        results = df[["Geography",
            "Households; Estimate; Total - Less than $10,000",
            "Households; Estimate; Total - $10,000 to $14,999",
            "Households; Estimate; Total - $15,000 to $24,999",
            "Households; Estimate; Total - $25,000 to $34,999",
            "Households; Estimate; Total - $35,000 to $49,999",
            "Households; Estimate; Total - $50,000 to $74,999",
            "Households; Estimate; Total - $75,000 to $99,999",
            "Households; Estimate; Total - $100,000 to $149,999",
            "Households; Estimate; Total - $150,000 to $199,999",
            "Households; Estimate; Total - $200,000 or more"]]
    else:
        results = df[['Geography', 
            'Households; Estimate; Less than $10,000',	
            'Households; Estimate; $10,000 to $14,999',	
            'Households; Estimate; $15,000 to $24,999',	
            'Households; Estimate; $25,000 to $34,999', 
            'Households; Estimate; $35,000 to $49,999',	
            'Households; Estimate; $50,000 to $74,999',	
            'Households; Estimate; $75,000 to $99,999',	
            'Households; Estimate; $100,000 to $149,999',	
            'Households; Estimate; $150,000 to $199,999', 
            'Households; Estimate; $200,000 or more']]

    
    return results.to_json(orient = 'records')

@app.route("/age/<yearIndex>")
def age(yearIndex):
    x = int(yearIndex)
    df = yearList[x]
    results = df[['Geography', 'Total; Estimate; AGE - Under 5 years',
        'Total; Estimate; AGE - 5 to 9 years',
        'Total; Estimate; AGE - 10 to 14 years',
        'Total; Estimate; AGE - 15 to 19 years',
        'Total; Estimate; AGE - 20 to 24 years',
        'Total; Estimate; AGE - 25 to 29 years',
        'Total; Estimate; AGE - 30 to 34 years',
        'Total; Estimate; AGE - 35 to 39 years',
        'Total; Estimate; AGE - 40 to 44 years',
        'Total; Estimate; AGE - 45 to 49 years',
        'Total; Estimate; AGE - 50 to 54 years',
        'Total; Estimate; AGE - 55 to 59 years',
        'Total; Estimate; AGE - 60 to 64 years',
        'Total; Estimate; AGE - 65 to 69 years',
        'Total; Estimate; AGE - 70 to 74 years',
        'Total; Estimate; AGE - 80 to 84 years',
        'Total; Estimate; AGE - 85 years and over']]  
    return results.to_json(orient = 'records')

@app.route("/race/<yearIndex>")
def race(yearIndex):
    x = int(yearIndex)
    df = yearList[x]
    if x < 10:
        results = df[['Geography', 'Estimate; White alone',
            'Estimate; Black or African American alone',
            'Estimate; American Indian and Alaska Native alone',
            'Estimate; Asian alone',
            'Estimate; Native Hawaiian and Other Pacific Islander alone',
            'Estimate; Some other race alone',
            'Estimate; Two or more races:']]
    else:
        results = df[['Geography', 'Estimate; Total: - White alone',
            'Estimate; Total: - Black or African American alone',
            'Estimate; Total: - American Indian and Alaska Native alone',
            'Estimate; Total: - Asian alone',
            'Estimate; Total: - Native Hawaiian and Other Pacific Islander alone',
            'Estimate; Total: - Some other race alone',
            'Estimate; Total: - Two or more races:']]
   
    
    return results.to_json(orient = 'records')

if __name__ == "__main__":
    app.run(debug=True)    