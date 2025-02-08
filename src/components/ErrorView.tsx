import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

const ErrorView = ({message, onRetry}: ErrorViewProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Button mode="contained" onPress={onRetry} style={styles.button}>
        Tekrar Dene
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  message: {
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
});

export default ErrorView; 