//import React, {useState} from 'react';
import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Pusher from "pusher-js";
import pushid from "pushid";
import axios from "axios";
import "./App.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import Navbar from "./Components/Navbar";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import H from './pages/H';
import H1 from './pages/H1';
import C2 from './pages/C2';
import J3 from './pages/J3';

class App extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      html: "",
      css: "",
      js: ""
    };

    this.pusher = new Pusher("d82196e9dd3af4ee59c9", {
      cluster: "ap2",
      forceTLS: true
    });

    this.channel = this.pusher.subscribe("editor");
  }

  componentDidUpdate() {
    this.runCode();
  }

  componentDidMount() {
    this.setState({
      id: pushid()
    });

    this.channel.bind("text-update", data => {
      const { id } = this.state;
      if (data.id === id) return;

      this.setState({
        html: data.html,
        css: data.css,
        js: data.js
      });
    });
  }

  syncUpdates = () => {
    const data = { ...this.state };

    axios
      .post("http://localhost:5000/update-editor", data)
      .catch(console.error);
  };

  runCode = () => {
    const { html, css, js } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}

        <script type="text/javascript">
          ${js}
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: "material",
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true
    };
    
    return (
      <div className="App">
       
        <section className="dyteEd">
          <div className="editorhead"> File Explorer 
          </div>
          <Router>
          <Navbar />
          <Switch>
          <Route path='/' exact component={H} />
          <Route path='/H1' component={H1} />
          <Route path='/C2' component={C2} />
          <Route path='/J3' component={J3} />
          </Switch>
          </Router>
          
          <div className="codeeditZ html-code">
            <div className="editorhead">index.html</div>
            <CodeMirror
              value={html}
              options={{
                mode: "htmlmixed",
                ...codeMirrorOptions
              }}
              onBeforeChange={(editor, data, html) => {
                this.setState({ html }, () => this.syncUpdates());
              }}
            />
          </div>
          <div className="codeeditZ css-code">
            <div className="editorhead">index.css</div>
            <CodeMirror
              value={css}
              options={{
                mode: "css",
                ...codeMirrorOptions
              }}
              onBeforeChange={(editor, data, css) => {
                this.setState({ css }, () => this.syncUpdates());
              }}
            />
          </div>
          <div className="codeeditZ js-code">
            <div className="editorhead">index.js</div>
            <CodeMirror
              value={js}
              options={{
                mode: "javascript",
                ...codeMirrorOptions
              }}
              onBeforeChange={(editor, data, js) => {
                this.setState({ js }, () => this.syncUpdates());
              }}
            />
          </div>
        </section>
        <section className="website">
          <div className="liveViewhead">LIVE VIEW</div>
          <iframe title="website" className="iframe" ref="iframe" />
        </section>
      </div>
    );
  }
}

export default App;
