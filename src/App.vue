<script setup>
import treemap from './components/treemap.vue';
import treemap1 from './components/treemap2.vue';
import skany from './components/skany.vue';
import skany1 from './components/skany2.vue';
</script>

<template>
  <div class="h-full w-full" style="background-color: #151515">
    <div class="flex justify-center pt-10">
      <div class="h-[200px] w-[400px] border-2 border-[#333]">
        <img
          class="h-full w-full"
          src="./assets/img/treemap.png"
          alt=""
          srcset="" />
      </div>
      <div class="h-[200px] w-[400px] border-2 border-[#333]">
        <treemap />
        <div class="text-center text-white">
          背景色(rgb,rgba,渐变)，不可模糊,内容可单个设置样式，但不能垂直布局（多行情况）
        </div>
      </div>
      <div class="h-[200px] w-[400px] border-2 border-[#333]">
        <treemap1 />
        <div class="text-center text-white">
          背景图,如果里面还有子项，该方案无法使用，内容垂直布局，但不能单个设置样式
        </div>
      </div>
    </div>
    <div class="flex justify-center pt-20">
      <div class="h-[200px] w-[400px] border-2 border-[#333]">
        <img
          class="h-full w-full"
          src="./assets/img/skany.png"
          alt=""
          srcset="" />
      </div>
      <div class="h-[200px] w-[400px] border-2 border-[#333]">
        <skany />
        <div class="text-center text-white">
          矩形边框raba，中间链接线无法使用渐变 , 无法设置单个矩形宽度
        </div>
      </div>
      <div class="h-[200px] w-[400px] border-2 border-[#333]">
        <skany1 />
        <div class="text-center text-white">
          中间链接线渐变只能从开始位置到结束位置渐变，但左右两边矩形无法使用渐变，只能（rgb、rgba），无法设置单个矩形宽度
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.treemap {
  box-sizing: border-box;
  width: 400px;
  height: 200px;
  border: 0.5px solid;
  background: linear-gradient(
    90deg,
    rgba(87, 190, 251, 0.24) 6%,
    rgba(87, 190, 251, 0) 100%
  );
  border-image: linear-gradient(
      123deg,
      rgba(255, 255, 255, 0.4) 1%,
      rgba(255, 255, 255, 0.16) 100%
    )
    0.5;
  filter: blur(2px);
}
</style>
