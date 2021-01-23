import React from 'react';

import MenuButton from './index'

export default {
    title: 'MenuButton',
    component: MenuButton,
};

const Template = (args) => <MenuButton { ...args }/>

export const MenuButtonOpen = Template.bind({})

MenuButtonOpen.args = {
    isExpanded: true
}