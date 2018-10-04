import React, { Component } from 'react';
import axios from 'axios';
import getYouTubeId from "get-youtube-id";
import Results from "./components/Results";
import Nav from "./components/Nav";

class App extends Component {
  state = {
    initURL: "",
    initImg: "",
    encodedURL: "",
    results: [],
    err: "Youtube Thumbnail Source Finder: GetBG"
  }

  handleUrl = (e) => {
    this.setState({
      initURL: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();

    axios.get('https://helloacm.com/api/urlencode/?cached&s=' + "http://img.youtube.com/vi/" + getYouTubeId(this.state.initURL) + "/maxresdefault.jpg")
      .then((res) => {

        let pcImg = "http://img.youtube.com/vi/" + getYouTubeId(this.state.initURL) + "/maxresdefault.jpg"
        this.setState({
          encodedURL: 'https://cors.io/?http://saucenao.com/search.php?output_type=2&numres=12&+api_key=5d552ced442d4eabf91482d94afe2986752f79c1&url=' + res.data,
          initImg: pcImg
        })
        return axios.get(this.state.encodedURL);
      })
      .then((res) => {

        this.setState({
          results: res.data.results
        })
        console.log(res.data.results)
      })
      .catch((err) => {
        this.setState({
          err: "SERVERS OVERLOADED PLS WAIT",
          initURL: ""
        })
        axios.get('https://helloacm.com/api/urlencode/?cached&s=' + "http://img.youtube.com/vi/" + getYouTubeId(this.state.initURL) + "/maxresdefault.jpg")
          .then((res) => {
            this.setState({
              encodedURL: 'https://thingproxy.freeboard.io/fetch/http://saucenao.com/search.php?output_type=2&numres=10&+api_key=5d552ced442d4eabf91482d94afe2986752f79c1&url=' + res.data
            })
          })
        return axios.get(this.state.encodedURL)
          .then((res) => {
            this.setState({
              results: res.data.results
            })
          })

      });
  }

  render() {
    return (
      <div className="App" id="root">
        <Nav />
        <h1>{this.state.err}</h1>
        <img border="0" src={this.state.initImg} width="25%" height="25%" id="originImg" alt="" />

        <form onSubmit={this.handleSubmit}>
          <div className="d-flex justify-content-center">
            <div className="col-sm-6 my-2">
              <div className="input-group mb-3">
                <input type="url" className="form-control" placeholder="Paste Video URL." onChange={this.handleUrl} />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit">Get Source</button>
                </div>
              </div>
            </div>
          </div>
        </form>
        
        <div className="d-flex justify-content-center">
          <div className="card-columns" id="cardColumns">
            <Results results={this.state.results} />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
