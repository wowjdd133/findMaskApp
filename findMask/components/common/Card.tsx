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
  row?: boolean,
  flex?: number,
  height?: string,
  borderBottom?: number,
  borderBottomColor?: string,
}

const Card = styled.View`
  ${(props: CardStyleProps) => 
    props.flex ? `flex: ${props.flex};` : ''
  }
  alignSelf: stretch;
  ${(props: CardStyleProps) => 
    props.height ? `height: ${props.height};` : ''
  }
  ${(props: CardStyleProps) => 
    props.borderBottomColor ? `borderBottomColor: ${props.borderBottomColor};` : ''
  }
  ${(props: CardStyleProps) => 
    props.borderBottom ? `borderBottomWidth: ${props.borderBottom}px;` : ''
  }
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
  ${(props: CardStyleProps) => 
    props.height ? `height: ${props.height};` : props.flex ? `flex: ${props.flex};`: ''
  }
  ${(props: CardStyleProps) => 
    props.borderBottomColor ? `borderBottomColor: ${props.borderBottomColor};` : ''
  }
  ${(props: CardStyleProps) => 
    props.borderBottom ? `borderBottomWidth: ${props.borderBottom}px;` : ''
  }
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
  flex,
  height,
  borderBottom,
  borderBottomColor,
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
    flex,
    height,
    borderBottom,
    borderBottomColor
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