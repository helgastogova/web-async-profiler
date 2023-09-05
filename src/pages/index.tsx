import React, { useState, useEffect } from 'react';
import FrameGraph from '@client/graph';
import { BasePage } from '@client/layout';

const IndexPage = () => {
  const [data, setData] = useState(null);

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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <BasePage>
      <FrameGraph data={data} />
    </BasePage>
  );
};

export default IndexPage;
