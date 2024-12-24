<script lang="ts" setup>
import {ref, onMounted, reactive} from 'vue';
import * as echarts from 'echarts';
import {setOpacity} from '@common/color';
let colorList = [
  '#57BEFB',
  '#FFDB66',
  '#DDFEFF',
  '#00D5A2',
  '#3854B8',
  '#A3BD19',
  '#44D3DC',
  '#DA4A75',
];
let colorMap = colorList.map((item) => {
  return new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1, // 从上到下的渐变
    [
      {offset: 0, color: setOpacity(item, 0.6)}, // 6% 处的颜色
      {offset: 0.99, color: setOpacity(item, 0.18)}, // 100% 处的颜色
    ]
  );
});
let borderColor = colorList.map((item) => {
  return setOpacity(item, 0.5);
});

const links = [
  {source: '数据1', target: '1', value: 5},
  {source: '数据1', target: '2', value: 3},
  {source: '数据1', target: '3', value: 8},
  {source: '数据1', target: '4', value: 3},
  {source: '数据2', target: '2', value: 1},
  {source: '数据2', target: '3', value: 2},
  {source: '数据2', target: '4', value: 2},
];
async function init() {
  var myChart = echarts.init(chartDom.value);
  const nodes = new Set<string>();
  links.forEach((link) => {
    nodes.add(link.source);
    nodes.add(link.target);
  });
  // 将 Set 转换为数组
  const uniqueNodes = Array.from(nodes);

  let data = uniqueNodes.map((item, index) => {
    let position = links.find((t) => t.source === item);
    return {
      name: item,
      itemStyle: {
        color: setOpacity(colorList[index], 0.6),
        borderColor: position ? borderColor[index] : 'none',
      },
      label: {
        position: position ? 'right' : 'left',
        fontSize: position ? 14 : 12,
        color: position ? setOpacity('#fff', 0.8) : setOpacity('#fff', 0.6),
      },
    };
  });

  // 配置option
  var option: any = {
    color: colorList,
    tooltip: {
      trigger: 'item',
      backgroundColor: '#0C0D0D',
      borderWidth: 0,
      textStyle: {
        color: '#D3FFFF',
      },
      formatter: (params: {name: any; value: number}) => {
        return `${params.name}&nbsp&nbsp <br />${params.value}&nbsp&nbsp`;
      },
    },
    series: [
      {
        type: 'sankey',
        right: '0%',
        left: 0,
        top: 0,
        bottom: 0,
        links,
        data,
        nodeWidth: 10,
        label: {
          fontWeight: '400',
        },
        itemStyle: {
          borderWidth: 1,
        },
        lineStyle: {
          color: 'gradient',
          curveness: 0.5,
        },
      },
    ],
  };

  option && myChart.setOption(option);
}
onMounted(async () => {
  init();
});
const chartDom = ref();
</script>

<template>
  <div class="h-full w-full p-4">
    <div class="lineCharts h-full w-full" ref="chartDom"></div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888888;
}
</style>
