# Manual de instalacion
 <p align="center"><a href="https://laravel.com" target="_blank"><img src="https://ionicframework.com/docs/assets/images/react-logo-b64b7471f0ebe5f7a9a281ba2f72b63a.png" width="150"></a><a href="https://laravel.com" target="_blank"><img src="https://www.gstatic.com/devrel-devsite/prod/vde5e97689c1d94fa683b9e5392f0f6b6562f68c8b527194cc7ca91d97bde649f/firebase/images/lockup.svg" width="400"></a></p>

## About Ionic-React

Ionic React is native React version of Ionic Framework, the free, open source SDK powering millions of mission-critical apps all over the world.
It's everything you need to ship award-winning apps for any platform, with React.

## About Firebase

Firebase is an app development platform that helps you build and grow apps and games users love. Backed by Google and trusted by millions of businesses around the world. 

## About this project

Ionic-Winchas is an app powered by [Ionic React](https://ionicframework.com/docs/react) and [Capacitor](https://capacitor.ionicframework.com) (native app runtime)., that runs on Android, and the Web, with just one codebase. This project is complemented with [Firebase](https://firebase.google.com/)

## How It Works


After the user navigates to Tab 2 (Photos), they can tap/click on the camera button to open up the device's camera. After taking or selecting a photo, it's stored permanently into the device's filesystem. When the user reopens the app at a later time, the photo images are loaded from the filesystem and displayed again in the gallery. The user can tap on a photo to be presented with the option to remove the photo.

## Feature Overview
* App framework: [React](https://reactjs.org/)
* UI components: [Ionic Framework](https://ionicframework.com/docs/components)
  * Camera button: [Floating Action Button (FAB)](https://ionicframework.com/docs/api/fab)
  * Photo Gallery display: [Grid](https://ionicframework.com/docs/api/grid)
  * Delete Photo dialog: [Action Sheet](https://ionicframework.com/docs/api/action-sheet) 
* Native runtime: [Capacitor](https://capacitor.ionicframework.com)
  * Taking photos: [Camera API](https://capacitor.ionicframework.com/docs/apis/camera)
  * Writing photo to the filesystem: [Filesystem API](https://capacitor.ionicframework.com/docs/apis/filesystem)
  * Storing photo gallery metadata: [Preferences API](https://capacitor.ionicframework.com/docs/apis/preferences)

## Project Structure
* Tab2 (Photos) (`src/pages/Tab2.tsx`): Photo Gallery UI and basic logic.
* usePhotoGallery Hook (`src/hooks/usePhotoGallery.ts`): Logic encapsulating Capacitor APIs, including Camera, Filesystem, and Preferences.

## How to Run

> Note: It's highly recommended to follow along with the [tutorial guide](https://ionicframework.com/docs/react/your-first-app), which goes into more depth, but this is the fastest way to run the app. 

0) Install Ionic if needed: `npm install -g @ionic/cli`.
1) Clone this repository.
2) In a terminal, change directory into the repo: `cd photo-gallery-capacitor-react`.
3) Install all packages: `npm install`.
4) Run on the web: `ionic serve`.
5) Run on iOS or Android: See [here](https://ionicframework.com/docs/building/running).





