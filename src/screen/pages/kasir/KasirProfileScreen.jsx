import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import {
  getItem,
  removeItem,
  auth,
  baseKasir,
  baseLogs,
  clearItem,
} from '../../../utils';
import {ProfileBold, BugIcons} from '../../../assets';

import {PrimaryButtons} from '../../../components';

const KasirProfileScreen = () => {
  const [data, setData] = useState('');
  const navigation = useNavigation();
  const focused = useIsFocused();

  useEffect(() => {
    getItemLocal();
  }, [focused]);

  const getItemLocal = async () => {
    try {
      const datas = JSON.parse(await getItem('@storage_data'));
      auth
        .get(baseKasir + `${datas.id}`)
        .then(result => {
          const results = result.data ? result.data.data : result.data;
          setData(results);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    const datas = JSON.parse(await getItem('@storage_data'));
    const userName = datas.username;

    auth
      .post(baseLogs, {
        kasir: userName,
        role: datas.role,
      })
      .then(result => {
        removeItem('@storage_data');
        removeItem('@storage_token');
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.headerProfile}>Profile</Text>

      <View>
        <TouchableOpacity
          style={styles.boxProfile}
          onPress={() => navigation.navigate('ProfileKasir')}>
          <View style={styles.Profiles}>
            <Image
              source={ProfileBold}
              style={styles.profileImage}
              resizeMode="contain"
            />
            <View style={styles.profileName}>
              <Text style={styles.profileText}>{data ? data.name : ''}</Text>
              <Text style={styles.profileText}>
                {data ? data.username : ''}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boxProfile}
          onPress={() => navigation.navigate('ReportKasir')}>
          <View style={styles.Profiles}>
            <Image
              source={BugIcons}
              style={styles.profileImage}
              resizeMode="contain"
            />
            <View style={styles.profileName}>
              <Text style={styles.profileText}>Report Bug</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.versionApp}>Version 1.0.0</Text>
        <PrimaryButtons
          title="Logout"
          m_Horizontal={'5%'}
          m_Vertical={10}
          c_Style={{
            fontWeight: 'bold',
            fontSize: 18,
          }}
          onPressed={() => signOut()}
        />
      </View>
    </View>
  );
};

export default KasirProfileScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },

  headerProfile: {
    margin: '5%',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },

  boxProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginHorizontal: '5%',
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
  },

  Profiles: {
    flexDirection: 'row',
  },

  profileImage: {
    width: 50,
    marginHorizontal: 10,
  },

  profileName: {
    alignSelf: 'center',
  },

  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  profileChange: {
    alignSelf: 'center',
    paddingVertical: 15,
  },

  changeText: {
    fontSize: 14,
    color: 'black',
  },

  versionApp: {
    marginHorizontal: '5%',
  },

  signOutButton: {
    marginHorizontal: '5%',
    borderRadius: 25,
    marginVertical: 10,
  },

  signOutGradient: {
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },

  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
