<template>
  
</template>

<script>
import Vue from 'vue';
import ChartOne from '../pages/ChartOne';

const chartOne = new Vue({
  components: { ChartOne },
  template: `
              <div class="chartOne">
                <chart-one></chart-one>
              </div>
            `
})
const chartTwo = new Vue({
  components: { ChartOne },
  template: `
              <div class="chartOne">
                <chart-one></chart-one>
              </div>
            `
})
const chartThree = new Vue({
  components: { ChartOne },
  template: `
              <div class="chartOne">
                <chart-one></chart-one>
              </div>
            `
})
const chartFour = new Vue({
  components: { ChartOne },
  template: `
              <div class="chartOne">
                <chart-one></chart-one>
              </div>
            `
})
export default {
  
}
</script>

<style>

</style>
