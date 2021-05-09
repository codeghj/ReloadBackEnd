<!--  -->
<template>
<div class='home'>
 <el-container class="content">
  <el-header class="header">
      <div class="header-item-left">
       
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="homeout">退出</el-button>
  </el-header>
  <el-container>
    <el-aside :width="collapse?'64px':'200px'" class="aside">
      <a class="control-menu" @click="controlMenu" href="javascript:;">|||</a>
        <el-menu
        :unique-opened="true"
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="collapse"
      :collapse-transition="false"
      :router="true"
      :default-active="$route.path"
      >
      <el-submenu :index="item.id+''" v-for="(item,index) in menu" :key="index">
        <template slot="title">
          <i :class="fonticon[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="'/'+subitem.path" v-for="(subitem,index) in item.children" :key="index"> 
            <i class="el-icon-menu"></i>
            {{subitem.authName}}
            </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
collapse:false,
 menu:[{authName:'用户管理',children:[{authName:'用户列表',path:'users'}],id:'125'},
       {authName:'商品管理',children:[{authName:'商品列表',path:'goods'}],id:'102'},
        {authName:'穿搭管理',children:[{authName:'穿搭列表',path:'reload'}],id:'145'},
        {authName:'订单管理',children:[{authName:'订单列表'}],id:'103'},
        {authName:'数据管理',children:[{authName:'数据列表'}],id:'101'}
 ],
  fonticon:{
        '125':'iconfont icon-yonghu ',
        '103':'iconfont icon-dingdan ',
        '101':'iconfont icon-shuju ',
        '102':'iconfont icon-shangpin ',
        '145':'iconfont icon-quanxian ',
      }
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  homeout(){

  },
  controlMenu(){
   this.collapse=!this.collapse
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>
.home{
    height: 100%;
    
}
.content{
    height: 100%;
}
.header{
    background-color: #707070;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 20px;
    padding-left: 5px;
}
.el-container{
  padding: 0;
  text-align: none;
}
.el-submenu{
  position: relative;
  left: -5px;
}
.aside{
    background-color: #545c64;
    position: relative;
}
.main{
    background-color: #eee;
}
.header-item-left img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}
.header-item-left{
    display: flex;
    align-items: center;
    
    
}
.control-menu{
  line-height: 30px;
  color: white;
  font-size: 20px;
  letter-spacing:5px;
  text-align: center;
  width: 100%;
  text-decoration: none;
  display: block;
  margin: 0 auto;
  
}
.el-menu-vertical-demo{
  border-right: none;
}
.iconfont {
  margin-right: 10px;
  font-size: 20px;
  color:#fff;
}
section{
  text-align: unset;
  
}

</style>