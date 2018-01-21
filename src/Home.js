import React from 'react';
import Cookies from 'js-cookie';
import qs from 'qs';
import Prismic from 'prismic-javascript';
import PrismicConfig from './prismic-configuration';
import PrismicReact from 'prismic-reactjs';

class Home extends React.Component {

  state = {
    longform: null,
    media: null,
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
      props.prismicCtx.api.query(Prismic.Predicates.at('document.type', 'media'), { orderings : '[my.media.date desc]' }, (err, response) => {
        this.setState({ 
          media: response.results,
        });
      });
      
    }
  }

  renderLongform = (longformArray, mediaArray) => {
    if (longformArray && mediaArray) {
      let array = longformArray.concat(mediaArray)
      return array.map((post) => {
        console.log(post)
        if (post.type == 'longform') {
          return (
            <div className="parentContainer">
              <a className="noUnderline" href={'/longform/' + post.uid}><div className="longformContainer">
                  <img alt="cover" src={post.data.background.url} />
                  <div className="titleContainer">
                    <h2>{PrismicReact.RichText.asText(post.data.subtitle)}</h2>
                    <h1>{PrismicReact.RichText.asText(post.data.title)}</h1>
                  </div>
              </div></a>
            </div>
          )
        } else if (post.type == 'media') {
          return (
            <div className="parentContainer">
              <div className="mediaContainer">
                  <img alt="cover" src={post.data.cover.url} />
                  <div className="titleContainer">
                    <div className="titleOverlay"></div>
                    <a className="noUnderline" href={'/media/' + post.uid}><h1>{PrismicReact.RichText.asText(post.data.name)}</h1></a>
                    {PrismicReact.RichText.render(post.data.summary, this.props.prismicCtx.linkResolver)}
                  </div>
              </div>
            </div>
          )
        }
      }
      )
    }
  }

  render() {
    return (
      <div>
        <h1 className="subHead">Pineapples & Cutty Sark</h1>
        <div>{this.renderLongform(this.state.longform, this.state.media)}</div>
      </div>
    )
  }
}

export default Home