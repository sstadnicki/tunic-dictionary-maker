import './App.css';
import GlyphEditor from './GlyphEditor';
import GlyphEntry from './GlyphEntry';
import React, {Component} from 'react';
import {glyphWidth} from './GlyphHelpers';

function increasingCompare(first, second) {
  let firstLen = glyphWidth(first.parts.segments);
  let secondLen = glyphWidth(second.parts.segments);
  return (firstLen < secondLen)? -1
        :(firstLen > secondLen)? 1
        :first.translation.localeCompare(second.translation);
}

function decreasingCompare(first, second) {
  let firstLen = glyphWidth(first.parts.segments);
  let secondLen = glyphWidth(second.parts.segments);
  return (firstLen > secondLen)? -1
        :(firstLen < secondLen)? 1
        :first.translation.localeCompare(second.translation);
}

function alphabeticalCompare(first, second) {
  return first.translation.localeCompare(second.translation);
}

function convertOldArray(transArr) {
  let newArr = transArr.map((entry) => {
    let newSegments = entry.segments.filter(item => typeof(item) === 'number');
    let newCircles = entry.segments
    .filter(item => typeof(item) === 'string')
    .map(str => Number.parseInt(str.substr(1)));
    return {
      translation: entry.translation,
      parts: {
        segments: newSegments,
        circles: newCircles
      }
    }
  });
  return newArr;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translationsArr: []
    };
  }

  componentDidMount() {
    let transArrJSON = localStorage.getItem("glyphDictionary");
    if (transArrJSON !== null) {
      let transArr = JSON.parse(transArrJSON);
      // Quick hack to cover for the case where we load an old array
      if (Array.isArray(transArr)
       && transArr.length
       && transArr[0].hasOwnProperty('segments')) {
         transArr = convertOldArray(transArr);
       }
      this.setState({translationsArr: transArr});
    }
  }

  render() {
    return (
      <div className="topLevel">
        <GlyphEditor app={this}></GlyphEditor>
        <div className='sortButtons'>
        <p>Sort by:</p>
        <button onClick={() => this.sortDict('increasingLength')}>Shortest to Longest</button>
        <button onClick={() => this.sortDict('decreasingLength')}>Longest to Shortest</button>
        <button onClick={() => this.sortDict('alphabetical')}>Alphabetical</button>
        </div>
        <div className="glyphsList">
          {
            this.state.translationsArr.map((entry, idx) =>
              <GlyphEntry
                parts={entry.parts}
                translation={entry.translation}
                key={idx}
                index={idx}
                app={this}
              />
            )
          }
        </div>
        <div className="buttonsDiv">
        <button onClick={() => this.saveDict()}>Save Dictionary</button>
        <button onClick={() => this.loadDict()}>Load Dictionary</button>
        </div>
      </div>
    );
  }

  addNewGlyph(parts, translation) {
    this.setState({
      translationsArr: [{parts: parts, translation: translation}, ...this.state.translationsArr]
    }, 
      () => this.saveDictToStorage()
    );
  }

  changeGlyph(index, newTranslation) {
    let transArr = [...this.state.translationsArr];
    let entry={...transArr[index]};
    entry.translation = newTranslation;
    transArr[index] = entry;
    this.setState({
      translationsArr: transArr
    },
      () => this.saveDictToStorage()
    );
  }

  removeGlyph(index) {
    let transArr = [...this.state.translationsArr];
    transArr.splice(index, 1);
    this.setState({
      translationsArr: transArr
    },
      () => this.saveDictToStorage()
    );
  }

  saveDict() {

  }

  loadDict() {

  }

  sortDict(order) {
    let transArr = [...this.state.translationsArr];
    let compareFunc = {
      increasingLength: increasingCompare,
      decreasingLength: decreasingCompare,
      alphabetical: alphabeticalCompare
    }[order];
    transArr.sort(compareFunc);
    this.setState(
      {translationsArr: transArr},
      () => this.saveDictToStorage()
    );
  }

  saveDictToStorage() {
    localStorage.setItem("glyphDictionary", JSON.stringify(this.state.translationsArr));
  }
}

export default App;
