import React, {useEffect} from 'react';
import {useRef} from 'react';
import {View, Text} from 'react-native';
import {Marker} from 'react-native-maps';
import {Callout} from 'react-native-maps';
import rootColor from '../constants/color';
import rootFont from '../constants/fonts';
import {StateType} from '../types';

const MyMarker = ({
  state,
  showCallout,
  callbackMarker,
  callbackCallout,
}: {
  state: StateType;
  showCallout?: boolean;
  callbackMarker?: () => void;
  callbackCallout?: () => void;
}) => {
  const refMarker = useRef<Marker>(null);

  const onShowCallout = () => {
    if (refMarker && refMarker.current && refMarker.current.showCallout) {
      refMarker.current.showCallout();
    }
  };

  useEffect(() => {
    if (showCallout) {
      onShowCallout();
    }
  }, [showCallout]);

  return (
    <Marker
      onPress={callbackMarker}
      style={{maxWidth: 100, maxHeight: 100, backgroundColor: 'orange'}}
      key={state.isoCode}
      coordinate={{
        latitude: parseFloat(state.latitude),
        longitude: parseFloat(state.longitude),
      }}
      ref={refMarker}>
      <Callout onPress={callbackCallout}>
        <Text
          style={{
            color: rootColor.rootColor,
            maxWidth: 100,
            fontFamily: rootFont.regular,
          }}>
          Xem thời tiết {state.name}
        </Text>
      </Callout>
    </Marker>
  );
};

export default MyMarker;
