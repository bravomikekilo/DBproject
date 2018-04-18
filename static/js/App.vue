
<template>
<div class='root-container'>
    <div id='login-page' class='main-container' v-if="!logged" >
        <div id='login-frame'>
            <el-tabs v-model="loginKind">
                <el-tab-pane label='患者' name='patient'></el-tab-pane>
                <el-tab-pane label='医生' name='doctor'></el-tab-pane>
            </el-tabs>
            <el-input v-model="username" placeholder='用户名'></el-input>
            <el-button type='primary' @click="login" v-bind:disabled='logging' style="margin-top:10px">登录</el-button>
        </div>
    </div>
    <div id='patient-page' class="main-container" v-if='isPatient'>
        <patient-page></patient-page>
    </div>

    <div id='doctor-page' class="main-container" v-if='isDoctor'>
        <doctor-page></doctor-page>
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
      role: '',
      username: '',
      loginKind: 'patient',
      logging: false,
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
}

.root-container {
    width: 100%;
    height: 100%;
}


</style>

