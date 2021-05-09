<!--  -->
<template>
<div class='login'>
		<div class="container demo-1">
			<div class="content">
				<div id="large-header" class="large-header">
					<canvas id="demo-canvas"></canvas>
					<div class="logo_box">
						<h3>欢迎你</h3>
						<form action="#" name="f" method="post">
							<div class="input_outer">
								<span class="u_user"></span>
								<input name="logname" class="text" style="color: #FFFFFF !important" type="text" placeholder="请输入账户" v-model:value="form.name">
							</div>
							<div class="input_outer">
								<span class="us_uer"></span>
								<input name="logpass" class="text" style="{color: #FFFFFF !important; position:absolute; z-index:100;} " v-model:value="form.password" type="password" placeholder="请输入密码">
							</div>
							<div class="mb2"><a class="act-but submit" href="javascript:;" style="color: #FFFFFF" @click="login()">登录</a></div>
						</form>
					</div>
				</div>
			</div>
		</div><!-- /container -->
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import '@/assets/css/component.css';
import '@/assets/css/demo.css';
import '@/assets/css/normalize.css';
import {sheji} from'@/assets/js/demo-1.js';
import {html5}from "@/assets/js/html5.js";
import{raf}from'@/assets/js/rAF.js';
import{tw} from'@/assets/js/TweenLite.min.js';
import {ea} from '@/assets/js/EasePack.min.js';
import{request} from '@/network/index.js'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
 form:{
     name:'',
     password:''
 }
};
},


//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   async login(){
	   console.log(this.form)
      const {data:res}=await request({url:'/login/administrator',data:this.form,method:"post"})
      console.log(res)
      if(res.code==200){
          this.$router.push('/home')
		  this.$message.success("登录成功")
      }else{
          this.$message.error("登录失败")
      }
    }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
tw()
ea()
raf()
sheji()
html5()
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


</style>