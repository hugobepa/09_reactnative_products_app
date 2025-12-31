ERROR [Error: Uncaught (in promise, id: 0) Error: Call to function 'ExpoMediaLibrary.getPermissionsAsync' has been rejected.
→ Caused by: You have requested the AUDIO permission, but it is not declared in AndroidManifest. Update expo-media-library config plugin to include the permission before requesting it.]

https://medium.com/analytics-vidhya/list-all-images-of-selected-album-react-native-expo-b51bef62c4df+

Permissions.askAsync(Permissions.CAMERA) with Camera.requestPermissionsAsync()

Firstly, install expo-location

expo install expo-location

Then you can use it like this

import \* as Location from 'expo-location';

let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
console.log('Permission to access location was denied');
return;
}

app.jon:

```
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
        "android.permission.MODIFY_AUDIO_SETTINGS",
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


        "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ],
      [
        "expo-media-library",
        {
          "isAccessMediaLocationEnabled": true,
          "granularPermissions": [
            "audio",
            "photo",
            "video",
            "READ_MEDIA_IMAGES",
            "READ_MEDIA_VIDEO",
            "READ_MEDIA_AUDI"
          ],
          "audioPermission": true
        }
      ],
      [
        "expo-audio",
        {
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone.",
          "recordAudioAndroid": true
        }
      ],
      "expo-font",
      "expo-secure-store"
```

ia google:

```
To resolve the error "You have requested the AUDIO permission, but it is not declared in AndroidManifest," you must update the
expo-media-library configuration in your app.json or app.config.js to include granular permissions for audio.

1. Update app.json
   Add the granularPermissions property to the expo-media-library plugin configuration. This ensures the necessary READ_MEDIA_AUDIO permission is added to your Android manifest during the build process.
   json

{
"expo": {
"plugins": [
[
"expo-media-library",
{
"granularPermissions": ["audio", "photo", "video"]
}
]
]
}
}

Usa el código con precaución. 2. Apply the Changes
Because this modification affects the native AndroidManifest.xml, it requires a new native build to take effect:

    For Development: Run npx expo prebuild to regenerate your native folders.
    For Production: Create a new build using EAS Build (e.g., eas build --platform android).
```

chatgpt:

```

his error means your app is asking for an Android AUDIO permission at runtime, but that permission is not declared in the AndroidManifest, so Android rejects it.

Because you’re using Expo, you must declare it through the expo-media-library config plugin, not manually.

Why this happens

expo-media-library can request audio access (especially on Android 13+), but Android requires all permissions to be declared at build time.

If the plugin config is missing or outdated, you’ll see:

You have requested the AUDIO permission, but it is not declared in AndroidManifest

✅ Correct Fix (Recommended)

1. Update app.json or app.config.js

Add or update the expo-media-library plugin with explicit permissions.

app.json
{
"expo": {
"plugins": [
[
"expo-media-library",
{
"photosPermission": "Allow access to your photos",
"savePhotosPermission": "Allow saving photos",
"audioPermission": "Allow access to your audio files"
}
]
]
}
}

app.config.js
export default {
expo: {
plugins: [
[
"expo-media-library",
{
photosPermission: "Allow access to your photos",
savePhotosPermission: "Allow saving photos",
audioPermission: "Allow access to your audio files",
},
],
],
},
};

2. Rebuild the app (required)

Permissions changes do NOT work with Expo Go.

Run:

npx expo prebuild --clean
npx expo run:android

Or if using EAS:

npx expo prebuild --clean
npx expo run:android

(or eas build -p android)

🚫 If you do NOT need audio access

If you’re only working with images/videos:

Remove any calls to audio permissions:

MediaLibrary.requestPermissionsAsync()

Or switch to:

MediaLibrary.requestPermissionsAsync({ accessPrivileges: 'limited' })

Or remove the plugin entirely if unused

Android 13+ Note (Important)

On newer Android versions:

READ_MEDIA_AUDIO is required

Expo handles this only if the plugin is configured

That’s why this error shows up suddenly after SDK upgrades.

Quick Checklist

✅ Plugin added
✅ audioPermission declared
✅ Prebuild/run again
❌ Expo Go won’t work

If you want, tell me:

Expo SDK version

Whether you actually need audio access

and I’ll tailor the config exactly for your case.

Al enviar un mensaje a ChatGPT, un asistente de IA, aceptas nuestras condiciones y confirmas que has leído nuestra política de privacidad. Ver preferencias de cookies.
No compartas información confidencial. Los chats pueden ser revisados por motivos de seguridad y prevención de abusos. Obtener más información
```

3. Verify Runtime Permissions
   Ensure you are using the module-specific permission methods instead of the deprecated expo-permissions library.
   javascript

import \* as MediaLibrary from 'expo-media-library';

const requestPermission = async () => {
const { status } = await MediaLibrary.requestPermissionsAsync();
if (status !== 'granted') {
alert('Permission to access audio files is required!');
}
};

Usa el código con precaución.
Note: If you are testing in Expo Go, these manifest changes will not apply until you build a development build or a standalone APK.
Las respuestas de la IA pueden contener errores. Más información

    MediaLibrary - Expo Documentation
    Configuration in app config. You can configure expo-media-library using its built-in config plugin if you use config plugins in yo...
    Expo Documentation

Error: Missing audio recording permissions when using Expo ...
14 may 2023 — maxmann74 commented. maxmann74. The fix for me was to delete my /android folder and do a full rebuild. When you add plu...
GitHub
[media-library] Android 13 Permissions · Issue #24122 - GitHub
25 ago 2023 — on Oct 2, 2023 · edited by witheroux. Contributor. As a temporary alternative, you could just create a patch using patc...
GitHub

Mostrar todo
