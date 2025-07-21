import { View } from "react-native"
import { AppSafeAreaView } from "../common/AppSafeAreaView"
import { AppText } from "../common/AppText"

const CustomDrawer = () => {
    return (
        <AppSafeAreaView>
            <View>
                <AppText>Drawer</AppText>
            </View>
        </AppSafeAreaView>
    );
};

export default CustomDrawer;