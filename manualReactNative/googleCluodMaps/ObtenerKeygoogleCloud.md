https://console.cloud.google.com/apis
https://docs.expo.dev/versions/latest/sdk/map-view/

0. obtener datos seguridad:

Nombre proyecto:

terminal protecto: npx expo run:android
crear en "app.json" nombre de paquete"
"android": {

      "package": "nombre_paquete"

sha1:
bajar jdk : https://www.oracle.com/es/java/technologies/downloads/#jdk25-windows
windows+ r --- cmd
cd C:\Program Files\Java\jdk-15.0.2\bin>
copiar de la pagina de google cluod credenciales barralateral y pegar despues del bin en "cmd" + enter

keytool -list -v -keystore C:\Users\username\.android\debug.keystore
-alias androiddebugkey -storepass android -keypass android

desde terminal consola:

" keytool -genkey -v -keystore C:\Users\User\.android\debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 "

copiar comnando generar clave SHA1 en googlecloud

1. ir barra navegadora arriba/izq (nombre de un proyecto) selecionar
2. admni o crear proyecto (solamente poner nombre de proyecto para crear)
3. seleccionar proyecto, cuando este acabado
4. enable the Maps SDK for Android (para mapas)
   poner en el buscador de arriba lo que buscas (Maps SDK)
   selecionar (map sdk android)
   botton habilitar

   hacer gestion
   ir la maps platform
   claves y credenciales
   !!informacion-si las borras (arriba) -- arriba todo( crear credenciales---claves api)!!!
   clave (hamburguesa)--editar clave

   - restringuir uso

   - Apps para android
   - copiar nombre de parquete de "app.json"
   - copiar sha1
   - listo
   - guardar

   mostrar clave y copiarla

eliminar tarjeta
payments.google.com
métodos de pago
