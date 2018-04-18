<template>
    <el-tabs v-model="aspect">
        <el-tab-pane label="挂号" name='reserve'>
            挂号



        </el-tab-pane>
        <el-tab-pane label="病例查询" name='recordSearch'>
            病例查询



        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  data(){
    return {
        aspect: 'reserve'
    }
  }
}
</script>


<style>

</style>

