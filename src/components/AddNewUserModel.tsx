import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from 'react-native';
import { colors } from '../../theme';
import Tabs from './Tabs';
import { Repository } from '../repository';
import { UserNew } from '../types/User';
import { usersStore } from '../stateManager/Store';

const NAME_REGEX = /^[A-Za-z ]{1,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AddNewUserModal({ visible, onClose }: Props) {
  //Role Tab
  const TABS = [{ label: 'Admin' }, { label: 'Manager' }];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { load } = usersStore();

  function validate() {
    const first = firstName.trim();
    const last = lastName.trim();

    if (!NAME_REGEX.test(first)) {
      return 'Invalid first name';
    }

    if (!NAME_REGEX.test(last)) {
      return 'Invalid last name';
    }

    if (email) {
      if (!EMAIL_REGEX.test(email.trim())) {
        return 'Invalid email';
      }
    }
    return null;
  }

  async function onClickCreateNewUser() {
    const validation = validate();
    if (validation) {
      ToastAndroid.show(validation, ToastAndroid.SHORT); //TODO: Change to snakeBar(Toast is android only)
      return;
    }
    //
    const newUser: UserNew = {
      name: `${firstName} ${lastName}`,
      email: email,
      role: TABS[roleIndex].label,
      _synced: 0,
    };
    setLoading(true);
    const res = await Repository.addNewUser(newUser);
    setLoading(false);
    //Refresh for new User
    load();
    closeModel();
  }

  function closeModel() {
    //Reset-Back
    setFirstName('');
    setLastName('');
    setEmail('');
    setRoleIndex(0);
    //
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" testID='new_user_model'>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 16,
            gap: 20,
          }}
        >
          <TouchableOpacity style={{ padding: 6 }} onPress={closeModel} testID='close_model_btn'>
            <Text style={{ fontSize: 20, color: colors.primary }}>X</Text>
          </TouchableOpacity>

          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 20, color: 'Black', fontFamily: 'bold' }}>
              {'New User'}
            </Text>

            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={{
                borderBottomWidth: 1,
                marginBottom: 12,
                padding: 8,
              }}
              testID='first_name_input_field'
            />

            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={{
                borderBottomWidth: 1,
                marginBottom: 12,
                padding: 8,
              }}
               testID='last_name_input_field'
            />

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderBottomWidth: 1,
                marginBottom: 16,
                padding: 8,
              }}
               testID='email_input_field'
            />
          </View>

          <View style={{ gap: 10 }}>
            <Text style={{ fontSize: 20, color: 'Black', fontFamily: 'bold' }}>
              {'User Role'}
            </Text>
            <Tabs tabs={TABS} onChange={setRoleIndex} activeIndex={roleIndex} />
          </View>

          {/* Submit btn */}
          <View style={{}}>
            <TouchableOpacity
              onPress={onClickCreateNewUser}
              disabled={loading}
              style={{
                paddingVertical: 10,
                borderRadius: 16,
                height: 44,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
               testID='create_new_user_btn'
            >
              <Text style={{ color: 'white', fontWeight: '500' }}>
                {'Create User'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
