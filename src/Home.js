import React from 'react';
import Cookies from 'js-cookie';
import qs from 'qs';
import Prismic from 'prismic-javascript';
import PrismicConfig from './prismic-configuration';
import PrismicReact from 'prismic-reactjs';

class Home extends React.Component {

  state = {
    longform: null,
  }

  componentWillMount() {
    this.fetchHome(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchHome(props);
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  fetchHome(props) {
    if (props.prismicCtx) {
      props.prismicCtx.api.query(Prismic.Predicates.at('document.type', 'longform'), { orderings : '[my.longform.date desc]' }, (err, response) => {
        this.setState({ 
          longform: response.results,
        });
      });
    }
  }

  renderLongform = (longformArray) => {
    if (longformArray) {
      return longformArray.map((longform) => 
        <div className="parentContainer">
          <a className="noUnderline" href={'/page/' + longform.uid}><div className="longformContainer">
              <img alt="cover" src={longform.data.background.url} />
              <div className="titleContainer">
                <h2>{PrismicReact.RichText.asText(longform.data.subtitle)}</h2>
                <h1>{PrismicReact.RichText.asText(longform.data.title)}</h1>
              </div>
          </div></a>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h1 className="subHead">Pineapples & Cutty Sark</h1>
        <div>{this.renderLongform(this.state.longform)}</div>
      </div>
    )
  }
}

export default Home