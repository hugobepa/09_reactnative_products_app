https://docs.expo.dev/versions/latest/sdk/map-view/

0. "/.gitignore":

```
# local env files
#.env*.local
.env
```

1. crear ".env" en raiz proyecto añadir clave:

```
#https://console.cloud.google.com/apis
GOOGLE_MAPS_API_KEY=xxxxxxxxx
```

2. crear copia de ".env" y renombrarla a ".env.template". Eliminar numero de clave pero dejar nombre de variante

```
#https://console.cloud.google.com/apis
GOOGLE_MAPS_API_KEY=
```

3. "app.json" añadir "GOOGLE_MAPS_API_KEY"(process.env.GOOGLE_MAPS_API_KEY) :

android:

```
 "android": {
      "config": {
        "googleMaps": {
          "apiKey": "process.env.GOOGLE_MAPS_API_KEY"
        }
      },
```

ios:

```
 "ios": {
         "config": {
          "googleMapsApiKey": "xxxxxxxx"
      },
      "supportsTablet": true
    },
```

"app/map/index.tsx" add "PROVIDER_GOOGLE":

```
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

<MapView
  provider={PROVIDER_GOOGLE}

/>

```

//adb start-server

4. reconstruir proyecto, terminal: npx expo prebuild --clean

5. llamar en terminal: npx expo run:android
   Error: C:\Users\User\AppData\Local\Android\Sdk/platform-tools/adb -s emulator-5554 emu avd name exited with non-zero code: 1
   terminal: adb kill-server
   sino funciona: npm start -c
