import { View } from "react-native"
import { AppSafeAreaView } from "../common/AppSafeAreaView"
import { KeyBoardAware } from "../common/KeyBoardAware"
import { AppText, BLACK, POPPINS_SEMI_BOLD, TWENTY } from "../common/AppText"

const Contest = () => {
    return(
        <AppSafeAreaView>
            <KeyBoardAware>
                <View style={{flex: 1, justifyContent: "center" ,alignItems: "center"}}>
                    <AppText color={BLACK} weight={POPPINS_SEMI_BOLD} type={TWENTY}>Coming Soon!</AppText>
                </View>
            </KeyBoardAware>
        </AppSafeAreaView>
    );
};

export default Contest;