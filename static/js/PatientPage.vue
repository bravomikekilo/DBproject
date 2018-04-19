<template>
    <el-tabs v-model="aspect">
        <el-tab-pane label="挂号" name='reserve'>
            <el-steps :active="step" finish-status="success" class='pp-steps'>
                <el-step title="选择医生"></el-step>
                <el-step title="选择时间"></el-step>
            </el-steps>

            <el-tabs @tab-click='fetchOffice'>
                <el-tab-pane v-for="office in offices" v-bind:key='office'
                    v-bind:label="office" v-bind:name="office">
                </el-tab-pane>

            </el-tabs>


        </el-tab-pane>
        <el-tab-pane label="病例查询" name='recordSearch'>
            病例查询



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
          const office = tab.label;
          fetch('/offices/'+office, {method: 'GET'}).then((res) => {
              res.json().then()
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

