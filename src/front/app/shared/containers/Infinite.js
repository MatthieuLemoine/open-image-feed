/**
 * Inspired by Casette's react-infinite-scroller
 *
 * @see https://github.com/CassetteRocks/react-infinite-scroller
 */
import { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

function topPosition(domElt) {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetTop + topPosition(domElt.offsetParent);
}

class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.scrollListener = this.scrollListener.bind(this);
  }
  componentDidMount() {
    this.pageLoaded = this.props.pageStart;
    this.el         = findDOMNode(this);
    this.parentEl   = this.getParentDOMElement();
    this.attachScrollListener();
  }
  componentDidUpdate() {
    this.attachScrollListener();
  }
  componentWillUnmount() {
    this.detachScrollListener();
  }
  setDefaultLoader(loader) {
    this._defaultLoader = loader;
  }
  getParentDOMElement() {
    return this.props.parentSelector ?
      document.querySelector(this.props.parentSelector) : findDOMNode(this).parentNode;
  }
  scrollListener() {
    const el         = this.el;
    const parentNode = this.parentEl;
    const scrollEl   = window;

    let offset;
    if (this.props.useWindow) {
      const scrollTop = (scrollEl.pageYOffset !== undefined) ?
        scrollEl.pageYOffset :
          (document.documentElement || document.body.parentNode || document.body).scrollTop;
      offset = topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight;
    } else {
      offset = el.offsetHeight - parentNode.scrollTop - parentNode.clientHeight;
    }

    if (offset < Number(this.props.threshold)) {
      this.detachScrollListener();
      this.props.loadMore(this.pageLoaded += 1);
    }
  }
  attachScrollListener() {
    if (!this.props.hasMore) {
      return;
    }

    let scrollEl = window;
    if (!this.props.useWindow) {
      // PARENT
      scrollEl = this.parentEl;
    }

    scrollEl.addEventListener('scroll', this.scrollListener);
    scrollEl.addEventListener('resize', this.scrollListener);
    if (this.pageLoaded === 0) {
      this.scrollListener();
    }
  }
  detachScrollListener() {
    let scrollEl = window;
    if (!this.props.useWindow) {
      // PARENT
      scrollEl = this.parentEl;
    }

    scrollEl.removeEventListener('scroll', this.scrollListener);
    scrollEl.removeEventListener('resize', this.scrollListener);
  }
  render() {
    const props = this.props;
    return React.DOM.div(
      null, props.children, props.hasMore && (props.loader || this._defaultLoader)
    );
  }
}

InfiniteScroll.propTypes = {
  pageStart      : PropTypes.number,
  hasMore        : PropTypes.bool,
  loadMore       : PropTypes.func.isRequired,
  threshold      : PropTypes.number,
  useWindow      : PropTypes.bool,
  parentSelector : PropTypes.string
};

InfiniteScroll.defaultProps = {
  pageStart : 0,
  hasMore   : false,
  loadMore  : () => {},
  threshold : 250,
  useWindow : false
};

export default InfiniteScroll;
