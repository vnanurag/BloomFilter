import React, { Component } from 'react';
import './App.css';
import BloomFilter from './BloomFilter'
import Names from './data'

class App extends Component{
    constructor(props){
      super(props);
      this.state={
        addValue:'',
        searchValue:'',
        memorySize: 50,
        memory: [],
        words:[],
        addMessage: '',
        searchMessage:''
      }
    }

  render(){

    return(
      <div className="container">

        <div className="header">Bloom Filter</div>

        <div className="btn" onClick={this.implementBloomFilter.bind(this)}>Initialize</div>
        <div className="note">
          Bloom Filter Memory : [{this.state.memory}]
        </div>

        <input type="text" 
                  ref={((input) =>{this.textInput = input} )}
                  className = "textInput"
                  placeholder = "Add items..."
                  value = {this.state.addValue}
                  onChange = {(addValue)=>{this.updateAddText(addValue)}}
                  onKeyPress={this.handleKeyPressValue.bind(this)} />

        <div className="btn" onClick={this.add.bind(this)}>Add</div>
        <div className="note">
          {this.state.addMessage}
        </div>

        <input type="text" 
                  ref={((input) =>{this.textInput = input} )}
                  className = "textInput"
                  placeholder = "Search items..."
                  value = {this.state.searchValue}
                  onChange = {(searchValue)=>{this.updateSearchText(searchValue)}}
                  onKeyPress={this.handleKeyPressValue.bind(this)} />

        <div className="btn" onClick={this.search.bind(this)}>Search</div>
        <div className="note">
          {this.state.searchMessage}
        </div>
      </div>
      
    );
  }

  // Initializing the memory array with the initial data
  implementBloomFilter = () =>{
    let words = [];
    if(this.state.words.length > 0){
      words = this.state.words;
    }
    else{
      const names = new Names();
      words = names.words();
    }

    // Initializing a new instance of bloom filter with array size
    const bf = new BloomFilter(this.state.memorySize);

    words.forEach((word) => {
      bf.add(word);
    })

    this.setState({
      memory: bf.memory,
      words: words
    })
  }

  // Adding strings to the data and updating the memory array
  add = () => {
    if(this.state.addValue === '') {
      return
    }
    
    let wordsArray = [];
    if(this.state.words.length > 0){
      wordsArray = this.state.words;
    }
    else{
      const names = new Names();
      wordsArray = names.words();
    }

    wordsArray.push(this.state.addValue);

    this.setState({
      addValue: '',
      words: wordsArray,
      addMessage: "Item added to the memory"
    });

    this.textInput.focus();
    this.implementBloomFilter();
  }

  // Checks if the string exists in the memory array
  search = () => {
    if(this.state.searchValue === ''){
      return;
    }
    
    let bf = new BloomFilter(this.state.memorySize);

    if(this.state.memory.length > 0){
      bf.memory = this.state.memory;
    }

    const exists = bf.contains(this.state.searchValue);
    
    this.setState({
      searchValue:''
    });

    this.setState({
      searchMessage: exists ? "Item may exist in the memory" : "Item does not exist in the memory"
    })
  }

  updateAddText = (noteText) =>{
    this.setState({
      addValue: noteText.target.value
    })
  }

  updateSearchText =(noteText) =>{
    this.setState({
      searchValue: noteText.target.value
    })
  }

  handleKeyPressValue = (event) => {
    if(event.key === 'Enter'){
      if(this.state.addValue !== ''){
        this.add();
      }
      else if(this.state.searchValue !== ''){
        this.search();
      }
    }
  }

}

export default App;
