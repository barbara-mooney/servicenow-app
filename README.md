This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This app allows the user to access their ServiceNow open incidents.

A) How to set up your development environment

You need to complete the following 3 steps so you can start bulding a React applicaiton for ServiceNow:

1. Copy this repo to your local machine and run `npm install` to install all dependencies.
2. Update `package.json` (line #5) with your ServiceNow instance URL:
```json
    "proxy":"https://dev38444.service-now.com"
```
3. Update `.env` file with user credentials you want to use for communications wtih ServiceNow:
```bash
    REACT_APP_USER=servicenow.account
    REACT_APP_PASSWORD=12345
```

This completes development environment setup and you can run the application by `npm start`.

> The ServiceNow Username and password are required for development environment only. You don't need to provide credentials when deploying the app into ServiceNow. The app is configured to obtain a token from ServiceNow once it's deployed. 

B) ServiceNow deployment
To deploy the application into ServiceNow you need to perform the following steps:
1. Build the application by executing `npm run build`.
2. Save JS and CSS files from Build folder as _Style Sheets_ in ServiceNow.
3. Save HTML file from Build folder as a UI page. Update references to JS/CSS correspondingly.

These are helpful resources for getting started with building and deploying applications to service now:
1. https://medium.com/@pishchulin/react-applications-in-servicenow-service-portal-36d774892410
2. https://medium.com/@pishchulin/react-application-in-servicenow-8bdbb1e69c0c
3. https://medium.com/@pishchulin/react-in-servicenow-how-to-access-the-data-a8cc4fae3912 
**If you don't have access to the Content Management System in your instance, you can access style sheets through studio. 
