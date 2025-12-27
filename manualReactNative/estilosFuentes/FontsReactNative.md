https://docs.expo.dev/develop/user-interface/fonts/#how-to-choose-between-otf-and-ttf

#letra work de google

https://fonts.google.com/specimen/Work+Sans?query=work
https://fonts.google.com/selection?query=work

descomprimir archivo, y escoger los archivos -Black,-Light,-Medium
crear carpeta "./assets/fonts" y poner las dentro

tailwind.config.js:

```
theme:{
    extend:{

         fontFamily:{
            'work-black': ['WorkSans-Black','sans-serif'],   //[nombreArchivo sin ext., sino se encuentra]
           'work-light': ['WorkSans-Light','sans-serif'],
           'work-medium': ['WorkSans-Medium','sans-serif'],
         }
    }
}

```

cargar fuente, en en layout principal osea "app/\_layout.tsx":

```
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';

import "./global.css";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

 const [fontsLoaded, error] = useFonts({
    'WorkSans-Black': require('../assets/fonts/WorkSans-Black.ttf'),
    'WorkSans-Light': require('../assets/fonts/WorkSans-Light.ttf'),
    'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
  });


useEffect(() => {
  if(error) throw error;

  if(fontsLoaded) SplashScreen.hideAsync()

}, [fontsLoaded,error])

if(!fontsLoaded && !error) return null
```

trabajar con fuentes "./app/index.tsx":

```
<Text style={{fontFamily: 'WorkSans-Black'}}  className='text-5xl '>Hola Mundo</Text>
<Text className='text-4xl font-work-medium'>Hola Mundo</Text>
<Text className='text-3xl font-work-light'>Hola Mundo</Text>

```
