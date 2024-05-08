import * as React from 'react';
import {
  Card,
  CardBody,
  Text,
  Heading,
  Stack,
  Button,
  Image,
  Divider,
  List,
  ListItem,
  UnorderedList,
  Center,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import type { Advantage, Trip } from '@/rtk/features/ChooseApi/ChooseApi';
import { useGetTripQuery } from '@/rtk/features/ChooseApi/ChooseApi';
import { GeneralPath } from '@/routes/paths/GeneralPath';
import { kgConverter } from '@/resources/utils/kgConverter';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import classes from './ReadMore.module.css';

export const ReadMore = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isSm = useMediaQuery('(max-width: 600px)');

  const { data: trip } = useGetTripQuery(id);

  const sideCard = (trip: Trip) => (
    <Card
      w='100%'
      minW='200px'
    >
      <CardBody>
        <Stack>
          <Heading size='md'>{trip?.days} days</Heading>
          <Text>Emission: {kgConverter(Math.round(trip.co2kilograms))}</Text>
          <Divider />
          <List>
            <UnorderedList>
              {trip?.countries.map((country, index) => <ListItem key={index}>{country}</ListItem>)}
            </UnorderedList>
          </List>
        </Stack>
      </CardBody>
    </Card>
  );

  return (
    <div className={classes.layout}>
      {trip ? (
        <div className={classes.contentLayout}>
          <div className={classes.leftSection}>
            <div className={classes.buttonContainer}>
              <Button onClick={() => navigate('/' + GeneralPath.Start)}>Go back</Button>
            </div>
            <Card
              key={trip.id}
              w='100%'
              bg='rgba(255, 255, 255, 0)'
              border='none'
              boxShadow='none'
            >
              <CardBody>
                <Stack
                  mt='6'
                  mb='6'
                  spacing='3'
                >
                  <Heading size='lg'>{trip.title}</Heading>
                  <Text color='#4A5568'>{trip.subtitle}</Text>
                </Stack>
                <Image
                  src={trip.photoUrl}
                  alt='Travel photo'
                  borderRadius='lg'
                  maxHeight='350px'
                  width='100%'
                  objectFit='cover'
                />
              </CardBody>
            </Card>
            <div className={classes.overviewContainer}>
              {isSm && (
                <Center
                  mb={'40px'}
                  mr={'20px'}
                >
                  {sideCard(trip)}
                </Center>
              )}

              <div className={classes.advantageContainer}>
                {trip?.advantages.map((adv: Advantage, index) => (
                  <div
                    className={classes.advantage}
                    key={index}
                  >
                    <Text as='b'>{adv.title}</Text>
                    <Text color='#4A5568'>{adv.description}</Text>
                  </div>
                ))}
              </div>
              <Text>{trip.description}</Text>
            </div>
          </div>
          {!isSm && <div className={classes.sideCardContainer}>{sideCard(trip)}</div>}
        </div>
      ) : (
        <Text>Loading...</Text>
      )}
    </div>
  );
};
