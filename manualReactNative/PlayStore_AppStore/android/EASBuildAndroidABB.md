#prepararParaSubirAndroidIOS
https://expo.dev/
https://docs.expo.dev/build/setup/
#subirAndoid
https://docs.expo.dev/submit/android/
https://developer.android.com/distribute/console?hl=es-419

0. proyecto/App.json: "expo":{"name":"cambiarloNombreApp"}
1. crear o entrar en developer android: https://developer.android.com/distribute/console?hl=es-419
2. entrar en cuenta https://expo.dev/
3. warp administrador:
   Warp icon and run as administrator. To do this by default, you can right-click > open file location to see the shortcut, then right-click the shortcut > properties > compatibility > Run this program as an administrator.
   https://github.com/warpdotdev/Warp/issues/6254
   warp --- right-click the shortcut > properties > compatibility > Run this program as an administrator
   https://learn.microsoft.com/en-us/windows/advanced-settings/sudo/

   powershell : cd C:\Users\User\Documents\programacion2025\react_native\devtalles\native_0_exp
   usa cd .. para subir un nivel, o cd - volver anterior

   https://docs.expo.dev/build/setup/
   ---Si antes no lo hemos hecho creandp APK----

4. instalar en terminal proyecto: npm install -g eas-cli (abrir acomo admnistrador terminal)
5. comprobar en terminal proyecto: eas --version
6. login en terminal proyecto: eas login
7. configurar proyecto en terminal proyecto: eas build:configure (all/ios/android) all
8. comprobar en la webExpo/dasboard si se ha creado y en proyecto archivo en el root (eas.json)

   -----obligatorio seguir siguientes pasos---

9. crear ABB terminal proyecto: eas build --platform android
   (opc)nombre: com.johndoe.componentsapp
   (opc)generate android keystore? YES
10. https://developer.android.com-login-home-googlePlayConsole---create app (espacio aplicacion)
    _ Appname: nombre app
    _ language:spanish
    _ App
    _ free
    \_ confirmar declaration
    \_crearteApp

    -dashboard-InternalTesting(equipo)-FinishSettingupYourApp-ClosedTesting(proximos)--Production

11. webExpo_Dashboard_entrarProyecto----burguer_download_build
12. https://developer.android.com-dasboard-proyecto-internalTesting-tester
    -testers
    -testers
    -feedbackEmail
    -save
13. https://developer.android.com-dasboard-proyecto-internalTesting-releases  
    -create a new releases
    -choose singin key(use-googke-key)
    -subimos ABB desde orndenador
    -release name: components RN
    -next
    -------Pantalla---otra pantalla--
    -acabado de cargar
    -save & publish
    --internaltesting--tester
    -copylink para pasar a los tester
    --web(modo incognito) -poner url-aceptInvite
    --enlance ver googlePlay(donwload googlePlay)
    -----dashboad app-finish setting up your app(rellenar datos)- para continuar
    ----dashboad app-closedTesting (acabadode rellenar preguntas)
    --- despues production
