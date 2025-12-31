#prepararParaSubirAndroidIOS
https://expo.dev/
https://docs.expo.dev/build/setup/
#subirAndoid
https://docs.expo.dev/submit/android/

0. entrar en cuenta https://expo.dev/
1. warp administrador:
   Warp icon and run as administrator. To do this by default, you can right-click > open file location to see the shortcut, then right-click the shortcut > properties > compatibility > Run this program as an administrator.
   https://github.com/warpdotdev/Warp/issues/6254
   warp --- right-click the shortcut > properties > compatibility > Run this program as an administrator
   https://learn.microsoft.com/en-us/windows/advanced-settings/sudo/

   powershell : cd C:\Users\User\Documents\programacion2025\react_native\devtalles\native_0_exp
   usa cd .. para subir un nivel, o cd - volver anterior

https://docs.expo.dev/build/setup/

1. instalar en terminal proyecto: npm install -g eas-cli (abrir acomo admnistrador terminal)
2. comprobar en terminal proyecto: eas --version
3. login en terminal proyecto: eas login
4. configurar proyecto en terminal proyecto: eas build:configure (all/ios/android) all
5. comprobar en la webExpo/dasboard si se ha creado y en proyecto archivo en el root (eas.json)
6. crear APK terminal proyecto: eas build --platform android --profile preview
   nombre: com.johndoe.componentsapp
   generate android keystore? YES
7. webExpo_Dashboard_entrarProyecto----burguer_download_build
8. conectar el movil a ordenador mediante misma red wifi:Para conectar tu móvil con Snapdrop, solo necesitas abrir
   snapdrop.net en el navegador de tu móvil y en tu computadora, asegurándote de que ambos dispositivos estén en la misma red Wi-Fi para que se detecten y puedas transferir archivos fácilmente tocando el ícono del otro dispositivo en la pantalla.
9. https://snapdrop.net/ ---- cargar APK desde ordenador dentro de la web (abrir/instalar)(botonzito share-- escoger dispositivo)
10. aceptar en el movile e instalarlo y pronarlo
