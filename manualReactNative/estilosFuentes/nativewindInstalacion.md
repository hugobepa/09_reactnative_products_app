https://www.nativewind.dev/
https://www.nativewind.dev/docs/getting-started/installation
https://www.nativewind.dev/docs/getting-started/troubleshooting

npm install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11

1. solucion:

npx tailwindcss init
./tailwind.config.js:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx",
             "./app/**/*.{js,jsx,ts,tsx}",
            "./components/**/*.{js,jsx,ts,tsx}",
             "./presentation/**/*.{js,jsx,ts,tsx}",
          ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

./app/global.css:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "tailwindcss";
```

./babel.config.js:

```
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};

```

./metro.config.js:

opcional : npx expo customize metro.config.js

1. opcion primera:

```
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })

```

2. opcion:

```
module.exports = withNativeWind(config, { input: './app/global.css' })

```

./app/\_layout.tsx (add " import "./global.css" "):

```
import "../global.css"

....
```

./app.json (add ' "bundler": "metro" '):

```
 "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png",
      "bundler": "metro"
    },


```

./nativewind-env.d.ts:

```
/// <reference types="nativewind/types" />

```

./app/\_layout.tsx (para comrobar que funcione):

```
return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to RootLayout!
      </Text>
    </View>
  )


```

comprobar que funciona,terminal: npm start

---

2.  segunda solucion, opcional solucion segunda:

```
npx expo customize metro.config.js

De momento se puede resolver instalandolo de la siguiente forma:

npx expo install nativewind tailwindcss@3 react-native-reanimated@3.16.2 react-native-safe-area-context

npx tailwindcss init

```
