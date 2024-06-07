import { createContext, useState } from 'react';

const UserProgressContext = createContext({
  progress: '', // 'cart', 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState('');

  function showCart() {
    console.log('showCart called');
    setUserProgress('cart');
  }

  function hideCart() {
    console.log('hideCart called');
    setUserProgress('');
  }

  function showCheckout() {
    console.log('showCheckout called');
    setUserProgress('checkout');
  }

  function hideCheckout() {
    console.log('hideCheckout called');
    setUserProgress('');
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
      <UserProgressContext.Provider value={userProgressCtx}>
        {children}
      </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
