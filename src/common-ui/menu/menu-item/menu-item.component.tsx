import { MenuItem } from '@interfaces/menu-item.interface';
import React, { useState } from 'react';
import { SVGIcon } from 'src/common-ui/svg-icon/svg-icon.component';
import './menu-item.component.scss';

interface MenuItemProps {
  menuItem: MenuItem;
  handleMenuItemClick: (menuItem: MenuItem) => void;
  isLast: boolean;
}

export const MenuItemComponent = ({
  menuItem,
  isLast,
  handleMenuItemClick,
}: MenuItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="menu-item-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div
        data-testid={'menu-settings-button-' + menuItem.icon}
        className="menu-item"
        onClick={() => handleMenuItemClick(menuItem)}>
        <SVGIcon icon={menuItem.icon} className="icon" forceHover={hovered} />
        <div className="menu-label">
          {chrome.i18n.getMessage(menuItem.label)}
        </div>
        <div className="divider"></div>
        {menuItem.rightPanel && <menuItem.rightPanel />}
      </div>
      {!isLast && <div className="separator"></div>}
    </div>
  );
};
