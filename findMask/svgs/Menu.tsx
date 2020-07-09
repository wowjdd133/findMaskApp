import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface SvgProps {
  size: number;
  color: string;
}

function MenuIcon(props:SvgProps) {
  return (
    <Svg viewBox="0 -53 384 384"
      height={props.size}
      width={props.size}
      fill={props.color}
    >
      <Path d="M368 154.668H16c-8.832 0-16-7.168-16-16s7.168-16 16-16h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0M368 32H16C7.168 32 0 24.832 0 16S7.168 0 16 0h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0M368 277.332H16c-8.832 0-16-7.168-16-16s7.168-16 16-16h352c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0" />
    </Svg>
  )
}

export default MenuIcon;
