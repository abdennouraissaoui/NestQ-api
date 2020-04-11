import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()

  const login = useCallback((accessToken, refreshToken, expirationDate) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        accessToken,
        refreshToken,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null)
    setRefreshToken(null)
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (accessToken && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [accessToken, logout, tokenExpirationDate]);
 
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.accessToken &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.accessToken, storedData.refreshToken, new Date(storedData.expiration));
    }
  }, [login]);

  return { accessToken, login, logout, refreshToken };
};