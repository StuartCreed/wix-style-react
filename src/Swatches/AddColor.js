import React from 'react';

import ColorPicker from '../ColorPicker';
import Color from 'color';
import Popover from '../Popover';
import FillButton from '../FillButton';

import { dataHooks } from './constants';

const EMPTY_COLOR = Color('#00000000');

class AddColor extends React.PureComponent {
  state = {
    color: EMPTY_COLOR,
    shown: false,
  };

  toggleColorPicker = () =>
    this.setState({
      shown: !this.state.shown,
    });

  hideColorPicker = () =>
    this.setState({
      shown: false,
      color: EMPTY_COLOR,
    });

  setColor = color =>
    this.setState({
      color,
    });

  confirm = () => {
    this.hideColorPicker();
    this.props.onAdd(this.state.color.hex());
  };

  render() {
    const { tooltip, iconSize } = this.props;
    const { shown, color } = this.state;
    const isEmptyColor = color.alpha() === 0;
    const noColorSelected = !shown || isEmptyColor;
    const buttonColor = noColorSelected ? undefined : color.hex();

    return (
      <Popover
        dataHook={dataHooks.addButtonPopover}
        appendTo="window"
        placement="top"
        showArrow
        shown={shown}
        onClickOutside={this.hideColorPicker}
      >
        <Popover.Element>
          <FillButton
            dataHook={dataHooks.addButton}
            iconSize={iconSize}
            fill={buttonColor}
            tooltipContent={tooltip}
            onClick={this.toggleColorPicker}
            tooltipProps={{ disabled: shown, timeout: 0 }}
          />
        </Popover.Element>
        <Popover.Content>
          <ColorPicker
            allowEmpty={false}
            dataHook={dataHooks.addButtonColorPicker}
            onCancel={this.hideColorPicker}
            onChange={this.setColor}
            onConfirm={this.confirm}
            showConverter={false}
            showInput={false}
            value={isEmptyColor ? '' : color}
          />
        </Popover.Content>
      </Popover>
    );
  }
}
export default AddColor;
