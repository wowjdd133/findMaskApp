import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent, Button } from 'react-native';
import TextC from './Text';

interface ButtonProps extends ViewStyleProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

interface ViewStyleProps {
  marginTop?: number;
  width?: string;
  stretch?: boolean;
  color?: string;
  backgroundColor: string;
  around?: boolean;
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
    props.stretch ? 'alignSelf: stretch;' : 'alignSelf: center;'
  }
  color: ${(props: ViewStyleProps) => props.color}
  backgroundColor: ${(props: ViewStyleProps) => props.backgroundColor};
  alignItems: center;
  justifyContent: center;
`

const ButtonC = ({title,disabled,...props}: ButtonProps) => {
  return (
    <ViewStyle
      {...props}
      >
        <TextC fontSize={24}>
          {title}
        </TextC>
    </ViewStyle>
  )
}

export default ButtonC;