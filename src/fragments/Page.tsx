import React, { useMemo } from 'react';
import { FlatList, SectionList, Text } from 'react-native';
import { usersStore } from '../stateManager/Store';
import UserListItem from '../components/UserListItem';
import { User } from '../types/User';
import { debounce } from '../util';

const TAG = 'FRAG-PAGE :';

type Props = {
  role: string; //'all' | 'admin' | 'manager';
};

function Page({ role }: Props) {
  //   const { users, load } = usersStore(s => {
  //     return { users: s.users, load: s.load };
  //   });

  const { users, loading, load, setQuery } = usersStore();

  const filterUsers = useMemo(() => {
    if (role.toLowerCase() === 'all') return users;
    return users.filter(
      u => u.role?.toLowerCase() === role.toLocaleLowerCase(),
    );
  }, [users, role]);

  function groupByAlphabet(users: User[]) {
    const map: Record<string, User[]> = {};

    for (const user of users) {
      const name = user.name?.trim();
      if (!name) continue;
      const key = name[0].toUpperCase();
      if (!map[key]) map[key] = [];
      map[key].push(user);
    }

    return Object.keys(map)
      .sort()
      .map(key => ({
        title: key,
        data: map[key].sort(),
      }));
  }

  const sections = useMemo(() => groupByAlphabet(filterUsers), [filterUsers]);

  const debouncedLoad = debounce(load,400);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => `${item.id}_${index}`}
      renderItem={UserListItem}
      refreshing={loading}
      onRefresh={()=>setQuery("")}
      onEndReached={debouncedLoad}
      onEndReachedThreshold={0.9}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={{ padding: 8, fontWeight: 'bold', fontSize: 16 }}>
          {title}
        </Text>
      )}
    />
  );
}

export default Page;
