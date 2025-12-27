NativeViewGestureHandler must be used as a descendant of GestureHandlerRootView en layout principal.

```
  <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>

```

colocar el "GestureHandlerRootView" en el \_layout principal de la aplicación en el directorio /app

```
import { GestureHandlerRootView } from 'react-native-gesture-handler';`


return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );

```
