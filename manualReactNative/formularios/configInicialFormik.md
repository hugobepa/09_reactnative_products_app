https://formik.org/docs/overview

0. terminal: npm install formik --save

1. envolver todo el formulario "<Formik>", " app\(products-app)\product\[id].tsx":

```
import { Formik } from 'formik';

return (
    <Formik initialValues={product} onSubmit={(productLike)=>console.log({productLike})}>
        <KeyboardAvoidingView>
                .....
        </KeyboardAvoidingView>
    </Formik>
  );
```

0. error: Android Bundling failed 72ms node_modules\expo-router\entry.js (1 module)Unable to resolve "./\_Symbol" from "node_modules\lodash_baseGetTag.js"> 1 | var Symbol = require('./\_Symbol'), 2 getRawTag = require('./\_getRawTag'),3 | objectToString = require('./\_objectToString');

terminal: npm install lodash

2. todo el codigo dentro de una funcionde flecha, "app\(products-app)\product\[id].tsx"":

```
 <Formik
      initialValues={product}
      onSubmit={(productLike) => console.log({ productLike })}
    >
      {({values, handleSubmit, handleChange, setFieldValue}) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
        ...
        </KeyboardAvoidingView>
      )}
    </Formik>
```

3. utilizar ({values,handleChange) en el codigo "app\(products-app)\product\[id].tsx"":
   - cambiar dentro del return( donde ponia product a values)
   - añadir en TextInput (value={values.title},onChangeText={handleChange("title")})
   - añadir en selectores (values, setFieldValue)
   - añadir (handleSumbit) en button

```
  import { Size } from '@/core/products/interfaces/product.interface';

 <ProductImages images={values.images} />

            <ThemedTextInput
              placeholder="Titulo"
              style={{ marginVertical: 5 }}
              value={values.title}
              onChangeText={handleChange("title")}
            />
              {/** al ser numero se pasa a string*/}
            <ThemedTextInput
              placeholder="Precio"
              style={{ flex: 1 }}
              value={values.price.toString()}
              onChangeText={handleChange("price")}
            />

             <ThemedButtonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                selectedOptions={values.sizes}
                onSelect={(selectedSize) => {
                  const newSizesValue = values.sizes.includes(
                    selectedSize as Size
                  )
                    ? values.sizes.filter((s) => s !== selectedSize)
                    : [...values.sizes, selectedSize];
                  setFieldValue("sizes", newSizesValue);
                }}
              />

              <ThemedButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOptions={[values.gender]}
                onSelect={(selectedOption) =>
                  setFieldValue("gender", selectedOption)
                }
              />


                 <ThemedButton icon="save-outline" onPress={() => handleSubmit()}>
                Guardar
              </ThemedButton>
```
