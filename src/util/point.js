import moment from 'moment';
import LatLon from 'geodesy/latlon-spherical.js';

export class Point {
  constructor(data) {
    this.data = data;
  }

  get lat() {
    return this.data['@_lat'];
  }

  get lon() {
    return this.data['@_lon'];
  }

  get latLon() {
    return new LatLon(this.lat, this.lon);
  }

  get elevation() {
    return this.data['ele'];
  }

  get time() {
    return moment(this.data['time']);
  }
}
