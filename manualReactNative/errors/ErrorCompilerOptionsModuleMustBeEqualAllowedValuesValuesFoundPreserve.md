'compilerOptions/module' must be equal to one of the allowed values 'CommonJS, AMD, System, UMD, ES6, ES2015, ES2020, ESNext, None, ES2022, Node16, NodeNext'. Value found '"preserve"'.

"tsconfig" add " " module": "ES2020", ":

```

"extends": "expo/tsconfig.base",
  "compilerOptions": {
    "module": "ES2020",
    "strict": true,

```

The compiler option "forceConsistentCasingInFileNames" should be enabled to reduce issues when working with different OSes.

https://webhint.io/docs/user-guide/hints/hint-typescript-config/consistent-casing/

"tsconfig" add " " "forceConsistentCasingInFileNames": true, ":

```

"extends": "expo/tsconfig.base",
  "compilerOptions": {
    "module": "ES2020",
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    },
    "forceConsistentCasingInFileNames": true,
  },

```
