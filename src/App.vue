<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      Cycling Thingy
      <v-file-input v-model="file" accept=".gpx" label="Select a file" hide-details/>
    </v-app-bar>

    <v-main  v-if="validRide">
      <v-card width="600px" outlined class="ma-2 pa-2 summary-card">
        <h1>{{ gpx.trk.name }}</h1>
        <v-simple-table>
          <tr>
            <td>Time</td>
            <td>{{ rideTime }}</td>
          </tr>
          <tr>
            <td>Segments</td>
            <td>{{ segments.length }}</td>
          </tr>
          <tr>
            <td>Distance</td>
            <td>{{ distance.toFixed(4) }} m</td>
          </tr>
          <tr>
            <td>Elevation Gain</td>
            <td>{{ elevationGain.toFixed(4) }} m</td>
          </tr>
          <tr>
            <td>Elevation Drop</td>
            <td>{{ elevationDrop.toFixed(4) }} m</td>
          </tr>
          <tr>
            <td>Elevation Change</td>
            <td>{{ elevationNet.toFixed(4) }} m</td>
          </tr>
        </v-simple-table>
      </v-card>
      <v-simple-table class="table-1">
        <tr class="text-left">
          <th>Elevation Change m</th>
          <th>Time s</th>
          <th>Distance m</th>
          <th>Speed m/s</th>
          <th>Speed km/h</th>
        </tr>
        <tr v-for="(s, i) in segmentPairs" :key="i">
          <td>{{ s.elevationGain.toFixed(4) }}</td>
          <td>{{ s.timeElapsed }}</td>
          <td>{{ s.distance.toFixed(4) }}</td>
          <td>{{ s.speed.toFixed(4) }}</td>
          <td>{{ s.kmph.toFixed(4) }}</td>
        </tr>
      </v-simple-table>
    </v-main>
  </v-app>
</template>

<script>
import xmlParse from 'fast-xml-parser';
import {Segment} from './util/segment';
import moment from 'moment';
import {SegmentPair} from './util/segment-pair';
/*eslint no-prototype-builtins: "off"*/
export default {
  name: 'App',

  data: () => ({
    gpx: {},
    file: null
  }),
  computed: {
    distance() {
      return this.segmentPairs.reduce((acc, v) => acc + v.distance, 0);
    },
    elevationGain() {
      return this.segmentPairs.reduce((acc, v) => {
        if (v.elevationGain > 0) {
          return acc + v.elevationGain;
        }
        return acc;
      }, 0);
    },
    elevationDrop() {
      return this.segmentPairs.reduce((acc, v) => {
        if (v.elevationGain < 0) {
          return acc + v.elevationGain;
        }
        return acc;
      }, 0);
    },
    elevationNet() {
      return this.elevationGain + this.elevationDrop;
    },
    rideTime() {
      if (!this.validRide) {
        return '';
      }
      return moment(this.gpx.metadata.time).format('L LT');
    },
    segments() {
      if (!this.validRide) {
        return [];
      }
      return this.gpx.trk.trkseg.trkpt.map(s => new Segment(s));
    },
    segmentPairs() {
      if (!this.validRide) {
        return [];
      }
      const pairs = [];
      const segs = this.segments;
      for (let i = 0; i < (segs.length - 1); i++) {
        pairs.push(new SegmentPair(segs[i], segs[i + 1]))
      }
      return pairs;
    },
    validRide() {
      return this.gpx.hasOwnProperty('trk') && this.gpx.hasOwnProperty('metadata');
    }
  },
  watch: {
    async file(f) {
      if (!f) {
        return;
      }

      const text = await f.text();
      this.parse(text);
      this.file = null;
    }
  },
  async mounted() {
    const data = await fetch('example.gpx');
    const text = await data.text();
    this.parse(text);
  },
  methods: {
    parse(text) {
      const parsed = xmlParse.parse(text, {
        ignoreAttributes: false,
        parseAttributeValue: true
      });
      this.gpx = parsed.gpx;
    }
  }
};
</script>

<style>
  .summary-card table {
    border-collapse: collapse;
  }
  .summary-card td {
    border: 1px solid grey;
    padding: 5px;
  }
  .summary-card tr td:first-child {
    font-weight: bold;
    width: 200px;
  }

  .table-1 table {
    border-collapse: collapse;
    width: 500px !important;
  }
  .table-1 td {
    border: 1px solid rgba(128, 128, 128, 0.2);
    padding: 2px;
  }
</style>
