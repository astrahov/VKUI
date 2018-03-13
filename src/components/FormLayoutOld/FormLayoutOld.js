import './FormLayoutOld.css';
import React from 'react';
import PropTypes from 'prop-types';
import getClassName from '../../helpers/getClassName';
import removeObjectKeys from '../../lib/removeObjectKeys';
import classnames from '../../lib/classnames';

export default class FormLayoutOld extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    tagName: PropTypes.string,
    mod: PropTypes.string,
    allowSubmit: PropTypes.bool,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    allowSubmit: true
  };

  baseClass = 'FormLayout';

  onSubmit = (e) => {
    if (!this.props.allowSubmit) {
      e.preventDefault();
    } else {
      this.props.onSubmit && this.props.onSubmit(e);
    }
  };

  render () {
    const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    const TagName = this.props.tagName || 'form';
    const modifiers = {
      [`${this.baseClass}--web`]: this.props.mod === 'web'
    };

    return (
      <TagName className={classnames(getClassName(this.baseClass), modifiers)} {...removeObjectKeys(this.props, ['tagName', 'mod', 'allowSubmit', 'onSubmit'])} onSubmit={this.onSubmit}>
        <div className={`${this.baseClass}__container`}>
          {children.map((field, i) => (
            <label className={`${this.baseClass}__row`} key={field.key || `row-${i}`}>
              <div className={`${this.baseClass}__separator`} />
              {!!field.props.label && (
                <div className={`${this.baseClass}__label`}>
                  <div className={`${this.baseClass}__label-in`}>{field.props.label}</div>
                </div>
              )}
              <div className={`${this.baseClass}__field`}>
                {field}
              </div>
            </label>
          ))}
        </div>
        {TagName === 'form' && this.props.allowSubmit && <input type="submit" style={{ position: 'absolute', visibility: 'hidden' }} />}
      </TagName>
    );
  }
}