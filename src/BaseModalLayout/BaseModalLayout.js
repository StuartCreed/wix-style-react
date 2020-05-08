import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import Button from '../Button';
import { st, classes } from './BaseModalLayout.st.css';
import { dataHooks } from './constants';
import CloseButton from '../CloseButton';
import Divider from '../Divider';
import Heading from '../Heading/Heading';

/** Private component to be used by all public modals. Represents the common internals of all modals */
class BaseModalLayout extends React.PureComponent {
  static displayName = 'BaseModalLayout';

  static propTypes = {
    /** The modal's title */
    title: PropTypes.node,
    /** The modal's subtitle */
    subtitle: PropTypes.string,
    /** When not provided, the primary action button will not be rendered */
    primaryButtonText: PropTypes.string,
    /** Passed to the primary button as props without any filter / mutation */
    primaryButtonProps: (() => {
      const { dataHook, onClick, ...buttonProps } = Button.propTypes;
      return PropTypes.shape(buttonProps);
    })(),
    /** callback for when the primary button is clicked */
    primaryButtonOnClick: PropTypes.func,
    /** When not provided, the secondary action button will not be rendered */
    secondaryButtonText: PropTypes.string,
    /** Passed to the secondary button as props without any filter / mutation */
    secondaryButtonProps: (() => {
      const { dataHook, onClick, priority, ...buttonProps } = Button.propTypes;
      return PropTypes.shape(buttonProps);
    })(),
    /** callback for when the secondary button is clicked */
    secondaryButtonOnClick: PropTypes.func,
    /** a slot for additional buttons below the primary and secondary */
    additionalButtons: PropTypes.node,
    /** callback for when the close button is clicked */
    onCloseButtonClick: PropTypes.func,
    /** When set to true, there will be no content padding */
    removeContentPadding: PropTypes.bool,
    /** a footnote node, to be rendered at the very bottom of the modal */
    footnote: PropTypes.node,
    /** side actions node, to be rendered as the first element on the same row as the action buttons */
    sideActions: PropTypes.node,
    /** the children / content of the modal */
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    primaryButtonText: '',
    secondaryButtonText: '',
    title: '',
    subtitle: '',
    removeContentPadding: false,
  };

  _renderHeaderLayout = () => {
    const { title, subtitle } = this.props;
    return (
      <div className={classes.header}>
        {typeof title === 'string' ? (
          <Heading dataHook={dataHooks.title} appearance={'H3'}>
            {title}
          </Heading>
        ) : (
          title
        )}
        {subtitle && (
          <Text secondary dataHook={dataHooks.subtitle}>
            {subtitle}
          </Text>
        )}
      </div>
    );
  };

  _renderFooterLayout = () => {
    const {
      sideActions,
      secondaryButtonText,
      secondaryButtonOnClick,
      secondaryButtonProps,
      primaryButtonText,
      primaryButtonOnClick,
      primaryButtonProps,
      additionalButtons,
    } = this.props;
    return (
      <>
        <Divider className={classes.footerDivider} />
        <div className={classes.actions}>
          {sideActions && (
            <div className={classes.sideActions}>{sideActions}</div>
          )}
          <div className={classes.buttons}>
            {secondaryButtonText && (
              <Button
                size="small"
                {...secondaryButtonProps}
                onClick={secondaryButtonOnClick}
                priority="secondary"
                dataHook={dataHooks.secondaryButton}
              >
                {secondaryButtonText}
              </Button>
            )}
            {primaryButtonText && (
              <Button
                size="small"
                {...primaryButtonProps}
                onClick={primaryButtonOnClick}
                dataHook={dataHooks.primaryButton}
              >
                {primaryButtonText}
              </Button>
            )}
          </div>
          {additionalButtons}
        </div>
      </>
    );
  };

  render() {
    const {
      primaryButtonText,
      secondaryButtonText,
      title,
      removeContentPadding,
      children,
      sideActions,
      footnote,
      onCloseButtonClick,
      linkText,
    } = this.props;

    const hasFooter =
      sideActions || primaryButtonText || secondaryButtonText || linkText;

    return (
      <div className={st(classes.root, { removeContentPadding })}>
        {title && this._renderHeaderLayout()}
        {children && <div className={classes.contentWrapper}>{children}</div>}
        {hasFooter && this._renderFooterLayout()}
        {footnote && (
          <>
            <Divider />
            <div className={classes.footnote}>{footnote}</div>
          </>
        )}
        <CloseButton
          dataHook={dataHooks.closeButton}
          className={classes.closeButton}
          onClick={onCloseButtonClick}
          size="large"
          skin="dark"
        />
      </div>
    );
  }
}

export default BaseModalLayout;
