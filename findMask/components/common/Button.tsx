import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent, Button } from 'react-native';

interface ButtonProps extends ViewStyleProps {
  title: string;
  color?: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

interface ViewStyleProps {
  marginTop?: number;
  width?: string;
}

const ViewStyle = styled.View`
  ${(props: ViewStyleProps) =>
    props.marginTop ? `marginTop: ${props.marginTop}px;` : ''
  }
  ${(props: ViewStyleProps) =>
    props.width ? `width: ${props.width};` : ''
  }
`
const ButtonC = ({marginTop,width, ...props}: ButtonProps) => {
  return (
    <ViewStyle
      marginTop={marginTop}
      width={width}>
      <Button
        {...props}
      />
    </ViewStyle>
  )
}

export default ButtonC;