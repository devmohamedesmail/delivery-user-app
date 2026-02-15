import React, { useContext } from 'react';
import { Button } from 'react-native';
import { PlaceContext } from '@/context/place-provider';

export default function ResetPlaceButton() {
  const placeContext = useContext(PlaceContext);

  if (!placeContext) return null;

  const { setSelectedPlace } = placeContext;

  return (
    <Button
      title="Reset Place"
      onPress={() => setSelectedPlace(null)}
      color="#FF6B00" // لون برتقالي مثل الـ splash
    />
  );
}
