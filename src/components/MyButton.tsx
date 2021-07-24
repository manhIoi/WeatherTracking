import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface MyButtonProps {
  callback: () => void;
  title: string;
  styleContainer?: object;
  stylesText?: object;
}

const MyButton = ({
  callback,
  title,
  styleContainer,
  stylesText,
}: MyButtonProps) => {
  return (
    <TouchableOpacity
      onPress={callback}
      style={[styles.container, styleContainer]}>
      <Text style={[styles.text, stylesText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MyButton;
