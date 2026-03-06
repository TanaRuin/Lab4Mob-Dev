import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const TASK_NAME = "location-background-task";

// store latest coordinates
let currentCoords: { latitude: number; longitude: number } | null = null;

// Background task
TaskManager.defineTask(TASK_NAME, (task: TaskManager.TaskManagerTaskBody) => {

  const { data, error } = task;

  if (error) {
    console.log("Location task error:", error);
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };

    const latitude = locations[0].coords.latitude;
    const longitude = locations[0].coords.longitude;

    currentCoords = { latitude, longitude };
  }

});
export default function Index() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const startTracking = async () => {
    // Request foreground permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    // Request background permission
    const background = await Location.requestBackgroundPermissionsAsync();

    if (background.status !== "granted") {
      alert("Background location permission denied");
      return;
    }

    // Get current location immediately
    const position = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    // Start background updates
    await Location.startLocationUpdatesAsync(TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 1,
    });
  };

  const refreshLocation = () => {
    if (currentCoords) {
      setLocation(currentCoords);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Start Location Tracking" onPress={startTracking} />

      <View style={{ height: 20 }} />

      <Button title="Update Location Display" onPress={refreshLocation} />

      {location && (
        <View style={styles.infoBox}>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoBox: {
    marginTop: 20,
  },
});