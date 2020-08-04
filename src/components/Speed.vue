<template>
  <v-card outlined>
    <v-card-title>
      Speed
      <v-spacer/>
      <v-btn color="primary" @click="show = !show">{{ show ? 'Hide' : 'Show' }}</v-btn>
    </v-card-title>
    <v-card-text v-if="show">
      <g-chart type="ScatterChart" :data="data" :options="options"/>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Speed',
  props: {
    segments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    data() {
      const headers = ['lat', 'lon'];
      return [
        headers,
          ...this.segments.map(p => [p.s1.time.toDate(), p.kmph])
      ];
    },
    options() {
      return {
        legend: 'none',
        height: 500,
        vAxis: {
          viewWindowMode: 'maximized'
        }
      };
    }
  }
}
</script>

<style scoped>

</style>
