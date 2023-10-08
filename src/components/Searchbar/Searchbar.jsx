import { Component } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifications } from '../notifications/notifications';

import { FaSearch } from 'react-icons/fa';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.value.trim() === '') {
      return toast.info('Please enter key words for search', notifications);
    }

    this.props.handleSearchedQuery(this.state.value);
    this.setState({ value: '' });
  };

  handleChange = evt => {
    this.setState({ value: evt.target.value });
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
            name="searchQuery"
            value={this.state.value}
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
