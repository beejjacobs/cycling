<template>
  <v-card outlined>
    <v-card-title>
      Route
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
  name: 'Route',
  props: {
    points: {
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
          ...this.points.map(p => [p.lat, p.lon])
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
