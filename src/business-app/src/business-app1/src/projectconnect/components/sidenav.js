import React from 'react';
import { Menu } from 'semantic-ui-react';

const SideNav = () => (
  <Menu vertical>
    <Menu.Item name="products" />
    <Menu.Item name="orders" />
    <Menu.Item name="customers" />
  </Menu>
);

export default SideNav;