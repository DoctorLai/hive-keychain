import React from 'react';
import { NewIcons } from 'src/common-ui/icons.enum';
import { SVGIcon } from 'src/common-ui/svg-icon/svg-icon.component';

type Props = { title: string };

const DialogHeader = ({ title }: Props) => {
  return (
    <div className="dialog-header">
      <SVGIcon icon={NewIcons.KEYCHAIN_LOGO_ROUND_SMALL} className="logo" />
      <div className="title">{title}</div>
    </div>
  );
};

export default DialogHeader;
