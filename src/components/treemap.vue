<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import bg from "../assets/treemapBg.svg";
async function init() {
  var myChart = echarts.init(chartDom.value);
  
  let color = new echarts.graphic.LinearGradient(  0, 0, 1, 0, // 从左到右的渐变
    [
      { offset: 0.06, color: 'rgba(87, 190, 251, 0.24)' }, // 6% 处的颜色
      { offset: 1, color: 'rgba(87, 190, 251, 0)' }, // 100% 处的颜色
    ]
  )

  // 准备数据
  var data = [
    {
      name: "山东",
      value: 9999,
      itemStyle: { color },
      
      children: [
        { name: "青岛", value: 888 },
        { name: "济南", value: 666, children: [
            {
              name: '街道',
              value: 20
            }
          ] },
       
      ],
    },
    {
      name: "潍坊",
      value: 5555,
      itemStyle: { color: "#00541d" },
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
        drillDownIcon :'',
        nodeClick:false, //点击节点是否生效
        roam: false, //静止平移和拖拽
        breadcrumb:{show:false},//面包屑，能够显示当前节点的路径。
        itemStyle:{
          borderWidth: 2,
          borderColor:'#151515',
          color: undefined, 
        },
        label: {
          formatter:'{b|{b}}',
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
  console.log(option,'6666666666666666');
  
  // 使用配置项和数据显示图表
  // myChart.setOption(option);
  //   // 监听鼠标移入事件
  //   myChart.on('showTip', function (params:any) {
  //       option.series[0].markPoint.data.forEach(function (item, index) {
  //           if (item.coord[0] === params.dataIndex) {
  //               item.symbolOffset = [0, 0]; // 显示当前元素
  //           } else {
  //               item.symbolOffset = [0, -1000]; // 隐藏其他元素
  //           }
  //       });
  //       myChart.setOption(option);
  //   });
  //   myChart.on('hideTip', function () {
  //     option.series[0].markPoint.data.forEach(function (item, index) {
  //       item.symbolOffset = [0, -1000]; // 隐藏其他元素
  //     });
  //     myChart.setOption(option);
  //   });
}
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
