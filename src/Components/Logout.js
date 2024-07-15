import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';

const LogoutButton = () => {
  const history = useHistory();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Xử lý đăng xuất ở đây (xoá localStorage, đặt isLoggedIn về false, vv...)
      
      // Chuyển hướng về trang đăng nhập
      history.push('/login');
      
      // Hiển thị thông báo thành công (nếu cần)
      toast.success('You have successfully logged out!');
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo
      console.error('An error occurred while logging out:', error.message);
      toast.error('An error occurred while logging out. Please try again later.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      variant="success"
      onClick={handleLogout}
      className="mt-3 ml-3"
      disabled={isLoggingOut}
    >
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </Button>
  );
};

export default LogoutButton;
