import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

// Define the background task at the top level (outside the component)
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('Background location task error:', error.message);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    console.log('Background location update:', locations);
  }
});

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const requestPermissions = async () => {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus === 'granted') {
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
        });
        setIsTracking(true);
      } else {
        setErrorMsg('Background location permission not granted');
      }
    } else {
      setErrorMsg('Foreground location permission not granted');
    }
  };

  // Also get foreground location to display latitude/longitude
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Task Manager + Location</Text>

      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : null}

      {location ? (
        <View style={styles.card}>
          <Text style={styles.label}>Latitude:</Text>
          <Text style={styles.value}>{location.coords.latitude.toFixed(6)}</Text>
          <Text style={styles.label}>Longitude:</Text>
          <Text style={styles.value}>{location.coords.longitude.toFixed(6)}</Text>
        </View>
      ) : (
        <Text style={styles.loading}>Fetching location...</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          onPress={requestPermissions}
          title={isTracking ? 'Background tracking enabled ✅' : 'Enable background location'}
          disabled={isTracking}
        />
      </View>

      <Text style={styles.note}>
        Note: Background location tracking requires a physical device.
        The task manager will continue to receive location updates even when the app is in the background.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  loading: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  error: {
    fontSize: 14,
    color: '#e74c3c',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  },
  note: {
    marginTop: 20,
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
});