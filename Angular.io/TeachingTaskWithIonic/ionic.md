# Prerequisites

- NodeJS 8 (<https://nodejs.org/en/>)
- Install JDK 1.8 & set `JAVA_HOME`
- Install Android Studio (it should configure system)
- In Android Studio make sure you install Build Tools, Android SDK with proper version (e.g. 26) + Android Support Repository
- `npm i -g ionic@3.20.0 cordova@8.0.0` (ionic is the CLI: `https://github.com/ionic-team/ionic-cli`)
- Install https://ionicframework.com/docs/pro/devapp/ on mobile phones
- Disable firewall! (in order to enable livereload) and put machines and mobiles in the same network
- Update path so it points to SDK
- Set `ANDROID_HOME` to Android SDK. Once installed via Android Studio it should be available inside: `C:\Users\USERNAME\AppData\Local\Android\Sdk`
- also add `C:\Users\USERNAME\AppData\Local\Android\Sdk\tools` and `C:\Users\USERNAME\AppData\Local\Android\Sdk\platform-tools` to `PATH` (or different path : `SET PATH=C:\Android\platform-tools;C:\Android\tools;%PATH%`)
- also install `Google Play Intel x86 Atom System Image` for the SDK (Tools -> Android -> AVD Manager)

Most of this steps are not required when using `Ionic Package` service (app is built in the cloud).

Check <https://cordova.apache.org/docs/en/latest/guide/platforms/android/> to see which APIs should you use with Cordova.

# What is Ionic?

Ionic is a Hybrid Mobile App platform. It's a webapp running in a wrapper. Access to hardware is possible via Ionic Plugins.

It is a UI layer for your application.

It provides UI components like navbars etc. all styled dependind on the platform.

What is Cordova?

Cordova wraps your HTML/JavaScript app into a native container which can access the device functions of several platforms. These functions are exposed via a unified JavaScript API, allowing you to easily write one set of code to target nearly every phone or tablet on the market today and publish to their app stores.

It is used to build packages to platforms. Also adds access to native features/api (camera, sms etc.)

Ionic is built on Cordova.

## Ionic Services

- auth (depricated)
- push (depricated): to send notifications to the app (via dashboard)
- package: an ability to create/compile project in the cloud. This enables development e.g. for iOS if don't have it. 
- live update: to publish updates without app store
- view app: used to (locally) test/preview an app or share it with testers

### Ionic Creator & Dashboard

This is web app to create an app with drag&drop. Currently Ionic 3 is in ALPHA.

On IONIC PRO, there's a Ionic Creator that enables drag&drop application creation.

<https://dashboard.ionicjs.com/apps>: It can be a good idea to put application in the Dashboard and then link it to an existing application on the machine:

`ionic start --pro-id {id}`

Communication with the dashboard is via git: `git push ionic master`

## Ionic Components

Ionic provides UI components that can be easily customizable.

## Cordova Plugins & Ionic Native

Cordova Plugins give access to native device features.

Ionic Native is Angular TypeScript wrapper for Cordova Plugins that makes it easier to use native device features.

To install plugins use `ionic plugin add {name}` e.g.

- call-number and install native wrapper `npm install @ionic-native/call-number`

Plugins (install with `ionic cordova plugin add`):
- `cordova-plugin-camera` + `npm install @ionic-native/camera` + `import {Camera,CameraOptions} from '@ionic-native/camera` and use DI to inject `Camera`
- `phonegap-plugin-push` & `@ionic-native/push`
- `cordova-sqlite-storage` and `@ionic/storage` will give access to `Storage`
- `cordova-plugin-fcm` and `@ionic-native@fcm` for notifications

# Prerequisites

- Node
- TypeScript
- `npm install -g ionic cordova @angular/cli`
- Angular Language Service + Angular V4 TypeScript Snippets + TSLint (VS Code)

Running `ionic info` prints information about environment.

Also plaforms should be installed (this one command `ionic cordova emulate` will do all):

> ionic platform add android

and `ionic cordova run {platform name}` to run the platform emulator (e.g. android).

Add `--livereload` flag for live reloading!

On windows, go to android studio web site.

Everything is possible thanks to `WebView` which is a browser like components on device that runs HTML5 code.

Each device’s operating system has a WebView that acts as similar to a browser window and allows for code written in HTML5 technologies to be executed on a mobile device as a wrapped application. This process is how we can use HTML, CSS and JavaScript to create applications and with the help of Cordova when accessing native device APIs.

To create production build, use: `ionic cordova build android --prod --release`

## Testing with Ionic View

This is a way of sharing an application on devices without USB, by installing Google Play application

## Cordova

Enables access to native device API as camera / geolocation etc.

Project has `plugins` folder with cordova plugins.

> ionic plugin add {nameOfThePlugin}

# New project

`ionic start` will display wizard.

> ionic start {ProjectName} <TemplateName>

e.g.

> ionic start firstTest blank
> ionic start MyApp sidemenu

To list available templates, use `ionic start --list`.

Project configuration is inside `config.xml`.

## To run the project in the browser:

As long as we don't use phone features, application can be tested in the browser:

> ionic serve -l (preview in the browser, l flag opens lab mode with preview for different platforms)

or

> ionic lab

to display application as it would look like on different platforms.

## Package commands

ionic `package` and `upload` are commands for cloud management

## To run on particular platform:

First a platform must be added: 

> cordova platform remove android
> cordova platform add android@6.3.0

Or: 

> ionic cordova platform add android

And run it:

> ionic cordova run android

Useful args:

- -l : live reload

Platform requires resources (like icons), so run: 

> ionic cordova resources

## Ionic generates

> ionic generate

when executed inside the project can generate angular code.

### Common commands

> ionic g page {pageName}

> ionic g component {componentName}

# Account integration

> ionic signup

Gives access to cloud services.

> ionic login

Will log in to created account.

To connect project to cloud, run `ionic link`.

To upload project to cloud, use `ionic upload`.

# Ionic


## Decorators

- `@IonicPage` marks component a page that can be lazy loaded. 
  - `segment` attribute gives the page name that will appear in url when page is active
  - `defaultHistory` & `name` can be used to set back button link

```typescript
@IonicPage({
  segment: 'start'
})
```

## Page Guards

E.g. `ionViewCanEnter` can be used to specify if page can be navigated to.

## Services

- `AlertController` - for creating alerts
- `ModalController` & `ViewController` - for creating modals and managing them (like dismissing)
- `LoadingController` - service for showing loading overlay
- `ActionSheetController` - service for showing context actions
- `ToastController` - service for toasts
- `NavController` - used to navigate between pages with `push` & `pop` methods.  Alternative, is `navPush` + `navParams` and `navPop` directives
  - `setRoot` can be used to play around with stack of pages in the navigation stack
- `NavParams` - used to get navigation parameters passed to `NavController`

## Directives

- `ion-button` - styles button e.g. (block/full makes it full width and clear removes background, round makes it round)

```
<button ion-button block clear>Submit</button>
```

To play with button sizes use small/large attrs.

`icon-left/right/only` attributes drive how icons appear inside button (`ion-icon` component).

## Components

- `ion-toolbar` (with `ion-title`) in `ion-header` - 

- `ion-grid` to layout rows and columns based on flexbox

- `ion-slides` to create swipeable slides (with pager attribute)

- `ion-split-pane` enables manu expanding/collapsing on small/large devices

- `ion-toggle` for toggle buttons

- `ion-fab` with `ion-fab-list` - to position fab (floating action button) buttons created with `ion-fab` directive

- `ion-chip`

- `ion-buttons` is to group buttons

- `ion-badge` is for badges

- icons: to use icons, use ionicons: https://ionicframework.com/docs/ionicons/

- `ion-grid` with col/rows can be used to split content

- `ion-fotter` - to make a footer

- `ion-searchbar` to create a serach bar

- `ion-list` to create a list

- `ion-avatar` to create avatar

- `ion-tabs` along with `ion-tab` to create tabs

- `ion-select` and `ion-option` to create select

```
<ion-tabs>
  <ion-tab [root]="tab1Page" tabTitle="Tab 1"></ion-tab>
  <ion-tab [root]="tab2Page" tabTitle="Tab 2"></ion-tab>
</ion-tabs>1
```

- `ion-card` - for creating cards, along with `ion-card-content` and `ion-row`

```
  <ion-card>
    <ion-card-content>
      <ion-item>
        <ion-label floating>Name</ion-label>
        <ion-input [(ngModel)]="name" type="text"></ion-input>
      </ion-item>
      <ion-row>
        <button ion-button (click)="sayHello()">Submit</button>
        <button ion-button (click)="sayBye()">Submit</button>
      </ion-row>
    </ion-card-content>
  </ion-card>
```

- `ion-item` - wierd component, just a container for items :) e.g.

```
  <ion-item>
    <ion-label floating>Name</ion-label>
    <ion-input type="text"></ion-input>
  </ion-item>
```

## Modules

- npm's `ionic-tooltips` dependency and `IonicTooltips` module gives access to `tooltip` attribute

## Themes

Probably most of components support `color` attribute that takes name of the color from pallete e.g. `primary` / `secondary` etc.

Ionic has utility attributes for styling:

- text-left/right/center/justify/wrap/nowrap
- text-uppercase/lowercase/capialize
- padding-{side}

# Helper tools

- Vysor - Chrome addon for mirroring phone
- https://apetools.webprofusion.com/app/#/tools/imagegorilla - for platform images / splash screens generation
- https://material.io/color/ - for theming
- https://coolors.co - for palete generation
- https://icons8.com/ - icons

# Code

- https://github.com/PaulHalliday/Learn-Ionic-3-From-Scratch-Greeting
- https://github.com/PaulHalliday/Learn-Ionic-3-From-Scratch-Github-Searcher
- https://github.com/PaulHalliday/Learn-Ionic-3-From-Scratch-Firebase-CRUD
- https://github.com/PaulHalliday/Ionic3-Camera

# TODO

What is this:

```
Speed up development with the Ionic DevApp, our fast, on-device testing mobile app

  -     Test on iOS and Android without Native SDKs
  -     LiveReload for instant style and JS updates

 ️-->    Install DevApp: https://bit.ly/ionic-dev-app    <--
 ```

and 

 ```
  *   IONIC  PRO  * (application can be attached to the dashboard which is part of IONIC PRO)

  https://ionicframework.com/pro

 Supercharge your Ionic development with the Ionic Pro SDK

  -     Track runtime errors in real-time, back to your original TypeScript
  -     Push remote updates and skip the app store queue

Learn more about Ionic Pro: https://ionicframework.com/products
```