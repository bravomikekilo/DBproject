<template>
<el-tabs v-model="aspect">
  <el-tab-pane label='诊断记录' name='diag'>

  </el-tab-pane>

  <el-tab-pane label='病例查询' name='recordSearch'>

  </el-tab-pane>

  <el-tab-pane label='预约查看' name='reservation'>

  </el-tab-pane>
</el-tabs>
</template>

<script>
export default {
  data() {
      return {
          aspect: 'diag'
      }
  }
}
</script>


<style>

</style>

