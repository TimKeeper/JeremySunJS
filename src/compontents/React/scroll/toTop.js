import React, { PureComponent } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './toTop.scss';

const classNames = {
  enter: styles['to-top-btn-enter'],
  enterActive: styles['to-top-btn-active-enter'],
  exit: styles['to-top-btn-exit'],
  exitActive: styles['to-top-btn-active-exit'],
  // exitDone: styles['totop-done-exit']
};
export default class ToTop extends PureComponent {
  render() {
    const { scrollToTop, showToTop } = this.props;
    return (
      <TransitionGroup>
        {
                    showToTop ? (
                      <CSSTransition
                        key={1}
                        timeout={300}
                        classNames={classNames}
                      >
                        <div
                          onClick={() => scrollToTop()}
                          className="to-top-btn"
                        >点我
                        </div>
                      </CSSTransition>
                    ) : null
                }
      </TransitionGroup>
    );
  }
}
