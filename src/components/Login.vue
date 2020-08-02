<template>
  <div class="login_con">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登录表单区   ref为表单实例对象-->
      <el-form ref="LoginFormRef" :model="loginForm" :rules="LoginFormRules" label-width="0" class="login_form">
        <!-- 用户名 -->
        <el-form-item  prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
         <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-mouse"></el-input>
        </el-form-item>
        <!-- 按钮区 -->
         <el-form-item class="btns">
          <el-button type="primary" @click="Login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
         
      </el-form>
    </div>
  </div>
</template>
<script>

export default {
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'123456',
            },
            // 表单验证
           LoginFormRules: {
            //  用户名是否合法
               username: [
                 { required: true, message: '请输入登录名称', trigger: 'blur' },
                 { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
               ],
            //  密码是否合法
               password: [
                 { required: true, message: '请输入登录密码', trigger: 'blur' },
                 { min: 6, max: 15, message: '长度在 6 到 5 个字符', trigger: 'blur' }
               ]
           }
        }
    },
    methods:{
        resetLoginForm(){
            // console.log(this);
            this.$refs.LoginFormRef.resetFields();
        },
        Login(){
            //登录方法有回调函数
            this.$refs.LoginFormRef.validate(async valid => {
                // console.log(valid);  打印true或者false
                if(!valid) return;
                // const result = await this.$http.post('login',this.loginForm); 将以后改变的都写入loginFrom中
                const {data:res} = await this.$http.post('login',this.loginForm);
                // console.log(res);
                if(res.meta.status !== 200) return this.$message.error('登录失败！');
                this.$message.success('登录成功！');
                //将登录成功的token保存到客户端的sessionStorage中，
                //除了登录外的API接口 都要登录过后才能访问 
                //token只在当前网站打开期间有效，所有将token保存在sessionStorage 
                window.sessionStorage.setItem('token',res.data.token);
                //通过编程式导航跳转到后台主页，路由地址是/home
                this.$router.push('/home');
            });
        }
    }
}
</script>
<style scoped>
.login_con {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>