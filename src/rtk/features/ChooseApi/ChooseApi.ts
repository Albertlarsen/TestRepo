import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Advantage {
  title: string;
  description: string;
}
export interface Trip {
  id: number;
  photoUrl: string;
  title: string;
  subtitle: string;
  countries: string[];
  days: number;
  co2kilograms: number;
  rating: number;
  description: string;
  advantages: Advantage[];
}

export interface PaginatedData {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Trip[];
}

const baseUrl = 'http://localhost:3000/';

export const ChooseApi = createApi({
  reducerPath: 'tripsApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('content-type', 'application/json; charset=utf-8');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrips: builder.query<PaginatedData, number>({
      query: (page: number) => `trips?_page=${page}&_per_page=12`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        // Extract data arrays from currentCache and newItems
        const currentData = currentCache.data ?? [];
        const newData = newItems.data ?? [];
        // Concatenate new items to the existing cache array
        return {
          ...currentCache,
          data: [...currentData, ...newData],
        };
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getTrip: builder.query<Trip, number>({
      query: (id: number) => ({ url: `trips/${id}` }),
    }),
  }),
});

export const { useGetTripsQuery, useGetTripQuery } = ChooseApi;

export const { endpoints, reducerPath, reducer, middleware } = ChooseApi;
