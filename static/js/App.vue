
<template>
<div>
    <div id='login-page' class='main-container' v-bind:class="{hidden: logged}">
        <el-tabs v-model="loginKind">
            <el-tab-pane label='患者' name='patient'></el-tab-pane>
            <el-tab-pane label='医生' name='doctor'></el-tab-pane>
        </el-tabs>
        <el-input v-model="username" placeholder='用户名'></el-input>
        <el-button type='primary' @click="login">登录</el-button>
    </div>
    <div id='patient-page' class="main-container" v-bind:class="{hidden: !isPatient}">
        isPatient
    </div>

    <div id='doctor-page' class="main-container" v-bind:class="{hidden: !isDoctor}">
        isDoctor
    </div>

</div>
</template>

<script>

export default {
  data() {
    return {
      data: 'welcome to parcel',
      role: '',
      username: '',
      loginKind: 'patient'
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
          console.log('prepare to login');
          let loginKind = this.loginKind;
          if(loginKind == 'patient' || loginKind == 'doctor'){
              this.role = loginKind;
          } else {
              this.role = '';
          }
      }
  }
}
</script>

<style>
body, html{
    height: 100%;
    bottom: 0;
}

.hidden {
    display: none;
}

#login-page {
    position: absolute;
    background-color: white;
}

.main-container {
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
}



</style>

