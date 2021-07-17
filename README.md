# Dyte By Surabhi Demo

# Pusher Channels integration

1. Click on this : https://dashboard.pusher.com/accounts/sign_in
2. Sign in for a free account
3. Select Channels apps on the sidebar
4. Hit Create Channels app to create a new app.
5. Retrieve your credentials from the "API Keys" tab.
6. Change the credentials in the ".env" folder.

This is how your env should be like.
    
    PORT=5000
    PUSHER_APP_ID=<your app id>
    PUSHER_APP_KEY=<your app key>
    PUSHER_APP_SECRET=<your app secret>
    PUSHER_APP_CLUSTER=<your app cluster>

## Getting Started

1. Clone this repository and `cd` into it.
2. Execute `npm install` 
3. Refer  `Pusher Channels integration`
4. Update `client/src/App.js` and `.env` with your Channels credentials.
5. Run `node server.js` to start the Express server.
6. `cd` into the client folder, run `npm install` followed by `npm start` to start the development server. 
7. Open http://localhost:3000 in your browser

## Pre-requisites and Built with

- [Node.js](https://nodejs.org/en) and npm
- [React](https://reactjs.org)
- [Pusher Channels](https://pusher.com/channels)
