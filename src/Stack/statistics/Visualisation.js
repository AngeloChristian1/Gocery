import { View, Text , TouchableOpacity ,ScrollView, StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { SkPath } from '@shopify/react-native-skia'
import {
  Canvas,
  Path,
  runTiming,
  Skia,
  Line,
  vec,
  useComputedValue,
  useFont,
  useValue,
  Easing
} from "@shopify/react-native-skia";
import {curveBasis, line, scaleLinear, scaleTime} from "d3"
import { DataPoint } from './Data'
import { originalData , animatedData} from './Data'


interface GraphData {
  min: number,
  man: number,
  curve: SkPath,
}

  const GRAPH_HEIGHT = 4000
  const GRAPH_WIDTH = 370

  const makeGraph = (data) => {
    const min = Math.min(...data.map(val => val.value));
    const max = Math.max(...data.map(val => val.value));
  
    const getYAxis = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);
    const getXAxis = scaleTime().domain([new Date(2000, 1, 1), new Date(2000, 1, 15)]).range([10, GRAPH_WIDTH - 10]);
  
    const curvedLine = line()
      .x(d => getXAxis(new Date(d.date)))
      .y(d => getYAxis(d.value))
      .curve(curveBasis)(data);
  
    const skPath = Skia.Path.MakeFromSVGString(curvedLine);
    return {
      min,
      max,
      curve: skPath,
    };
  }
  const graphData = [makeGraph(originalData), makeGraph(animatedData)]
        
  
const Visualisation = () => {
  const isTransitionComplete = useValue(1)

  const transitionState = useValue({
    currentChart: 0,
    nextChart: 1
  })
  const transitionChart = (target)=>{
    transitionState.current = {
      currentChart:target,
      nextChart: transitionState.current.currentChart,
    }
    isTransitionComplete = 0
    runTiming(isTransitionComplete,1, {
      duration:500,
      easing: Easing.inOut(Easing.cubic),
    })
  }

  // const currentPath = useCompletedValue(()=>{

  // })
  
  return (
    <ScrollView className="w-full h-full bg-white">
    <View>
    <Canvas style={{height:GRAPH_HEIGHT, width: GRAPH_WIDTH}}>
    <Line strokeWidth={1}
    color="lightGrey"
    p1={vec(10,130)}
    p2={vec(400,130)}
    />
    <Line strokeWidth={1}
    color="lightGrey"
    p1={vec(10,250)}
    p2={vec(400,250)}
    />
    <Line strokeWidth={1}
    color="lightGrey"
    p1={vec(10,370)}
    p2={vec(400,370)}
    />
    <Path
    path={graphData.curve}
    color="orange"
    strokeWidth={4}
    style="stroke"
    />
    </Canvas>
    </View>
    <View className="flex-row p-2 gap-2">
      <TouchableOpacity className="bg-secondary p-2 rounded">
      <Text style={{fontFamily:"poppins"}}>Week 1</Text></TouchableOpacity>
      <TouchableOpacity  className="bg-secondary p-2 rounded" style={{fontFamily:"poppins"}}><Text>Week 2</Text></TouchableOpacity>
    </View>
    </ScrollView>
  )
}

export default Visualisation