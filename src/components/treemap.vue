<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import { setOpacity } from "@common/color";
let colorList = ["#57BEFB", "#FFDB66", "#DDFEFF", "#00D5A2", "#3854B8", "#A3BD19", "#44D3DC", "#DA4A75"];
let colorMap = colorList.map((item) => {
  return new echarts.graphic.LinearGradient(0, 0, 1, 0, // 从左到右的渐变
    [
      { offset: 0.06, color: setOpacity(item, 0.24) }, // 6% 处的颜色
      { offset: 1, color: setOpacity(item, 0) }, // 100% 处的颜色
    ]
  )
})
let borderColor = new echarts.graphic.LinearGradient(0, 0, 1, 0, // 从左到右的渐变
    [
      { offset: 0.1, color: setOpacity('#fff', 0) }, // 6% 处的颜色
      { offset: 0.5, color: setOpacity('#fff', 0.4) }, // 6% 处的颜色
      { offset: 0.9, color: setOpacity('#fff', 0) }, // 100% 处的颜色
    ]
  )
const data = [{ "label": "A", "value": 50 }, { "label": "B", "value": 30 }, { "label": "C", "value": 20 }, { "label": "D", "value": 40 }, { "label": "E", "value": 60 }, { "label": "F", "value": 70 }, { "label": "G", "value": 90 }, { "label": "H", "value": 100 }]
async function init() {
  var myChart = echarts.init(chartDom.value);
  let count = data.reduce((acc, cur) => acc + cur.value, 0);

  let seriesData = data.map((item, index) => { 
    return {
      name: item.label,
      value: item.value,
      itemStyle: { color: colorMap[index] },
    }  
  })
  
  // 配置option
  var option: any = {
    tooltip: {
      trigger: "item",
      backgroundColor: "#0C0D0D",
      borderWidth: 0,
      textStyle: {
        color: "#D3FFFF",
      },
      formatter: (params: { name: any; value: number; }) => {
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
        drillDownIcon: '',
        nodeClick: false, //点击节点是否生效
        roam: false, //静止平移和拖拽
        breadcrumb: { show: false },//面包屑，能够显示当前节点的路径。
        itemStyle: {
          borderWidth: 2,
          borderColor: '#151515',
          color: undefined,
        },
        label: {
          // formatter: '{b|{b}}\n{hr|}\n{c|{c}}',
          formatter: function (params: { name: string; value: number; }) {
            let arr = [
              '{b|' + params.name + '}',
              '{hr|}',
              '{c|' +
                ((params.value / count) * 100).toFixed(2) + '%'
                +
                '} '
            ];
            return arr.join('\n');
          },
          rich: {
            b: {
              color: "#fff",
              fontSize: 14,
              fontWeight: 500,
              align: 'center',
            },
            hr:{
              width: '100%',
              borderColor,
              borderWidth: 0.5,
              height: 0,
              lineHeight: 10
            },
            c: {
              color: "#fff",
              align: 'center',
              fontSize: 14,
              fontWeight: 400,
              fontFamily: 'PingFang SC',
            },  
          },
        },
        data: seriesData,
      },
    ],
  };
  option && myChart.setOption(option);
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
