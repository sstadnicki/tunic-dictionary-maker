import React, {Component} from 'react';
import './GlyphEditor.css';
import { GlyphMetrics, glyphWidth } from './GlyphHelpers';

const baseSize = 50;

export default class GlyphEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeParts: {
        segments: [],
        circles: []
      },
      translation: ''
    };
  }

  render () {
    let svgStrokes = [];
    let numGlyphs = glyphWidth(this.state.activeParts.segments)+1;
    let strokesToDraw = numGlyphs*GlyphMetrics.segmentCoords.length+GlyphMetrics.extralines;
    // add all the linear strokes on the characters
    for (let lineIdx = 0; lineIdx < strokesToDraw; lineIdx++) {
      let strokeIdx = lineIdx % GlyphMetrics.segmentCoords.length;
      let offset = Math.floor(lineIdx/GlyphMetrics.segmentCoords.length)*100;
      let line = GlyphMetrics.segmentCoords[strokeIdx];
      svgStrokes.push(
        <line
          key={lineIdx}
          strokeWidth="10"
          stroke={this.state.activeParts.segments.indexOf(lineIdx) === -1? "silver": "black"}
          x1={line.fromX+offset} y1={line.fromY} x2={line.toX+offset} y2={line.toY}
          onClick={()=>this.toggleStroke(lineIdx)}
        />
      );
    }

    // Now add all of the circular strokes at the bottom
    for (let circleIdx = 0; circleIdx < numGlyphs; circleIdx++) {
      let xPos = circleIdx*100+GlyphMetrics.circleCoords.x;
      let yPos = GlyphMetrics.circleCoords.y;
      svgStrokes.push(
        <circle
          key={1000+circleIdx}
          strokeWidth="10"
          stroke={this.state.activeParts.circles.indexOf(circleIdx) === -1? "silver": "black"}
          fill="none"
          cx={xPos}
          cy={yPos}
          r={GlyphMetrics.circleRadius}
          onClick={()=>this.toggleCircle(circleIdx)}
        />
      );
    }

    return (
      <div className='glyphEditor'>
      <div className='svgBox'>
      <svg 
        className='glyphEditorSVG'
        width={numGlyphs*baseSize+2*GlyphMetrics.xPadding}
        height={2*baseSize+GlyphMetrics.circleRadius+2*GlyphMetrics.yPadding}
        viewBox = {`${-GlyphMetrics.xPadding} ${-GlyphMetrics.yPadding} ${numGlyphs*100+2*GlyphMetrics.xPadding} ${2*100+2*GlyphMetrics.yPadding+GlyphMetrics.circleRadius}`}
      >
      {svgStrokes}
      </svg>
      </div>
      <div className='inputBox'>
        <input
          type={'text'}
          value={this.state.translation}
          onChange={(e) => this.updateTranslation(e)}
        >
        </input>
      </div>
      <div className='submitBox'>
      <button onClick={() => this.addGlyph()}>Submit</button>
      </div>
      </div>
    );
  }

  toggleStroke(idx) {
    let strokePos = this.state.activeParts.segments.indexOf(idx);
    if (strokePos === -1) {
      this.setState({
        activeParts: {
          segments: this.state.activeParts.segments.concat(idx),
          circles: this.state.activeParts.circles
        }
      });
    } else {
      let updatedSegments = this.state.activeParts.segments.filter(val => val !== idx);
      this.setState({
        activeParts: {
          segments: updatedSegments,
          circles: this.state.activeParts.circles
        }
      });
    }
  }

  toggleCircle(idx) {
    let circlePos = this.state.activeParts.circles.indexOf(idx);
    if (circlePos === -1) {
      this.setState({
        activeParts: {
          segments: this.state.activeParts.segments,
          circles: this.state.activeParts.circles.concat(idx)
        }
      });
    } else {
      let updatedCircles = this.state.activeParts.circles.filter(val => val !== idx);
      this.setState({
        activeParts: {
          segments: this.state.activeParts.segments,
          circles: updatedCircles
        }
      });
    }
  }

  addGlyph() {
    this.props.app.addNewGlyph(this.state.activeParts, this.state.translation);
    this.setState({
      activeParts: {
        segments: [],
        circles: []
      },
      translation: ''
    });
  }

  updateTranslation(evt) {
    this.setState({translation: evt.target.value});
  }
}