import * as React from 'react';
import { View, Dimensions } from 'react-native';
import {BarChart} from 'react-native-chart-kit'

const data = {
  labels: ["오늘 사망자", "오늘 격리해제", "전날 대비 환자"],
  datasets: [
    {
      data: [20, 45, 28]
    }
  ]
};

interface ChartProps {
  labels: string[];
  data: number[];
}

const Chart = (props:ChartProps) => {

  data.labels=props.labels;;
  data.datasets[0].data=props.data;

  return (
    <View style={{width:"100%"}}>
      <BarChart
        width={Dimensions.get("window").width}
        height={200}
        chartConfig={{
          fillShadowGradient:"#FFFFFF",
          fillShadowGradientOpacity:1,
          color: (opacity = 1) => `rgba(255,255,255,${opacity})`
        }}
        data={data}
        showValuesOnTopOfBars={true}
        fromZero={true}
        yAxisSuffix="명"
      />
    </View>
  )
}

export default Chart;