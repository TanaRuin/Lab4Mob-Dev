
# Battery Level App

## Overview

This application demonstrates how to retrieve and display device battery information using Expo. It shows the current battery level and the battery state of the device.

The app uses the Expo Battery API to access hardware battery information.

## Features

* Displays current battery percentage
* Shows battery charging state
* Updates battery information when the app loads

## Installation

Clone the repository and install dependencies:

```
git clone <repository-url>
cd week4battery
npm install
```

Install the required package:

```
npx expo install expo-battery
```

## Running the Application

Start the Expo development server:

```
npx expo start
```

Open the application using Expo Go on a mobile device, an Android emulator, or an iOS simulator.

Note: Battery monitoring only works on real mobile devices and does not work in the web preview.

## How to Use

1. Start the application.
2. The app automatically retrieves battery information.
3. The screen displays:

   * Battery level (percentage)
   * Battery state (charging, unplugged, etc.)
4. Plug or unplug the device to observe changes in the battery state.

## Technologies Used

* React Native
* Expo
* Expo Battery API

---

# Colour Themes App

## Overview

This application demonstrates how to implement light and dark mode themes in a React Native application using system color preferences.

The app detects the device theme automatically and adjusts the interface accordingly.

## Features

* Automatic detection of system theme
* Light mode interface
* Dark mode interface
* Dynamic styling based on theme

## Installation

Clone the repository:

```
git clone <repository-url>
cd lab4colthemes
npm install
```

## Running the Application

Start the development server:

```
npx expo start
```

Open the application using:

* Expo Go
* Android emulator
* iOS simulator
* Web browser preview

## How to Use

1. Launch the application.
2. The app reads the device’s theme setting.
3. The interface automatically switches between light mode and dark mode.
4. Change your device theme in system settings to observe the UI update.

## Technologies Used

* React Native
* Expo

---

# Task Manager with Location

## Overview

This application demonstrates how to access device location data and run background location tracking using Expo.

The app retrieves the device’s GPS coordinates and displays the latitude and longitude.

## Features

* Requests location permissions
* Retrieves device GPS coordinates
* Displays latitude and longitude
* Supports background location updates

## Installation

Clone the repository and install dependencies:

```
git clone <repository-url>
cd week4labtaskmanager
npm install
```

Install the required packages:

```
npx expo install expo-task-manager
npx expo install expo-location
```

## Running the Application

Start the Expo development server:

```
npx expo start
```

Open the app using Expo Go on a mobile device.

Note: Location services work best on a real mobile device and may not work correctly in the web preview.

## How to Use

1. Launch the application.
2. Press the button to enable location tracking.
3. Grant location permissions when prompted.
4. The app retrieves the device's location.
5. The screen displays the latitude and longitude values.

## Technologies Used

* React Native
* Expo
* Expo Task Manager
* Expo Location
