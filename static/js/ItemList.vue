<template>
<div>

    <li class='item-list-item'  v-for="item in items" :key="item">
      <span>
        <button>&#10060;</button>
        <a>{{item}}</a>
      </span>
    </li>

</div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: ['items']
}
</script>


<style>

.item-list-item{
    border: 1px solid black;
    border-radius: 3px;
    font-size: 20px;
}

.item-list-item > a{
    text-align: center;
}


</style>
