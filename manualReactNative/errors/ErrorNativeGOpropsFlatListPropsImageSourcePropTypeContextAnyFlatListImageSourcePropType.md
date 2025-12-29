No overload matches this call.
Overload 2 of 2, '(props: FlatListProps<ImageSourcePropType>, context: any): FlatList<ImageSourcePropType>', gave the following error.
Type 'ImageSourcePropType[] | string[]' is not assignable to type 'ArrayLike<ImageSourcePropType> | null | undefined'.
Type 'string[]' is not assignable to type 'ArrayLike<ImageSourcePropType>'.
'number' index signatures are incompatible.
Type 'string' is not assignable to type 'ImageSourcePropType'.
Overload 2 of 2, '(props: FlatListProps<ImageSourcePropType>, context: any): FlatList<ImageSourcePropType>', gave the following error.
Type '(item: ImageSourcePropType) => ImageSourcePropType' is not assignable to type '(item: ImageSourcePropType, index: number) => string'.
Type 'ImageSourcePropType' is not assignable to type 'string'.
Type 'number' is not assignable to type 'string'.

        error:

```
interface Props {
  images: string[];
}


const ProductImages = ({ images }: Props) => {

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      renderItem={(item)=>(
        <Image
        source={{ uri: item }}  //problem
        />

      )}
    />
```
