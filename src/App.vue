<script setup>
import Home from './views/Home.vue'
import About from './views/About.vue'
import HeaderVue from './components/Header.vue'
import FooterVue from './components/Footer.vue';

import ProfileChartVue from './components/ProfileChart.vue';
</script>

<template>
  <HeaderVue/>
  <router-view/>
  <FooterVue/>
</template>

<style >
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
*{
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  
}
</style>
