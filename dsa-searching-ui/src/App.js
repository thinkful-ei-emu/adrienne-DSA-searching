import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 
                26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 
                46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 
                88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 
                9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5].sort((a,b) => a - b),
      searchNum: null,
      numTimes: 0
    };
  }

  linearSearch = (array, value) => {
    value = parseInt(value);
    for (let i = 0; i < array.length; i++) {
      if(array[i] === value) {
        let num = i + 1;
        this.setState({
          numTimes: num
        })
      }
    }
    return `No number found. Took ${this.state.searchNum} searches`;
  }

  // binarySearch(array, value, start, end, numTimes = 0) {
  //   numTimes++;
  //   start = start === undefined ? 0 : start;
  //   end = end === undefined ? array.length: end;
    
  //   if(start > end) {
  //     return -1;
  //   }

  //   const index = Math.floor((start + end) / 2);
  //   const item = array[index];

  //   console.log(start, end);
  //   if(item === value) {
  //     return numTimes;
  //   }
  //   else if(item < value) {
  //     return binarySearch(array, value, index + 1, end, numTimes);
  //   }
  //   else if(item > value) {
  //     return binarySearch(array, value, start, index - 1, numTimes);
  //   }
  // }

  onSubmitLinear = event => {
    event.preventDefault();
    this.setState({
      searchNum: event.target.searchNum.value
    })
    console.log(this.indexOf(this.state.dataSet, event.target.searchNum.value));
    // const {linearSearch} = event.target;
    // console.log(linearSearch);
    // let searchNum = parseInt(linearSearch.value);
    // let result = this.indexOf(this.state.dataSet, searchNum);

    // if(result === -1) {
    //   result = 'Number not found in dataset';
    // } else {
    //   result = result + 1;
    // }
    // console.log('result', result);
    // this.setState({
    //   searchNum: result
    // })
  }

  render() {
    return (
      <div className="App">
        <form className='linearSearch' onSubmit={this.onSubmitLinear}>
          <label htmlFor='linear-search'>Linear Search: </label>
          <input type='text' id='linear-search' />
          <button type='submit'>Search</button>
        </form>
        <form className='binarySearch' onSubmit={this.onSubmitBinary}>
          <label htmlFor='binary-search'>Binary Search: </label>
          <input type='text' id='binary-search' />
          <button type='submit'>Search</button>
        </form>
        <p>Number of Searches: {this.state.searchNum}</p>
        <p style={{maxWidth: '30em'}}><strong>Data Set: </strong> {this.state.dataSet.join(' ')}</p>
      </div>
    );
  }
}