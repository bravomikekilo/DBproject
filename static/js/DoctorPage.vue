<template>
<el-tabs v-model="aspect" tab-position="left">

  <el-tab-pane label='预约查看' name='reservation'>
    <el-table :stripe="true" :border="true" :data="reservations">
      <el-table-column prop="id" label="患者代码">
      </el-table-column>

      <el-table-column prop='name' label="患者姓名">
      </el-table-column>

      <el-table-column prop="section" label='预约时间'>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type='primary' :disabled="currentReservation !== undefined"
           @click="selectReservation(scope.row)">
           开始
          </el-button>
        </template>
      </el-table-column>

    </el-table>
  </el-tab-pane>

  <el-tab-pane label='诊断记录' name='diag' v-if="currentReservation != undefined">
    <el-row>
      <el-col :span="18"><p>患者情况</p></el-col>
      <el-col :span="6"><el-button type="primary" @click="finishDiagnose">完成诊断</el-button> </el-col>
    </el-row>
    <el-card class="box-card" v-loading='currentPatient === undefined'>
      <div>
        姓名: {{currentPatient != undefined ? currentPatient.name : ''}}
      </div>
      <div>
        性别: {{gender}}
      </div>
      <div>
        生日: {{currentPatient != undefined ? currentPatient.birthday : ''}}
      </div>
    </el-card>

    <p>处方</p>
    <el-input type="textarea"
      v-model="medicine"
      :autosize='true'
      placeholder="处方"
    >
    </el-input>

    <p>病情描述</p>
    <el-input type="textarea"
      v-model="description"
      :autosize='true'
      placeholder="病情描述"
    >
    </el-input>

  </el-tab-pane>

  <el-tab-pane label='病历查询' name='recordSearch'>
    病历查询
  </el-tab-pane>

</el-tabs>
</template>

<script>
export default {
  props: ['did'],
  data() {
    return {
      aspect: 'reservation',
      reservations: [],
      currentReservation: undefined,
      medicine: '',
      description: '',
      currentPatient: undefined,
    }
  },
  methods: {
    fetchReservations(){
      fetch('/reservations?did=' + this.did, {
        method: 'GET'
      }).then(res => {
        if(res.ok){
          res.json().then(ret => {
            this.reservations = ret;
          })
        } else {
          console.log(res.status);
          console.log(res.body);
        }
      }).catch(err => console.log(err));
    },

    selectReservation(reserv){
      this.currentReservation = reserv;
      fetch('/patients/' + reserv.id, {
        method: 'GET'
      }).then(res => {
        res.json().then(ret => {
          this.currentPatient = ret[0];
        })
      }).catch(err => console.log(err));
    },

    finishDiagnose(){
      fetch('/records', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          id: this.currentReservation.rid,
          medicine: this.medicine,
          description: this.description,
        })
      }).then(res => {
        if(res.ok){
          this.currentReservation = undefined;
          this.currentPatient = undefined;
          this.fetchReservations();
        } else {
          console.log(res.status);
          console.log(res.body);
        }
      }).catch(err => console.log(err));
    }
  },
  computed: {
    gender: function(){
      if(this.currentPatient == undefined){
        return '';
      }
      if(this.currentPatient.gender){
        return '男';
      } else {
        return '女';
      }
    }
  },
  watch: {
    did: function() {
      this.fetchReservations();
    }
  }
}
</script>


<style>

</style>

