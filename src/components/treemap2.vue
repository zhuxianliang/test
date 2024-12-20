<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import * as echarts from "echarts";
import _ from 'lodash';
import bg from "../assets/treemapBg.svg";
let colorList = ["#57BEFB","#FFDB66","#DDFEFF", "#00D5A2", "#3854B8","#A3BD19", "#44D3DC","#DA4A75"];
async function init() {
  var myChart = echarts.init(chartDom.value);

  // 准备数据
  var data = [
    {
      name: "山东",
      value: 9999,
      itemStyle: { color: '#151515' },
    },
    {
      name: "潍坊",
      value: 5555,
      itemStyle: { color: '#151515' },
    },
  ];
  let count = data.reduce((acc, cur) => acc + cur.value, 0);

  // 配置option
  var option = {
    tooltip: {
      trigger: "item",
      backgroundColor: "#0C0D0D",
      borderWidth: 0,
      textStyle: {
        color: "#D3FFFF",
      },
      formatter: (params) => {
        return `${params.name}&nbsp&nbsp${((params.value / count) * 100).toFixed(
          2
        )}% <br />${params.value}&nbsp&nbsp人次`;
      },
    },
    graphic: [],
    series: [
      {
        type: "treemap",
        name: 'option',
        left: "0%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        width: "100%",
        height: "100%",
        leafDepth: 1, // 控制展示的层级深度
        // colorSaturation:0,
        // visibleMin:2,// 某个节点小于这个数值，不显示
        drillDownIcon: '',
        nodeClick: false, //点击节点是否生效
        roam: false, //静止平移和拖拽
        breadcrumb: { show: false },//面包屑，能够显示当前节点的路径。
        itemStyle: {
          borderWidth: 0,
          borderColor: '#151515',
          color: undefined,
          gapWidth: 4, // 间距
        },
        label: {
          formatter: '{b|{b}}',
          rich: {
            b: {
              width: 71,
              height: 48,
              align: "center",
              // backgroundColor: {
              //   image: bg, // 这里替换为你的图片路径
              // },
              color: "#000",
              fontSize: 18,
            },
          },
        },
        data: data,
      },
    ],
  };
  option && myChart.setOption(option);

  let isFinished = false;
  myChart.on('finished', async () => {
    if (isFinished) return;
    isFinished = true;
    await nextTick();
    const graphics = await prepareGraphics(myChart);
    myChart.setOption({
      graphic: graphics,
    });
  });
}
const prepareGraphics = (myChart) => {
  const seriesModel = myChart.getModel().getSeriesByIndex(0);
  const data = seriesModel.getData();
  const graphics = [];
  let list = _.cloneDeep(data);
  list._itemLayouts.shift();
  list.each((idx) => {
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

    const image = {
      type: 'image',
      style: {
        image: bg, // 使用导入的背景图片
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
  console.log(graphics, '5555555555');
  return graphics;
};
onMounted(async () => {
  init();
});
const chartDom = ref(); 
</script>

<template>
  <div class="w-full h-full p-4">
    <div class="h-full w-full lineCharts" ref="chartDom"></div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
