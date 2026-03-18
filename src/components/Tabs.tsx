import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import SearchBar from './SearchBar';
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
  showSearchIcon=false,
  onSearch,
}: Props) {


  const tabBarWidth = width - 60;

  const translateX = useRef(new Animated.Value(0)).current;
  const [searchBarExpanded, setSearchBarExpanded] = useState(false);

  useEffect(() => {
    const value = searchBarExpanded ? -tabBarWidth : 0;
    Animated.timing(translateX, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [searchBarExpanded]);

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
      >
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <TouchableOpacity
              key={tab.label}
              onPress={() => onChange(index)}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 16,
                backgroundColor: isActive ? '#fff' : 'transparent',
                borderWidth: isActive ? 1 : 0,
                borderColor: '#2f80ed',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: isActive ? '#2f80ed' : '#666',
                  fontWeight: '500',
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      {/* Search  */}
      {showSearchIcon && (
        <SearchBar onChangeText={(text) => onSearch?.(text)} onToggle={setSearchBarExpanded} />
      )}
    </View>
  );
}
