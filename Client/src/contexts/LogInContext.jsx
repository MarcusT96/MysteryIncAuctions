import { createContext, useContext, useState } from 'react';

const LoginModalContext = createContext();

export const useModal = () => useContext(LoginModalContext);

export const ModalProvider = ({ children }) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalVisible(!isLoginModalVisible);
  };

  const closeModal = () => {
    setIsLoginModalVisible(false);
  }

    return (
      <LoginModalContext.Provider value={{ isLoginModalVisible, toggleLoginModal, closeModal }}>
        {children}
      </LoginModalContext.Provider>
    );
  };