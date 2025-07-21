import { ScrollView, StyleSheet, View } from "react-native";
import moment from "moment";
import InputBox from "./InputBox";
import { colors } from "../theme/color";
import PrimaryButton from "./PrimaryButton";
import { useDispatch } from "react-redux";
import { commentByUser } from "../actions/profileAction";
import { AppText, BLACK, FIFTEEN, FORTEEN, GRY, POPPINS_SEMI_BOLD, TWELVE } from "./AppText";

const CommentBox = ({ allComments, SetComment, comment, close }) => {
  const dispatch = useDispatch();
  console.log(allComments?.comments, "allComments?.comments?.length");

  const postComment = () => {
    let data = {
      comment: comment,
      postId: allComments?._id,
    };
    dispatch(commentByUser(data, close));
  };

  return (
    <View style={styles.mainView}>
        <View>
        <View
        style={{
          borderColor: "#5E6272",
          backgroundColor: "#5E6272",
          borderWidth: 2,
          width: "20%",
          alignSelf: "center",
          borderRadius: 10,
          marginVertical: 10,
        }}
      />
      <View style={{margin: 20}}>
        {allComments?.comments?.length < 1 ? (
          <View style={{justifyContent: "center", alignItems: "center"}}>
            <AppText color={BLACK} type={TWELVE} weight={POPPINS_SEMI_BOLD}>No comments</AppText>
          </View>
        ) : (
          <ScrollView>
            {allComments?.comments?.map((item) => (
                <View style={{marginHorizontal: 20, borderBottomWidth: 1, borderBottomColor: colors.borderGry, flexDirection: "row", gap: 20, marginTop: 10, alignItems: "center"}}>
                    <AppText type={FIFTEEN} weight={POPPINS_SEMI_BOLD}>{item?.commentText}</AppText>
                    <AppText color={GRY}>{moment(item?.createdAt).startOf('hour').fromNow()}</AppText>
                </View>
                
            ))}
            </ScrollView>
        )}
      </View>
        </View>
      
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <InputBox
          placeholder={"add comment"}
          keyboardType={"default"}
          containerStyle={{
            // borderWidth: phoneFocus ? 1 : 0,
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 15,

            alignSelf: "center",
            borderRadius: 50,
          }}
          style={{ height: 40, width: "70%" }}
          cursorColor={colors.black}
          value={comment}
          onChange={SetComment}
        />
        <PrimaryButton
          title="Comment"
          disabled={!comment}
          buttonStyle={{ width: "20%" }}
          titleStyle={{ fontSize: 10 }}
          onPress={postComment}
        />
      </View>
    </View>
  );
};

export default CommentBox;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 20,
  },
});
