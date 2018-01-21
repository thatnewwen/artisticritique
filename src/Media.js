import React from 'react';
import NotFound from './NotFound';
import PrismicReact from 'prismic-reactjs';
import Moment from 'react-moment';

// Declare your component
class Media extends React.Component {

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
      return props.prismicCtx.api.getByUID('media', props.match.params.uid, {}, (err, media) => {
        if (media) {
          // We put the retrieved content in the state as a doc variable
          this.setState({ media });

          // props.prismicCtx.api.getByID(doc.data.media.id, {}, (err, media) => {
          //   if (media) {
          //     this.setState({ media })
          //   } else {
          //     this.setState({ notFound: !media })
          //   }
          // })
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !media });
        }
      });
    }
    return null;
  }

  render() {
    if (this.state.media) {
      return (
        <div className="page mediaPage" data-wio-id={this.state.media.id}>
          <div className="pageBody">
            <h1>{PrismicReact.RichText.asText(this.state.media.data.name)}</h1>
            {PrismicReact.RichText.render(this.state.media.data.summary, this.props.prismicCtx.linkResolver)}
          </div>
        </div>
      );
    } else if (this.state.notFound) {
      return <NotFound />;
    }
    return <h1></h1>;
  }
}

export default Media