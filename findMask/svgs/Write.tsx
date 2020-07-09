import * as React from "react"
import {Svg, Path} from 'react-native-svg';

interface SvgProps {
  size: number;
  color: string;
}

function WriteIcon(props:SvgProps) {
  return (
    <Svg 
      width={props.size}
      height={props.size}
      fill={props.color}
      viewBox="0 0 512 512">
      <Path d="M51.2 353.28L0 512l158.72-51.2zM87.16 316.492L336.96 66.69l108.61 108.61L195.77 425.102zM504.32 79.36L432.64 7.68c-10.24-10.24-25.6-10.24-35.84 0l-23.04 23.04 107.52 107.52 23.04-23.04c10.24-10.24 10.24-25.6 0-35.84z" />
    </Svg>
  )
}

export default WriteIcon
