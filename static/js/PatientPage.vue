<template>
    <el-tabs v-model="aspect" tab-position="left">

        <el-tab-pane label="挂号" name='reserve'>
            <p>我的预约</p>
            <el-table :stripe="true" :border="true" :data="reservations">
                <el-table-column
                    prop="id"
                    label="医生代码"
                >
                </el-table-column>
                <el-table-column
                    prop='name'
                    label="医生姓名"
                >
                </el-table-column>
                <el-table-column
                    prop="section"
                    label="预约时间"
                >
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label='操作'>
                    <template slot-scope="scope">
                        <el-button type='danger' @click="cancel(scope.row.rid)">取消</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <p>新建预约</p>
            <el-tabs @tab-click='fetchOffice' type='border-card'>
                <el-tab-pane v-for="office in offices" v-bind:key='office'
                    v-bind:label="office" v-bind:name="office">
                    <el-table :data="doctors[office]" :stripe="true" :border="true">
                        <el-table-column
                            prop="id"
                            label="医生代码">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="医生姓名">
                        </el-table-column>
                        <el-table-column
                            fixed='right'
                            label='操作'>
                            <template slot-scope="scope">
                                <el-button type="primary">挂号</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="病历查询" name='recordSearch'>
            病历查询



        </el-tab-pane>
    </el-tabs>
</template>

<script>

import {toQuery} from './util.js';

export default {
  props: ['pid'],
  data(){
    fetch('/offices', {method: 'GET'}).then((res) =>{
        res.json().then((ret) => {
            this.offices = ret.map(x => x.office);
        })
    }).catch((err) => console.log(err))

    return {
        aspect: 'reserve',
        offices: [],
        step: 0,
        doctors: {},
        reservations: []
    }
  },
  methods: {
      fetchOffice(tab, event) {
          if(this.doctors[office] !== undefined) return;
          const office = tab.label;
          fetch('/offices/'+office, {method: 'GET'}).then((res) => {
              res.json().then((ret) => {
                this.$set(this.doctors, office, ret);
              })
          }).catch((err) => console.log(err));
      },

      fetchReservations(){
          if(this.pid === undefined) return;
          fetch('/reservations?pid=' + this.pid, {method: 'GET'}).then((res) => {
              if(res.ok){
                res.json().then((ret) => {
                    this.reservations = ret;
                })
              } else {
                console.log(res.status);
                console.log(res.body);
              }
          }).catch((err) => console.log(err))
      },

      cancel(did){
          fetch('/reservations/' + did, {method: 'DELETE'}).then((res) => {
              if(res.ok){
                  this.fetchReservations();
              } else {
                  console.log(res.status);
                  console.log(res.body);
              }
          }).catch((err) => console.log(err));
      }
  },
  watch: {
      pid: function(){
          this.fetchReservations();
      }
  }
}
</script>


<style>

.pp-steps{
    margin: auto;
    width: 40em;
}

</style>

