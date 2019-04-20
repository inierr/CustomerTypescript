<template>
  <div class="customer-add">
    <h1 class="text-left">Customer Add</h1>
      <div class="add-form">
        <b-form @submit="submitForm" @submit.prevent>
          <b-form-group 
            id="customer-name-group"
            label="Customer Name"
          >
            <b-form-input
              id="customer-name"
              v-model="addForm.customerName"
              type="text"
              placeholder="Customer Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="customer-code-group"
            label="Customer Code"
          >
            <b-form-input
              id="customer-code"
              v-model="addForm.customerCode"
              type="text"
              placeholder="Customer Code"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="customer-address-group"
            label="Customer Address"
          >
            <b-form-input
              id="customer-address"
              v-model="addForm.customerAddress"
              type="text"
              placeholder="Customer Address"
              required
            ></b-form-input>
          </b-form-group>
          <div class="form-button">
            <b-button class="btn" type="reset" variant="outline-secondary">Reset</b-button>
            <b-button class="btn" type="submit" variant="outline-success">Submit</b-button>
          </div>
        </b-form>
      </div>
      
  </div>
</template>

<style scoped>
.add-form {
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
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import Customers from '@/components/Customers.vue';
import router from '../router';

@Component
export default class CustomerAdd extends Vue {
  private addForm = {
    customerName: '',
    customerCode: '',
    customerAddress: '',
  };

  private url: string = `${process.env.VUE_APP_BASE_API}/customer`;

  private async submitForm(ev: any) {
    const { customerName, customerCode, customerAddress } = this.addForm;

    if (customerName === '' || customerCode === '' || customerAddress === '') {
      return;
    }

    if (customerCode.length > 10) {
      return;
    }


    try {
      const data = await axios.post(this.url, {
        customerName, customerCode, customerAddress,
      });

      router.push('/customers');
      ev.target.reset();
    } catch (e) {
      // console.error(e);
    }
  }
}
</script>
