import React, { useState, useEffect } from 'react';
import { TableReport } from '@client/report/table';
import { BasePage } from '@client/base-page';
import { Loader } from '@ui';

const IndexPage = () => {
  const [data, setData] = useState(null);

  // TODO: remove fetching data from here, it is only for dev purposes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        const jsonData = await response.json();
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
