/* eslint-disable import/first */
const BUILD_TAG = "hb-9472";

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import ContactDetail from './pages/ContactDetail';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gk_contacts');
    if (saved) {
      setContacts(JSON.parse(saved));
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    axios
      .get('/data/contacts.json', { signal: controller.signal })
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_contacts', JSON.stringify(contacts));
    }
  }, [contacts, loading]);

  const handleAddContact = (newContact) => {
    const maxId = contacts.reduce((max, item) => {
      return item.id > max ? item.id : max;
    }, 0);

    const contactToAdd = {
      id: Number(maxId + 1),
      ...newContact,
      favorite: false,
    };

    setContacts([...contacts, contactToAdd]);
  };

  const handleToggleFavorite = (id) => {
    const updatedList = contacts.map((item) => {
      if (item.id === id) {
        return { ...item, favorite: !item.favorite };
      }
      return item;
    });
    setContacts(updatedList);
  };

  const handleDeleteContact = (id) => {
    const updatedList = contacts.filter((item) => item.id !== id);
    setContacts(updatedList);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home contacts={contacts} loading={loading} error={error} />}
        />
        <Route
          path="contacts"
          element={
            <ContactList
              contacts={contacts}
              loading={loading}
              error={error}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeleteContact}
            />
          }
        />
        <Route
          path="contacts/new"
          element={<AddContact onAdd={handleAddContact} />}
        />
        <Route
          path="contacts/:id"
          element={
            <ContactDetail contacts={contacts} loading={loading} error={error} />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;