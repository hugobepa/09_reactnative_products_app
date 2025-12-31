https://docs.expo.dev/versions/latest/sdk/imagepicker/
https://docs.expo.dev/versions/latest/sdk/imagepicker/#usage

0. install, terminal: npx expo install expo-image-picker

1. crear accion y uso,"app\camera\index.tsx":

```
import * as ImagePicker from 'expo-image-picker';

<GalleryButton onPress={onPickImages} />

const onPickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.5,
      aspect: [4, 3],
      allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });
    if (result.canceled) return;
    //console.log(result.assets);
    result.assets.forEach((asset) => {
      addSelectedImage(asset.uri);
    });
    router.dismiss();
  };


```
