import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";
import { ROOT_FONT_SIZE } from "src/layouts/AppLayout";


export function AppText(props: PropsWithChildren<TextProps>) {
  return <Text style={[
    {
      textAlign: 'center',
      fontSize: ROOT_FONT_SIZE
    }, props.style]} >{props.children}</Text>
}
