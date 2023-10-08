import { useState } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notifications } from '../notifications/notifications';

import { FaSearch } from 'react-icons/fa';

export const Searchbar = ({ handleSearchedQuery }) => {
  const [value, setValue] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    if (value.trim() === '') {
      return toast.info('Please enter key words for search', notifications);
    }

    handleSearchedQuery(value);
    setValue('');
  };

  const handleChange = evt => {
    setValue(evt.target.value);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <FaSearch />
        </Button>
        <Input
          type="text"
          name="searchQuery"
          value={value}
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
