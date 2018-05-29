
<template>
<div class='root-container'>
    <div id='login-page' class='main-container' v-if="!logged" >
        <div id='login-frame'>
            <el-tabs tab-position="left">
                <el-tab-pane label='登录' name='login'>
                    <el-tabs v-model="loginKind">
                        <el-tab-pane label='患者' name='patient'></el-tab-pane>
                        <el-tab-pane label='医生' name='doctor'></el-tab-pane>
                    </el-tabs>
                    <el-input v-model="username" placeholder='用户名' ></el-input>
                    <el-input v-model="password" placeholder='密码'
                        style='margin-top:5px'
                        v-on:keydown.enter.native='login'></el-input>
                    <el-button type='primary' @click="login"
                        v-bind:disabled='logging' style="margin-top:10px">登录</el-button>
                </el-tab-pane>
                <el-tab-pane label='注册' name='register'>
                    <el-input v-model="name" placeholder="姓名" style="margin-top:10px"></el-input>
                    <el-radio v-model="sex" :label='true'>男</el-radio>
                    <el-radio v-model="sex" :label='false'>女</el-radio>
                    <el-input v-model="birthday" placeholder="生日" style='margin-top:10px'></el-input>
                    格式 '1996-12-21'
                    <el-input v-model="username" placeholder="用户名" style='margin-top:10px'></el-input>
                    <el-input v-model="password" placeholder="密码" style='margin-top:10px'></el-input>
                    <el-button type='primary' @click='register' style="margin-top:10px">注册</el-button>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <div id='patient-page' class="main-container" v-if='isPatient'>
        <patient-page :pid="id"></patient-page>
    </div>

    <div id='doctor-page' class="main-container" v-bind:did='id' v-if='isDoctor'>
        <doctor-page :did="id"></doctor-page>
    </div>

</div>
</template>

<script>
import PatientPage from './PatientPage.vue'
import DoctorPage from './DoctorPage.vue'

export default {
  components: {PatientPage, DoctorPage},
  data() {
    return {
      data: 'welcome to parcel',
      id: undefined,
      role: '',
      username: '',
      password: '',
      loginKind: 'patient',
      logging: false,
      name: '',
      sex: true,
      birthday: '',
    }
  },
  computed: {
      logged() {
          return this.role != '';
      },
      isPatient() {
          return this.role == 'patient';
      },
      isDoctor() {
          return this.role == 'doctor';
      }
  },
  methods: {
      login() {
          this.logging = true;
          console.log('prepare to login');
          const loginKind = this.loginKind;
          if(loginKind == 'patient'){
            fetch('/paccounts?username=' + this.username, {method: 'GET'})
            .then((ret) => {
                if(ret.ok){
                    this.role = loginKind;
                    ret.json().then((id) => this.id = id);
                } else {
                    this.role = '';
                }
                this.logging = false;
            }).catch((err) => {
                this.role = '';
                this.logging = false;
            })
          } else if (loginKind == 'doctor'){
            fetch('/daccounts?username=' + this.username, {method: 'GET'})
            .then((ret) => {
                if(ret.ok){
                    this.role = loginKind;
                    ret.json().then((id) => this.id = id);
                } else {
                    this.role = '';
                }
                this.logging = false;
            }).catch((err) => {
                this.role = '';
                this.logging = false;
            })
          } else {
              this.role = '';
              this.logging = false;
          }
      },

      register() {
          let name = this.name;
          let sex = this.sex;
          let username = this.username;
          let password = this.password;
          let birthday = new Date(this.birthday);

          fetch('/paccounts', {method: 'POST',
            body: JSON.stringify({
                'name': name,
                'gender': sex,
                'username': username,
                'password': password,
                'birthday': birthday
                }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
          }).then(ret => {
              if(ret.ok){
                  console.log('post success');
                  ret.json().then(v => console.log(v));
              } else {
                  this.$notify({
                      title: '注册失败',
                      message: '注册失败,请重试'
                  });
                  console.log('server error');
              }
          }).catch(err => {
              this.$notify({
                  title: '注册失败',
                  message: '网络错误,请检查您的网络设置'
              })
              console.log(err);
          })
      }
  }
}
</script>

<style>
body, html{
    height: 100%;
    bottom: 0;
    margin: 0;
}


#login-page {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

#login-frame{
    padding: 2em;
    align-items: center;
    width: 20em;
    margin: auto;
    border: solid 1px grey;
    border-radius: 20px;
}

.main-container {
    width: 100%;
    height: 100%;
    padding-left: 5em;
    padding-right: 5em;
    padding-top: 3em;
    padding-bottom: 3em;
    box-sizing: border-box;
}

.root-container {
    width: 100%;
    height: 100%;
}


</style>

