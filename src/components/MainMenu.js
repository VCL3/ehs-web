import React, { Component } from 'react';
import DropdownDivider, { Menu, Button, Dropdown } from 'semantic-ui-react';
import SearchBar from '../components/SearchBar';
import AuthenticationService from '../services/AuthenticationService';

export default class MainMenu extends Component {

    authService = new AuthenticationService();

    render() {
        const { hideSearch } = this.props;

        var rightButtonSection;
        if (this.authService.loggedIn()) {
            rightButtonSection = 
            <Dropdown item fluid text='profile' direction='left'>
                <Dropdown.Menu>
                    <Dropdown.Item text='Profile' href='/user/profile' />
                    <Dropdown.Item text='Watchlist' href='/user/watchlist' />
                    <Dropdown.Divider />
                    <Dropdown.Item as='a' icon='log out' text='Log out' href='/' onClick={this.authService.logout()} />
                </Dropdown.Menu>
            </Dropdown>
        } else {
            rightButtonSection =
            <div>
                <Button as='a' href='/login'>Log In</Button>
                <Button as='a' href='/signup' style={{ marginLeft: '0.5em' }}>Sign Up</Button>
            </div>
        }

        return (
            <Menu size='large'>
                <Menu.Item href='/'>Home</Menu.Item>
                <Menu.Item href='//www.baidu.com'>Work</Menu.Item>
                <Menu.Item href='/'>Calendar</Menu.Item>
                {!hideSearch && <Menu.Item>
                    <SearchBar />
                </Menu.Item>}
                <Menu.Item position='right'>
                    {rightButtonSection}
                </Menu.Item>
            </Menu>
        )
    }
}
