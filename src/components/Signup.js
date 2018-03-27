import React from 'react'
import { Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import * as EhsApi from '../api/EhsApi'
import AuthenticationService from '../services/AuthenticationService';

export default class Signup extends React.Component { 

    state = {
        name: '',
        email: '',
        password: ''
    }

    authService = new AuthenticationService();

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.authService.signup(this.state.name, this.state.email, this.state.password)
        .then(res => {
           this.props.history.replace('/');
        })
        .catch(err => {
            alert(err);
        })
    }

    render () {
        const { name, email, password } = this.state;
        return (
            <div className='login-form'>
                {/*
                Heads up! The styles below are necessary for the correct render of this example.
                You can do same with CSS, the main idea is that all the elements up to the `Grid`
                below must have a height of 100%.
                */}
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src='/logo.png' />
                            {' '}Join dss
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Name'
                                    name='name'
                                    value={name}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    name='email'
                                    value={email}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    name='password'
                                    value={password}
                                    onChange={this.handleChange}
                                />
                                <Form.Button color='teal' fluid size='large'>Create New Account</Form.Button>
                            </Segment>
                        </Form>
                        <Message>
                            Already have an account? <a href='/login'>Log In</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
