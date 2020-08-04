export class Segment {
  s1;
  s2;

  /**
   * @param {Point} s1
   * @param {Point} s2
   */
  constructor(s1, s2) {
    this.s1 = s1;
    this.s2 = s2;
  }

  get elevationGain() {
    return this.s2.elevation - this.s1.elevation;
  }

  get timeElapsed() {
    return this.s2.time.diff(this.s1.time, 'second');
  }

  get distance() {
    return this.s1.latLon.distanceTo(this.s2.latLon);
  }

  get speed() {
    return this.distance / this.timeElapsed;
  }

  get kmph() {
    return this.speed * 3.6;
  }
}
