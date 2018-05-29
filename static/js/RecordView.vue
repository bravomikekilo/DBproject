<template>

<div>
    <el-row>
    <el-date-picker
        v-model="startDate"
        type='date'
        placeholder="起始日期"
    ></el-date-picker>

    <el-date-picker
        v-model="endDate"
        type='date'
        placeholder="结束日期"
    ></el-date-picker>
    <el-button type="primary" @click="search">查询</el-button>
    </el-row>
    <el-table :data="data">
        <el-table-column
            prop="date"
            label="就诊日期"
        >
        </el-table-column>
        <el-table-column
            prop='medicine'
            label="药物使用"
        >
        </el-table-column>
        <el-table-column
            prop="description"
            label="病情描述"
        >
        </el-table-column>

    </el-table>
</div>
</template>

<script>
export default {
    props:['pid'],
    data() {
        return {
            startDate: undefined,
            endDate: undefined,
            data: [],
        }
    },
    methods: {
        search() {
            let fromDate = '';
            let toDate = '';
            if(this.startDate != undefined){
                fromDate = '?from=' + this.startDate;
            }
            if(this.toDate != undefined){
                toDate = '?to=' + this.endDate;
            }
            fetch('/records/' + this.pid + fromDate + toDate, {
                method: "GET"
            }).then(res => {
                res.json().then(ret => {
                    console.log(ret);
                    this.data = ret;
                })
            }).catch(err => console.log(err));
        }
    }
}
</script>

<style>

</style>


