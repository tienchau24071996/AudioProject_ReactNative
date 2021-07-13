import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import SoundPlayer from 'react-native-sound';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlayButton from './ShareComponents/PlayButton';
import Slider from '@react-native-community/slider';
import {useAudioHelper} from './helpers/audio-helper';

const windowHeight = Dimensions.get('window').height;

export default function App() {
  const player = useAudioHelper({
    listSounds: [
      {
        type: 'network',
        name: 'Death bed',
        artist: 'Powfu',
        artwork:
          'https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        url: 'https://sample-music.netlify.app/death%20bed.mp3',
      },
      {
        type: 'network',
        name: 'Bad liar',
        artist: 'Imagine Dragons',
        artwork:
          'http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg',
        url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
      },
      {
        type: 'network',
        name: 'Faded',
        artist: 'Alan Walker',
        artwork:
          'http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg',
        url: 'https://sample-music.netlify.app/Faded.mp3',
      },
      {
        type: 'network',
        name: 'Hate me',
        artist: 'Ellie Goulding',
        artwork:
          'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
        url: 'https://sample-music.netlify.app/Hate%20Me.mp3',
      },
      {
        type: 'network',
        name: 'Solo',
        artist: 'Clean Bandit',
        artwork:
          'https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        url: 'https://sample-music.netlify.app/Solo.mp3',
      },
      {
        type: 'network',
        name: 'Without me',
        artist: 'Halsey',
        artwork:
          'https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        url: 'https://sample-music.netlify.app/Without%20Me.mp3',
      },
    ],
    timeRate: 15,
    isLogStatus: true,
  });

  return (
    <View style={[styles.container]}>
      <View style={{flex: 1, height: windowHeight / 2}}>
        <View style={[styles.container_audio]}>
          <View style={[styles.content]}>
            <View style={[styles.contentImg]}>
              <Image
                style={[styles.content_img]}
                source={{
                  uri: `${player.currentAudioImg}`,
                }}
              />
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flex: 0.4,
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="repeat-once"
                  size={30}
                  onPress={player.loop}
                  color={player.isLoop === true ? 'blue': 'black'}
                />
              </TouchableOpacity>

              <View></View>

              <View style={[styles.contentText]}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                  {player.currentAudioName}
                </Text>
                <Text>{player.currentAudioArtist}</Text>
              </View>

              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="repeat"
                  size={30}
                  onPress={player.loopList}
                  color={player.isLoopList === true ? 'blue': 'black'}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="shuffle-variant"
                  size={30}
                  onPress={player.shuffle}
                  color={player.isShuffle === true ? 'blue': 'black'}
                />
              </TouchableOpacity>
            </View>

            <View style={{flex: 0.6, width: '100%'}}>
              <Slider
                style={{marginLeft: 40, marginRight: 40, marginTop: 20}}
                thumbTintColor="#3f78c3"
                minimumValue={0}
                maximumValue={player.duration}
                value={player.currentTime}
                onTouchStart={player.pause}
                onTouchEnd={player.play}
                onSlidingComplete={seconds => player.seekToTime(seconds)}
                minimumTrackTintColor="#3f78c3"
                onValueChange={currentTime =>
                  player.onValueChangedSlider(currentTime)
                }
              />

              <View style={styles.timeContainer}>
                <Text style={styles.timers}>{player.currentTimeString}</Text>
                <Text style={styles.timers}>{player.durationString}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    onPress={player.previous}
                    name="skip-previous"
                    size={36}
                  />
                </TouchableOpacity>
                {player.status === 'play' ? (
                  <PlayButton
                    onPress={player.pause}
                    name="pause-circle-outline"
                  />
                ) : (
                  <PlayButton
                    onPress={player.play}
                    name="play-circle-outline"
                  />
                )}
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    onPress={player.next}
                    name="skip-next"
                    size={36}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={[styles.list]}>
        {player.listSounds.map((item, i) => {
          return (
            <View style={[styles.item]} key={'item' + i}>
              <LinearGradient
                style={[styles.itemView]}
                colors={
                  player.activeColor[i]
                    ? ['#46aeff', '#5884ff']
                    : ['#ffffff', '#ffffff']
                }
                // colors={['#ffffff', '#ffffff']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
                <Image style={[styles.img]} source={{uri: `${item.artwork}`}} />
                <View style={[styles.text]}>
                  <Text>{item.name}</Text>
                  <Text>{item.artist}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => player.handleClick(i)}
                  style={[styles.buttonPlay]}>
                  <Image
                    style={[styles.imgPlay]}
                    source={require('./img/play-05.png')}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container_audio: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentImg: {
    flex: 1,
    width: 140,
    height: 140,
    justifyContent: 'center',
    shadowColor: '#5D3F6A',
    shadowOffset: {
      height: 15,
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },

  content_img: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },

  timers: {
    color: 'black',
    fontSize: 16,
  },

  timeContainer: {
    marginTop: -40,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  list: {
    flex: 1,
  },

  item: {
    width: '100%',
    height: 80,
    borderBottomWidth: 2,
    borderColor: '#CECBE6',
  },

  itemView: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  img: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },

  text: {
    paddingLeft: 40,
    flex: 1,
  },

  imgPlay: {
    width: 60,
    height: 60,
  },
});
