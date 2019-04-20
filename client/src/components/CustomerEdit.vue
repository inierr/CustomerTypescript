<template>
  <div class="customer-edit">
    <span>
      <h1 class="text-left">Customer Edit 
        <b-button class="text-danger" variant="link" @click="deleteCustomer">Delete?</b-button>
      </h1>
    </span>
    <div class="edit-form" v-if="isLoaded">
      <b-form @submit.prevent @submit="submitForm">
        <b-form-group
          id="customer-name-group"
          label="Customer Name"
        >
          <b-form-input
            id="customer-name"
            v-model="customer.customerName"
            type="text"
            placeholder="Customer Name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="customer-address-group"
          label="customer-address"
        >
          <b-form-input
            id="customer-address"
            v-model="customer.customerAddress"
            type="text"
            placeholder="Customer Address"
            required
          ></b-form-input>
        </b-form-group>
        <div class="form-button">
          <b-button class="btn" type="button" variant="outline-secondary" @click="resetInput">Reset</b-button>
          <b-button class="btn" type="submit" variant="outline-success">Submit</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<style scoped>
.edit-form {
  margin: 1rem;
  text-align: left !important;
}
.form-button {
  text-align: right !important;
}
.form-button > .btn {
  margin: .5rem;
}
</style>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';
import axios from 'axios';
import router from '../router';
// import router from '../router';

interface VueRoute {
  $route: Route;
}

@Component
export default class CustomerEdit extends Vue implements VueRoute {
  private customerCode: string = '';
  private url: string = `${process.env.VUE_APP_BASE_API}/customer`;

  private customer: any = {
    customerCode: '',
    customerName: '',
    customerAddress: '',
    customerBu: '',
  };

  private originalCustomer: any = {
    customerCode: '',
    customerName: '',
    customerAddress: '',
    customerBu: '',
  };

  private isLoaded: boolean = false;

  private created() {
    this.customerCode = this.$route.params.code;
    this.getCustomerCode();
  }

  private async getCustomerCode() {
    try {
      const { data } = await axios.get(`${this.url}/${this.customerCode}`);

      this.customer = { ...data };
      this.originalCustomer = { ...data };
      this.isLoaded = true;
    } catch (e) {
      alert(e);
    }
  }

  private resetInput() {
    const { customerName, customerAddress } = this.originalCustomer;

    this.customer = {
      ...this.customer, customerName, customerAddress,
    };

    return;
  }

  private async submitForm() {
    const { customerName, customerAddress } = this.customer;

    if (customerName === '' || customerAddress === '') {
      return;
    }

    if (customerName === this.originalCustomer.customerName &&
      customerAddress === this.originalCustomer.customerAddress) {
      return;
    }

    try {
      const data = await axios.put(`${this.url}/${this.customerCode}`, {
        customerName, customerAddress,
      });
      router.push('/customers');
    } catch (e) {
      // do something...
    }
  }

  private async deleteCustomer() {
    if (confirm('Are you sure you want to delete customer?')) {
      try {
        const { data } = await axios.delete(`${this.url}/${this.customerCode}`);
        router.push('/customers');
      } catch (e) {
        // do something
        alert(e);
      }
    }

    return;
  }
}
</script>
