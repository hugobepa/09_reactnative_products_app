import { ExternalPathString, Link, RelativePathString } from "expo-router";
import React from "react";
import { Text, TextStyle } from "react-native";

interface Props {
  children: string;
  style?: TextStyle;
  href: RelativePathString | ExternalPathString;
}

const ThemedLink = ({ href, style, children }: Props) => {
  return (
    <Link href={href}>
      <Text>{children}</Text>
    </Link>
  );
};

export default ThemedLink;
