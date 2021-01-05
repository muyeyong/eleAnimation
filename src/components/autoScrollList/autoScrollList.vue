<template>
  <section class="easy_auto_list" 
    :style="{height:height+'px',width:width+'px'}" 
    @mouseover="stopScroll"
    @mouseleave="restartScroll"
    @scroll="scrollEvent"
    ref="scroll_wrap"
  >
    <slot></slot>
  </section>
</template>

<script>
import {scrollDir} from './config'
export default {
    //需要注意的点：更新的数据的位置 上滑后需要改变状态 
    name:'autoScroll',
    props:['width','height','flag'],
    data(){
        return{
            timeInterval: null,
            firstNode: null,
            secondNode: null,
            preNode: null,
            preScrollTop: 0,
            preOffsetheight: 0,
            dir:1,//0上 1下
            listenChildChange: false,//判断是否监听childrenDom变化
            end: false,
            sliding: false,
            load: false
        }
    },
    watch:{
        flag:{
            handler:(newVal,oldValue)=>{
                console.log(newVal,oldValue)
            },
            deep: true
        },
        // end(value){
        //     if(value){
                
        //         this.listenChildChange = false
        //         console.log('end',value,this.listenChildChange)
        //     }
        // }
    },
    mounted(){
        this.listener()
        this.init()
       
    },
    methods:{
        listener(){
            // window.addEventListener('scroll', () => {
            //     // var temp = document.getElementsByClassName('easy_auto_list')
            //     // console.log(temp[0].scrollTop) // 查看打印的值是否有变化 如果有 则说明滚滚动条在这个标签中
            //      console.log(this.secondNode.offsetTop)
            // }, true)
            const targetNode = this.$refs.scroll_wrap
            const config = { attributes: true, childList: true, subtree: true };
            let vueInstance = this
            const callback = function() {
               vueInstance.listenChildChange&&vueInstance.updateChildrenNode()
            // for(let mutation of mutationsList) {
            //     if (mutation.type === 'childList') {
            //        if(vueInstance.canChangeNode) vueInstance.updateChildrenNode()
            //     }
            //     else if (mutation.type === 'attributes') {
            //         console.log('The ' + mutation.attributeName + ' attribute was modified.');
            //     }
            // }
        };
        // 创建一个观察器实例并传入回调函数
        const observer = new MutationObserver(callback);
        // 以上述配置开始观察目标节点
        observer.observe(targetNode, config);
        },
       init(){
        //  let cloneNode = this.$refs.scroll_wrap.children[0].cloneNode(true)
        //  this.$refs.scroll_wrap.appendChild(cloneNode)
        //  this.firstNode =  this.$refs.scroll_wrap.children[0]
        //  this.secondNode =  this.$refs.scroll_wrap.children[1]
        //  console.log(this.secondNode.offsetTop,this.firstNode.offsetHeight)
        //  console.log('before',)
        this.preNode = this.$refs.scroll_wrap.children[0].cloneNode(true)
         this.timeInterval = setInterval(()=>{
             this.autoScroll()
         },15)
       },
       autoScroll(){
          // offsetTop 是不变的
           if(this.isBottom()){
            //  this.$refs.scroll_wrap.scrollTop -= this.firstNode.offsetHeight
                this.listenChildChange = true
                this.load = true 
                this.stopScroll()
                this.preScrollTop = this.$refs.scroll_wrap.scrollTop
                // this.$refs.scroll_wrap.innerHTML =""
                !this.end&&this.$emit('notice',scrollDir.down)
                if(this.end) this.listenChildChange = false
           }else{
               this.$refs.scroll_wrap.scrollTop++
           }
       },
       stopScroll(){
           this.sliding = true
           this.timeInterval&&clearInterval(this.timeInterval)
       },
       restartScroll(){
           this.sliding = false
           this.timeInterval = setInterval(()=>{
               //重启 secondNode firstNode的scrollTop scrollHeight需要考虑 2020/12/28
               this.autoScroll()
           },15)
       },
       //判断滑动方向，是否到底/顶
       scrollEvent(){
           const rootScroll = this.$refs.scroll_wrap
           if(!this.sliding || this.listenChildChange) return
            //向上滑
           if(rootScroll.scrollTop - this.preScrollTop>0){
               if(this.isBottom()){
                   if(this.end) return
                   this.listenChildChange = true
                   this.load = true 
                    this.stopScroll()
                    this.dir = scrollDir.down
                   this.$emit('notice',scrollDir.down)
               }
           }else{
               if(this.isTop()){
                   this.end = false //是不是要定义两个截止状态，开始/结束
                   this.listenChildChange = true
                   this.load = true 
                   this.stopScroll()
                   this.dir = scrollDir.up
                   this.$emit('notice',scrollDir.up)
               }
           }
           this.preScrollTop = rootScroll.scrollTop
       },
       isBottom(){
           const ele = this.$refs.scroll_wrap
           if(ele.scrollHeight - ele.scrollTop - ele.clientHeight<=10) return true
           return false
       },
       isTop(){
           if(this.$refs.scroll_wrap.scrollTop<10) return true
           return false
       },
       updateChildrenNode(){
           // eslint-disable-next-line no-debugger
         this.listenChildChange = false
         this.end = false
         this.load = false
        //  this.firstNode =  this.$refs.scroll_wrap.children[1]
        //  this.secondNode = this.$refs.scroll_wrap.children[0]
        // let tempInnerHtml = this.$refs.scroll_wrap.children[0].innerHTML
        // this.$refs.scroll_wrap.children[0].innerHTML = this.$refs.scroll_wrap.children[1].innerHTML
        // this.$refs.scroll_wrap.children[1].innerHTML = tempInnerHtml
        // this.firstNode = this.$refs.scroll_wrap.children[0]
        // this.secondNode = this.$refs.scroll_wrap.children[1]
        // 什么时候去删除子节点，会存在下一次请求的数据长度不够的情况 2020/12/29
         if(this.$refs.scroll_wrap.children.length>1){
            let index = Array.from(this.$refs.scroll_wrap.children).findIndex(item=> item.innerText.replace(/[\r\n]/g,"") == this.preNode.innerText.replace(/[\r\n]/g,""))
            if(index === -1) index = 0
            this.preOffsetheight = this.$refs.scroll_wrap.children[index].offsetHeight
            this.$refs.scroll_wrap.removeChild(this.$refs.scroll_wrap.children[index])
            if(this.$refs.scroll_wrap.children[0].offsetHeight < this.$refs.scroll_wrap.clientHeight)
           {
                // this.preOffsetheight = 0
                // this.preScrollTop = 0
                this.end = true
           }
         
        }
        if(this.dir === scrollDir.down){
            let node = this.$refs.scroll_wrap.children[0]
            this.$refs.scroll_wrap.insertBefore(this.preNode,node) 
            this.$refs.scroll_wrap.scrollTop = this.preScrollTop - this.preOffsetheight
            if(!this.end)this.preNode = this.$refs.scroll_wrap.children[1].cloneNode(true)
        }else if(this.dir === scrollDir.up){
            this.dir = scrollDir.down
            this.$refs.scroll_wrap.insertBefore(this.preNode,null)
            //滑动需要加过渡效果
            this.$refs.scroll_wrap.scrollTop = this.preScrollTop - this.preOffsetheight
            if(!this.end)this.preNode = this.$refs.scroll_wrap.children[1].cloneNode(true)
        }
        // this.$refs.scroll_wrap.scrollTop = this.preScrollTop - this.preOffsetheight
        // if(!this.end)this.preNode = this.$refs.scroll_wrap.children[1].cloneNode(true)
        this.restartScroll()
       }
    }
}
</script>

<style lang='less' scoped>
.easy_auto_list{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: auto;
    background: #fff;
}
</style>