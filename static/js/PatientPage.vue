<template>
    <el-tabs v-model="aspect" tab-position="left">
        <el-tab-pane label="挂号" name='reserve'>
            <el-tabs @tab-click='fetchOffice' type='border-card'>
                <el-tab-pane v-for="office in offices" v-bind:key='office'
                    v-bind:label="office" v-bind:name="office">
                    <!--
                    <li v-for="doctor in doctors[office]" v-bind:key="doctor.id">
                        {{doctor.name}}
                    </li>
                    -->
                    <el-table :data="doctors[office]" stripe="true" border="true">
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
export default {
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
        doctors: {}
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

