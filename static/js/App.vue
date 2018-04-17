
<template>
    <div>
        <h3>{{data}}</h3>
        <button @click="fetch"> click me </button>
        <item-list v-bind:items="items"></item-list>
        <input v-model="newItem" v-on:keyup.enter="insertNew"
            placeholder="new item">
    </div>
</template>

<script>
import ItemList from './ItemList.vue'

export default {
  data() {
    return {
      data: 'welcome to parcel',
      items: [],
      newItem: '',
    }
  },
  components: {
      ItemList
  },
  methods: {
    fetch() {
      console.log('prepare to submit');

      fetch('test/items', {method: 'get'}).then(
          (res) => {
              res.json().then((value) => {
                  this.items = value.map((row) => row.content);
              });
          }
      ).catch((err) => {
          this.data = "Error on fetch client data"
      });
    },
    insertNew() {
        console.log('insert new item:' + this.newItem);

        fetch('test/items', {
            method: 'POST',
            body: this.newItem
        }).then(
            (res) => {
                if(res.status == 200){
                    this.fetch();
                } else {
                    this.data = 'insert failed';
                }
            }
        ).catch((err) => {
            this.data = "Error on inserting item"
        });

    }
  }

}
</script>

