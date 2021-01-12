<template>
  <section class="wrap">
      <header class="header">自动滚动列表</header>
      <section class="bd">
          <auto-scroll height='200px' width='130px' 
          @notice='loadData' 
          :haveData='moreData' 
          :loading='loading' 
          :flag='page'
          >
            <ul class="test_scroll" :data-flag='page'>
                <li v-for="(item,index) in list" :key="index">{{item}}</li>
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
            list:['1','1','1','1','1','1','1'],
            moreData: false,
            loading:false,
            firstLoad: true,
            uid:0,
            page:0,
            cityList:[
                ['1','1','1','1','1','1','1'],
                ['2','2','2','2','2','2','2'],
                ['3','3','3','3','3','3','3'],
                ['4','4','4','4','4','4','4'],
                ['5','5','5','5','5','5','5'],
                ['6','6','6','6','6','6','6'],
                ['7','7','7','7']
            ],
            startPage:-1,
            endPage:0
        }
    },
    watch:{
        startPage(value){
            console.log('startPage',value,this.loading)
        },
        endPage(value){
            console.log('endPage',value)
        }
    },
    mounted(){
        
    },
    methods:{
        loadData(type){
            this.loading = true
            this.moreData = false 
            if(type === scrollDir.up){
                if(this.startPage<=0){
                    this.moreData = false
                    this.loading = false
                    return
                }
            }
            if(type === scrollDir.down){
                if(this.endPage === this.cityList.length-1){
                    this.moreData = false
                    this.loading = false
                    return
                }
            }
            setTimeout(()=>{
                this.list = this.getCity(type)
                this.moreData = true
                this.loading = false
            },1000)
         },
        delay(){

        },
        getCity(type){
            let result 
            this.page++
           if(type === scrollDir.down){
               this.endPage++
               this.startPage++
               
               result = this.cityList[this.endPage%this.cityList.length]
           }else if(type === scrollDir.up){
                this.endPage = this.endPage-1>0? this.endPage-1 : 0
                this.startPage = this.startPage-1>0?this.startPage-1:0
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
                height: 2rem;
                line-height: 2rem;
                text-align: center;
                background: #F5F5F5;
                border-bottom: 1px solid;
                &:nth-child(2n){
                    background: #C0C0C0;
                }
            }
        }
    }
}
</style>