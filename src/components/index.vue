<template>
  <div class="wrap">
    <header class="header">
      <h1>饿了么动画效果演示</h1>
    </header>
    <section class="main">
      <section class="foodMenu">
        <ul>
          <li v-for="(item,index) in foods" :key="index">
            {{item.menuName}}
          </li>
        </ul>
      </section>
      <section class="foodList">
        <ul v-for="(item,index) in foods" :key="index">
          <span class="menuName">{{item.menuName}}</span>
          <li v-for="(food,foodIndex) in item.menuList" :key="foodIndex">
            {{food.name}}
            <section class="operation">
              <transition name="showReduce">
                 <span @click="removeCar(item.menuName,foodIndex)" v-if="food.count">
                  <svg-icon class="reduce_icon" icon-class="reduce" ></svg-icon>
                </span>
              </transition>
              <transition name="fade">
                <span v-if="food.count">{{food.count}}</span>
              </transition>
              <span @click="addCar(item.menuName,foodIndex)">
                  <svg-icon class="add_icon" icon-class="add" ></svg-icon>
              </span>
            </section>
          </li>
        </ul>
      </section>
    </section>
    <footer class="footer">
      <section class="car_contain">
        <span class="count">1</span>
        <svg-icon class="buyCar_icon"  icon-class="buyCar"></svg-icon>
      </section>
      <section class="pay">去结算</section>
    </footer>
   
  </div>
</template>

<script>
import {foods} from '../../mockData/index'
export default {
  name: 'elem',
  data(){
    return {
      foods:foods
    }
  },
  methods:{
    removeCar(fatherName,childIndex){
      let target = this.foods.find(item => item.menuName ===  fatherName)
      if(target){
        let count = target.menuList[childIndex].count
        target.menuList[childIndex].count = count>0 ? count-1 : 0
      }
    },
    addCar(fatherName,childIndex){
      let target = this.foods.find(item => item.menuName ===  fatherName)
      if(target){
        let count = target.menuList[childIndex].count
        target.menuList[childIndex].count = count + 1
      }
    }
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
  width: 100%;
  background: #529bda;
  .header{
    position: static;
    top: 0;
    h1{
      width: 100%;
      height: 1.066667rem;
      line-height: 1.066667rem;
      font-size: 0.533333rem;
      text-align: center;
    }
  }
  .main{
    position: absolute;
    top: 1.333333rem;
    bottom: 1.333333rem;
    display: flex;
    overflow: hidden;
    width: 100%;
    .foodMenu{
      flex: 2;
      overflow: auto;
      overflow-x: hidden;
      background: #f2f4f6;
      ul{
        li{
          width: 100%;
          height:1.333333rem;
          line-height: 1.333333rem;
          border-bottom: 0.013333rem solid #ccc ;
          text-align: left;
          font-size: 0.466667rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding-left: 0.133333rem;
        }
      }
    }
    .foodList{
      flex: 6;
      overflow: auto;
      overflow-x: hidden;
      background: #fff;
      ul{
        .menuName{
          display: block;
          width: 100%;
          height: 1rem;
          padding-left: 0.133333rem;
          line-height: 1rem;
          font-size: 0.533333rem;
        }
        li{
          position: relative;
          height: 1.2rem;
          line-height: 1.2rem;
          font-size: 0.666667rem;
          margin: 0 0.4rem;
          border-bottom: 0.013333rem solid #ccc;
          .operation{
            position: absolute;
            top: 0;
            right: 0;
            text-align: center;
            display: flex;
            justify-content: flex-end;
            width: 2rem;
            align-items: center;
            .reduce_icon{
              // width: 1.066667rem;
            }
            .add_icon{
              // width: 1.066667rem;
            }
          }
        }
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.333333rem;
    background: rgb(61, 61, 63);
    .car_contain{
      position: relative;
      float: left;
      width: 70%;
      height: 100%;
      .count{
        position: absolute;
        top: 0;
        left: 0.566667rem;
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        font-size: 0.4rem;
        background: #ec5728;
      }
    }
    .pay{
      float: right;
      width: 30%;
      height: 1.333333rem;
      text-align: center;
      line-height: 1.333333rem;
      font-size: 0.666667rem;
      color: #fff;
      background: #535356;
    }
  }
}
.showReduce-enter-active, .showReduce-leave-active {
        transition: all .3s ease-out;
    }
.showReduce-enter, .showReduce-leave-active {
    opacity: 0;
    transform: translateX(1rem);
}
.fade-enter-active, .fade-leave-active {
    transition: all .3s;
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}
</style>
