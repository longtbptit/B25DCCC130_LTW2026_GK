import React from 'react';

const Home = ({ contacts, loading, error }) => {
  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const total = contacts.length;

  const favoriteCount = contacts.reduce((sum, item) => {
    return item.favorite ? sum + 1 : sum;
  }, 0);

  const gmailCount = contacts.reduce((sum, item) => {
    return item.email.endsWith('@gmail.com') ? sum + 1 : sum;
  }, 0);

  return (
    <div>
      <h1>Danh bạ</h1>
      <p>{`Tổng số liên hệ: ${total}`}</p>
      <p>{`Số liên hệ yêu thích: ${favoriteCount}`}</p>
      <p>{`Số liên hệ dùng Gmail: ${gmailCount}`}</p>
    </div>
  );
};

export default Home;