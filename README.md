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
You need to create a .env file in the root folder of the app and you need to 
give parameters as;

* MONGO_URL= "your mongodb connection url"
* MAIL="your yandex email for sending confirmation emails"
* MAIL_USERNAME="your yandex email"
* MAIL_PASSWORD="your yandex email password"
* CONFIRM_EMAIL_URL="your confirmation page url"


## LICENSE
[MIT](https://choosealicense.com/licenses/mit/)
