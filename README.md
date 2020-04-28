# Glacier Social Mobile Application

**_React Native web application designed to encourage social interaction and greater engagement with Wyoming's Glacier National Park and its visitors. [Video Overview](https://youtu.be/JSRohgUvyhY)_**

![splash](/media/splash.png)

**Tech Stack**

- [React Native](https://reactnative.dev)
- [Expo CLI](https://expo.io/)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [NGROK](https://ngrok.com/)

**Graduate Program**

- [UW GIS WMP](https://geography.wisc.edu/gis/onlinemasters/)
- [Capstone Project 2](https://geography.wisc.edu/gis/gis-professional-programs-course-curriculum/)
- [Project Report](/media/777Project2_FinalReport_AndrewPittman.pdf)

## Previews

| **Functional user sign up and sign in with logout, secure password storage** | **Review Glacier National Park layer details from the National Park Service** |
| :--------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
|                   ![alt](/media/glacier_signup_signin.gif)                   |                   ![alt](/media/glacier_details_home_2.gif)                   |

| **Layer details include nearby peaks, POIs, parking areas, roads, park boundaries, park trails, and user generated trails** | **Quickly navigate from map details to an overview of the park** |
| :-------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------: |
|                                          ![alt](/media/glacier_details_home_1.gif)                                          |             ![alt](/media/glacier_home_user_nav.gif)             |

| **Toggle layers for increased visibility or to find new areas:** | **Review trails you've recorded with a trail list screen and trail detail screen:** |
| :--------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
|             ![alt](/media/glacier_layer_toggle.gif)              |                       ![alt](/media/glacier_trail_review.gif)                       |

**User's trails are automatically displayed on public map:** <br />
![alt](/media/glacier_trails_on_map.gif)

## Setup & Scripts

1. Within 777p2-express-api repository

   - `npm run dev` run the express api that communicates with mongo db atlas collections

2. Within 777p2-json-server repository

   - `npm run tunnel` run the ngrok tunnel for 8 hours
     - requires running the 777p2-express-api endpoint for mongodb atlas (above)

3. Within this repository

   - `npm start` run the Expo bundler
   - open `http://localhost:19002/` to open local expo dashboard
   - download Expo mobile app on physical device to use for development
   - scan QR code with this physical device to compile js to phone for testing
   - requires 1 and 2 above or else backend functionality won't work
