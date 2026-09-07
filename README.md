# progressive-web-app

A Progressive Web App (PWA) demonstrating offline-first architecture, push notifications, and cloud backend integration with Firebase.

## Features

- **Progressive Web App** — Installable, responsive, and works across desktop and mobile devices.
- **Service Worker** — Enables offline access by caching app shell and assets, and intercepts network requests for offline-first behavior.
- **IndexedDB** — Client-side storage for persisting data locally, enabling the app to function and sync data even without a network connection.
- **Push Notifications** — Users can opt in to receive real-time notifications via the Push API and Firebase Cloud Messaging.
- **Firebase** — Backend services including Hosting, Cloud Functions, and (optionally) Firestore/Realtime Database for data storage and syncing.

## Tech Stack

- HTML, CSS, JavaScript
- Service Worker API
- IndexedDB API
- Web Push API / Firebase Cloud Messaging (FCM)
- Firebase Hosting
- Firebase Cloud Functions

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Firebase CLI](https://firebase.google.com/docs/cli)
  ```bash
  npm install -g firebase-tools
  ```
- A Firebase project (create one at [console.firebase.google.com](https://console.firebase.google.com/))

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd progressive-web-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Connect to your Firebase project

```bash
firebase login
firebase use --add
```
Select your Firebase project (e.g. `pwagram-85125`) when prompted.

### 4. Configure Firebase

Add your Firebase project config to the app (typically in a config file such as `firebase-config.js` or `.env`):

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5. Run locally

```bash
firebase emulators:start
```
or serve with your preferred local dev server, then open `http://localhost:<port>` in the browser.

### 6. Deploy

```bash
firebase deploy
```

## Project Structure

```
progressive-web-app/
├── public/                # Static assets (HTML, CSS, JS, icons)
│   ├── src/
│   │   ├── js/
│   │   │   ├── app.js          # Main app logic
│   │   │   ├── idb.js          # IndexedDB helper functions
│   │   │   └── promise.js      # Polyfills / promise helpers
│   │   └── css/
│   ├── sw.js               # Service worker
│   └── manifest.json        # Web app manifest
├── functions/               # Firebase Cloud Functions (push notification triggers, etc.)
├── firebase.json            # Firebase project configuration
├── .firebaserc              # Firebase project aliases
└── README.md
```

## How It Works

### Service Worker
Registered on app load, the service worker caches the app shell and static assets on install, then serves cached content when offline, falling back to network requests when available.

### IndexedDB
Used to store data (e.g. posts, form submissions) locally in the browser, allowing users to interact with the app offline. Pending data can be synced with the Firebase backend once connectivity is restored (e.g. via Background Sync).

### Push Notifications
The app requests notification permission from the user, subscribes to push via the Push API, and stores the subscription server-side. Firebase Cloud Functions can then trigger notifications (e.g. on new content) using Firebase Cloud Messaging.

### Firebase Backend
Firebase Hosting serves the app, while Cloud Functions handle backend logic such as sending push notifications or processing data. Firestore/Realtime Database (if used) stores app data in the cloud.

## Available Scripts

| Command | Description |
|---|---|
| `firebase emulators:start` | Run Firebase services locally |
| `firebase deploy` | Deploy hosting and functions |
| `firebase deploy --only hosting` | Deploy only the frontend |
| `firebase deploy --only functions` | Deploy only Cloud Functions |
| `firebase functions:list` | List deployed functions and their URLs |

## Browser Support

Requires a browser with support for Service Workers, IndexedDB, and the Push API (all modern browsers: Chrome, Firefox, Edge, Safari 16+).

## License

This project is licensed under the MIT License.
