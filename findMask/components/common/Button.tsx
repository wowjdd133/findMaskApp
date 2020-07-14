import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent, Button } from 'react-native';
import TextC from './Text';

interface ButtonProps extends ViewStyleProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  multiline?: boolean;
}

interface ViewStyleProps {
  marginTop?: number;
  width?: string;
  stretch?: boolean;
  color: string;
  backgroundColor: string;
  around?: boolean;
  align?: 'center' | 'flex-end' | 'flex-start';
}

const ViewStyle = styled.TouchableOpacity`
  ${(props: ViewStyleProps) =>
    props.marginTop ? `marginTop: ${props.marginTop}px;` : ''
  }
  ${(props: ViewStyleProps) =>
    props.around ? `borderRadius: 5px;` : ''
  }
  paddingHorizontal: 10px;
  ${(props: ViewStyleProps) =>
    props.width ? `width: ${props.width};` : ''
  }
  ${(props: ViewStyleProps) =>
    props.stretch ? 'alignSelf: stretch;' : `alignSelf: ${props.align ? props.align : 'center'};`
  }
  backgroundColor: ${(props: ViewStyleProps) => props.backgroundColor};
  alignItems: center;
  justifyContent: center;
`

const ButtonC = ({multiline = false,title,disabled,...props}: ButtonProps) => {
  return (
    <ViewStyle
      {...props}
      >
        <TextC multiline fontSize={24} color={props.color}>
          {title}
        </TextC>
    </ViewStyle>
  )
}

export default ButtonC;