<script lang="ts" setup>
import {ref, onMounted, nextTick, reactive} from 'vue';
import * as echarts from 'echarts';
import {cloneDeep} from 'lodash-es';
import {
  getColorFromIndex,
  getColorKey,
  replaceSvgColor,
  setOpacity,
} from '@common/color';
import bg from '@/assets/treemapBg.svg';
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
const data = [
  {label: 'A', value: 50},
  {label: 'B', value: 30},
  {label: 'C', value: 20},
  {label: 'D', value: 40},
  {label: 'E', value: 60},
  {label: 'F', value: 70},
  {label: 'G', value: 90},
  {label: 'H', value: 100},
];
let borderColor = new echarts.graphic.LinearGradient(
  0,
  0,
  1,
  0, // 从左到右的渐变
  [
    {offset: 0.1, color: setOpacity('#fff', 0)}, // 6% 处的颜色
    {offset: 0.5, color: setOpacity('#fff', 0.4)}, // 6% 处的颜色
    {offset: 0.9, color: setOpacity('#fff', 0)}, // 100% 处的颜色
  ]
);
async function init() {
  var myChart = echarts.init(chartDom.value);

  let count = data.reduce((acc, cur) => acc + cur.value, 0);

  let seriesData = data.map((item, index) => {
    return {
      value: item.value,
      name: item.label + '\n\n' + ((item.value / count) * 100).toFixed(2) + '%',
      itemStyle: {color: '#151515'},
    };
  });

  // 配置option
  var option: any = {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#0C0D0D',
      borderWidth: 0,
      textStyle: {
        color: '#D3FFFF',
      },
      formatter: (params: {name: any; value: number}) => {
        return `${params.name}&nbsp&nbsp${(
          (params.value / count) *
          100
        ).toFixed(2)}% <br />${params.value}&nbsp&nbsp人次`;
      },
    },
    graphic: [],
    series: [
      {
        type: 'treemap',
        name: 'option',
        left: '0%',
        top: '0%',
        right: '0%',
        bottom: '0%',
        width: '100%',
        height: '100%',
        leafDepth: 1, // 控制展示的层级深度
        // colorSaturation:0,
        // visibleMin:2,// 某个节点小于这个数值，不显示
        drillDownIcon: '',
        nodeClick: false, //点击节点是否生效
        roam: false, //静止平移和拖拽
        breadcrumb: {show: false}, //面包屑，能够显示当前节点的路径。
        itemStyle: {
          borderWidth: 0,
          borderColor: '#151515',
          color: undefined,
          gapWidth: 4, // 间距
        },
        label: {
          formatter: '{b}',
          color: '#fff',
          fontSize: 14,
          fontWeight: 400,
        },
        data: seriesData,
      },
    ],
  };
  option && myChart.setOption(option);

  let isFinished = false;
  myChart.on('finished', () => {
    if (isFinished) return;
    isFinished = true;
    nextTick(() => {
      const graphics = prepareGraphics(myChart);
      myChart.setOption({
        graphic: graphics,
      });
    });
  });
}
const prepareGraphics = (myChart: any) => {
  const seriesModel = myChart.getModel().getSeriesByIndex(0);
  const data = seriesModel.getData();
  const graphics: {
    type: string;
    style: {
      image: string; // 使用导入的背景图片
      x: number;
      y: number;
      width: number;
      height: number;
    };
    z: number; // 确保在 rect 下层
    silent: boolean;
  }[] = [];
  let list = cloneDeep(data);
  list._itemLayouts.shift();
  list.each((idx: number) => {
    const layout = list.getItemLayout(idx);
    if (!layout) return;
    // const rect = {
    //   type: 'rect',
    //   shape: {
    //     x: layout.x,
    //     y: layout.y,
    //     width: layout.width,
    //     height: layout.height,
    //   },
    //   style: {
    //     fill: 'transparent', // 背景透明
    //     stroke: '#151515', // 边框颜色
    //     lineWidth: 2, // 边框宽度
    //     shadowBlur: 10,
    //     shadowColor: 'rgba(0, 0, 0, 0.3)',
    //   },
    //   z: 100, // 确保在 treemap 上层
    //   silent: true, // 忽略鼠标交互
    // };
    let colorsKey = getColorKey(idx, colorList.length);
    let colors = colorList[colorsKey];
    const image = {
      type: 'image',
      style: {
        image: bgMap[colors], // 使用导入的背景图片
        x: layout.x,
        y: layout.y,
        width: layout.width,
        height: layout.height,
      },
      z: 99, // 确保在 rect 下层
      silent: true, // 忽略鼠标交互
    };
    // graphics.push(rect);
    graphics.push(image);
  });
  return graphics;
};
let bgMap = reactive<Record<string, string>>({});
onMounted(async () => {
  init();
  // await Promise.all(
  //   colorList.map(async (color) => {
  //     const circleSvg = await replaceSvgColor(bg, '#3787FF', color);;
  //     bgMap[color] = circleSvg;
  //   })
  // );
  bgMap = Object.fromEntries(
    await Promise.all(
      colorList.map(async (color) => {
        return [color, await replaceSvgColor(bg, '#57BEFB', color)];
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
