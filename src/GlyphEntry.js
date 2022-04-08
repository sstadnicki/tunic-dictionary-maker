import React, {Component} from 'react';
import './GlyphEntry.css';
import { GlyphMetrics, glyphWidth } from './GlyphHelpers';

const baseSize = 20;

export default class GlyphEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    
    let numGlyphs = glyphWidth(this.props.parts.segments)+1;
    return (
      <div className='glyphEntry'>
        <svg
          className='glyphEntrySVG'
          width={numGlyphs*baseSize+2*GlyphMetrics.xPadding}
          height={2*baseSize+2*GlyphMetrics.yPadding+GlyphMetrics.circleRadius}
          viewBox = {`${-GlyphMetrics.xPadding} ${-GlyphMetrics.yPadding} ${numGlyphs*100+2*GlyphMetrics.xPadding} ${2*100+2*GlyphMetrics.yPadding+GlyphMetrics.circleRadius}`}
        >

        {this.props.parts.segments.map(segNum => 
          <line
            key={segNum}
            strokeWidth={8}
            stroke='black'
            x1={GlyphMetrics.segmentCoords[segNum%GlyphMetrics.segmentCoords.length].fromX + Math.floor(segNum/GlyphMetrics.segmentCoords.length)*100}
            y1={GlyphMetrics.segmentCoords[segNum%GlyphMetrics.segmentCoords.length].fromY}
            x2={GlyphMetrics.segmentCoords[segNum%GlyphMetrics.segmentCoords.length].toX + Math.floor(segNum/GlyphMetrics.segmentCoords.length)*100}
            y2={GlyphMetrics.segmentCoords[segNum%GlyphMetrics.segmentCoords.length].toY}
          />
        )}
        {this.props.parts.circles.map(circleNum => 
          <circle
          key={1000+circleNum}
          strokeWidth="10"
          stroke="black"
          fill="none"
          cx={circleNum*100+GlyphMetrics.circleCoords.x}
          cy={GlyphMetrics.circleCoords.y}
          r={GlyphMetrics.circleRadius}
        />

        )}
        </svg>
        <div className='glyphEntryTranslation'>
          {this.props.translation}
        </div>
        <div className='removeButton'>
          <button onClick={(evt) => this.removeGlyph()}>Remove</button>
        </div>
      </div>
    )
  }

  removeGlyph() {
    this.props.app.removeGlyph(this.props.index);
  }
}