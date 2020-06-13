(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1581e57b"],{"1f68":function(e,t,n){"use strict";function i(e,t,n){var i={email:"",password:"",password2:""};return e?l(e)?i.email="":i.email="Email is not valid.":i.email="Email required.",t?t.length<6?i.password="Password length should be 6.":i.password="":i.password="Password required.",n?n.length<6?i.password2="Repeat password length should be 6.":n!==t?(i.password="Passwords does not match.",i.password2="Passwords does not match."):(i.password2="",i.password=""):i.password2="Repeat password required.",i}function o(e){var t="";return t=e?l(e)?"":"Email is not valid.":"Email required.",t}function s(e){var t="";return t=e?e.length<6?"Password length should be 6.":"":"Password required.",t}function r(e,t){var n={email:"",password:""};return e?l(e)?n.email="":n.email="Email is not valid.":n.email="Email required.",t?t.length<6?n.password="Password length should be 6.":n.password="":n.password="Password required.",n}function a(e,t){var n={oldPassword:"",newPassword:""};return e?e.length<6&&(n.oldPassword="Password length should be 6."):n.oldPassword="Old password required.",t?t.length<6&&(n.newPassword="Password length should be 6."):n.newPassword="New password required.",n}function l(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)}n.d(t,"e",(function(){return i})),n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return s})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}))},"2b9e":function(e,t,n){},"3bea":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("LoginComponent")},o=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("b-form",{staticClass:"login-form",on:{submit:function(t){return t.preventDefault(),e.loginWithEmail()}}},[n("h2",{staticClass:"login-form__header"},[e._v("Login")]),e.errors.length>0?n("div",{staticClass:"login-form__errors"},e._l(e.errors,(function(t,i){return n("b-alert",{key:i,staticClass:"login-form__errors__error",attrs:{show:"",variant:"danger",size:"lg"}},[e._v(e._s(t.msg))])})),1):e._e(),n("b-form-group",{attrs:{id:"email",label:"Email","invalid-feedback":e.invalidEmailMessage,"label-for":"email"}},[n("b-form-input",{staticClass:"login-form__input",attrs:{id:"email",type:"email",state:e.emailCorrectState,size:"lg"},nativeOn:{keydown:function(t){return e.validateEmail(t)}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),n("b-form-group",{attrs:{id:"password",label:"Password","invalid-feedback":e.invalidPasswordMessage,"label-for":"password"}},[n("b-form-input",{staticClass:"login-form__input",attrs:{id:"password",type:"password",state:e.passwordCorrectState,size:"lg"},nativeOn:{keydown:function(t){return e.validatePassword(t)}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),n("div",{staticStyle:{"font-weight":"bold",margin:"30px 0","text-align":"center"}},[n("router-link",{attrs:{to:"/register"}},[e._v("Dont have an account? Register from here!")])],1),n("b-button",{staticClass:"login-form__button",class:{"button--loading":e.loginClicked},attrs:{type:"submit",variant:"success",size:"lg"}},[n("i",{staticClass:"fa fa-refresh fa-spin hide--button--loading--icon",class:{"show--button--loading--icon":e.loginClicked}}),n("div",{staticStyle:{margin:"0 5px"}},[e._v("Login")])]),n("div",{staticClass:"login-form__social-container"},[n("FacebookLogin")],1)],1)],1)},r=[],a=(n("96cf"),n("1da1")),l=n("5530"),c=n("2f62"),d=n("1f68"),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-btn",{staticClass:"facebook-button",class:{"button--loading":e.fbLoginClicked},on:{click:function(t){return e.loginWithFB()}}},[n("i",{staticClass:"fa fa-refresh fa-spin hide--button--loading--icon",class:{"show--button--loading--icon":e.fbLoginClicked}}),n("div",{staticStyle:{margin:"0 5px"}},[e._v("Login with Facebook")])])},g=[],f={name:"FacebookLogin",data:function(){return{fbLoginClicked:!1}},mounted:function(){var e="246963273331939";window.fbAsyncInit=function(){FB.init({appId:e,autoLogAppEvents:!0,xfbml:!0,version:"v3.2"})},function(e,t,n){var i,o=e.getElementsByTagName(t)[0];e.getElementById(n)||(i=e.createElement(t),i.id=n,i.src="https://connect.facebook.net/en_US/sdk.js",o.parentNode.insertBefore(i,o))}(document,"script","facebook-jssdk")},methods:Object(l["a"])(Object(l["a"])({},Object(c["b"])({loginWithFacebook:"auth/loginWithFacebook"})),{},{loginWithFB:function(){this.fbLoginClicked=!0,FB.login(function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.authResponse&&t.authResponse.accessToken?this.loginWithFacebook(t.authResponse.accessToken):console.log("User cancelled login or did not fully authorize."),this.fbLoginClicked=!1;case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}().bind(this),{scope:"public_profile,email",return_scopes:!0})}})},m=f,p=(n("b688"),n("2877")),h=Object(p["a"])(m,u,g,!1,null,"7af391d7",null),b=h.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-btn",{staticClass:"google-button",class:{"button--loading":e.googleLoginClicked},on:{click:e.loginWithGoogle}},[n("i",{staticClass:"fa fa-refresh fa-spin hide--button--loading--icon",class:{"show--button--loading--icon":e.googleLoginClicked}}),n("div",{staticStyle:{margin:"0 5px"}},[e._v(" Login with Google ")])])],1)},v=[],k=(n("b0c0"),{name:"GoogleLogin",data:function(){return{googleLoginClicked:!1}},mounted:function(){var e=document.createElement("script");e.setAttribute("src","https://apis.google.com/js/platform.js"),document.head.appendChild(e);var t=document.createElement("meta");t.name="google-signin-client_id",t.content="558526944070-5dckm1c3h93snmai163tegumcf6hf3c6.apps.googleusercontent.com",document.getElementsByTagName("head")[0].appendChild(t)},methods:{loginWithGoogle:function(){this.googleLoginClicked=!0,window.gapi.load("auth2",Object(a["a"])(regeneratorRuntime.mark((function e(){var t,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=gapi.auth2.init({client_id:"558526944070-5dckm1c3h93snmai163tegumcf6hf3c6.apps.googleusercontent.com",scope:"profile"}),n=null,e.next=4,t.signIn().then((function(){n=t.currentUser.get().Zi.access_token})).catch(function(){this.googleLoginClicked=!1}.bind(this));case 4:if(null===n){e.next=7;break}return e.next=7,this.$store.dispatch("loginWithGoogle",t.currentUser.get().Zi.access_token);case 7:this.googleLoginClicked=!1;case 8:case"end":return e.stop()}}),e,this)}))).bind(this))}}}),E=k,_=(n("498d"),Object(p["a"])(E,w,v,!1,null,"2fdfdba6",null)),C=_.exports,P={name:"LoginComponent",components:{FacebookLogin:b,GoogleLogin:C},data:function(){return{errors:[],fieldErrors:{email:null,password:null},email:"",password:"",loginClicked:!1,isEmailEntered:!1,isPasswordEntered:!1}},computed:{invalidEmailMessage:function(){return this.fieldErrors.email},invalidPasswordMessage:function(){return this.fieldErrors.password},isValidForm:function(){return""===this.fieldErrors.email&&""===this.fieldErrors.password},emailCorrectState:function(){return!(!this.isEmailEntered||""!==this.invalidEmailMessage)||(!this.isEmailEntered||""===this.invalidEmailMessage)&&null},passwordCorrectState:function(){return!(!this.isPasswordEntered||""!==this.invalidPasswordMessage)||(!this.isPasswordEntered||""===this.invalidPasswordMessage)&&null}},methods:Object(l["a"])(Object(l["a"])({},Object(c["b"])({login:"auth/login"})),{},{validateEmail:function(){var e=this;setTimeout((function(){e.isEmailEntered=!0,e.fieldErrors.email=Object(d["b"])(e.email)}),600)},validatePassword:function(){var e=this;setTimeout((function(){e.isPasswordEntered=!0,e.fieldErrors.password=Object(d["d"])(e.password)}),600)},loginWithEmail:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.errors=[],e.fieldErrors=Object(d["c"])(e.email,e.password),e.isValidForm&&(e.loginClicked=!0,setTimeout(Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.login({email:e.email,password:e.password});case 2:n=t.sent,e.loginClicked=!1,n.data.fieldErrors&&(e.fieldErrors=n.data.fieldErrors),n.data.errors&&(e.errors=n.data.errors);case 6:case"end":return t.stop()}}),t)}))),1e3));case 3:case"end":return t.stop()}}),t)})))()}})},L=P,j=(n("5f8a"),Object(p["a"])(L,s,r,!1,null,"1e671e36",null)),x=j.exports,O={name:"login",components:{LoginComponent:x}},y=O,F=Object(p["a"])(y,i,o,!1,null,null,null);t["default"]=F.exports},"498d":function(e,t,n){"use strict";var i=n("e170"),o=n.n(i);o.a},"5f8a":function(e,t,n){"use strict";var i=n("2b9e"),o=n.n(i);o.a},"944b":function(e,t,n){},b0c0:function(e,t,n){var i=n("83ab"),o=n("9bf2").f,s=Function.prototype,r=s.toString,a=/^\s*function ([^ (]*)/,l="name";i&&!(l in s)&&o(s,l,{configurable:!0,get:function(){try{return r.call(this).match(a)[1]}catch(e){return""}}})},b688:function(e,t,n){"use strict";var i=n("944b"),o=n.n(i);o.a},e170:function(e,t,n){}}]);
//# sourceMappingURL=chunk-1581e57b.5dd61b6c.js.map