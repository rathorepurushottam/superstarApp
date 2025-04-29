import {StyleSheet} from 'react-native';
import { colors } from '../../theme/color';

const styles = StyleSheet.create({
  selectedUIFilter: (type) => ({
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 4,
    height:17,
    width:17,
    backgroundColor: '#CB8A17',
  }),

  checkboxTick: (type, colors) => ({
    width: '70%',
    height: '95%',
    alignSelf: 'center',
  }),
  unchecked: colors => ({
    borderRadius: 4,
    height: 15,
    width: 15,
    // borderColor: 'rgba(83, 137, 196, 1)',
  }),

  linearGradientWrapper: {
    borderRadius: 4,
    borderColor: colors.black,
    borderWidth: 1,
    height:17,
    width:17,    
    alignItems: "center"
  },

});

export default styles;