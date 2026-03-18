import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usersStore } from '../stateManager/Store';
import { User } from '../types/User';
import { colors } from '../../theme';
import Page from '../fragments/Page';
import Tabs from '../components/Tabs';
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from 'react-native-pager-view';
import SearchBar from '../components/SearchBar';
import AddNewUserModal from '../components/AddNewUserModel';
const { width } = Dimensions.get('window');

const TAG = 'HOME-SCREEN :';

function HomeScreen() {
  const TABS = [{ label: 'All' }, { label: 'Admin' }, { label: 'Manager' }];

  const pagerRef = useRef<PagerView>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [showNewUserModel, setShowNewUserModel] = useState(false);

  const { users, loading, load, setQuery } = usersStore();

  useEffect(() => {
    console.log(TAG, 'DidMount');
    load();
    return () => {
      console.log(TAG, 'WillUnmount');
    };
  }, []);

  function searchUsers(term: string) {
    setQuery(term);
  }

  function onPageSelected(e: PagerViewOnPageSelectedEvent) {
    setTabIndex(e.nativeEvent.position);
  }

  function onTabIndexChange(index: number) {
    setTabIndex(index);
    pagerRef.current?.setPage(index);
  }

  function toggleNewUserModel() {
    setShowNewUserModel(s => !s);
    //Refresh for new Entry
    load();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            overflow: 'hidden',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <Tabs
              tabs={TABS}
              activeIndex={tabIndex}
              showSearchIcon={true}
              onChange={onTabIndexChange}
              onSearch={searchUsers}
            />
          </View>
        </View>

        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={onPageSelected}
        >
          {TABS.map((_, index) => {
            return (
              <View key={index} style={{ flex: 1 }}>
                <Page role={_.label} />
              </View>
            );
          })}
        </PagerView>

        {/* Add new FAB*/}
        <View style={{ position: 'absolute', bottom: 30, right: 16 }}>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 10,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={toggleNewUserModel}
          >
            <Text style={{ fontSize: 30, color: 'white' }}>{'+'}</Text>
          </TouchableOpacity>
        </View>

        <AddNewUserModal
          visible={showNewUserModel}
          onClose={toggleNewUserModel}
        />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
