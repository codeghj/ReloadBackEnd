<!--  -->
<template>
<div class='reload'>
    <el-breadcrumb separator="/">
  <el-breadcrumb-item ><a href="/home">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a href="/home">穿搭管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>穿搭列表</el-breadcrumb-item>
</el-breadcrumb>
    <el-card>
    <el-row :gutter="20">
    <el-col :span="8">
      <el-input
      v-model="page.query"
    placeholder="请输入内容"
   >
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
    </el-col>
    <el-col :span="16">
     <el-button type="primary" icon="el-icon-search" @click="queryReload">搜索</el-button>
     <el-button type="success"  icon="el-icon-upload" @click="addReload">增加穿搭</el-button>
    </el-col>
  </el-row>
   <el-table
    :data="reload"
    stripe
    border
    :highlight-current-row="true"
    size="medium"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="穿搭id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="穿搭名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="img"
      label="穿搭图片"
      width="180">
      <template v-slot="scope">
        <div class="img_wrape">
          <div class="img_content" v-for="(item,index) in scope.row.img">
        <img :src="item" alt="">
        </div>
      
      </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="occassions"
      label="穿搭适应场合"
      width="180">
    </el-table-column>
     <el-table-column
      prop="weather"
      label="适应天气"
      width="100">
    </el-table-column>
    <el-table-column
      prop="currentindex"
      label="穿搭指数"
      width="100"
      >
    </el-table-column>
    <el-table-column
    
      label="操作"
     >
     <template v-slot="scope">
        <el-button type="warning" size="mini" @click="updateReload(scope.row)">修改</el-button>
       <el-button type="danger" @click="deleteReload(scope.row.id)" size="mini">删除</el-button>
        <el-button type="primary" size="mini" @click="addDetailsReload(scope.row)" >添加穿搭详情</el-button>
         <el-button type="warning" size="mini" class="change_details" @click="updateDetailsReload(scope.row)">修改穿搭详情</el-button>
     </template>

    </el-table-column>
   </el-table>
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[5, 7, 10, 15]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <!-- 穿搭添加 -->
    <el-dialog
    title="添加穿搭"
    :visible.sync="dialogVisible"
    width="30%"
    @close="details_dialogClose"
    :before-close="handleClose">
    <el-upload
       class="upload-demo"
       action=""
       ref="upload"
       :on-preview="handlePreview"
       :on-remove="handleRemove"
       :before-remove="beforeRemove"
        multiple
        :auto-upload="false"
        :http-request="httpRequest"
       :limit="3"
       :on-exceed="handleExceed"
       :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    <el-form :model="ReloadForm" :rules="Reloadrules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="穿搭标题" prop="title">
      <el-input v-model="ReloadForm.title"></el-input>
       </el-form-item>
       <el-form-item label="穿搭适应场合" prop="occassions">
       <el-select v-model="ReloadForm.occassions" placeholder="请选择">
     <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
       </el-form-item>
       <el-form-item label="穿衣指数" prop="index">
      <el-select v-model="ReloadForm.index" placeholder="请选择">
     <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
       </el-form-item>
       <el-form-item label="穿搭适应天气" prop="weather">
      <el-input v-model="ReloadForm.weather" placeholder="多种天气逗号分隔" ></el-input>
       </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureReloadUpload">确 定</el-button>
  </span>
</el-dialog>

 <!-- 穿搭更新 -->

 <el-dialog
    title="更新穿搭"
    :visible.sync="updatedialogVisible"
    width="30%"
    @close="dialogClose"
    :before-close="updatehandleClose">
    <el-upload
       class="upload-demo"
       action=""
       ref="updateupload"
        multiple
        :auto-upload="false"
        :http-request="httpRequest1"
       :limit="3"
       :on-exceed="handleExceed"
       :file-list="fileList1">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    <el-form :model="ReloadForms" :rules="Reloadrules" ref="updateruleForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="穿搭标题" prop="title">
      <el-input v-model="ReloadForms.title"></el-input>
       </el-form-item>
       <el-form-item label="穿搭适应场合" prop="occassions">
       <el-select v-model="ReloadForms.occassions" placeholder="请选择">
     <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
       </el-form-item>
       <el-form-item label="穿衣指数" prop="index">
      <el-select v-model="ReloadForms.index" placeholder="请选择">
     <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
       </el-form-item>
       <el-form-item label="穿搭适应天气" prop="weather">
      <el-input v-model="ReloadForms.weather" placeholder="多种天气逗号分隔" ></el-input>
       </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureupdateReloadUpload">确 定</el-button>
  </span>
</el-dialog>

<!--穿搭详情添加  -->

<el-dialog
  title="添加穿搭详情"
  :visible.sync="ReloadDetaildialogVisible"
  width="40%"
   @close="ReloadDetailclose"
  :before-close="ReloadDetailhandleClose">
   <el-upload
       class="upload-demo"
       action=""
       ref="ReloadDetailupload"
        multiple
        :auto-upload="false"
        :http-request="httpRequest2"
       :limit="3"
        :on-exceed="handleExceed"
       :file-list="fileListReloadDetail">
        <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
   </el-upload>
   <el-form :model="ReloadDetailForms" :rules="ReloadDetailrules" ref="ReloadDetailForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="穿搭对应商品id" prop="goodsid">
      <el-input v-model="ReloadDetailForms.goodsid" placeholder="请输入穿搭对应商品id，逗号分隔"></el-input>
       </el-form-item>
       <el-form-item label="穿搭描述" prop="details">
      <el-input v-model="ReloadDetailForms.details"  type="textarea"
        :rows="5"  maxlength="150"  show-word-limit placeholder="请输入穿搭描述"></el-input>
       </el-form-item>
   </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="ReloadDetaildialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureAddReloadDetails">确 定</el-button>
  </span>
</el-dialog>

<!-- 更新详情 -->

<el-dialog
  title="更新穿搭详情"
  :visible.sync="updateReloadDetaildialogVisible"
  width="40%"
   @close="updateReloadDetailclose"
  :before-close="updateReloadDetailhandleClose">
   <el-upload
       class="upload-demo"
       action=""
       ref="updateReloadDetailupload"
        multiple
        :auto-upload="false"
        :http-request="httpRequest3"
        :limit="3"
        :on-exceed="handleExceed"
       :file-list="fileListupdateReloadDetail">
        <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
   </el-upload>
   <el-form :model="updateReloadDetails" :rules="ReloadDetailrules" ref="updateReloadDetailsForm" label-width="130px" class="demo-ruleForm">
      <el-form-item label="穿搭对应商品id" prop="goodsid">
      <el-input v-model="updateReloadDetails.goodsid" placeholder="请输入穿搭对应商品id，逗号分隔"></el-input>
       </el-form-item>
       <el-form-item label="穿搭描述" prop="details">
      <el-input v-model="updateReloadDetails.details"  type="textarea"
        :rows="5"  maxlength="150"  show-word-limit placeholder="请输入穿搭描述"></el-input>
       </el-form-item>
   </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="updateReloadDetaildialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sureUpdateReloadDetails">确 定</el-button>
  </span>
</el-dialog>



</div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import{request} from '@/network/index.js'
import uuid from '@/components/common/uuid.js'
import lodash from 'lodash'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
  page:{
      query:'',
      currentPage:1,
      pageSize:5
  },
  reload:[],
  dialogVisible:false,
  updatedialogVisible:false,
  ReloadForm:{
      title:'',
      occassions:'',
      index:null,
      weather:''
  },
  Reloadrules:{
      title:[{ required: true, message: '请输入穿搭标题', trigger: 'blur' },],
      occassions:[{ required: true, message: '请输入穿搭适应场合', trigger: 'blur' },],
      index:[{ required: true, message: '请输入穿衣指数', trigger: 'blur' },],
      weather:[{ required: true, message: '请输入穿衣指数', trigger: 'blur' },]
  },
   options:[
    {
      value: 1,
      label: '正式场合'
    },
    {
      value: 0,
      label: '非正式场合'
    }
  ],
  options1:[
    {
      value:1,
      label:'>=33度'
    },
    {
      value:2,
      label:'28度~33度'
    },
    {
      value:3,
      label:'25度~28度'
    },
    {
      value:4,
      label:'20度~25度'
    },
    {
      value:5,
      label:'15度~20度'
    },
    {
      value:6,
      label:'5度~15度'
    },
    {
      value:7,
      label:'-15度~5度'
    },
    {
      value:8,
      label:'<-15度'
    },
  ],
  fileList:[],
  fileList1:[],
  file:[],
  updatefile:[],
  ReloadForms:{},
  total:0,
  ReloadDetaildialogVisible:false,
  updateReloadDetaildialogVisible:false,
  fileListReloadDetail:[],
  ReloadDetailFile:[],
  ReloadDetailForms:{
    goodsid:'',
    details:''
  },
  ReloadDetailrules:{
    goodsid:[{ required: true, message: '请输入穿搭对应商品', trigger: 'blur' }],
    details:[{ required: true, message: '请输入穿搭描述', trigger: 'blur' }]
  },
  reloadid:'',
  updateReloadDetails:{},
  fileListupdateReloadDetail:[],
  updateReloadDetailFile:[]
  
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {
    $route:{
        handler(){
        if(Object.keys(this.$route.query).length!=0){
            this.page.query=this.$route.query.query
             this.page.currentPage=parseInt(this.$route.query.currentPage)
            this.page.pageSize= parseInt(this.$route.query.pageSize) 
           
        }else{
            this.page.query=''
              this.page.currentPage=1
            this.page.pageSize=5
        }
        this.getData()
        }
    }
},
//方法集合
methods: {
   async getData(){
       const{data:res}=await request({url:'/ReloadPage',data:this.page,method:"post"})
       console.log(res)
       if(res.code===200){
           this.reload=res.datas
           this.total=res.total
           for(let item of this.reload){
               if(item.occassions==1){
                  item.occassions="正式场合" 
               }else{
                   item.occassions="非正式场合" 
               }
         let arr= item.img.split(",")
        let arrs= arr.map(item=> {return 'http://localhost:8888/reloadimg/reload/'+item})
        console.log(arrs)
        item.img=arrs
        }
       } 
    },
    addReload(){
     this.dialogVisible=true
    },
    handleClose(){
        this.$confirm('此操作将关闭添加界面, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.dialogVisible=false
        }).catch(()=>{
          this.dialogVisible=true
          this.$message({
            type: 'info',
            message: '已取消关闭'
          }); 
        })
      
    },
    updatehandleClose(){
       this.$confirm('此操作将关闭添加界面, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.updatedialogVisible=false
        }).catch(()=>{
          this.updatedialogVisible=true
          this.$message({
            type: 'info',
            message: '已取消关闭'
          }); 
        })
      
    },
    queryReload(){
         this.$router.push({path:'/reload',query:{query:this.page.query, currentPage:this.page.currentPage,pageSize:this.page.pageSize}})
       this.getData()

    },
    handlePreview(){

    },
    handleRemove(){

    },
    beforeRemove(){
        
    },
    handleExceed(){

    },
    httpRequest(param){
     this.file.push(param.file)
    },
    httpRequest1(param){
     this.updatefile.push(param.file)
    },
    httpRequest2(param){
      this.ReloadDetailFile.push(param.file)
    },
     sureReloadUpload(){
        this.$refs.ruleForm.validate( async valid=>{
            console.log(valid)
            if(valid){
             let _this=this
             let i=0
             let upData = new FormData();
             this.$refs.upload.submit()
             console.log(this.file)
      let arr= _this.file.filter((item,index)=>{
             return this.file.indexOf(item)===index
          })
          console.log(arr)
           arr.forEach(  function (files) {
               let Reg=/\.(png|jpg|gif)$/
               let t= Reg.test(files.name);
               console.log(t)
               if(t){
                i=i+1
                 upData.append('img', files);
                  
               }
               
               // 因为要上传多个文件，所以需要遍历
          
        //    console.log(res)
            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        })
                 let s= uuid()
                  console.log(s)
                  upData.append('id',s)
                     upData.append('title',_this.ReloadForm.title)
                   upData.append('occassions',_this.ReloadForm.occassions)
                     upData.append('index',_this.ReloadForm.index)
                      upData.append('weather',_this.ReloadForm.weather)
                   const{data:res}=await request({url:'/reloadSave',data:upData,method:"post"})
                   console.log(res)
                   if(res.code===200){
                     _this.$message.success(res.message)
                     _this.dialogVisible=false
                     this.$refs.ruleForm.resetFields()
                     this.getData()
                   }else{
                     _this.$message.success(res.message)
                   }
        
        
            }else{
                this.$message.error("格式错误");
            }
        })
    },
    sureupdateReloadUpload(){
         this.$refs.updateruleForm.validate( async valid=>{
            console.log(valid)
            if(valid){
             let _this=this
             let i=0
             let upData = new FormData();
             this.$refs.updateupload.submit()
             console.log(this.updatefile)
             if(this.updatefile.length!=0){
      let arr= _this.updatefile.filter((item,index)=>{
             return this.updatefile.indexOf(item)===index
          })
          console.log(arr)
           arr.forEach(  function (files) {
               let Reg=/\.(png|jpg|gif)$/
               let t= Reg.test(files.name);
               console.log(t)
               if(t){
                i=i+1
                 upData.append('img', files);
                  
               }
               
               // 因为要上传多个文件，所以需要遍历
          
        //    console.log(res)
            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        })
                 let s= uuid()
                  console.log(s)
                  upData.append('id',_this.ReloadForms.id)
                     upData.append('title',_this.ReloadForms.title)
                   upData.append('occassions',_this.ReloadForms.occassions)
                     upData.append('index',_this.ReloadForms.index)
                       upData.append('weather',_this.ReloadForms.weather)
                   const{data:res}=await request({url:'/updateReload',data:upData,method:"post"})
                   console.log(res)
                   if(res.code===200){
                     _this.$message.success(res.message)
                     _this.updatedialogVisible=false
                     this.$refs.updateruleForm.resetFields()
                     this.getData()
                   }else{
                     _this.$message.success(res.message)
                   }
             }else{
              let rows=lodash.cloneDeep(this.ReloadForms);
              delete rows.img
               const{data:res}=await request({url:'/updateArgsReload',data:rows,method:"post"})
               if(res.code==200){
                    _this.$message.success(res.message)
                     _this.updatedialogVisible=false
                     this.$refs.updateruleForm.resetFields()
                     this.getData()
               }else{
                     _this.$message.success(res.message)
                   }
              
             }
         
            }else{
                this.$message.error("格式错误");
            }
        })

    },
    handleSizeChange(val){
        this.page.pageSize=val
        this.$router.push({path:'/reload',query:{query:'',currentPage:this.page.currentPage,pageSize:this.page.pageSize}})
        
    },
    handleCurrentChange(val){
     this.page.currentPage=val
      this.$router.push({path:'/reload',query:{query:'', currentPage:this.page.currentPage,pageSize:this.page.pageSize}})
    },
    updateReload(row){
     this.updatedialogVisible=true
     this.ReloadForms=row 
     console.log(this.ReloadForms.id)

    },
    deleteReload(id){
       this.$confirm('此操作将删除该穿搭, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
        const{data:res}=  await request({url:'/deleteReload',params:{id},method:"get"})
        const{data:res1}=await  request({url:'/deleteReloadDetails',params:{reloadid:id},method:"get"})
        console.log(res)
        if(res.code===200&&res1.code===200){
        let index= this.reload.findIndex(item=>item.id===id)
        this.reload.splice(index,1)
        this.$message.success(res.message)
        }else{
           this.$message.success(res.message)
        }
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          }); 
        })
        

    },
    addDetailsReload(row){
       this.ReloadDetaildialogVisible=true
      this.reloadid=row.id

    },
    details_dialogClose(){
           this.$refs.ruleForm.resetFields()
           this.fileList=[]
           this.file=[]
    },
    dialogClose(){
        this.$refs.updateruleForm.resetFields()
        this.fileList1=[]
        this.updatefile=[]
    },
    ReloadDetailclose(){
       this.ReloadDetailFile=[]
       this.fileListReloadDetail=[]
       this.$refs.ReloadDetailForm.resetFields()

    },
    ReloadDetailhandleClose(){
       this.$confirm('此操作将关闭添加界面, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.ReloadDetaildialogVisible=false
        }).catch(()=>{
          this.ReloadDetaildialogVisible=true
          this.$message({
            type: 'info',
            message: '已取消关闭'
          }); 
        })
    },
    sureAddReloadDetails(row){
      console.log(row)
        this.$refs.ReloadDetailForm.validate( async valid=>{
            console.log(valid)
            if(valid){
             let _this=this
             let i=0
             let upData = new FormData();
             this.$refs.ReloadDetailupload.submit()
             console.log(this.file)
      let arr= _this.ReloadDetailFile.filter((item,index)=>{
             return this.ReloadDetailFile.indexOf(item)===index
          })
          console.log(arr)
           arr.forEach(  function (files) {
               let Reg=/\.(png|jpg|gif)$/
               let t= Reg.test(files.name);
               console.log(t)
               if(t){
                i=i+1
                 upData.append('img', files);
                  
               }
               
               // 因为要上传多个文件，所以需要遍历
          
        //    console.log(res)
            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        })
                     upData.append('goodsid',_this.ReloadDetailForms.goodsid)
                     upData.append('reloadid',_this.reloadid)
                     upData.append('details',_this.ReloadDetailForms.details)
                   const{data:res}=await request({url:'/uploadReloadDetails',data:upData,method:"post"})
                   console.log(res)
                   if(res.code===200){
                     _this.$message.success(res.message)
                     _this.ReloadDetaildialogVisible=false
                     this.$refs.ReloadDetailForm.resetFields()
                   }else{
                     _this.$message.success(res.message)
                   }
        
        
            }else{
                this.$message.error("格式错误");
            }
        })
    },
    async updateDetailsReload(row){
    const{data:res}=await  request({url:'/selectReloadDetails',params:{reloadid:row.id},method:"get"})
    if(res.code==200){
      this.reloadid=row.id
      this.updateReloadDetails=res.data
      this.updateReloadDetaildialogVisible=true
    }else if(res.code===201){
      this.$message.error(res.message)
    }else{
       this.$message.error(res.message)
    }
     


    },
    updateReloadDetailclose(){
       this.$refs.updateReloadDetailsForm.resetFields()
       this.updateReloadDetailFile=[]
       this.fileListupdateReloadDetail=[]
    },
    updateReloadDetailhandleClose(){
     this.$confirm('此操作将关闭添加界面, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.updateReloadDetaildialogVisible=false
        }).catch(()=>{
          this.updateReloadDetaildialogVisible=true
          this.$message({
            type: 'info',
            message: '已取消关闭'
          }); 
        })
    },
    httpRequest3(param){
     this.updateReloadDetailFile.push(param.file)
    },
    sureUpdateReloadDetails(){
      this.$refs.updateReloadDetailsForm.validate( async valid=>{
            console.log(valid)
            if(valid){
             let _this=this
             let i=0
             let upData = new FormData();
             this.$refs.updateReloadDetailupload.submit()
             console.log(this.updatefile)
             if(this.updateReloadDetailFile.length!=0){
                upData.append('id',_this.updateReloadDetails.id)
      let arr= _this.updateReloadDetailFile.filter((item,index)=>{
             return this.updateReloadDetailFile.indexOf(item)===index})
          console.log(arr)
           arr.forEach(  function (files) {
               let Reg=/\.(png|jpg|gif)$/
               let t= Reg.test(files.name);
               console.log(t)
               if(t){
                i=i+1
                 upData.append('img', files);
                  
               }
               
               // 因为要上传多个文件，所以需要遍历
          
        //    console.log(res)
            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        })
                
                 
                    upData.append('goodsid',_this.updateReloadDetails.goodsid)
                    upData.append('reloadid',_this.reloadid)
                     upData.append('details',_this.ReloadDetailForms.details)
                   const{data:res}=await request({url:'/updateReloadDetails',data:upData,method:"post"})
                   console.log(res)
                   if(res.code===200){
                     _this.$message.success(res.message)
                     _this.updateReloadDetaildialogVisible=false
                     this.$refs.updateReloadDetailsForm.resetFields()
                    
                   }else{
                     _this.$message.success(res.message)
                   }
             }else{
              let rows=lodash.cloneDeep(this.updateReloadDetails);
              delete rows.img
               const{data:res}=await request({url:'/updateArgReloadDetais',data:rows,method:"post"})
               if(res.code==200){
                    _this.$message.success(res.message)
                     _this.updateReloadDetaildialogVisible=false
                     this.$refs.updateReloadDetailsForm.resetFields()
                   
               }else{
                     _this.$message.success(res.message)
                   }
              
             }
         
            }else{
                this.$message.error("格式错误");
            }
        })
    }




},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  if(Object.keys(this.$route.query).length!=0){
       this.page.query=this.$route.query.query
            this.page.currentPage=parseInt(this.$route.query.currentPage)
            this.page.pageSize= parseInt(this.$route.query.pageSize) 
           
        }else{
            this.query=''
              this.page.currentPage=1
            this.page.pageSize=5
        }
        this.getData()
 
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
.el-card{
    margin-top: 10px;
}
.el-table{
    margin-top: 20px;
}
.el-form{
    margin-top: 20px;
}
.img_wrape{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .img_content img{
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }
  .change_details{
    margin-top: 20px;
    margin-left: -1px;
  }
  .el-pagination{
    width: 50%;
    margin: 0 auto;
    margin-top: 10px;
}
</style>