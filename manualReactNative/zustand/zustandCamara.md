0. "presentation\store\useCameraStore.ts":

```
import { create } from "zustand";

interface temporalCameraStoreState {
  selectedImages: string[];

  addSelectedImage: (image: string) => void;
  clearImages: () => void;
}

export const useCameraStore = create<temporalCameraStoreState>()(
  (set, get) => ({
    selectedImages: [],
    addSelectedImage: (image) => {
      set((state) => ({ selectedImages: [...state.selectedImages, image] }));
    },
    clearImages: () => set({ selectedImages: [] }),
  })
);
```

1. usar store, "app\camera\index.tsx":

```
import { useCameraStore } from "@/presentation/store/useCameraStore";
export default function CameraScreen() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const { addSelectedImage } = useCameraStore();


  //action show photo
  const onPictureAccepted = async () => {
    //TODO: implementar function
    if (!selectedImage) return;
    await MediaLibrary.createAssetAsync(selectedImage);
    addSelectedImage(selectedImage);
    console.log("fotoAceptada");
    router.dismiss();
  };
```

2. usar acciones, "app\(products-app)\product\[id].tsx":

```
import { useCameraStore } from "@/presentation/store/useCameraStore";
const ProductScreen = () => {
const { selectedImages, clearImages } = useCameraStore();

  useEffect(() => {
    return () => {
      clearImages();
    };
    // eslint-disable-next-line
  }, []);
reuturn(
    <ScrollView>
            {/**TODO: Product image*/}
            <ProductImages images={[...product.images, ...selectedImages]} />
)

```
