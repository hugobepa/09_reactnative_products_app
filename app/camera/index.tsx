import { ThemedText } from "@/presentation/theme/components/themed-text";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const onRequestPermissions = async () => {
    try {
      const { status: cameraPermissionStatus } =
        await requestCameraPermission();
      if (cameraPermissionStatus !== "granted") {
        Alert.alert("lo siento", "necesitamos permisos para la camara");
        return;
      }
      const { status: mediaPermissionStatus } = await requestMediaPermission();

      if (mediaPermissionStatus !== "granted") {
        Alert.alert("lo siento", "necesitamos permisos para la galeria");
        return;
      }
    } catch (error) {
      console.log({ error });
      Alert.alert("Error", "No se pudo obetner permisos");
    }
  };

  const cameraViewRef = useRef<CameraView>(null);
  if (!cameraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }
  //obtener permiso camara
  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={{
          ...styles.container,
          marginHorizontal: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.message}>
          Necesitamos permiso para usar la camara y la galeria
        </Text>

        <TouchableOpacity onPress={onRequestPermissions}>
          <ThemedText type="subtitle">Solicitar Permiso</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }
  //action take photo
  const onShutterButtonPress = async () => {
    if (!cameraViewRef.current) return;
    const picture = await cameraViewRef.current.takePictureAsync({
      quality: 0.7,
    });
    console.log({ picture });
    if (!picture?.uri) return;
    setSelectedImage(picture.uri);
    //TODO: guardar imagen
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  //action  take and show photo
  const onReturnCancel = () => {
    //TODO: limpiar estado
    router.dismiss();
  };
  //action show photo
  const onPictureAccepted = async () => {
    //TODO: implementar function
    if (!selectedImage) return;
    await MediaLibrary.createAssetAsync(selectedImage);
    console.log("fotoAceptada");
    router.dismiss();
  };

  const onRetakePhoto = () => {
    setSelectedImage(undefined);
  };

  //mostrar foto hecha
  if (selectedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.camera} />
        <ConfirmImageButton onPress={onPictureAccepted} />
        <RetakeImageButton onPress={onRetakePhoto} />
        <ReturnCancelButton onPress={onReturnCancel} />
      </View>
    );
  }
  //screen take picture
  return (
    <View style={styles.container}>
      <CameraView ref={cameraViewRef} style={styles.camera} facing={facing}>
        <ShutterButton onPress={onShutterButtonPress} />
        <FlipCameraButton onPress={toggleCameraFacing} />
        {/**TODO: */}
        <GalleryButton />
        <ReturnCancelButton onPress={onReturnCancel} />
        {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity> */}
      </CameraView>
    </View>
  );
}

//Custom Components take photo
const ShutterButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
    ></TouchableOpacity>
  );
};

const FlipCameraButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name="camera-reverse-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

const GalleryButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.galleryButton}>
      <Ionicons name="images-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};
//Custom Components take and show photo
const ReturnCancelButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.returnCancelButton}>
      <Ionicons name="arrow-back-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

//Custom Components show photo
const ConfirmImageButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
    >
      <Ionicons name="checkmark-outline" size={30} color={primaryColor} />
    </TouchableOpacity>
  );
};

const RetakeImageButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name="close-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    //borderColor: "red",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
