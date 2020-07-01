import {VictoryPie, VictoryLabel} from 'victory-native';
import { View, Dimensions, Text } from 'react-native';
import {Svg} from 'react-native-svg';
import * as React from 'react';

interface ChartProps {
  data: any | undefined;
  x: string;
  y: string;
  text: string;
}

const Chart = ({data,x,y,text}:ChartProps) => {
  return(
    <Svg>
      <VictoryPie
        data={data}
        x={x}
        y={y}
        width={Dimensions.get('screen').width-20}
        innerRadius={110}
        animate={{
          duration: 2000
        }}
        padAngle={5}
        children={<Text>hi</Text>}
      />
      <VictoryLabel
        x={Dimensions.get('screen').width/2-55}
        y={175}
        style={{fontSize: 15}}
        text={text}
      />
    </Svg>
      
  )
}

export default Chart;