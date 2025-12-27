tailwind.config.js:

```
theme:{
    extend:{

         colors: {
        primary: '#49129C',
        secondary: {
          DEFAULT: '#B40086',
          100: '#C51297',
          200: '#831266',
        },
        tertiary: '#EF2967'
      },


    }
}

```

trabajar con colors "./app/index.tsx" añadir "text-primary":

```
<View className='bg-primary'>
<Text className='text-4xl font-work-medium text-primary'>Hola Mundo</Text>
<Text className='text-3xl font-work-light text-secondary'>Hola Mundo</Text>
<Text className='text-3xl font-work-light text-secondary-100'>Hola Mundo</Text>
<Text className='text-3xl font-work-light text-tertiary'>Hola Mundo</Text>

```
