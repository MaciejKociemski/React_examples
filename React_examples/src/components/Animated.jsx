
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const itemWidth = width / 2;

export default function TileScrollingReanimated() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.x;
  });
  return (
    <View style={styles.flex}>
      <Animated.FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={(x) => x.toString()}
        renderItem={({ index }) => <Item index={index} scrollY={scrollY} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        snapToInterval={itemWidth}
        onScroll={scrollHandler}
        decelerationRate="fast"
      />
    </View>
  );
}

function Item({ index, scrollY }) {
  const itemScaleStyle = useAnimatedStyle(() => {
    const input = [
      index * itemWidth - itemWidth,
      index * itemWidth,
      index * itemWidth + itemWidth,
    ];
    const output = [0.8, 1, 0.8];
    const clamp = {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    };
    return {
      transform: [{ scale: interpolate(scrollY.value, input, output, clamp) }],
    };
  });
  return <Animated.View style={[styles.item, itemScaleStyle]} />;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  item: {
    height: itemWidth,
    width: itemWidth,
    backgroundColor: "red",
    borderRadius: 10,
  },
  list: {
    alignItems: "center",
    paddingHorizontal: (width - itemWidth) / 2,
  },
});
