<template>
  <div class="customers">
    <div id="cust-nav">
      <router-link to="/customers">List</router-link> | 
      <router-link to="/customers/add">Add</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Component from 'vue-class-component';
import CustomerList from '@/components/CustomerList.vue';
import CustomerAdd from '@/components/CustomerAdd.vue';

@Component({
    components: {
        CustomerList,
        CustomerAdd,
    },
})
export default class Customers extends Vue {
}
</script>
