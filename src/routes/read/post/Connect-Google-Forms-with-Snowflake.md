---
title: 'Connect Google Forms with Snowflake'
link: 'https://medium.com/@HatmanStack/connect-google-forms-with-snowflake-ac8a2a6837b'
description: 'Seamlessly integrate Google Forms with Snowflake for data transfer.'
date: 'Dec 14, 2022'
time: '5 min read'
---

![Connect Google Forms with Snowflake](/blog/connect-google-forms-with-snowflake-1.webp)

Every major cloud provider has great in house tools to make survey results accessible inside their systems. To break out of that system takes a little work. We’ll use Google Forms, Apps Script, Google Cloud Run, and Snowflake Node Connector to <a href="https://github.com/HatmanStack/snow-node-sheets-gpc">make it happen</a>.

![Connect Google Forms with Snowflake](/blog/connect-google-forms-with-snowflake-2.gif)

Make a **Google Form** and head to the **Responses** tab. Click the google sheets icon to create a new spreadsheet. It should be linked to your current google account. Head over to the new sheet -> Extensions -> Apps Script. You want to create a script that runs every time there is an entry to the form.

```bash
function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var range = sheet.getRange("A2:E");
  range.sort({column: 1, ascending: false});


  var url = "";
  var headers = {
             "contentType": "application/json",
             "headers":{"X-PW-AccessToken": "<TOKEN>",
                        "X-PW-Application": "developer_api",
                        "X-PW-UserEmail": "<USER_EMAIL_ADDRESS>"}
             };
  console.log("start");
  UrlFetchApp.fetch(url, headers);
  console.log("end");
}
```

This code sorts the entries by timestamp grabs the first entry and sends it over to our connector. Don’t worry about the URL, we’ll fill that in later.

Next head over to Google Cloud. If you haven’t already set up an account add a new project to make things easy. Do not comingle.

![Connect Google Forms with Snowflake](/blog/connect-google-forms-with-snowflake-3.gif)

Bring up the **API Credentials** page. Navigate to the top left, **IAM & Admin -> Service Accounts -> create service account**. We need the email that was created for us when setting up the service account, save that for later. No need to enable services here but we do need a key so our google sheets knows it’s us.

Enter your newly created service account -> Keys tab -> Add Key -> type .json. This downloads a key file to our computer and creates the key. While we’re here enable the google sheets api that will allow us to use our new key.

Next we need to create a service to grab our form entry and deliver it to snowflake. We’ll use Google Cloud Run and Node but there are plenty of other options in the Sheets documentation.

As we’re creating our connector one thing to watch out for is the **SQL insert statement**. Make sure you’ve created the **SCHEMA**…database.reference.table **(DEMO_DB.PUBLIC.SHEETS)** so it can be inserted into Snowflake.

![Connect Google Forms with Snowflake](/blog/connect-google-forms-with-snowflake-4.gif)

Now we need to create our service. We’ll need an **index.js**, **Dockerfile**, and **package.json**. Inside the index.js file we need to insert our Snowflake Connection Data and our sheets id. The sheets id can be found in the URL of the sheet.

`https://docs.google.com/spreadsheets/d/<sheets id>/edit#gid=0`

The snowflake connection data is the **username** and **password** you use to login along with the locator and cloud information which is referred to as the Account Identifier. The snowflake specific information is located in the bottom left of your snowflake account page. It’s also included on the login page for your account app. For instance: **xh45729.us-east-2.aws**.

`https://<locator>.<cloud provider>.snowflakecomputing.com/`

The Account Identifier is a moving target, in some instances the locator is all that is needed and in others, the cloud provider and snowflakecomputing.com are necessary. If you get stuck here refer to the <a href="https://docs.snowflake.com/en/user-guide/admin-account-identifier">snowflake documentation</a>.

Notice we are using Parameterized Queries to protect against SQL injections.

```bash
conn.execute({sqlText: 'INSERT INTO DEMO_DB.PUBLIC.SHEETS
(TS, NAME, DAYS, DIET, PAY) values(?, ?, ?, ?, ?)', binds: row});
```

## index.js

```bash
const path = require('path');
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const snow = require('snowflake-sdk');
const express = require('express');
const app = express();

const getInvite = async () => {
    const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'creds.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  google.options({auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: <sheets id>,
    range: 'A2:E2',
  });
  const row = res.data.values;
  if (!row || row.length === 0) {
    console.log('No data found.');
    return;
  }else {
    console.log(row)
  }
  const connection = snow.createConnection(
    {
      account: <locator>.<cloud provider>,
      username: <username>,
      password: <password>,
      warehouse: 'COMPUTE_WH',
      database: 'DEMO_DB',
      schema: 'PUBLIC',
      role: 'ACCOUNTADMIN'
    }
  );
  const conn = connection.connect();
  conn.execute({sqlText: 'INSERT INTO DEMO_DB.PUBLIC.SHEETS
  (TS, NAME, DAYS, DIET, PAY) values(?, ?, ?, ?, ?)', binds: row});
  }

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('listening');
});

app.get('/', (req,res) => {
    getInvite();
    res.send('Adding Data');
});
```

## Dockerfile

```bash
# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:16

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install 

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
EXPOSE 8080
CMD ["node", "index.js"]
```

## package.json

```bash
{
  "name": "node-sheets-to-snow",
  "version": "2.0.0.",
  "description": "google sheets to snow connector with oauth",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "engines": {
    "node": ">=12.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "googleapis": "^105.0.0",
    "snowflake-sdk": "^1.6.14"
  }
}
```

Before we upload our service make sure to include our keyfile from earlier rename it to **creds.json**. Ready to deploy our service.

![Connect Google Forms with Snowflake](/blog/connect-google-forms-with-snowflake-5.gif)

The easiest way to deploy is from source using Cloud Shell. It’s the small icon in the top right of your Google Cloud home. After opening up your shell upload these four files, [Dockerfile, index.js, package.json, cred.json] to their own directory. Make sure we’re not using our service account from earlier by running **gcloud auth list**. Authorize shell and run the command. If you’re still using it change accounts with **gcloud config set account <user-account>** to the account you’d like to enable Cloud Run on. Navigate to the directory you created and deploy your app using **gcloud run deploy**. You may need to enable some API’s and it will ask you for authorization again. Google is good about guiding you through everything necessary.

Back to **gcloud run deploy** -> Source code location:<enter> -> Service name (folder name):<enter> select a region and let Cloud Run work its magic and spit out a url. Copy and head back to our Sheet.

In the top right is a share button. We need to add our sheets service account so it can access the sheet. This is the email we created back in Google Cloud Credentials API. Plug that in and move back to Extensions -> Apps Script and put in our url from the service we created. We should be all hooked up.

![Connect Google Forms with Snowflake](/blog/connect-google-forms-with-snowflake-6.gif)

I have noticed a slight lag when entering form data from a cold start but within ~1–2 minutes all the data shows up. If you want to check out a working demo you can fill out this <a href="https://docs.google.com/forms/d/e/1FAIpQLSce94QihTjunjBvYzFdalz0mYGhVS6Ngy17uRrXkqLI_Da7nA/viewform?pli=1">form</a> and have the response populate <a href="https://www.gemenielabs.com/projects/#snowflake">here</a>.