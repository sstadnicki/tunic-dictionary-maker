export const GlyphMetrics = {
  segmentCoords: [
    // top
    {fromX: 5, fromY: 100, toX: 5, toY: 40},
    {fromX: 5, fromY: 40, toX: 5, toY: 10},
    {fromX: 5, fromY: 40, toX: 50, toY: 10},
    {fromX: 5, fromY: 40, toX: 50, toY: 70},
    {fromX: 50, fromY: 100, toX: 50, toY: 70},
    {fromX: 50, fromY: 70, toX: 50, toY: 10},
    {fromX: 50, fromY: 70, toX: 100, toY: 40},
    {fromX: 50, fromY: 10, toX: 100, toY: 40},
    // centerline
    {fromX: 5, fromY: 100, toX: 100, toY: 100},
    // bottom
    {fromX: 5, fromY: 140, toX: 5, toY: 170},
    {fromX: 5, fromY: 170, toX: 5, toY: 200},
    {fromX: 5, fromY: 170, toX: 50, toY: 200},
    {fromX: 5, fromY: 170, toX: 50, toY: 140},
    {fromX: 50, fromY: 140, toX: 50, toY: 140},
    {fromX: 50, fromY: 140, toX: 50, toY: 200},
    {fromX: 50, fromY: 140, toX: 100, toY: 170},
    {fromX: 50, fromY: 200, toX: 100, toY: 170}
  ],
  // We add two lines to the end, corresponding to the far-right two segments
  // (Which properly should probably be part of the next glyph)
  extralines: 2,

  circleCoords: {
    x: 50, y: 200
  },

  circleRadius: 10,
  xPadding: 15,
  yPadding: 5,

};

export function glyphWidth(segmentArr) {
  let highestSegment = segmentArr.filter(
    (elem) => typeof(elem) === 'number'
  ).reduce((prev, cur) => Math.max(prev, cur), 0);
  return Math.max(0,Math.ceil((highestSegment - GlyphMetrics.extralines)/GlyphMetrics.segmentCoords.length));
};