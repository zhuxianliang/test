<script setup>
import treemap from './components/treemap.vue'
import treemap1 from './components/treemap2.vue'
</script>

<template>
  <div class="flex justify-center w-full h-full pt-10" style="background-color: #151515;">
    <div class="w-[400px] h-[200px] border-2 border-[#333]" >
      <treemap />
      <div class="text-center text-white">背景色，不可模糊</div>
    </div>
    <div class="w-[400px] h-[200px] border-2 border-[#333]" >
      <treemap1 />
      <div class=" text-center text-white">背景图,如果里面还有子项，该方案无法使用</div>
    </div>
    <div class="treemap"></div>
  </div>
</template>

<style lang="less" scoped>
.treemap{
  background: linear-gradient(90deg, rgba(87, 190, 251, 0.24) 6%, rgba(87, 190, 251, 0) 100%);
box-sizing: border-box;
border: 0.5px solid;
border-image: linear-gradient(123deg, rgba(255, 255, 255, 0.4) 1%, rgba(255, 255, 255, 0.16) 100%) 0.5;
filter: blur(2px);
width: 400px;
height: 200px;
}

</style>
