import React from 'react';
import { Text, View } from 'react-native';
import { User } from '../types/User';
import { colors } from '../../theme';

export default function UserListItem({ item }: { item: User }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 6,
        elevation: 3,
      }}
    >
      {/* Avatar */}
      <View
        style={{
          height: 50,
          width: 50,
          borderRadius: 8,
          backgroundColor: colors.primaryLight,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        }}
      >
        <Text style={{ color: colors.primary, fontSize: 20 }}>
          {item.name?.charAt(0).toUpperCase()}
        </Text>
      </View>

      {/* Name */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontSize: 16 }} numberOfLines={1}>
          {item.name}
        </Text>
      </View>

      {/* Role  */}
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ color: 'gray', fontSize: 14 }} numberOfLines={1}>
          {item.role}
        </Text>
      </View>
    </View>
  );
}
