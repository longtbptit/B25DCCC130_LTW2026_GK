import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactDetail = ({ contacts, loading, error }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isCalling, setIsCalling] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [endMessage, setEndMessage] = useState('');

  useEffect(() => {
    if (!isCalling) {
      return;
    }

    const timerId = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isCalling]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const contact = contacts.find((item) => item.id === Number(id));

  if (!contact) {
    return (
      <div>
        <p>Không tìm thấy liên hệ</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const { name, phone, email, group, favorite } = contact;

  const handleCall = () => {
    setSeconds(0);
    setEndMessage('');
    setIsCalling(true);
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setEndMessage(`Cuộc gọi kết thúc sau ${seconds} giây`);
  };

  return (
    <div>
      <p>{`Họ tên: ${name}`}</p>
      <p>{`Số điện thoại: ${phone}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Nhóm: ${group}`}</p>
      <p>{`Yêu thích: ${favorite ? 'Có' : 'Không'}`}</p>

      <div style={{ margin: '15px 0' }}>
        {!isCalling ? (
          <button onClick={handleCall}>Gọi</button>
        ) : (
          <div>
            <p>{`Đang gọi... ${seconds} giây`}</p>
            <button onClick={handleEndCall}>Kết thúc</button>
          </div>
        )}
        {endMessage && <p>{endMessage}</p>}
      </div>

      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default ContactDetail;