<script lang="ts" setup>
import {ref, onMounted, reactive, nextTick} from 'vue';
import * as echarts from 'echarts';
import {getColorKey, replaceSvgColor, setOpacity} from '@common/color';
import circle from '@/assets/circle.svg';
import background from '@/assets/bg1.png';
import {cloneDeep} from 'lodash-es';
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
const getRadialGradient = (k: number) => {
  return new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
    {offset: 0, color: setOpacity(colorList[k], 0.02)},
    {offset: 0.2, color: setOpacity(colorList[k], 0.12)},
    {offset: 1, color: setOpacity(colorList[k], 0.12)},
  ]);
};
let borderColor = colorList.map((item) => {
  return setOpacity(item, 0.5);
});

const data = [
  {label: '指标1', value: 100, legend: 'A级'},
  {label: '指标2', value: 10, legend: 'A级'},
  {label: '指标3', value: 60, legend: 'A级'},
  {label: '指标4', value: 40, legend: 'A级'},
  {label: '指标5', value: 20, legend: 'A级'},
  {label: '指标6', value: 20, legend: 'A级'},
  {label: '指标1', value: 90, legend: 'B级'},
  {label: '指标2', value: 70, legend: 'B级'},
  {label: '指标3', value: 50, legend: 'B级'},
  {label: '指标4', value: 30, legend: 'B级'},
  {label: '指标5', value: 10, legend: 'B级'},
  {label: '指标6', value: 10, legend: 'B级'},
];
async function init() {
  var myChart = echarts.init(chartDom.value);
  const legendGroups = new Map<
    string,
    {legend: string; list: number[]; labels: string[]}
  >();

  data.forEach((item) => {
    if (!legendGroups.has(item.legend)) {
      legendGroups.set(item.legend, {
        legend: item.legend,
        list: [],
        labels: [],
      });
    }
    const group = legendGroups.get(item.legend)!;
    group.list.push(item.value);
    group.labels.push(item.label);
  });
  const dataList = Array.from(legendGroups.values());
  const indicator = Array.from(new Set(data.map((d) => d.label))).map(
    (label) => ({
      name: label,
      max: Math.max(
        ...data.filter((d) => d.label === label).map((d) => d.value)
      ),
    })
  );
  // console.log(indicator, 'indicator');

  let seriesData = dataList.map((item, index) => {
    return {
      name: item.legend,
      value: item.list,
      symbol: 'none',
      symbolSize: 12,
      areaStyle: {
        color: getRadialGradient(getColorKey(index, colorList.length)),
      },
      lineStyle: {
        width: 1,
        color: colorList[getColorKey(index, colorList.length)],
      },
    };
  });
  // 配置option
  var option: any = {
    // backgroundColor: `url(${background}) no-repeat center center`,
    radar: {
      shape: 'circle',
      indicator,
      axisName: {
        color: setOpacity('#fff', 0.6),
        fontSize: '12px',
        fontWeight: '400',
        fontFamily: 'PingFang SC',
      },
      startAngle: 120,
      splitNumber: 3,
      splitArea: {show: false},
      axisLine: {lineStyle: {color: setOpacity('#fff', 0.2)}},
      splitLine: {show: false},
    },
    series: [
      {
        type: 'radar',
        data: seriesData,
      },
    ],
    graphic: [],
  };
  myChart.clear();
  option && myChart.setOption(option);
  myChart.on('mousemove', function (params: any) {
    let colorsKey = getColorKey(params.dataIndex, colorList.length);
    let colors = colorList[colorsKey];
    option.series[0].data[params.dataIndex].symbol =
      'image://' + circleMap[colors];
    myChart?.setOption(option);
  });
  myChart.on('mouseout', function (params: any) {
    option.series[0].data[params.dataIndex].symbol = 'none';
    myChart?.setOption(option);
  });
  let isFinished = false;
  myChart.on('finished', () => {
    if (isFinished) return;
    isFinished = true;
    nextTick(() => {
      const graphics = prepareGraphics(myChart);
      myChart.setOption({
        graphic: [graphics],
      });
    });
  });
}
const prepareGraphics = (myChart: any) => {
  let width = myChart.getWidth();
  let height = myChart.getHeight();
  if (width <= 0 && height <= 0) return;
  let r = 0;
  if (width <= height) {
    r = width / 2;
  } else {
    r = height / 2;
  }
  r = r - 13; //13是 指示器名称和指示器轴的距离默认是15 -2代表差距
  let graphics = {
    type: 'image',
    left: 'center',
    top: 'middle',
    style: {
      image: background, // 使用导入的背景图片
      width: r * 2,
      height: r * 2,
    },
  };
  return graphics;
};
let circleMap = reactive<Record<string, string>>({});
onMounted(async () => {
  init();
  circleMap = Object.fromEntries(
    await Promise.all(
      colorList.map(async (color) => {
        return [color, await replaceSvgColor(circle, '#57BEFB', color)];
      })
    )
  );
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
