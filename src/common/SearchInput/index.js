import { StyleSheet, TextInput, View } from "react-native";
import FastImage from "react-native-fast-image";
import { searchIcon } from "../../helper/images";

const SearchInput = () => {
    return (
        <View style={styles.contianer}>
            <FastImage source={searchIcon} resizeMode="contain" style={{width: 20, height: 20, marginLeft: 20}}  />
            <TextInput placeholder="Search Something" placeholderTextColor={'#9A9A9A'} style={styles.inputStyle} maxLength={10}/>
        </View>
    );
};

export default SearchInput;

const styles = StyleSheet.create({
    contianer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#E3E3E3",
        marginHorizontal: 20,
        height: 50,
        borderRadius: 10,
        alignItems: "center"
    },
    inputStyle: {
        marginLeft: 10
    }
})