<template>
  <div class="wrap">
    <header class="title">上帝说我帅的很</header>
    <div class="bd">
      <ul class="project">
        <li class="project_item" v-for="(project,index) in projects" :key="index">
         <router-link :to="project.path">{{project.name}}</router-link> 
        </li>
      </ul>
    </div>
    <footer class="footer">广告位招租</footer>
  </div>
</template>
<script>
import {projects} from './config'
export default {
  name: 'home',
  data(){
    return {
    }
  },
  computed:{
    projects(){
      return projects
    }
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<style lang='less' scoped >
*{
  padding: 0;
  margin: 0;
}
li{
  list-style: none;
}
.wrap{
  .title{
    width: 100%;
    height: 1.333333rem;
    text-align: center;
    line-height: 1.333333rem;
    font-size: .533333rem;
    font-weight: 700;
    color: #fff;
    background: skyblue;
  }
  .bd{
    margin-top: .6rem;
    .project{
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .project_item{
        width: 1.333333rem;
        height: 1.333333rem;
        font-size: .266667rem;
        line-height: .666667rem;
        text-align: center;
        background: yellow;
        a{
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
        }
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: .666667rem;
    font-size: .266667rem;
    text-align: center;
    line-height: .666667rem;
    background: slategray;
  }
}

</style>
