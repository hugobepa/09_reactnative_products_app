ERROR [Error: Uncaught (in promise, id: 0) Error: Call to function 'ExpoMediaLibrary.getPermissionsAsync' has been rejected.
→ Caused by: You have requested the AUDIO permission, but it is not declared in AndroidManifest. Update expo-media-library config plugin to include the permission before requesting it.]

"android": {
"adaptiveIcon": {
"backgroundColor": "#E6F4FE",
"foregroundImage": "./assets/images/android-icon-foreground.png",
"backgroundImage": "./assets/images/android-icon-background.png",
"monochromeImage": "./assets/images/android-icon-monochrome.png"
},
"edgeToEdgeEnabled": true,
"predictiveBackGestureEnabled": false,
"permissions": [
"android.permission.READ_EXTERNAL_STORAGE",
"android.permission.WRITE_EXTERNAL_STORAGE",
"android.permission.READ_MEDIA_VISUAL_USER_SELECTED",
"android.permission.ACCESS_MEDIA_LOCATION",
"android.permission.READ_MEDIA_IMAGES",
"android.permission.READ_MEDIA_VIDEO",
"android.permission.READ_MEDIA_AUDIO",
"android.permission.RECORD_AUDIO",
"android.permission.MODIFY_AUDIO_SETTINGS"
],
"package": "com.hugo_bcn.x09_reactnative_products_app"

       ],
      [
        "expo-media-library",
        {
          "isAccessMediaLocationEnabled": true,
          "granularPermissions": ["audio", "photo"]
        }
      ],
      "expo-font",
