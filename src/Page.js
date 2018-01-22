import React from 'react';
import NotFound from './NotFound';
import PrismicReact from 'prismic-reactjs';
import Moment from 'react-moment';
// import { Helmet } from "react-helmet";
import MetaTags from 'react-meta-tags';

// Declare your component
class Page extends React.Component {

  state = {
    doc: null,
    media: null,
    notFound: false,
  }

  componentWillMount() {
    this.fetchPage(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props);
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  fetchPage(props) {
    console.log(props)
    if (props.prismicCtx) {
      // We are using the function to get a document by its uid
      return props.prismicCtx.api.getByUID('longform', props.match.params.uid, {}, (err, doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          this.setState({ doc });

          props.prismicCtx.api.getByID(doc.data.media.id, {}, (err, media) => {
            if (media) {
              this.setState({ media })
            } else {
              this.setState({ notFound: !media })
            }
          })
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
  }

  render() {
    console.log(this.state)
    if (this.state.doc && this.state.media) {
      return (
        <div className="page" data-wio-id={this.state.doc.id}>
          <MetaTags>
            <title>{PrismicReact.RichText.asText(this.state.doc.data.title)} - artisticritique</title>
            <meta property="og:title" content={PrismicReact.RichText.asText(this.state.doc.data.title)} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={'artisticritique.com/longform/' + this.state.doc.uid} />
            <meta property="og:image" content={this.state.doc.data.background.url} />
            <meta property="og:site_name" content="artisticritique" />
          </MetaTags>
          <img className="backgroundImage" alt="background" src={this.state.doc.data.background.url} />
          <div className="date">Last Updated on <Moment format="MMMM Do YYYY">{this.state.doc.last_publication_date}</Moment></div>
          <div className="pageBody">
            <h2>{PrismicReact.RichText.asText(this.state.doc.data.subtitle)}</h2>
            <h1>{PrismicReact.RichText.asText(this.state.doc.data.title)}</h1>
            <div className="mediaBox">
              <img className="coverImage" alt="cover" src={this.state.media.data.cover.url} />
              <div className="mediaMeta">
                <div className="greyBorderBottom"><h3>Title</h3><span> {PrismicReact.RichText.asText(this.state.media.data.name)}</span></div>
                <div className="greyBorderBottom"><h3>Artist</h3><span> {this.state.media.data.artist}</span></div>
                <div><h3>Category</h3><span> {this.state.media.data.category.slug}</span></div>
              </div>
            </div>
            {PrismicReact.RichText.render(this.state.doc.data.body, this.props.prismicCtx.linkResolver)}
          </div>
        </div>
      );
    } else if (this.state.notFound) {
      return <NotFound />;
    }
    return <h1></h1>;
  }
}

export default Page