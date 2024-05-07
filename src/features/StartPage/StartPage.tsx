import * as React from 'react';
import { Text } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import axios from 'axios';

import type { PaginatedData, Trip } from '@/rtk/features/ChooseApi/ChooseApi';

import { StartPageCard } from './StartPageCard/StartPageCard';
import classes from './StartPage.module.css';

export const StartPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<PaginatedData>();
  const [items, setItems] = useState<Trip[]>([]);
  const baseUrl = 'http://localhost:3000/';

  useEffect(() => {
    fetchTripsData();
  }, []);

  const fetchTripsData = async () => {
    axios
      .get(`${baseUrl}trips?_page=${currentPage}&_per_page=9`)
      .then((res) => {
        setPaginatedData(res.data);
        setItems(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchMoreData = () => {
    setCurrentPage(currentPage + 1);
    axios
      .get(`${baseUrl}trips?_page=${currentPage}&_per_page=9`)
      .then((res) => {
        console.log('res.data', res.data);
        setItems((prevItems) => [...prevItems, ...res.data.data]);
      })
      .catch((err) => console.log(err));
  };

  const mapStartPage = () =>
    items.map((trip: Trip, index: number) => (
      <StartPageCard
        key={index}
        trip={trip}
      />
    ));

  return (
    <InfiniteScroll
      dataLength={currentPage * 9} //This is important field to render the next data
      next={fetchMoreData}
      hasMore={items.length < paginatedData?.items}
      scrollThreshold={1}
      loader={
        <div style={{ textAlign: 'center' }}>
          <Text>Loading...</Text>
        </div>
      }
      endMessage={
        <p style={{ textAlign: 'center', marginTop: '50px', marginBottom: '50px' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className={classes.layout}>{mapStartPage()}</div>
    </InfiniteScroll>
  );
};
