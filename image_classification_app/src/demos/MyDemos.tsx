// 1. Import dependencies
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Camera, MobileModel} from 'react-native-pytorch-core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import classifyImage from './ImageClassifier';
// 2. Import the ImageNetClasses JSON file, which is used below to map the
// processed model result to a class label

import * as ImageNetClasses from './ImageNetClasses.json';

// 2. App function to render a camera and a text
export default function App() {
  // 2.i. Safe area insets to compensate for notches and bottom bars
  const insets = useSafeAreaInsets();

  // 1. Create a React state to store the top class returned from the
  // classifyImage function
  const [topClass, setTopClass] = React.useState(
    "Press capture button to classify what's in the camera view!",
  );

  // 1. Function to handle images whenever the user presses the capture button
  async function handleImage(image) {
    // 2. Call the classify image function with the camera image
    const result = await classifyImage(image);

    // 2. Set result as top class label state
    setTopClass(result);
    // 3. Log the result from classify image to the console
    console.log(result);
    // 1.ii. Release the image from memory
    image.release();
  }
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* 2.ii. Render camara and make it parent filling */}
      <Camera
        style={[StyleSheet.absoluteFill, {bottom: insets.bottom}]}
        // 2. Add handle image callback on the camera component
        onCapture={handleImage}
      />

      {/* 2.iii. Label container with custom render style and a text */}
      <View style={styles.labelContainer}>
        {/* 3. Change the text to render the top class label */}
        <Text>{topClass}</Text>
      </View>
    </View>
  );
}

// 3. Custom render style for label container
const styles = StyleSheet.create({
  labelContainer: {
    padding: 20,
    margin: 20,
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
