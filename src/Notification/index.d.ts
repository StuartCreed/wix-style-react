import * as React from 'react';
import CloseButton from '../CloseButton';

export interface NotificationProps {
  dataHook?: string;
  show?: boolean;
  theme?: NotificationTheme;
  type?: NotificationType;
  autoHideTimeout?: number;
  zIndex?: number;
  onClose?: (source: string) => void;
}

export type NotificationTheme = 'standard' | 'error' | 'success' | 'warning' | 'premium';

export type NotificationType = 'local' | 'global' | 'sticky';

export default class Notification extends React.Component<NotificationProps> {
  static ActionButton: typeof ActionButton;
  static TextLabel: typeof TextLabel;
  static CloseButton: typeof CloseButton;
}

declare const TextLabel: React.SFC;
declare const ActionButton: React.SFC<ActionButtonProps>;
declare const DEFAULT_TIMEOUT: number;

interface TextLinkActionButton {
  type: 'textLink';
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  link?: string;
  target?: string;
}

interface ButtonActionButtonProps {
  type?: 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type ActionButtonProps = ButtonActionButtonProps | TextLinkActionButton;
