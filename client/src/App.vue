<template>

  <div id="app">
    <NavHead/>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/css/app.css'
import NavHead from '@/components/NavHead'
export default {
  name: 'app',
  components:{
    NavHead,
  }
}
</script>

<style>

</style>
