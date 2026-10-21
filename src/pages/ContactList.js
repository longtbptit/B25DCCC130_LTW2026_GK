import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import ContactTable from '../components/ContactTable';

const ContactList = ({ contacts, loading, error, onToggleFavorite, onDelete }) => {
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('Tất cả');

  const handleQueryShift = (e) => {
    setSearch(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroup(e.target.value);
  };

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  const filteredContacts = contacts.filter(({ name, phone, group: itemGroup }) => {
    const keyword = search.toLowerCase();
    const matchesKeyword =
      name.toLowerCase().includes(keyword) || phone.toLowerCase().includes(keyword);
    const matchesGroup = group === 'Tất cả' || itemGroup === group;

    return matchesKeyword && matchesGroup;
  });

  return (
    <div>
      <FilterBar
        search={search}
        onSearchChange={handleQueryShift}
        group={group}
        onGroupChange={handleGroupChange}
      />
      <p>{`Tìm thấy ${filteredContacts.length} liên hệ`}</p>
      <ContactTable
        contacts={filteredContacts}
        onToggleFavorite={onToggleFavorite}
        onDelete={onDelete}
      />
    </div>
  );
};

export default ContactList;