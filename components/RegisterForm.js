import React from 'react';
import {View, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {Input, Button} from 'react-native-elements';
import PropTypes from 'prop-types';

// Handle registering new users with useForm
const RegisterForm = ({navigation}) => {
  const {postUser, checkUsername} = useUser();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      delete data.confirmPassword;
      const userData = await postUser(data);
      console.log('register onSubmit', userData);
      if (userData) {
        Alert.alert('success', 'User created sucessfully!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters',
          },
          validate: async (value) => {
            try {
              const available = await checkUsername(value);
              if (available) {
                return true;
              } else {
                return 'Username is already taken.';
              }
            } catch (error) {
              throw new Error(error.message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {
            value: 5,
            message: 'Password has to be at least 5 characters.',
          },
          /*
          pattern: {
            value: /(?=.*[\p{Lu}])(?=.*[0-9]).{8,}/u,
            message: 'Min 8, Uppercase, Number',
          },
          */
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: true,
          required: {value: true, message: 'This is required.'},
          validate: (value) => {
            const {password} = getValues();
            if (value === password) {
              return true;
            } else {
              return 'Passwords do not match.';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Confirm Password"
            errorMessage={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
        )}
        name="confirmPassword"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          pattern: {
            value: /\S+@\S+\.\S+$/,
            message: 'Has to be valid email.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Email"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: 'Full name has to be at least 3 characters.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={{borderWidth: 1, padding: 10}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            placeholder="Full name"
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
      />
      <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
