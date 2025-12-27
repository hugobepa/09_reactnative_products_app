https://docs.expo.dev/push-notifications/push-notifications-setup/

0. install vysor: https://www.vysor.io/

1. terminal: npx expo install expo-notifications expo-device expo-constants

2. "./app.son" add ' "expo-notifications" ' :

```
"plugins": [
      "expo-router",
      "expo-notifications",
```

2.  codigo de pruebas:

        - copiar el "Add a minimal working example" de la pagina web
        - Eliminar todo lo del "app/index" y pegar el codigo copiado

3.  Config "proyect id" para enviar mensajes:

paginaWEB, apretar logo Expo (arriba navegacion):

https://expo.dev/signup

navegador arriba proyecto---- apretar Inicial de tu nombre--snackcs
Overview ---- New Project
name: PushApp
slug: push-app
create

Aparece esto y copiarlo. pergarlo en .txt:

npm install --global eas-cli (powershell consola como administrador desde terminal proyecto)
npx create-expo-app push-app
cd push-app
eas init xxxxxxx

4. abrir consola powershell como administrador

ir dentro de consola a proyecto con este comando: Set-Location -Path "C:\Users\User\Documents\programacion2025\react_native\devtalles\native_0_exp\06_reactnative_push_app"
dentro de powersell-Admin en direcion de proyecto, poner esto: npm install --global eas-cli

poner tu token en ele proyecto, powershell-Adm direcion proyecto: eas init --id xxxxx

5. terminal proyecto, reinciar proyecto i scanear qr: npm star -c ( dar permisos notificaciones)

error notificaciones sdk 53 rompio push ver:

159.ProjectId -- 3:23

https://docs.expo.dev/develop/development-builds/expo-go-to-dev-build/

Development Build crear:
npx expo prebuild --clean
npx expo install expo-dev-client
eas build --platform android --profile development
npx expo prebuild --clean
npx expo run:android

---

npx expo prebuild --clean
npx expo run:android -d
