import { LucideCross, LucideSearch } from 'lucide-react-native';
import React, { useEffect, useState, useRef } from 'react';
import {
  Animated,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Keyboard,
} from 'react-native';
import { colors } from '../../theme';

const { width } = Dimensions.get('window');

type Props = {
  onChangeText: (text: string) => void;
  onToggle: (isExpanded: boolean) => void;
};

export default function SearchBar({ onChangeText, onToggle }: Props) {
  const [isExpanded, setExpanded] = useState(false);
  const widthAnimated = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    const value = isExpanded ? width : 60;
    Animated.timing(widthAnimated, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();

    //Hide Keyboard
    if (!isExpanded) Keyboard.dismiss();
  }, [isExpanded]);

  function onIconClick() {
    setExpanded(prev => {
      const next = !prev;
      onToggle?.(next);
      if (!next) {
        onChangeText('');
      }
      return next;
    });
  }

  return (
    <Animated.View style={[styles.container, { width: widthAnimated }]}>
      {isExpanded && (
        <TextInput
          style={styles.input}
          placeholder={'Search'}
          onChangeText={onChangeText}
          autoFocus
        />
      )}
      <TouchableOpacity onPress={onIconClick} style={styles.iconWrapper}>
        <Text style={{ fontSize: 20, color: 'black' }}>
          {isExpanded ? 'X' : 'Q'}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: '100%',
    // borderRadius:30,
    // backgroundColor: colors.primaryLight,
  },
});
