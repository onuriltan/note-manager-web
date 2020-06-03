# NoteManager

Notemanager is an app that you can register with your email
and start taking and managing your daily notes.
You can manage the notes by editing them, also you can filter
the notes based on date, note text etc.

## Technical Details

App uses Express.js for the backend and MongoDB for the database.
Also it uses JWT authentication to login, and to register
it uses Nodemailer module to register with an email. I have used
Yandex email because Gmail and Outlook has some limitations for
the security.

I have used Sass with BEM architecture, also I used bootstrap with Vue-Bootstrap.

In the front-end I have used Vue.js and Vuex, in the last year
I was using React.js with its other packages like React-Router
and for the state management Redux.
I'm also using Vue.js in my current company so this app is kind
of a practice for that.

## How to Use

You need to create a .env.development file in the root folder of the app and you need to
give parameters as;

#### API Environment

* **MONGO_URL**         = "your mongodb connection url"
* **MAIL**              = "your yandex email for sending confirmation emails"
* **MAIL_USERNAME**     = "your yandex email"
* **MAIL_PASSWORD**     = "your yandex email password"
* **CONFIRM_EMAIL_URL** = "your confirmation page url"
* **JWT_SECRET**        = "secret to parse jwt tokens"

Also you need to create .env.development and .env.production files in the client folder to justify backend url's and social app id's on development and production, for example in .env.development;

#### WEB Environment

* **VUE_APP_AUTH_URL**        = <http://localhost:5000/api/auth>
* **VUE_APP_NOTES_URL**       = <http://localhost:5000/api/posts>
* **VUE_APP_USER_URL**        = <http://localhost:5000/api/use>
* **VUE_APP_FACEBOOK_APP_ID** = "your facebook app id"
* **VUE_APP_GOOGLE_APP_ID**   = "your google app id"

### Social Authentication

You need to create applications from your Facebook and Google Developer Accounts and add
their credentials in .env file.

#### Facebook Auth

* **FACEBOOK_APP_ID**     = "your app id"
* **FACEBOOK_APP_SECRET** = "your app secret"

#### Google Auth

* **GOOGLE_APP_ID**     = "your app id"
* **GOOGLE_APP_SECRET** = "your app secret"

### Development

To run Node.js server, go to root folder and run `npm run dev`.

To run the Vue CLI client, go to client folder and run `npm run serve`.

### Production

To run the Node.js server with public distribution folder,

1. Go to client folder and run `npm run build` to create dist folder.
2. Go to root folder and run `npm run start` .
