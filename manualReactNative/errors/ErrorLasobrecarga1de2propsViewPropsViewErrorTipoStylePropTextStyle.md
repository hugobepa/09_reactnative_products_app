No overload matches this call.Overload 1 of 2, '(props: ViewProps): View', gave the following error.
Type 'StyleProp<TextStyle>' is not assignable to type

error:

```
interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedTextInput = ({ icon, style, ...rest }: Props) => {

 <View
      style={[
        {
          ...styles.border,
          borderColor: isActive ? primaryColor : "#ccc",
        },
        style,  //problema aqui
      ]}
      onTouchStart={() => inputRef.current?.focus()}
    >

```

solucion:

```
interface Props extends Omit<TextInputProps, "style"> {
  //interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewProps["style"];
}

lo demas igual

```

solucion 2:

```
<View style={{ flex: 1 }}>
     <ThemedTextInput placeholder="Price" />
</View>
```
