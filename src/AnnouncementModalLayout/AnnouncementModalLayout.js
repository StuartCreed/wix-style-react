import React from 'react';
import PropTypes from 'prop-types';

import { st, classes } from './AnnouncementModalLayout.st.css';
import BaseModalLayout from '../BaseModalLayout';
import TextButton from '../TextButton';
import { dataHooks } from './constants';
import Heading from '../Heading';

/** A layout for announcement modals, to be used inside a &lt;Modal /&gt; */
class AnnouncementModalLayout extends React.PureComponent {
  _renderIllustration() {
    const { illustration } = this.props;

    return (
      <div className={classes.imageWrapper}>
        {typeof illustration === 'string' ? (
          <img src={illustration} width="100%" height="100%" />
        ) : (
          illustration
        )}
      </div>
    );
  }

  _renderLink() {
    const { linkText, linkOnClick, theme } = this.props;
    return (
      <div className={classes.additionalButtons}>
        <TextButton
          size="small"
          weight="normal"
          dataHook={dataHooks.link}
          onClick={linkOnClick}
          skin={theme}
        >
          {linkText}
        </TextButton>
      </div>
    );
  }

  _renderTitle() {
    const { title } = this.props;
    return typeof title !== 'string' ? (
      title
    ) : (
      <Heading appearance={'H2'} dataHook={dataHooks.title}>
        {title}
      </Heading>
    );
  }

  render() {
    const { dataHook, illustration, linkText } = this.props;

    const transformedProps = this.transformProps();

    return (
      <div className={st(classes.root)} data-hook={dataHook}>
        {illustration && this._renderIllustration()}
        <BaseModalLayout
          {...this.props}
          {...transformedProps}
          additionalButtons={linkText ? this._renderLink() : false}
        />
      </div>
    );
  }

  transformProps() {
    const { theme, primaryButtonProps, secondaryButtonProps } = this.props;
    primaryButtonProps['skin'] = theme;
    primaryButtonProps['size'] = 'medium';
    secondaryButtonProps['skin'] = theme;
    secondaryButtonProps['size'] = 'medium';

    return {
      title: this._renderTitle(),
      primaryButtonProps: primaryButtonProps,
      secondaryButtonProps: secondaryButtonProps,
    };
  }
}

AnnouncementModalLayout.displayName = 'AnnouncementModalLayout';

AnnouncementModalLayout.propTypes = {
  ...BaseModalLayout.propTypes,
  /** additional css classes */
  className: PropTypes.string,
  /** data hook for testing */
  dataHook: PropTypes.string,
  /** Illustration URL or custom element. */
  illustration: PropTypes.node,
  /** Theme will affect the buttons skins and illustration bg color. */
  theme: PropTypes.oneOf(['standard', 'premium']),
  /** When not provided, the primary link will not be rendered */
  linkText: PropTypes.string,
  /** callback for when the link is clicked */
  linkOnClick: PropTypes.func,
};

AnnouncementModalLayout.defaultProps = {
  ...BaseModalLayout.defaultProps,
  primaryButtonProps: {},
  secondaryButtonProps: {},
  theme: 'standard',
};

export default AnnouncementModalLayout;
