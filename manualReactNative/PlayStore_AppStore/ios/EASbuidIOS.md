https://docs.expo.dev/submit/ios/
https://appstoreconnect.apple.com/login
https://appstoreconnect.apple.com/login

0. tener cuenta en Apple App Store:
   https://docs.expo.dev/build/setup/

1. instalar en terminal proyecto: npm install -g eas-cli (abrir como admnistrador terminal)
2. comprobar en terminal proyecto: eas --version
3. login en terminal proyecto: eas login
4. configurar proyecto en terminal proyecto: eas build (all/ios/android) ios
   name: com.johndoe.components-app
   login cuenta apple

5. comprobar en la webExpo/dasboard si se ha creado y en proyecto archivo en el root (eas.json)
6. crear APK terminal proyecto: eas build --platform android --profile preview
   nombre: com.hugobermudez.expo-components_app
   generate android keystore? YES
   team id (imporante guardalo)
   yes a todo
   informacion expoweb-billing-ondemand plan (recomendable)
7. submit, termninal proyecto: eas submit -p ios
   -select a build from EAS
   -seleccionar id proyecto (y copiarlo)
   -appID
   -yes crear apikey
8. comprobar como va el proceso: webExpo_Dashboard_entrarProyecto
   ---subir apps connect--
   https://appstoreconnect.apple.com/login
   applestore-dashboard- proyecto-distribucion app review -app information (rellenar datos) ye enviara revision
   applestore-dashboard- proyecto-TestFlight(missing complain-manage)
   -encriptacion pregunta
   -internal testing--crear grupo--
   -external testing -crear grupo- (tarda varios dias)- selecionar un build
   -hacer tester mediante correos enviados
