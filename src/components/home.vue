<template>
  <el-container class="home1">
    <el-header>
      <div>
        <img src="../assets/log.png" style="width:6%">
        <span>巴啦啦小魔仙</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 侧边栏 -->
    <el-container>
      <!-- 宽度动态绑定 -->
      <el-aside :width="isCollapse ?'64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-col :span="12" style="width:100%">
          <!-- 侧边栏菜单区域 -->
          <el-menu background-color="#373041" text-color="#fff" active-text-color="#409EFF" :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active='activePath'>
            <!-- 动态绑定index  index只接受字符串不接受数值所以添加'' -->
            <el-submenu :index= "item.id+''" v-for="item in menulist" :key="item.id">
              <template slot="title">
                 <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                 <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 路由跳转-->
              <el-menu-item :index="'/'+subItem.path+''" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                 <!-- 图标 -->
                <i class="el-icon-menu"></i>
                 <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data(){
    return{
      //左侧菜单区域
      menulist:[],
      //给每个图标根据id设置不同样式
      iconsObj:{
        '125':'el-icon-grape',
        '103':'el-icon-pear',
        '101':'el-icon-orange',
        '102':'el-icon-coffee',
        '145':'el-icon-lollipop'
      },
      //是否折叠
      isCollapse:false,
      //被激活的链接地址
      activePath:''
    }
  },
  created(){
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      //删除token
      window.sessionStorage.clear();
      //重定向到登录
      this.$router.push("/login");
    },
    async getMenuList(){
      //获取所有的菜单   因为get为promise 为简化
      const {data:res} = await this.$http.get('menus')
      //失败返回提示信息 成功在menulist中填充数据
      if(res.meta.status !== 200) return this.$message.console.error(res.meta.msg);
      this.menulist = res.data
      console.log(res)
    },
    //点击按钮切换菜单的折叠与展开
    toggleCollapse(){
      this.isCollapse = !this.isCollapse 

    },
    //保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  },
};
</script>
<style scoped>
.home1 {
  height: 100%;
}
.el-header {
  background-color: #373041;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  /* 上下居中 */
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header span {
  margin-left: 5px;
}
.el-aside {
  background-color: #373041;
}
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align:center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu{
  border-right: none;
}
.el-main {
  background-color: #eaedf1;
}
.iconfont{
  margin-right: 10px;
}
</style>