# instalar paquete,configurar screen y tomar fotos

https://docs.expo.dev/versions/latest/sdk/camera/
https://github.com/DevTalles-corp/expo-products-app/blob/fin-seccion-19/app/camera/index.tsx
https://gist.github.com/Klerith/32188b65b9c7329af759826136a0d403 (estilos camera)

0. instalar paquete,terminal: npx expo install expo-camera

1. copiar codigo "https://docs.expo.dev/versions/latest/sdk/camera/#usage" y pegar en screen "app\camera\index.tsx".

Error: We need your permision to shown the camera (GRANT PERMISSION)

0. apretar botton ((GRANT PERMISSION))
1. Allow (permitir permiso)

## guardar imagen en galeria

0. instalar, terminal: npx expo install expo-media-library

https://docs.expo.dev/versions/latest/sdk/media-library/#usage
https://docs.expo.dev/versions/latest/sdk/media-library/#medialibrarycreateassetasynclocaluri-album

https://docs.expo.dev/guides/permissions/
https://docs.expo.dev/versions/latest/sdk/media-library/#example-appjson-with-config-plugin
7:53
AUDIO permission not declared AndroidManifest Update expo-media-library config plugin to include

AUDIO not declared AndroidManifest Update expo-media-library config plugin

"plugins": [
...
"expo-font",
"expo-secure-store",
[
"expo-media-library",
{
"isAccessMediaLocationEnabled": true,
"granularPermissions": ["audio", "photo"]
}
]
],

"expo-media-library",
{  
 "isAccessMediaLocationEnabled": true,
"granularPermissions": ["audio", "photo"]READ_MEDIA_IMAGES, READ_MEDIA_VIDEO, READ_MEDIA_AUDIO
}
]

AUDIO not declared AndroidManifest Update expo-media-library config plugin

Error: Uncaught (in promise, id: 0) Error: Call to function 'ExpoMediaLibrary.getPermissionsAsync' has been rejected.
→ Caused by: You have requested the AUDIO permission, but it is not declared in AndroidManifest. Update expo-media-library config plugin to include the permission before requesting it.]

"android": {
// ...
"permissions": []
}
https://docs.expo.dev/config-plugins/development-and-debugging/#modify-androidmanifestxml

    android > app > src > debug > AndroidManifest.xml

AND

    android > app > src > main > AndroidManifest.xml

import React from 'react';
import {
Button,
PermissionsAndroid,
StatusBar,
StyleSheet,
Text,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const requestCameraPermission = async () => {
try {
const granted = await PermissionsAndroid.request(
PermissionsAndroid.PERMISSIONS.CAMERA,
{
title: 'Cool Photo App Camera Permission',
message:
'Cool Photo App needs access to your camera ' +
'so you can take awesome pictures.',
buttonNeutral: 'Ask Me Later',
buttonNegative: 'Cancel',
buttonPositive: 'OK',
},
);
if (granted === PermissionsAndroid.RESULTS.GRANTED) {
console.log('You can use the camera');
} else {
console.log('Camera permission denied');
}
} catch (err) {
console.warn(err);
}
};

const App = () => (
<SafeAreaProvider>
<SafeAreaView style={styles.container}>
<Text style={styles.item}>Try permissions</Text>
<Button title="request permissions" onPress={requestCameraPermission} />
</SafeAreaView>
</SafeAreaProvider>
);

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
paddingTop: StatusBar.currentHeight,
backgroundColor: '#ecf0f1',
padding: 8,
},
item: {
margin: 24,
fontSize: 18,
fontWeight: 'bold',
textAlign: 'center',
},
});

export default App;

expo: {

    android: {

      permissions: ["ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION"],

https://docs.expo.dev/versions/latest/sdk/manifests/

"expo": {
"plugins": [
[
"expo-media-library",
{
"photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
"savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos.",
"isAccessMediaLocationEnabled": true,
"granularPermissions": ["audio", "photo"]
}
]
]

    "expo-media-library",  "granularPermissions": ["audio", "photo"]

Sets which GranularPermission values to include, determining which media permissions (READ_MEDIA_IMAGES, READ_MEDIA_VIDEO, READ_MEDIA_AUDIO) will be added to the Android manifes

https://www.google.com/search?q=READ_MEDIA_AUDIO+%22expo-media-library%22%2C+%22granular+Permissions%22&client=firefox-b-d&hs=HHPU&sca_esv=484d733798db9795&channel=entpr&udm=50&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQ33KVMWSawhpRB5XP_HUyXM2Vjh1M3qUCnwB-nb57b0m-_wC6bCClqNe3ElGBZ-Oxu95el6Tk2hNAsY0BlKWA9qaD112rjsYDf6oD8997GR5GMp9UCr_VbYGI-akA2Dgci5SPFvvr6qAB3TGDE16SYftzO8lg4h2JVIOSJqIFnD4PTmVc&aep=1&ntc=1&sa=X&ved=2ahUKEwisjeGM3-WRAxUZ_7sIHeOZByYQ2J8OegQIERAE&biw=1433&bih=705&dpr=1.3&mstk=AUtExfATBfM-4zfPVyFh9dTNxq-49hoPDcg3EoLCFNziKo_yuLBjlDdg0KUc-yHqIMK8gsmQjw0uQSMDp7lHDToRq0Qu0M1j4Ly_ioEfiV91m34sXp48bS1Zce5sVdC-40JGf3hwCCD_2O1-CxBrT0hAj0JdoJN3nXfDAuU&csuir=1
audio, photo, and video
const { status } = await MediaLibrary.requestPermissionsAsync(false, ['audio']);
const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
const [albums, setAlbums] = useState(null);
const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

async function getAlbums() {
if (permissionResponse.status !== 'granted') {
await requestPermission();
}

https://drebakare.medium.com/enabling-background-recording-on-android-with-expo-the-missing-piece-41a24b108f6d
https://docs.expo.dev/config-plugins/development-and-debugging/#modify-androidmanifestxml
expo eject

n Expo, managing audio permissions through the
expo-media-library package is primarily required for accessing existing audio files on a device. For recording new audio, you must use the separate expo-audio (or deprecated expo-av) library.

1.  Permissions for Accessing Existing Audio
    To access, list, or save audio files to the user's local storage, use expo-media-library.

        iOS Requirement: You must add the NSPhotoLibraryUsageDescription to your app.json.
        Android Requirement: For Android 13+, permissions are granular. You may need to specify READ_MEDIA_AUDIO.
        Implementation:
        javascript

        import * as MediaLibrary from 'expo-media-library';

        const requestPermission = async () => {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access media library is required!');
          }
        };

        Usa el código con precaución.

2.  Permissions for Recording Audio
    If your intent is to record audio, expo-media-library is not the correct tool. You must use expo-audio (introduced in 2024/2025 to replace expo-av).

        Config Plugin: You must add the expo-audio plugin to your app.json to enable microphone permissions automatically during builds.
        Implementation:
        javascript

        import { useAudioRecorder } from 'expo-audio';

        const recorder = useAudioRecorder();
        const status = await recorder.requestPermissionsAsync();

        Usa el código con precaución.

3.  Key Configuration (app.json)
    To ensure permissions are correctly injected into your native Android and iOS builds (EAS Build), update your app.json:
    json

{
"expo": {
"plugins": [
[
"expo-media-library",
{
"photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
"savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos.",
"isAccessMediaLocationEnabled": true
}
],
[
"expo-audio",
{
"microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone."
}
]
]
}
}
