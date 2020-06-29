import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';

interface CardProps extends CardStyleProps {
  children: React.ReactNode,
  onPress?: (event: GestureResponderEvent) => void;
  touchable?: boolean;
}

interface CardStyleProps {
  marginTop?: number,
  radius?: number,
  align?: 'flex-start' | 'center' | 'flex-end',
  backgroundColor?: string,
  paddingLeft?: number,
  paddingRight?: number,
  justifyContent?: 'space-around' | 'center' | 'space-between',
  row?: boolean;
  flex?: number,
}

const Card = styled.View`
  flex:${(props: CardStyleProps) => props.flex};
  alignSelf: stretch;
  marginTop: ${(props: CardStyleProps) => props.marginTop}px;
  paddingLeft: ${(props: CardStyleProps) => props.paddingLeft}px;
  paddingRight: ${(props: CardStyleProps) => props.paddingRight}px;
  backgroundColor: ${(props: CardStyleProps) => props.backgroundColor};
  borderRadius: ${(props: CardStyleProps) => props.radius}px;
  alignItems: ${(props: CardStyleProps) => props.align};
  justifyContent: ${(props: CardStyleProps) => props.justifyContent};
  flexDirection: ${(props: CardStyleProps) => props.row ? 'row' : 'column'};
`

const TouchableCard = styled.TouchableOpacity`
  flex:${(props: CardStyleProps) => props.flex};
  marginTop: ${(props: CardStyleProps) => props.marginTop}px;
  paddingLeft: ${(props: CardStyleProps) => props.paddingLeft}px;
  paddingRight: ${(props: CardStyleProps) => props.paddingRight}px;
  backgroundColor: ${(props: CardStyleProps) => props.backgroundColor};
  borderRadius: ${(props: CardStyleProps) => props.radius}px;
  alignItems: ${(props: CardStyleProps) => props.align};
  justifyContent: ${(props: CardStyleProps) => props.justifyContent};
  flexDirection: ${(props: CardStyleProps) => props.row ? 'row' : 'column'};
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
  justifyContent = 'center',
  row = false,
  flex = 1,
}: CardProps) => {

  const CardProps = {
    marginTop,
    radius,
    align,
    backgroundColor,
    paddingLeft,
    paddingRight,
    justifyContent,
    row,
    flex
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