import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GROUPS } from '../data';

const AddContact = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('Bạn bè');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const isDigitsOnly = (str) => {
    for (let i = 0; i < str.length; i++) {
      if (str[i] < '0' || str[i] > '9') {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanPhone || !cleanEmail || !group) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (cleanPhone.length !== 10 || !cleanPhone.startsWith('0') || !isDigitsOnly(cleanPhone)) {
      setErrorMsg('Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0');
      return;
    }

    if (!cleanEmail.includes('@')) {
      setErrorMsg('Email không hợp lệ');
      return;
    }

    onAdd({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      group: group,
    });

    navigate('/contacts', { replace: true });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Họ tên </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="phone">Số điện thoại </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email">Email </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="group">Nhóm </label>
          <select
            id="group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            {GROUPS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Thêm</button>
      </form>

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
    </div>
  );
};

export default AddContact;