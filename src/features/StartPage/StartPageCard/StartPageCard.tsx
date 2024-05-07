import * as React from 'react';
import { Card, CardBody, Text, Heading, Stack, Button, Center, Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import type { Trip } from '@/rtk/features/ChooseApi/ChooseApi';
import { GeneralPath } from '@/routes/paths/GeneralPath';
import { kgConverter } from '@/resources/utils/kgConverter';
import { createStars } from '@/resources/utils/createStars';

interface StartPageCardProps {
  trip: Trip;
}

export const StartPageCard = ({ trip }: StartPageCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      w='350px'
      bgImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${trip.photoUrl})`}
      bgSize='cover'
      bgPos='center'
      color='white'
      variant='elevated'
    >
      <CardBody>
        <Stack spacing='3'>
          <Center>
            <Heading
              size='lg'
              minH={'72px'}
            >
              {trip.title}
            </Heading>
          </Center>
          <Center>
            <Text>
              {trip.countries.length} countries, {trip.days} days
            </Text>
          </Center>
          <Center>
            <Button
              variant='solid'
              colorScheme='blue'
              size={'md'}
              onClick={() => navigate('/' + GeneralPath.Trip + '/' + trip.id)}
            >
              Learn more
            </Button>
          </Center>
          <Center>
            <Box
              bg='#1A202C'
              borderRadius='md'
              h={12}
              w='300px'
            >
              <Center
                h='100%'
                mx='4'
              >
                <Flex
                  justifyContent='space-between'
                  width='100%'
                  color='white'
                  fontSize='md'
                >
                  <Text>Emissions offset:</Text>
                  <Text>{kgConverter(Math.round(trip.co2kilograms))}</Text>
                </Flex>
              </Center>
            </Box>
          </Center>
        </Stack>
      </CardBody>
      <Center>
        <Box
          bg='white'
          borderRadius='md'
          h={16}
          w='300px'
        >
          <Center
            h='100%'
            mx='4'
          >
            <Flex
              justifyContent='space-between'
              width='100%'
              color='#1A202C'
              fontSize='xl'
            >
              <Text>Trip rating: </Text>
              <Text>{createStars(trip.rating)}</Text>
              <Text>{trip.rating}</Text>
            </Flex>
          </Center>
        </Box>
      </Center>
    </Card>
  );
};
