import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ToTop from './toTop';

const SCROLL_THUMB_PIXEL = 8;
// 内置生效的样式
const defaultCssStyle = `
	.mj-scroll {
		position: relative;
	}
	.mj-scroll .mj-scroll-content::-webkit-scrollbar {
		width: 0px !important;
		height: 0px !important;
	}
	.mj-scroll .mj-scroll-track {
	    cursor: default;
	    margin: 0;
	    position: absolute;
	    user-select: none;
	}
	.mj-scroll .mj-scroll-track::-webkit-scrollbar {
		width: 0px !important;
		height: 0px !important;
	}
	.mj-scroll:hover .mj-scroll-thumb {
		opacity: .5;
	}
	.mj-scroll .mj-scroll-v-track {
	    top: 0;
        bottom: 0;
        right: ${SCROLL_THUMB_PIXEL + 2}px;
        width: 0;
        z-index: 2499;
	}
	.mj-scroll .mj-scroll-h-track {
        left: 0;
        right: 0;
	    bottom: ${SCROLL_THUMB_PIXEL + 2}px;
        height: 0;
        z-index: 2499;
	}
	.mj-scroll .mj-scroll-thumb {
		cursor: pointer;
		opacity: 0;
		width: ${SCROLL_THUMB_PIXEL}px;
		height: ${SCROLL_THUMB_PIXEL}px;
        transition: opacity .15s linear;
		background-color: rgb(0,0,0);
        border-radius: ${SCROLL_THUMB_PIXEL}px;
	}
	.mj-scroll .mj-scroll-thumb.active {
		opacity: .7;
	}
	.mj-scroll .mj-scroll-thumb.ready {
		opacity: .7;
	}
`;

function addMscrollStyle() {
  if (!document.getElementById('mj-scroll')) {
    const styleNode = document.createElement('style');
    styleNode.id = 'mj-scroll';
    styleNode.innerHTML = defaultCssStyle;
    document.head.insertBefore(styleNode, null);
  }
}

addMscrollStyle();
const reqAnimFrame = function (fn) {
  const raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || setTimeout;
  raf(fn);
};
const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }
  return cc / 2 * ((t -= 2) * t * t + 2) + b;
};
export default class Scroll extends PureComponent {
    static propTypes = {
      openToTop: PropTypes.bool, // 是否开启ToTop
      className: PropTypes.string,
      style: PropTypes.object,
      children: PropTypes.element.isRequired,
      onScroll: PropTypes.func,
      onMouseWheel: PropTypes.func,
      renderKey: PropTypes.object, // 更有滚动容器限定
    }

    static defaultProps = {
      openToTop: true,
      className: '',
      style: {},
      children: null,
      onScroll: new Function(),
      onMouseWheel: new Function(),
    }

    _handlerScroll = (e) => {
      const { onScroll } = this.props;
      if (onScroll) {
        onScroll(e);
      }
      this._initScrollBar();
      if (e.target.scrollTop > e.target.clientHeight) {
        !this.state.showToTop && this.setState({ showToTop: true });
      } else {
        this.state.showToTop && this.setState({ showToTop: false });
      }
    }

    _init = () => {
      this._initScrollBar();
    }

    _initScrollBar = () => {
      const payload = this._getScrollInfo();
      this._computeScrollBar(payload);
      this._renderScrollBar();
    }

    _getScrollInfo = () => {
      const {
        scrollTop, scrollLeft, scrollHeight, scrollWidth, clientWidth, clientHeight,
      } = this.scrollRef.current;
      return {
        scrollTop, scrollLeft, scrollHeight, scrollWidth, clientWidth, clientHeight,
      };
    }

    _computeScrollBar = (payload) => {
      const {
        scrollTop, scrollLeft, scrollHeight, scrollWidth, clientWidth, clientHeight,
      } = payload;


      const hasH = scrollWidth > clientWidth;


      const hasV = scrollHeight > clientHeight;


      const h = hasH ? {
        x: scrollLeft / scrollWidth * clientWidth,
        w: clientWidth / scrollWidth * clientWidth,
        cW: clientWidth,
      } : null;


      const v = hasV ? {
        y: scrollTop / scrollHeight * clientHeight,
        h: clientHeight / scrollHeight * clientHeight,
        cH: clientHeight,
      } : null;
      this.h = h;
      this.v = v;
    }

    _renderScrollBar = () => {
      if (this.h) {
        this.hRrack.current.setAttribute('style', `transform: translateX(${this.h.x}px);width: ${this.h.w}px`);
      } else {
        this.hRrack.current.setAttribute('style', 'display: none;');
      }
      if (this.v) {
        this.vRrack.current.setAttribute('style', `transform: translateY(${this.v.y}px);height: ${this.v.h}px`);
      } else {
        this.vRrack.current.setAttribute('style', 'display: none;');
      }
    }

    _handlerTrackMouseOver = (e) => {
      const trackDom = e.target;
      if (!trackDom.classList.contains('ready')) {
        trackDom.classList.add('ready');
      }
    }

    _handlerTrackMouseOut = (e) => {
      const trackDom = e.target;
      if (trackDom.classList.contains('ready')) {
        trackDom.classList.remove('ready');
      }
    }

    _handlerTrackMouseDown = (e) => {
      const scrollDom = this.scrollRef.current;


      const payload = this._getScrollInfo();
      this._computeScrollBar(payload);
      this._transformInfo = {
        action: e.target === this.vRrack.current ? 'v' : 'h',
        h: this.h,
        v: this.v,
        clientX: e.clientX,
        clientY: e.clientY,
        scrollHeight: scrollDom.scrollHeight,
        scrollWidth: scrollDom.scrollWidth,
      };
      e.target.classList.add('active');
      this._handlerDragover = (e) => {
        const change = {
          x: e.clientX - this._transformInfo.clientX,
          y: e.clientY - this._transformInfo.clientY,
        };
        if (this._transformInfo.action === 'v') {
          const { v } = this._transformInfo;


          let p = 0;
          if (change.y > 0) {
            p = change.y > v.cH - v.y - v.h ? v.cH - v.h : v.y + change.y;
          } else {
            p = Math.abs(change.y);
            p = p > v.y ? 0 : v.y - p;
          }
          scrollDom.scrollTop = p / v.cH * scrollDom.scrollHeight;
          if (p + this._transformInfo.v.h >= v.cH) {
            p = v.cH - this._transformInfo.v.h;
          }
          if (p > 550) {
            // debugger;
          }
          this.vRrack.current.style.transform = `translateY(${p}px)`;
        } else {
          const { h } = this._transformInfo;


          let p = 0;
          if (change.x > 0) {
            p = change.x > h.cW - h.x - h.w ? h.cW - h.w : h.x + change.x;
          } else {
            p = Math.abs(change.x);
            p = p > h.x ? 0 : h.x - p;
          }
          scrollDom.scrollLeft = p / h.cW * scrollDom.scrollWidth;
          this.hRrack.current.style.transform = `translateX(${p}px)`;
        }
      };
      this._handlerDragEnd = () => {
        if (this._transformInfo.action === 'v') {
          this.vRrack.current.classList.remove('active');
        } else {
          this.hRrack.current.classList.remove('active');
        }
        delete this._transformtInfo;
        document.removeEventListener('mousemove', this._handlerDragover);
        document.removeEventListener('mouseup', this._handlerDragEnd);
      };
      document.addEventListener('mousemove', this._handlerDragover, false);
      document.addEventListener('mouseup', this._handlerDragEnd, false);
    }

    /**
     * 点击ToTop 滚动到顶部
     * @private
     */
    _scrollToTop = (ms = 400) => {
      const scrollTop = this.scrollRef.current.scrollTop;
      const startTime = Date.now();
      const frameFunc = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        this.scrollRef.current.scrollTop = easeInOutCubic(time, scrollTop, 0, ms);
        if (time < ms) {
          reqAnimFrame(frameFunc);
        } else {
          console.log('已经滚动带顶部');
        }
      };
      reqAnimFrame(frameFunc);
    }

    constructor(props) {
      super(props);
      this.scrollRef = React.createRef();
      this.vRrack = React.createRef();
      this.hRrack = React.createRef();
      this.h = void 0;
      this.v = void 0;
      this.state = {
        showToTop: false, // 是否展示ToTop
      };
    }

    componentDidMount() {
      this._init();
    }

    componentDidUpdate(nextProps) {
      if (nextProps.renderKey !== this.props.renderKey) {
        if (this._transformInfo) {
          const scrollDom = this.scrollRef.current;
          // 特殊情况  滚动的时候触发容器变更时 重置 this._transformInfo.h和this._transformInfo.v
          if (scrollDom.scrollHeight !== this._transformInfo.scrollHeight) {
            this._transformInfo.v.y = this._transformInfo.v.y / scrollDom.scrollHeight * this._transformInfo.scrollHeight;
            this._transformInfo.v.h = this._transformInfo.v.h / scrollDom.scrollHeight * this._transformInfo.scrollHeight;
            this._transformInfo.scrollHeight = scrollDom.scrollHeight;
            this.hRrack.current.style.height = `${this._transformInfo.v.h}px)`;
          }
          if (scrollDom.scrollWidth !== this._transformInfo.scrollWidth) {
            this._transformInfo.h.x = this._transformInfo.h.x / scrollDom.scrollWidth * this._transformInfo.scrollWidth;
            this._transformInfo.h.w = this._transformInfo.h.w / scrollDom.scrollWidth * this._transformInfo.scrollWidth;
            this._transformInfo.scollWidth = scrollDom.scrollWidth;
            this.hRrack.current.style.width = `${this._transformInfo.h.w}px)`;
          }
        } else {
          this._initScrollBar();
        }
      }
    }

    render() {
      const {
        openToTop, children, style, className,
      } = this.props;


      const iStyle = Object.assign({}, style || {}, { overflow: 'hidden' });
      return (
        <div
          className={`mj-scroll ${className}`}
          style={iStyle}
        >
          <div
            ref={this.scrollRef}
            className="mj-scroll-content"
            onScroll={this._handlerScroll}
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, overflow: 'scroll',
            }}
          >
            {children}
          </div>
          <div className="mj-scroll-track mj-scroll-h-track">
            <div
              className="mj-scroll-thumb"
              ref={this.hRrack}
              onMouseOver={this._handlerTrackMouseOver}
              onMouseOut={this._handlerTrackMouseOut}
              onMouseDown={this._handlerTrackMouseDown}
            />
          </div>
          <div className="mj-scroll-track mj-scroll-v-track">
            <div
              className="mj-scroll-thumb"
              ref={this.vRrack}
              onMouseOver={this._handlerTrackMouseOver}
              onMouseOut={this._handlerTrackMouseOut}
              onMouseDown={this._handlerTrackMouseDown}
            />
          </div>
          {
            openToTop ? (<ToTop scrollToTop={this._scrollToTop} showToTop={this.state.showToTop} />) : null
          }
        </div>
      );
    }
}
