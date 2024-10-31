import { Dimensions, Platform } from 'react-native';

// Lasketaan laitteen mitat
const { width, height } = Dimensions.get('window');

// Laitteen korkeus ja leveys
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 2.0) => size + (scale(size) - size) * factor;

const Metrics = {
  scale,
  verticalScale,
  moderateScale,
  screenWidth: width,
  screenHeight: height,
  isIOS: Platform.OS === 'ios',
};

export default Metrics;