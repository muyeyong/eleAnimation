<template>
  <div id="app">
    <Elem />
  </div>
</template>

<script>
import './utils/lib-flexible-2.0/index'
import Elem from './components'
export default {
  name: 'App',
  components: {
    Elem
  }
}
</script>

<style lang='less' > 
@import '/css/normalize.css';
#app{
  margin: 0 auto;
  max-width: 10rem;
  min-width: 4.266667rem;
}
</style>
