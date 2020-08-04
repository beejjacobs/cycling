<template>
  <v-card outlined>
    <v-card-title>
      Segments
      <v-spacer/>
      <v-btn color="primary" @click="show = !show">{{ show ? 'Hide' : 'Show' }}</v-btn>
    </v-card-title>
    <v-card-text v-if="show">
      <v-simple-table class="table-1">
        <tr class="text-left">
          <th>Elevation Change m</th>
          <th>Time s</th>
          <th>Distance m</th>
          <th>Speed m/s</th>
          <th>Speed km/h</th>
        </tr>
        <tr v-for="(s, i) in segments" :key="i">
          <td>{{ s.elevationGain.toFixed(4) }}</td>
          <td>{{ s.timeElapsed }}</td>
          <td>{{ s.distance.toFixed(4) }}</td>
          <td>{{ s.speed.toFixed(4) }}</td>
          <td>{{ s.kmph.toFixed(4) }}</td>
        </tr>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Segments',
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
  }
}
</script>

<style scoped>
  .table-1 table {
    border-collapse: collapse;
    width: 500px !important;
  }
  .table-1 td {
    border: 1px solid rgba(128, 128, 128, 0.2);
    padding: 2px;
  }
</style>
