import { PropsWithChildren } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import { getFontSize } from "src/util/ResponsiveUtil";


export function AppText(props: PropsWithChildren<TextProps>) {
  return <Text style={[{ textAlign: 'center', fontSize: getFontSize(14) }, props.style]} >{props.children}</Text>
}
