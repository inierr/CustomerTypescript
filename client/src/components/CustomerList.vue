<template>
  <div class="customer-list">
    <h1 class="text-left">Customer List</h1>
    <div class="text-left div-search">
      <b-form @submit="searchSubmit()" @submit.prevent>
        <b-form-group id="search-group">
          <b-form-input id="search" v-model="search" placeholder="Search"></b-form-input>
        </b-form-group>
        <div class="text-right">
          <b-button type="submit" variant="outline-secondary">Search</b-button>
        </div>
      </b-form>
    </div>
    <div class="pagination">
      <b-pagination
        v-model="pagination.currentPage"
        :total-rows="pagination.numberOfItems"
        :per-page="pagination.pageSize"
        @change="changePage"
      ></b-pagination>
    </div>
    <div class="text-left">
      <b-card v-for="(customer, index) in customers" v-bind:key="index" class="cust-list-card" v-bind:title="customer.customerName" v-bind:sub-title="customer.customerCode">
        <b-card-text>
          {{ customer.customerAddress }}
        </b-card-text>
        <router-link v-bind:to="`/customers/edit/${customer.customerCode}`">Edit</router-link>
        <!-- <b-link class="card-link">Edit</b-link> -->
        <!-- <b-link class="card-link text-danger">Delete</b-link> -->
      </b-card>
    </div>
    
    <div class="pagination">
      <b-pagination
        v-model="pagination.currentPage"
        :total-rows="pagination.numberOfItems"
        :per-page="pagination.pageSize"
        @change="changePage"
      ></b-pagination>
    </div>
  </div>
</template>

<style scoped>
.cust-list-card {
  margin: .5rem;
}

.div-search {
  margin: 1rem; 
}

.pagination {
  margin: .5rem auto;
}
</style>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class CustomerList extends Vue {

  private customers: any[] = [];
  private pagination: any = {};
  private search: string = '';

  private url = `${process.env.VUE_APP_BASE_API}/customer`;

  // created lifecycle
  private created() {
    this.getCustomerList();
  }

  private async getCustomerList(params?: any) {
    params = params || {};
    const { data } = await axios.get(this.url, {
      params,
    });
    const { items, numberOfItems, currentPage, pageSize } = data;

    this.pagination = {
      numberOfItems,
      currentPage,
      pageSize,
    };

    this.customers = items;
  }

  private searchSubmit() {
    const params = {
      search: this.search,
    };

    this.getCustomerList(params);
  }

  private changePage(nextPage: number) {
    const params = {
      search: this.search,
      page: nextPage,
    };

    this.getCustomerList(params);
  }
}
</script>
