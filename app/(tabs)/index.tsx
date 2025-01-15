import React, { useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import markers from "@/assets/markers";

const HomeScreen = () => {
  const mapRef = useRef<MapView>(null);
  const [selectedCard, setSelectedCard] = useState("");

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={markers[0].coordinates}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.name}
            coordinate={marker.coordinates}
          />
        ))}
      </MapView>
      <View style={styles.markerListContainer}>
        <FlatList
          horizontal
          data={markers}
          keyExtractor={(item) => item.name}
          renderItem={({ item: marker }) => (
            <Pressable
              onPress={() => {
                setSelectedCard(marker.name);
                mapRef.current?.animateToRegion(marker.coordinates, 1000);
              }}
              style={
                marker.name === selectedCard
                  ? styles.activeMarkerButton
                  : styles.markerButton
              }
            >
              <Image
                source={{ uri: marker.image }}
                style={styles.markerImage}
              />
              <View style={styles.markerInfo}>
                <Text style={styles.markerName}>{marker.name}</Text>
                <Text style={styles.markerDescription}>
                  {marker.description}
                </Text>
              </View>
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  map: {
    flex: 1,
  },
  markerListContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  activeMarkerButton: {
    backgroundColor: "#E7E3AC",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 250,
  },
  markerButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 250,
  },
  markerImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 10,
  },
  markerInfo: {
    flex: 1,
  },
  markerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  markerDescription: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
});
export default HomeScreen;
