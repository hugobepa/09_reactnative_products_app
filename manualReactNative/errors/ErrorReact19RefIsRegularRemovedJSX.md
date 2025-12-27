Error: accessing element.ref removed React 19. ref is now a regular prop. removed JSX

Error: accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future reléase.

https://github.com/dohooo/react-native-reanimated-carousel/issues/815
https://blog.saeloun.com/2025/03/24/react-19-ref-as-prop/

    Use React.forwardRef: Wrap your component with React.forwardRef to properly pass the ref to the component.

    Use useImperativeHandle: If you need to expose specific methods or properties via the ref, use useImperativeHandle to define what the ref should expose.

solucion web:

```
    import React, { forwardRef, useImperativeHandle, useRef } from 'react';

    const ImageCarousel = forwardRef((props, ref) => {
  const internalRef = useRef();

  useImperativeHandle(ref, () => ({
    // Expose methods or properties here
    scrollTo: (index) => {
      // Implement scroll logic
    },
  }));

  return (
    <div ref={internalRef}>
      {/* Carousel implementation */}
    </div>
  );
});

```

forwardRef Error :Component definition is missing display name
https://stackoverflow.com/questions/71877298/how-to-fix-the-component-definition-is-missing-display-name-error
https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref
https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md

ejercicio nuestro:

```
const MainSlideshow = forwardRef(({ movies }: Props,ref) => {
 const refInternal = useRef<ICarouselInstance>(null);
  const width = useWindowDimensions().width;

  return (
    <View className="h-[250px] w-full">
      <Carousel
        ref={refInternal}
        ....
})

MainSlideshow.displayName = 'MainSlideshow'
```
