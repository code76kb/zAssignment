import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import SearchBar from './SearchBar';
import { colors } from '../../theme';
const { width } = Dimensions.get('window');

type TabItem = {
  label: string;
};

type Props = {
  tabs: TabItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  //Search Bar callback
  showSearchIcon?: boolean;
  onSearch?: (text: string) => void;
};

export default function Tabs({
  tabs,
  activeIndex,
  onChange,
  showSearchIcon = false,
  onSearch,
}: Props) {
  const tabBarWidth = width - 60;

  //   const tabSize = tabBarWidth / tabs.length;

  const activeTabTranslateX = useRef(new Animated.Value(0)).current;

  const translateX = useRef(new Animated.Value(0)).current;
  const [searchBarExpanded, setSearchBarExpanded] = useState(false);
  const [tabSize, setTabSize] = useState(0);

  useEffect(() => {
    const value = searchBarExpanded ? -tabBarWidth : 0;
    Animated.timing(translateX, {
      toValue: value,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [searchBarExpanded]);

  useEffect(() => {
    const value = (tabSize + 4) * activeIndex;
    Animated.timing(activeTabTranslateX, {
      toValue: value,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, tabSize]);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}
    >
      <Animated.View
        style={{
          flexDirection: 'row',
          backgroundColor: '#eee',
          borderRadius: 20,
          padding: 4,
          flex: 1,
          height: 50,
          transform: [{ translateX }],
        }}
        testID={"tab_bar"}
      >
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <TouchableOpacity
              key={tab.label}
              testID={`tab_btn`}
              onPress={() => onChange(index)}
              onLayout={e => {
                setTabSize(e.nativeEvent.layout.width);
              }}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 16,
                backgroundColor: 'transparent',
                // borderWidth: isActive ? 1 : 0,
                // borderColor: colors.primary,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: isActive ? colors.primary : 'gray',
                  fontWeight: '500',
                }}
                testID={`tab_label_txt`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        {/* Active TAb Hover */}
        <Animated.View
          style={{
            position: 'absolute',
            width: tabSize,
            height: 50,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: colors.primary,
            backgroundColor: colors.primarySemiT,
            transform: [{ translateX: activeTabTranslateX }],
          }}
          testID={"active_tab_overlay"}
        />
      </Animated.View>

      {/* Search  */}
      {showSearchIcon && (
        <SearchBar
          onChangeText={text => onSearch?.(text)}
          onToggle={setSearchBarExpanded}
        />
      )}
    </View>
  );
}
