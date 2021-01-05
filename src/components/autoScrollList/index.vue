<template>
  <section class="wrap">
      <header class="header">自动滚动列表</header>
      <section class="bd">
          <auto-scroll height='300' width='200' @notice='loadData' :flag='moreData'>
            <ul class="test_scroll">
                <li v-for="(item) in list" :key="item">{{item}}</li>
            </ul>
          </auto-scroll>
      </section>
  </section>
</template>
<script>
import autoScroll from './autoScrollList'
import {scrollDir} from './config'
export default {
    components:{autoScroll},
    data(){
        return {
            list:['A','B','C','D','E','F'],
            moreData: false,
            firstLoad: true,
            uid:0,
            cityList:[
                ['北京','长沙','岳阳','上海','深圳','杭州'],
                ['常州','苏州','常熟','包头','哈佛','菏泽'],
                ['广州','常德','武汉']
            ]
        }
    },
    mounted(){
        
    },
    methods:{
        loadData(type){
            //0 上  1下
            setTimeout(()=>{
                this.list = this.getCity(type)
            },1000)
         },
        delay(){

        },
        getCity(dir){
            //0 上  1下
            if(dir=== scrollDir.down){
                if(!this.firstLoad&&this.uid<=0) {
                    this.uid = 2
                }
                let target = this.cityList[this.uid%3]
                // if(this.cityList[(this.uid+1)%3].length>=6)
                this.uid++
                this.firstLoad = false
                return target
            }else if(dir=== scrollDir.up){
                if(this.uid >= 3) this.uid = 0
                else{
                    this.uid = this.uid-1>0? this.uid-1:this.cityList.length-1
                }
                this.firstLoad = false
                return this.cityList[this.uid%3]
            }
            
        }
    }
}
</script>

<style lang='less' scoped>
.wrap{
    .header{
        width: 100%;
        height: 1.333333rem;
        text-align: center;
        line-height: 1.333333rem;
        font-size: .666667rem;
        color: #fff;
        background: chocolate;
    }
    .bd{
       padding: .666667rem;
        .test_scroll{
            li{
                text-align: center;
                background: #F5F5F5;
                &:nth-child(2n){
                    background: #C0C0C0;
                }
            }
        }
    }
}
</style>