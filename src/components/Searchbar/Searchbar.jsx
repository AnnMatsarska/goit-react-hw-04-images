import { useState } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifications } from '../notifications/notifications';

import { FaSearch } from 'react-icons/fa';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      return toast.info('Please enter key words for search', notifications);
    }

    onSubmit(query);
    setQuery('');
  };

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <FaSearch />
        </Button>
        <Input
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </Form>
      <ToastContainer />
    </Header>
  );
};
