import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '15px' }}>
      <NavLink to="/" end>Trang chủ</NavLink>
      <NavLink to="/contacts" end>Danh sách</NavLink>
      <NavLink to="/contacts/new" end>Thêm mới</NavLink>
    </nav>
  );
};

export default NavBar;