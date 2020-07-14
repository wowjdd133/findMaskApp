import React from 'react';
import styled from 'styled-components/native';

interface TextProps extends TextStyleProps{
  children: React.ReactNode;
}

interface TextStyleProps {
  fontSize: number;
  color?: string;
  align?: 'flex-start' | 'center' | 'flex-end';
  marginTop?: number,
  multiline?: boolean
}

const TextStyle = styled.Text`
  marginTop: ${(props:TextStyleProps) => props.marginTop}px;
  fontSize: ${(props:TextStyleProps) => props.fontSize}px;
  color: ${(props:TextStyleProps) => props.color};
  alignItems: ${(props:TextStyleProps) => props.align};
`;

const TextC = ({
  fontSize,
  children,
  color = "#000000",
  align = 'center',
  marginTop = 0,
  multiline = false,
}:TextProps) => {
  return (
    <TextStyle numberOfLines={!multiline ? 1 : undefined} fontSize={fontSize} color={color} align={align} marginTop={marginTop}>
      {children}
    </TextStyle>
  )
}

export default TextC;