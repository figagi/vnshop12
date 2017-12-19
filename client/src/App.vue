<template>

  <div id="app">
    <NavHead/>
    <BredCrumb>商品列表</BredCrumb>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/app.css'
import NavHead from '@/components/NavHead'
import BredCrumb from '@/components/BredCrumb'
export default {
  name: 'app',
  components:{
    NavHead,
    BredCrumb
  }
}
</script>

<style>

</style>
