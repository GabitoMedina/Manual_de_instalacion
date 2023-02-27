# Installation Manual
 <p align="center"><a href="https://laravel.com" target="_blank"><img src="https://ionicframework.com/docs/assets/images/react-logo-b64b7471f0ebe5f7a9a281ba2f72b63a.png" width="150"></a><a href="https://laravel.com" target="_blank"><img src="https://www.gstatic.com/devrel-devsite/prod/vde5e97689c1d94fa683b9e5392f0f6b6562f68c8b527194cc7ca91d97bde649f/firebase/images/lockup.svg" width="400"></a></p>

## About Ionic-React

Ionic React is native React version of Ionic Framework, the free, open source SDK powering millions of mission-critical apps all over the world.
It's everything you need to ship award-winning apps for any platform, with React.

## About Firebase

Firebase is an app development platform that helps you build and grow apps and games users love. Backed by Google and trusted by millions of businesses around the world. 

## About this project

Ionic-Winchas is an app powered by [Ionic React](https://ionicframework.com/docs/react) and [Capacitor](https://capacitor.ionicframework.com) (native app runtime)., that runs on Android, and the Web, with just one codebase. This project is complemented with [Firebase](https://firebase.google.com/)

## How It Works


First, the users must subscribed to the app as clients or providers. Then, if you are provider, you need to register a vehicle and  price of services. If you are client, after the registration on the app, you can see a list of winchas an choose what ever you liked and ask for the services providers. In this part you can ask for a call, whatsapp or email. 



## How to Run
 

0) Download [Nodejs](https://nodejs.org/es/) version 14.12.0.
1) Install Ionic: `npm install ionic@latest -g`
2) Clone this repository.
3) Install all packages: 
* `npm install`.
* `npm install @ionic/react-hooks`
* `npm install firebase --save`
* `npm install @types/firebase --save-dev`
* `npm install --save react-firebase-hooks`
* `npm install @capacitor/geolocation`
* `npm install @capacitor/camera`
* `npm install cordova-plugin-email-composer`
* `npm install --save @ionic-native/email-composer`
* `npm install @awesome-cordova-plugins/email-composer @awesome-cordova-plugins/core`
* `npm install react-hook-form`
* `npx cap sync`

4) Run on the web: `ionic serve`.
5) Run on Android: See [here](https://ionicframework.com/docs/building/running).
6) How to used the app (manual of user): [here](https://www.youtube.com/watch?v=wHMhGNLTiTc)
