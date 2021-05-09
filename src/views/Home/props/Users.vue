<!--  -->
<template>
<div class='users'>
 <el-breadcrumb separator="/">
  <el-breadcrumb-item ><a href="/home">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a href="/home">用户管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-input
    placeholder="请输入内容"
    v-model="page.query">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
    </el-col>
    <el-col :span="1">
     <el-button type="primary" icon="el-icon-search" @click="queryUser">搜索</el-button>
    </el-col>
  </el-row>
<el-table
    :data="user"
    stripe
    border
    :highlight-current-row="true"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="用户id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="avator"
      label="头像图片"
      width="180"
     >
    </el-table-column>
    <el-table-column
      label="操作"
     >
     <template v-slot="scope">
       <el-button type="danger" @click="deleteUser(scope.row.id)" size="mini">删除</el-button>
     </template>

    </el-table-column>
</el-table>
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[2, 5, 7, 9]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import{request} from '@/network/index.js'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  user:[],
  page:{
    query:'',
    currentPage:1,
    pageSize:2
  },
  total:0,

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   async selectalluser(){
    const{data:res}=await  request({url:'/SelectAllUser',data:this.page,method:'post'})
    console.log(res)
    this.user=res.records
    this.total=res.total
  },
  handleSizeChange(val){
  this.page.pageSize=val
  this.selectalluser()
  },
  handleCurrentChange(val){
   console.log(val)
   this.page.currentPage=val
   this.selectalluser()
  },
  queryUser(){
    this.selectalluser()
  },
  async deleteUser(id){
   console.log(id)
    const{data:res}= await request({url:'deleteUser',params:{id}})
    console.log(res)
    if(res.code===200){
    let i=this.user.findIndex(item=>item.id=res.data.id)
    this.user.splice(i,1)
    this.$message.success("删除成功")
    this.selectalluser()
    }
  }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.selectalluser()
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
<style scoped>
.el-card{
  margin-top: 10px;
}
.el-pagination{
  width: 50%;
  margin: 0 auto;
  margin-top: 10px;
}
.el-row{
  margin-bottom: 10px;
}
</style>