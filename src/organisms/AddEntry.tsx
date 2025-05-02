import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native';
import { useImmer } from 'use-immer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});

type AddEntryState = {
  submitting: boolean;
  data: null | object;
}

export function AddEntry() {
  const navigation = useNavigation();
  const [state, setState] = useImmer<AddEntryState>({
    submitting: false,
    data: null
  });

  const submitButton = () => {
    setState(draft => { draft.submitting = true });
    setTimeout(() => {
      setState(draft => { draft.submitting = false });
      navigation.goBack()
    }, 1000)
  };

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: 'tomato',
      headerBackTitle: 'Return',
      // headerLeft: () => (
      //   state.submitting
      //     ? <ActivityIndicator />
      //     : <Button onPress={() => navigation.goBack()}
      //       title="Cancel"
      //       color='tomato' />
      // ),
      headerRight: () => (
        state.submitting
          ? <ActivityIndicator />
          : <Button onPress={() => submitButton()} title="Submit" />
      )
    });
  }, [state])

  return (
    <View style={styles.container}>
      {
        state.submitting
          ? <ActivityIndicator />
          : <Button
            title="Add new"
            onPress={submitButton}
          />
      }
    </View>
  );
}

