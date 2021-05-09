<!--  -->
<template>
<div class='goods'>
     <el-breadcrumb separator="/">
  <el-breadcrumb-item ><a href="/home">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a href="/home">商品管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
     <el-button type="primary" icon="el-icon-search" @click="queryGoods">搜索</el-button>
     <el-button type="success"  icon="el-icon-upload" @click="addGoods">增加商品</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="goods"
    stripe
    border
    :highlight-current-row="true"
    size="medium"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="商品id"
      width="80">
    </el-table-column>
    <el-table-column
      
      prop="title"
      label="商品名"
      width="220">
    </el-table-column>
    <el-table-column
      
      label="商品图片"
      width="200">
      <template v-slot="scope">
        <div class="img_wrape">
          <div class="img_content" v-for="(item,index) in scope.row.img">
        <img :src="item" alt="">
        </div>
      
      </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格"
      width="80">
      
    </el-table-column>
    <el-table-column
    
      prop="fav"
      label="商品收藏"
      width="80"
     >
    </el-table-column>
    <el-table-column
    
      prop="occasions"
      label="场合"
      width="80"
     >
    </el-table-column>
    <el-table-column
     
      prop="dressindex"
      label="穿衣指数"
      width="80"
     >
    </el-table-column>
    <el-table-column
    
      prop="sort"
      label="商品分类"
      width="80"
     >
    </el-table-column>
    <el-table-column
      prop="weather"
      label="适应天气"
      width="80">
    </el-table-column>
    <el-table-column
    
      label="操作"
     >
     <template v-slot="scope">
        <el-button type="warning" size="mini" @click="updateGoods(scope.row)">修改</el-button>
       <el-button type="danger" @click="deleteGoods(scope.row.id)" size="mini">删除</el-button>
        <el-button type="primary" size="mini" @click="addDetailsGoods(scope.row)" >添加商品详情</el-button>
         <el-button type="warning" size="mini" class="change_details" @click="updateDetailsGoods(scope.row)">修改商品详情</el-button>
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

<!-- 添加商品 -->
<el-dialog
  :visible.sync="dialogVisible"
  title="添加商品"
  width="50%"
  @close="dialogClose"
  >
  <div class="conetntwrap">
  <div class="content">
  <el-upload
  action=""
  ref="upload"
  class="upload-demo"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-success="uploadSuccess"
  :auto-upload="false"
  :http-request="httpRequest"
  name="img"
  multiple
  :limit="5"
  :file-list="fileList">
  <el-button slot="trigger"  size="small" type="primary">点击上传</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click=" sureUpload" >上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  <el-form :model="goodsform" :rules="goodsrules" size="small"  ref="goodsForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="商品id" prop="id" v-if="isdisable">
    <el-input v-model="goodsform.id"  ></el-input>
  </el-form-item>
   <el-form-item label="商品名称" prop="title">
    <el-input v-model="goodsform.title"></el-input>
  </el-form-item>
   <el-form-item label="商品图片" prop="img" >
    <el-input v-model="goodsform.img" placeholder="网络图片在此输入,逗号间隔"></el-input>
  </el-form-item>
   <el-form-item label="商品价格" prop="price" >
    <el-input v-model="goodsform.price" placeholder="保留小数点两位"></el-input>
  </el-form-item>
   <el-form-item label="商品收藏数" prop="fav" >
    <el-input v-model="goodsform.fav" placeholder="整数"></el-input>
  </el-form-item>
   <el-form-item label="适应场合" prop="occasions">
    <el-select v-model="goodsform.occasions" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item label="适应温度" prop="dressindex">
    <el-select v-model="goodsform.dressindex" placeholder="请选择">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
   <el-form-item label="商品分类" prop="sort">
    <el-input v-model="goodsform.sort" placeholder="按照标准商品分类进行分类"></el-input>
  </el-form-item>
  <el-form-item label="适应天气" prop="weather">
    <el-input v-model="goodsform.weather" placeholder="两种天气之间用逗号隔开"></el-input>
  </el-form-item>
  </el-form>
  </div>
  <img src="~@/assets/img/currentindexx.png" alt="">
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible=false">取 消</el-button>
    <el-button type="primary" @click="sureSave">确 定</el-button>
  </span>
 
</el-dialog>

<!-- 添加商品详情 -->
<el-dialog
  :visible.sync="details_dialogVisible"
  width="40%"
  :before-close="handleClose"
    @close="details_dialogClose"
  >
  <div class="details-title-header">上传商品图文详情</div>
  <el-upload
  action=""
  ref="upload"
  class="upload-details"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-success="uploadSuccess"
  :auto-upload="false"
  :http-request="httpRequest"
  name="img"
  multiple
  :limit="11"
  :file-list="detailsfileList">
  <el-button slot="trigger"  size="small" type="primary">点击上传</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="sureDetailsUpload" >上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
 <div class="details-title-header" >上传商品尺码信息</div>
 <el-upload
  action=""
  ref="uploads"
  class="upload-details"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-success="uploadSuccess"
  :auto-upload="false"
  :http-request="httpRequest1"
  :before-upload="beforeSizeUpload"
  name="img"
  multiple
  :limit="2"
  :file-list="sizefileList">
  <el-button slot="trigger"  size="small" type="primary">点击上传</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="sureSizeUpload" >上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  <el-form :model="goods_details" :rules="goodsdetailsrules" size="small"  ref="goodsDetailsForm" label-width="130px" class="details-ruleForm">
  <el-form-item label="商品id" prop="goodsid" >
    <el-input v-model="goods_details.goodsid"  ></el-input>
  </el-form-item>
  <el-form-item label="商品详情图片" prop="detailImg"  >
 <el-input v-model="goods_details.detailImg"   placeholder="网络图片在此输入,逗号间隔"></el-input>
  </el-form-item>
  <el-form-item label="商品尺码图片" prop="size"  >
 <el-input v-model="goods_details.size"   placeholder="网络图片在此输入,逗号间隔"></el-input>
  </el-form-item>
   <el-form-item label="商品尺码" prop="goodssize"  >
 <el-input v-model="goods_details.goodssize"   placeholder="尺码大写，从小到大,逗号间隔"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="details_dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="detailsSure">确 定</el-button>
  </span>
</el-dialog>

<!-- 更新商品详情 -->

<el-dialog
  :visible.sync="updatedetails_dialogVisible"
  width="40%"
  :before-close="updateDetailshandleClose"
    @close="updatedetails_dialogClose"
  >
  <div class="details-title-header">上传商品图文详情</div>
  <el-upload
  action=""
  ref="upateupload"
  class="upload-details"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-success="uploadSuccess"
  :auto-upload="false"
  :http-request="uploadhttpRequest"
  multiple
  :limit="11"
  :file-list="updatedetailsfileList">
  <el-button slot="trigger"  size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
 <div class="details-title-header" >上传商品尺码信息</div>
 <el-upload
  action=""
  ref="updateuploadsize"
  class="upload-details"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-success="uploadSuccess"
  :auto-upload="false"
  :http-request="updatehttpRequestsize"
  :before-upload="beforeSizeUpload"
  multiple
  :limit="2"
  :file-list="updatesizefileList">
  <el-button slot="trigger"  size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  <el-form :model="update_goods_details" :rules="goodsdetailsrules" size="small"  ref="updategoodsDetailsForm" label-width="130px" class="details-ruleForm">
  <el-form-item label="商品id" prop="goodsid" >
    <el-input v-model="update_goods_details.goodsid"  ></el-input>
  </el-form-item>
   <el-form-item label="商品尺码" prop="goodssize"  >
 <el-input v-model="update_goods_details.goodssize"   placeholder="尺码大写，从小到大,逗号间隔"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="updatedetails_dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updatedetails_dialogVisible">确 定</el-button>
  </span>
</el-dialog>
</div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import{request} from '@/network/index.js'
import lodash from 'lodash'
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
 goods:[],
 page:{
    query:'',
    currentPage:1,
    pageSize:5
  },
  total:0,
  dialogVisible:false,
  goodsform:{
      id:'',
      title:'',
      img:'',
      price:'',
      fav:'',
      occasions:null,
      dressindex:null,
      sort:'',
      weather:''

  },
  goodsrules:{
   id:[{ required: true, message: '请输入商品id', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
    title:[{ required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }],
    img:[{ required: true, message: '请输入商品图片，或者选择商品图片文件', trigger: 'blur' },],
    price:[{ required: true, message: '请输入商品价格', trigger: 'blur' },],
    fav:[{ required: true, message: '请输入商品收藏数', trigger: 'blur' },],
    occasions:[{ required: true, message: '请输入适应场合', trigger: 'blur' },],
    dressindex:[{ required: true, message: '请输入穿衣指数', trigger: 'blur' },], 
    sort:[{ required: true, message: '请输入商品分类', trigger: 'blur' },],
    weather:[{ required: true, message: '请输入商品分类', trigger: 'blur' },],
  },
  goodsdetailsrules:{
      goodsid:[{ required: true, message: '请输入商品id', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
     detailImg:[{ required: true, message: '请输入商品详情图片', trigger: 'blur' },
    { min: 3, max: 1000, message: '长度在 5 到 1000 个字符', trigger: 'blur' }],
     size:[{ required: true, message: '请输入商品详情图片', trigger: 'blur' },
    { min: 3, max: 1000, message: '长度在 3 到 1000 个字符', trigger: 'blur' }],
      goodssize:[{ required: true, message: '请输入商品尺码', trigger: 'blur' },
    { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }],

  },
  fileList:[],
  saveorupdate:true,
  isdisable:true,
  file:[],
  details_dialogVisible:false,
  goods_details:{
    goodsid:'',
    detailImg:'',
    size:'',
    goodssize:''
  },
  detailsfileList:[],
  detailsFile:[],
  sizefileList:[],
  sizeFile:[],
  issize:false,
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
 updatedetails_dialogVisible:false,
 updatedetailsfileList:[],
 updatesizefileList:[],
 updatedetailsfile:[],
 updatesizefile:[],
 update_goods_details:{}


};
},
//监听属性 类似于data概念
computed: {
  

},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
   async getGoods(){
    const{data:res}=await  request({url:'/goodsPage',data:this.page,method:"post"})
    console.log(res)
    if(res.code===200){
        this.goods=res.page.records
        for(let item of this.goods){
          if(item.occasions===0){
            item.occasions='非正式场合'
          }else{
            item.occasions='正式场合'
          }
         let arr= item.img.split(",")
        let arrs= arr.map(item=> {return 'http://localhost:8888/res/goodsImage/'+item})
        console.log(arrs)
        item.img=arrs
        }
        this.$message.success(res.message)
        this.total=res.page.total
    }else{
        this.$message.error(res.message)
    }
    },
handleSizeChange(val){
this.page.pageSize=val
this.getGoods()
},
handleCurrentChange(val){
this.page.currentPage=val
this.getGoods()
},
deleteGoods(id){
  this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
         const{data:res}=await request({url:'/deleteGoods',params:{id}})
          const{data:res1}=await request({url:'/deleteDetails',params:{goodsid:id}})
         console.log(res)
         console.log(res1)
         if(res.code===200){
          let index= this.goods.findIndex(item=> item.id===res.data.id)
          this.goods.splice(index,1)
           this.$message({
            type: 'success',
            message: res.message
          });
         }else{
           this.$message({
            type: 'error',
            message: res.message
          });  
         }
         if(res1.code==200||res1.code==201){
            this.$message({
            type: 'success',
            message: res.message
          });
         }else{
           this.$message({
            type: 'error',
            message: res.message
          });  
         }

          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

},
queryGoods(){
 this.getGoods()
},
addGoods(){
  this.saveorupdate=true
  this.dialogVisible=true
  this.isdisable=true
},
uploadSuccess(response, file, fileList){
console.log(response)

console.log(fileList)

},
handlePreview(){

},
handleRemove(){

},
beforeRemove(){

},


saveGoods(){
   this.$refs.goodsForm.validate(async valid=>{
    const{data:res}= await request({url:'/saveGoods',data:this.goodsform,method:"post"})
    console.log(res)
    if(res.code==200){
      this.dialogVisible=false
      this.$message.success("添加商品成功")
      this.getGoods()
    }else{
      this.$message.error("添加商品失败")
    }

   })
  
},
sureSave(){
  if(this.saveorupdate){
     this.saveGoods()
  }else{
    this.sureUpdateGoods()
  }
    
},
httpRequest(param) {
    console.log(1)
    if(this.dialogVisible){
            this.file.push(param.file);
        }else if(this.details_dialogVisible){
           this.detailsFile.push(param.file);
        }
    
    
     
      console.log(this.detailsFile)
    },
    httpRequest1(param){
      this.sizeFile.push(param.file)
    },
    // 提交
    async newForm(url,file){
        var upData = new FormData();
        if(this.dialogVisible){
           this.$refs.upload.submit();// 这里是执行文件上传的函数，其实也就是获取我们要上传的文件 
        }else if(this.details_dialogVisible){
          this.$refs.upload.submit();// 这里是执行文件上传的函数，其实也就是获取我们要上传的文件 
          this.$refs.uploads.submit();// 这里是执行文件上传的函数，其实也就是获取我们要上传的文件 
        }
        console.log(file)
        let arr= file.filter((item,index)=>{
             return file.indexOf(item)===index
          })
          console.log(arr)
           arr.forEach(function (files) {// 因为要上传多个文件，所以需要遍历
            upData.append('img', files); 
            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        })

            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        if(arr.length!=0){
        const{data:res}=await request({url,data:upData,method:"post"})
        console.log(res)
        if(res.code===200){
            this.$message.success(res.message)
            if(url==="/uploadFile"){
               this.goodsform.img=res.url
            }else if(url==="/uploadGoodsDetails/Img"){
              this.goods_details.detailImg=res.url
            
            }else if(url==="/uploadGoodsSize/Img"){
             this.goods_details.size=res.url
            }
            
             
        }
            }else{
              this.$message.error("请先选择文件")
            }
       
    },
    sureUpload(){
       this.newForm('/uploadFile',this.file)
    },
    
    updateGoods(row){
     this.saveorupdate=false
     this.dialogVisible=true
     this.isdisable=false
     let rows=lodash.cloneDeep(row);
     let savestr=[]
     for(let item of rows.img){
        let arr1= item.split("/")
        savestr.push(arr1[arr1.length-1])
     }
      console.log(savestr)
    rows.img=savestr.join(",")
    console.log(rows.img)
     this.goodsform=rows
     console.log(row.img)
    },
    sureUpdateGoods(){
     this.$refs.goodsForm.validate(async valid=>{
    const{data:res}= await request({url:'/updateGoods',data:this.goodsform,method:"post"})
    console.log(res)
    if(res.code==200){
      this.dialogVisible=false
      this.getGoods()
      this.$message.success("更新成功")
    }else{
      this.$message.error("更新失败")
    }

   })
    },
    dialogClose(){
      this.$refs.goodsForm.resetFields()
      this.file=[]
      this.fileList=[]
    },
    handleClose(){
      this.$confirm('此操作将关闭添加界面, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.details_dialogVisible=false
        }).catch(()=>{
          this.details_dialogVisible=true
          this.$message({
            type: 'info',
            message: '已取消关闭'
          }); 
        })
    },
    addDetailsGoods(row){
      this.details_dialogVisible=true
      this.goods_details.goodsid=row.id
    },
    details_dialogClose(){
     this.$refs.goodsDetailsForm.resetFields()
     this.detailsFile=[]
     this.detailsfileList=[]
     this.sizeFile=[]
     this.fileList=[]
     this.sizefileList=[]
    },
    sureDetailsUpload(){
       this.newForm('/uploadGoodsDetails/Img',this.detailsFile)
    },
    sureSizeUpload(){
     this.newForm('/uploadGoodsSize/Img',this.sizeFile)
    },
    detailsSure(){
    this.$refs.goodsDetailsForm.validate(async valid=>{
    const{data:res}=await request({url:'/saveDetails',data:this.goods_details,method:"post"})
    if(res.code===200){
      this.details_dialogVisible=false
      this.$message.success(res.message)
    }else{
      this.$message.error(res.message)
    }
   })
    },
    beforeSizeUpload(file){
         var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)				
				const isLt2M = file.size / 1024 / 1024 < 10     //这里做文件大小限制
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 10MB!',
						type: 'warning'
					});
				}
				return isLt2M
       
			
    },
    async updateDetailsGoods(row){
     const{data:res}=await request({url:'/selectGoodsDetails',params:{goodsid:row.id}})
     if(res.code===200){
        console.log(res)
        this.updatedetails_dialogVisible=true
        this.update_goods_details=res.data
     }else if(res.code===201){
       this.$message.error(res.message)
     }
    

    },
    updateDetailshandleClose(){
       this.$confirm('此操作将关闭添加界面, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.updatedetails_dialogVisible=false
        }).catch(()=>{
          this.updatedetails_dialogVisible=true
          this.$message({
            type: 'info',
            message: '已取消关闭'
          }); 
        })

    },
    updatedetails_dialogClose(){
      this.updatedetailsfile=[]
      this.updatesizefile=[]
      this.updatesizefileList=[]
      this.updatedetailsfileList=[]
       this.$refs.updategoodsDetailsForm.resetFields()


    },
    uploadhttpRequest(param){
    this.updatedetailsfile.push(param.file)
    },
    updatehttpRequestsize(param){
    this.updatesizefile.push(param.file)
    },
    updatedetailsSure(){
            this.$refs.updategoodsDetailsForm.validate( async valid=>{
            console.log(valid)
            if(valid){
             let _this=this
             let i=0
             let upData = new FormData();
             _this.$refs.upateupload.submit()
             _this.$refs.updateuploadsize.submit()
             if(this.updatedetailsfile.length!=0&&this.updatesizefile.length!=0){
          let arr= _this.updatedetailsfile.filter((item,index)=>{
             return this.updatedetailsfile.indexOf(item)===index
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

         let arrs= _this.updatesizefile.filter((item,index)=>{
             return this.updatesizefile.indexOf(item)===index
          })
          console.log(arr)
           arrs.forEach(  function (files) {
               let Reg=/\.(png|jpg|gif)$/
               let t= Reg.test(files.name);
               console.log(t)
               if(t){
                i=i+1
                 upData.append('size', files);
                  
               }
               
               // 因为要上传多个文件，所以需要遍历
          
        //    console.log(res)
            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        })
               
                  upData.append('id',_this.update_goods_details.id)
                     upData.append('goodssize',_this.update_goods_details.goodssize)
                  
                   const{data:res}=await request({url:'/updateGoodsDetails',data:upData,method:"post"})
                   console.log(res)
                   if(res.code===200){
                     _this.$message.success(res.message)
                     _this.updatedetails_dialogVisible=false
                     this.$refs.updategoodsDetailsForm.resetFields()
                   }else{
                     _this.$message.success(res.message)
                   }
             }else if(this.updatedetailsfile.length!=0&&this.updatesizefile.length==0){
               let arr= _this.updatedetailsfile.filter((item,index)=>{
                return this.updatedetailsfile.indexOf(item)===index})
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
                   upData.append('id',_this.update_goods_details.id)
                     upData.append('goodssize',_this.update_goods_details.goodssize)
                  
                   const{data:res}=await request({url:'/updateGoodsimgDetails',data:upData,method:"post"})
                   console.log(res)
                   if(res.code===200){
                     _this.$message.success(res.message)
                     _this.updatedetails_dialogVisible=false
                     this.$refs.updategoodsDetailsForm.resetFields()
                   }else{
                     _this.$message.success(res.message)
                   }

             }else if(this.updatedetailsfile.length==0&&this.updatesizefile.length!=0){
                    let arrs= _this.updatesizefile.filter((item,index)=>{
              return this.updatesizefile.indexOf(item)===index
             })
           arrs.forEach(  function (files) {
               let Reg=/\.(png|jpg|gif)$/
               let t= Reg.test(files.name);
               console.log(t)
               if(t){
                i=i+1
                 upData.append('size', files);
                  
               }
               
               // 因为要上传多个文件，所以需要遍历
          
        //    console.log(res)
            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
        })
               
                  upData.append('id',_this.update_goods_details.id)
                     upData.append('goodssize',_this.update_goods_details.goodssize)
                  
                   const{data:res}=await request({url:'/updateGoodssizeDetails',data:upData,method:"post"})
                   console.log(res)
                   if(res.code===200){
                     _this.$message.success(res.message)
                     _this.updatedetails_dialogVisible=false
                     this.$refs.updategoodsDetailsForm.resetFields()
                   }else{
                     _this.$message.success(res.message)
                   }

             }else{
              let rows=lodash.cloneDeep(this.update_goods_details);
              delete rows.size
              delete rows.detailImg
               const{data:res}=await request({url:'/updateGoodsArgDetails',data:rows,method:"post"})
               if(res.code==200){
                    _this.$message.success(res.message)
                     _this.updatedetails_dialogVisible=false
                     this.$refs.updategoodsDetailsForm.resetFields()
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
  this.getGoods()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
filters:{
  
  
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
    margin-top: 10px;
}
.el-pagination{
    width: 50%;
    margin: 0 auto;
    margin-top: 10px;
}
.el-dialog{
    position: relative;
}
.el-form{
    margin-top: 50px;
    width: 60%;
}
.upload-details{
  margin-bottom: 20px;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
   
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .dialog-footer{
      clear: both;
  }
  .el-upload{
      margin-left: 20px;
      
  }
  .change_details{
    margin-top: 20px;
    margin-left: -1px;
  }
  .details-title-header{
    margin-bottom: 10px;
    color: red;
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
  .conetntwrap{
    display: flex;
  }
  .conetntwrap img{
    width: 50px;
    height:50px;
  }
  .content{
    flex: 1;
  }
</style>