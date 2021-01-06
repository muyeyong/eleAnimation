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
            list:['北京','长沙','岳阳','上海','深圳','杭州'],
            moreData: false,
            firstLoad: true,
            uid:0,
            cityList:[
                ['北京','长沙','岳阳','上海','深圳','杭州'],
                ['常州','苏州','常熟','包头','哈佛','菏泽'],
                ['汉中','辽阳','梧州','燕塘','百色','毕节'],
                ['天水','酒泉','安康','白山','伊犁','鸡西'],
                ['锡林郭勒','阿拉善','通化','六盘水','朝阳','阿坝'],
                ['张家口','阳江','延安','景德镇','乌木木齐','济南'],
                ['广州','常德','武汉']
            ],
            startPage:-1,
            endPage:0
        }
    },
    mounted(){
        
    },
    methods:{
        loadData(type){
            //0 上  1下
            if(type === scrollDir.up){
                if(this.startPage<=0) return
            }
            setTimeout(()=>{
                this.list = this.getCity(type)
            },1000)
         },
        delay(){

        },
        getCity(type){
            //0 上  1下
            let result 
           if(type === scrollDir.down){
               this.endPage++
               this.startPage++
               result = this.cityList[this.endPage%this.cityList.length]
           }else if(type === scrollDir.up){
                this.endPage = this.endPage-1>0? this.endPage-1 : 0
                this.startPage = this.startPage-1>-1?this.startPage-1:-1
               result = this.cityList[(this.startPage>0? this.startPage:0)%this.cityList.length]
           }
           return result
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