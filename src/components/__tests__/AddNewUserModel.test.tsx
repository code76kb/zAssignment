import React from 'react';
import { render, fireEvent, } from '@testing-library/react-native';
import AddNewUserModel from '../AddNewUserModel';
import { ToastAndroid } from 'react-native';


describe('AddNewUserModel', () => {
  const onClose = jest.fn();

  it('renders correctly', () => {
    const { getByTestId } = render(<AddNewUserModel visible onClose={onClose} />);
    expect(getByTestId('new_user_model')).toBeTruthy();
    expect(getByTestId('first_name_input_field')).toBeTruthy();
    expect(getByTestId('last_name_input_field')).toBeTruthy();
    expect(getByTestId('email_input_field')).toBeTruthy();
    expect(getByTestId('create_new_user_btn')).toBeTruthy();
    expect(getByTestId('close_model_btn')).toBeTruthy();
  });

  it('closes modal on X press', () => {
    const { getByTestId } = render(<AddNewUserModel visible onClose={onClose} />);
    fireEvent.press(getByTestId('close_model_btn'));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows validation for invalid names', () => {
    const { getByTestId } = render(<AddNewUserModel visible onClose={onClose} />);
    fireEvent.changeText(getByTestId('first_name_input_field'), '123');
    fireEvent.press(getByTestId('create_new_user_btn'));
    expect(ToastAndroid.show).toHaveBeenCalledWith('Invalid first name', ToastAndroid.SHORT);

    fireEvent.changeText(getByTestId('first_name_input_field'), '1229dawdmadmiawmdowddmiomdoaidiowmodk20kewkd2kdwokd2kdowkd023dkwoedk023dkow3');
    fireEvent.press(getByTestId('create_new_user_btn'));
    expect(ToastAndroid.show).toHaveBeenCalledWith('Invalid first name', ToastAndroid.SHORT);
  });

    it('shows validation for invalid email', () => {
    const { getByTestId } = render(<AddNewUserModel visible onClose={onClose} />);
    fireEvent.changeText(getByTestId('email_input_field'), '123');
    fireEvent.press(getByTestId('create_new_user_btn'));
    expect(ToastAndroid.show).toHaveBeenCalledWith('Invalid email', ToastAndroid.SHORT);

    fireEvent.changeText(getByTestId('email_input_field'), '33A2@dwdw');
    fireEvent.press(getByTestId('create_new_user_btn'));
    expect(ToastAndroid.show).toHaveBeenCalledWith('Invalid email', ToastAndroid.SHORT);
  });

  it('users on valid input', async () => {
    const { getByTestId } = render(<AddNewUserModel visible onClose={onClose} />);
    fireEvent.changeText(getByTestId('first_name_input_field'), 'John');
    fireEvent.changeText(getByTestId('last_name_input_field'), 'Doe');
    fireEvent.changeText(getByTestId('email_input_field'), 'john@test.com');
    fireEvent.press(getByTestId('create_new_user_btn'));
    expect(onClose).toHaveBeenCalled();
  });


});