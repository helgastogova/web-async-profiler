import React, { useState, useEffect } from 'react';
import { TableReport } from '@client/report/table';
import { BasePage } from '@client/base-page';
import { Loader } from '@ui';

const IndexPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetching data...');
        const response = await fetch('data.json');
        console.log('Status Code:', response.status);

        if (!response.ok) {
          throw new Error(`Network response was not OK, status: ${response.status}`);
        }
        const jsonData = await response.json();

        if (!jsonData || typeof jsonData !== 'object') {
          throw new Error('Invalid JSON data');
        }

        setData(jsonData);
      } catch (error) {
        console.error('There was a problem with the fetch:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <Loader />;

  return (
    <BasePage>
      <TableReport data={data} />
    </BasePage>
  );
};

export default IndexPage;
