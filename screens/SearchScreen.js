import React from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

import { NavigationEvents } from 'react-navigation';

import { connect } from 'react-redux';
import { getCampaigns } from '../store/actions';

import FeedCampaign from '../components/FeedScreen/FeedCampaign';

import FeedUpdate from '../components/FeedScreen/FeedUpdate';

import SvgUri from 'react-native-svg-uri';
import { Header, SearchBar } from 'react-native-elements';
import { createFilter } from 'react-native-search-filter';
import Constants from 'expo-constants';

// These are the keywords that filtered through the map. You can add more to do depending.
const KEYS_TO_FILTERS = [
  'camp_name',
  'camp_desc',
  'username',
  'location',
  'data',
  'update_desc'
];

class SearchScreen extends React.Component {
  state = {
    searchTerm: ''
  };

  // Changes based on the term that is searched
  searchUpdated = term => {
    this.setState({ searchTerm: term });
    this.props.navigation.setParams({
      searchTerm: term
    });
  };
  componentDidMount() {
    this.props.navigation.setParams({
      roles: this.props.currentUserProfile.roles
    });
  }

  startGettingCampaigns = () => {
    this.props.getCampaigns();
    this.refreshInterval = setInterval(() => this.props.getCampaigns(), 10000);
  };

  stopGettingCampaigns = () => {
    clearInterval(this.refreshInterval);
  };

  render() {
    const { navigation } = this.props;
    // filters in the map method
    const filterCamps = this.props.allCampaigns.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
    return (
      <KeyboardAvoidingView behavior='height' enabled>
        <NavigationEvents
          onDidFocus={this.startGettingCampaigns}
          onDidBlur={this.stopGettingCampaigns}
        />
        <ScrollView stickyHeaderIndices={[0]}>
          <Header
            containerStyle={{
              backgroundColor: '#323338',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              height:
                Constants.deviceName === 'Iphone Xr' &&
                Constants.deviceName === 'Iphone Xs'
                  ? null
                  : (100 && Constants.deviceName === 'Iphone 7') ||
                    'Iphone 8' ||
                    'Pixel' ||
                    'Pixel XL'
                  ? null
                  : 80
            }}
            leftComponent={
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{
                  width: 75,
                  height: 45,
                  justifyContent: 'center'
                }}
              >
                <SvgUri
                  fill='#fff'
                  width='25'
                  height='25'
                  source={require('../assets/icons/chevron-left-solid.svg')}
                />
              </TouchableOpacity>
            }
            centerComponent={
              <SearchBar
                onChangeText={this.searchUpdated}
                value={this.state.searchTerm}
                clearIcon={false}
                searchIcon={false}
                cancelIcon={false}
                onCancel={true}
                placeholder='Search ...'
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  marginLeft: 60,
                  flex: 1,
                  width: 340
                }}
                inputContainerStyle={{
                  paddingBottom: 1
                }}
                inputStyle={{
                  borderRadius: 5,
                  margin: 2,
                  fontSize: 14,
                  backgroundColor: '#fff',
                  paddingLeft: 10
                }}
              />
            }
          />
          {this.props.allCampaigns.length > 0 &&
            filterCamps.map(camp => {
              if (camp.update_id) {
                return (
                  <FeedUpdate
                    key={`update${camp.update_id}`}
                    data={camp}
                    navigation={navigation}
                  />
                );
              } else {
                return (
                  <FeedCampaign
                    key={camp.camp_id}
                    data={camp}
                    navigation={navigation}
                  />
                );
              }
            })}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  allCampaigns: state.allCampaigns,
  currentUserProfile: state.currentUserProfile
});

export default connect(
  mapStateToProps,
  { getCampaigns }
)(SearchScreen);
