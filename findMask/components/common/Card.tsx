import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';

interface CardProps extends CardStyleProps {
  children: React.ReactNode,
  onPress?: (event: GestureResponderEvent) => void;
  touchable?: Boolean;
}

interface CardStyleProps {
  marginTop?: number,
  radius?: number,
  align?: 'flex-start' | 'center' | 'flex-end',
  backgroundColor?: string,
  paddingLeft?: number,
  paddingRight?: number,
}

const Card = styled.View`
  width: 100%;
  marginTop: ${(props: CardStyleProps) => props.marginTop}px;
  paddingLeft: ${(props: CardStyleProps) => props.paddingLeft}px;
  paddingRight: ${(props: CardStyleProps) => props.paddingRight}px;
  backgroundColor: ${(props: CardStyleProps) => props.backgroundColor};
  borderRadius: ${(props: CardStyleProps) => props.radius}px;
  alignItems: ${(props: CardStyleProps) => props.align};
`

const TouchableCard = styled.TouchableOpacity`
  width: 100%;
  marginTop: ${(props: CardStyleProps) => props.marginTop}px;
  paddingLeft: ${(props: CardStyleProps) => props.paddingLeft}px;
  paddingRight: ${(props: CardStyleProps) => props.paddingRight}px;
  backgroundColor: ${(props: CardStyleProps) => props.backgroundColor};
  borderRadius: ${(props: CardStyleProps) => props.radius}px;
  alignItems: ${(props: CardStyleProps) => props.align};
`


const CardC = ({
  children,
  marginTop = 0,
  radius = 0,
  align = 'center',
  backgroundColor = "#FFFFFF",
  paddingLeft = 0,
  paddingRight = 0,
  onPress,
  touchable = false,
}: CardProps) => {

  const CardProps = {
    marginTop,
    radius,
    align,
    backgroundColor,
    paddingLeft,
    paddingRight,
  }

  return (
    touchable ?
      <TouchableCard
        {...CardProps}
        onPress={onPress}>
        {children}
      </TouchableCard>

      : <Card
        {...CardProps}
      >
        {children}
      </Card>
  )
}

export default CardC;