import React from 'react';
import ContactRow from './ContactRow';

const ContactTable = ({ contacts, onToggleFavorite, onDelete }) => {
  if (contacts.length === 0) {
    return <p>Không có dữ liệu</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Họ tên</th>
          <th>Điện thoại</th>
          <th>Email</th>
          <th>Nhóm</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((item) => (
          <ContactRow
            key={item.id}
            contact={item}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;