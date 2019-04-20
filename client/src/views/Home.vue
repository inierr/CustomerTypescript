<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Simple Vue + Express Node.js built with Typescript</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>
