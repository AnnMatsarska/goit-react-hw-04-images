import { Component } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifications } from '../notifications/notifications';

import { FaSearch } from 'react-icons/fa';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { query } = this.state;
    if (query === '') {
      return toast.info('Please enter key words for search', notifications);
    }

    this.props.onSubmit(query);
    this.setState({
      query: '',
    });
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <FaSearch />
          </Button>
          <Input
            type="text"
            name="query"
            value={this.state.query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </Form>
        <ToastContainer />
      </Header>
    );
  }
}
