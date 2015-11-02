import React from "react";
import ReactDOM from "react-dom";

function waitForDocument(doc, cb) {
  function inner() {
    if (doc.readyState === "complete") {
      cb();
    } else {
      setTimeout(inner, 0);
    }
  }
  inner();
}

export default class Gist extends React.Component {
  // static propTypes = {
  //   src: React.PropTypes.string.isRequired,
  //   onLoad: React.PropTypes.func.isRequired
  // };

  componentDidMount() {
    this.renderFrameContents();
  }

  renderFrameContents() {
    let contents = `<script src="https://gist.github.com/${this.props.src}.js"></script>`;
    let doc = ReactDOM.findDOMNode(this).contentDocument;

    waitForDocument(doc, () => {
      doc.open();
      doc.write(contents);
      doc.close();

      waitForDocument(doc, () => {
        let divs = [].slice.call(doc.getElementsByClassName("file"));
        let contents = divs.map( (d) => d.innerText);
        this.props.onLoad(contents);
      });
    });
  }

  render() {
    let style = {
      visibility: "hidden",
      position: "absolute"
    };

    return <iframe style={style} />;
  }
}
