import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { AppText } from './AppText';

const TimerCountdown = () => {
  const startDate = new Date('2025-07-13T00:00:00.000Z');
  const endDate = new Date('2025-07-31T23:59:59.000Z');

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();

    const total = endDate - now;
    if (total <= 0) return null;

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    return {minutes, seconds};
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <View style={styles.container}>
        <AppText style={{ color: "#DA5821" }}>⏰ Time's up!</AppText>
      </View>
    );
  }

  return (
    // <View style={styles.container}>
      <AppText style={{ color: "#DA5821" }}>
        {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
      </AppText>
    // </View>
  );
};

const styles = StyleSheet.create({
  // container: {padding: 20, alignItems: 'center'},
  // text: {fontSize: 10, fontWeight: 'bold'},
});

export default TimerCountdown;
