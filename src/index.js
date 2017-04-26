import _ from 'lodash';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchBar';
import VideoList from './components/videoList';
import VideoListItem from './components/videoListItem';
import VideoDetail from './components/videoDetail';
const API_KEY = "AIzaSyCJ8b4ZGrDdSf9Hwd-JkH4dT2TgEz1dMzY";

// Create a new component.  This component should produce some HTML
class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        videos: [],
        selectedVideo: null
       };

       this.videoSearch('surfboards');
     }

    videoSearch(term) {
      YTSearch({ key: API_KEY, term: term}, (videos) => {
        this.setState({
          videos: videos,
          selectedVideo: videos[0]
         });
        // this.setState({ videos: videos })
      });
    }

    render() {
      const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)
    return (
      <div>
        <SearchBar onSearchTermChange ={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState ({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}

// Take this component's generate HTML, and put it on the page (in the DOM)
ReactDom.render(<App />, document.querySelector(".container"));
