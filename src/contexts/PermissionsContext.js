import React, { createContext, useState, useEffect, useContext } from 'react';
import MainApi from '@/api-manage/MainApi';
import { permissions } from '@/api-manage/ApiRoutes';

const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const [permissionsData, setPermissionsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async (token) => {
    try {
      const response = await MainApi.get(`${permissions}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setPermissionsData(response.data);
    } catch (error) {
      console.error('Error fetching permissions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('crew_token');
    if (token) {
      fetchPermissions(token);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <PermissionsContext.Provider value={{ permissionsData, loading, fetchPermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
