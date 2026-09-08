const { onRequest } = require("firebase-functions/v2/https");
var admin = require("firebase-admin");
var cors = require("cors")({ origin: true });
var webpush = require("web-push");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

var serviceAccount = require("./pwagram-fb-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://pwagram-85125-default-rtdb.europe-west1.firebasedatabase.app",
});

exports.storePostData = onRequest(function (request, response) {
  cors(request, response, function () {
    admin
      .database()
      .ref("posts")
      .push({
        id: request.body.id,
        title: request.body.title,
        location: request.body.location,
        image: request.body.image,
      })
      .then(function () {
        webpush.setVapidDetails(
          "mailto:bagheri.mh69@gamil.com",
          "BHBoY9om1O96JUKI4BUR9VO5olafV9T2h6Vi8Q3jyJD9bpEaaz_gGO0do1D90qfAI_4JdHWGJwXBNKuy7D--2dg",
          "qzd3UNKm3Ll5HySrir0ZSAOla3jnn6CCoAnDw2TKG3g"
        );
        return admin.database().ref("subscriptions").once("value");
      })
      .then(function (subscriptions) {
        subscriptions.forEach(function (sub) {
          var pushConfig = {
            endpoint: sub.val().endpoint,
            keys: {
              auth: sub.val().keys.auth,
              p256dh: sub.val().keys.p256dh,
            },
          };
          webpush
            .sendNotification(
              pushConfig,
              JSON.stringify({ title: "New Post", content: "New Post added!" })
            )
            .catch(function (err) {
              console.log(err);
            });
        });
        response
          .status(201)
          .json({ message: "Data stored", id: request.body.id });
      })
      .catch(function (err) {
        response.status(500).json({ error: err });
      });
  });
});

exports.getPosts = onRequest(function (request, response) {
  cors(request, response, function () {
    if (request.method !== "GET") {
      return response.status(405).json({ error: "Method not allowed" });
    }
    admin
      .database()
      .ref("posts")
      .once("value")
      .then(function (data) {
        var posts = [];
        data.forEach(function (childSnapshot) {
          posts.push(childSnapshot.val());
        });
        response.status(200).json(posts);
      })
      .catch(function (err) {
        response.status(500).json({ error: err });
      });
  });
});
