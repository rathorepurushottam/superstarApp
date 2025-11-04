import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import RBSheet from "react-native-raw-bottom-sheet";

import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { AppText, BLACK, FORTEEN, POPPINS_BOLD, POPPINS_SEMI_BOLD, WHITE } from "../common/AppText";
import Header from "../common/Header";
import SearchInput from "../common/SearchInput";
import CommentBox from "../common/CommentBox";
import { SpinnerSecond } from "../common/SpinnerSecond";

import { getCategories, getHomePosts, getPostByCategories, getUserWallet } from "../actions/profileAction";
import { BASE_URL } from "../helper/utility";
import NavigationService from "../navigation/NavigationService";
import HomeFeeds from "./HomeFeeds";

const Home = () => {
  const dispatch = useDispatch();
  const refRBSheetComment = useRef();
  const searchTimeoutRef = useRef(null);

  const [isSelect, setIsSelected] = useState("All");
  const [allComments, setAllComments] = useState([]);
  const [comment, SetComment] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const categories = useSelector((state) => state.profile.categories);
  const homePosts = useSelector((state) => state.profile.homePosts);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getHomePosts());
    dispatch(getUserWallet());
  }, []);

  // Debounce search query
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleCategorySelect = useCallback((item) => {
    setIsSelected(item?.categoryName);
    if (item?.categoryName === "All") {
      dispatch(getHomePosts());
    } else {
      dispatch(getPostByCategories(item?._id));
    }
  }, [dispatch]);

  const renderCategory = useCallback(({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategorySelect(item)}>
      <View
        style={[
          styles.categoryView,
          { backgroundColor: isSelect === item?.categoryName ? "#8BFFF9" : "#F9F9F9" },
        ]}
      >
        <FastImage source={{ uri: BASE_URL + item?.categoryIcon }} resizeMode="cover" style={styles.categoryIcon} />
      </View>
      <AppText color={BLACK}>{item?.categoryName}</AppText>
    </TouchableOpacity>
  ), [isSelect, handleCategorySelect]);

  const handleSearchPress = useCallback(() => {
    setShowSearch((prev) => {
      if (prev) {
        setSearchQuery("");
        setDebouncedSearchQuery("");
      }
      return !prev;
    });
  }, []);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
  }, []);

  const openCommentBox = useCallback((item) => {
    setAllComments(item);
    refRBSheetComment.current?.open();
  }, []);

  // Memoized filtered posts based on debounced search query
  const filteredPosts = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return homePosts;
    }

    const query = debouncedSearchQuery.toLowerCase().trim();
    return homePosts.filter(post => {
      const username = post?.posted_by?.username?.toLowerCase() || "";
      const fullname = post?.posted_by?.fullname?.toLowerCase() || "";
      return username.includes(query) || fullname.includes(query);
    });
  }, [debouncedSearchQuery, homePosts]);

  const renderHeader = useCallback(() => (
    <View>
      <Header onSearchPress={handleSearchPress} />
      
      {/* Search Input */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <SearchInput 
            value={searchQuery}
            onChangeText={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search users..."
            autoFocus
          />
        </View>
      )}

      {/* Contest Banner */}
      <TouchableOpacity style={styles.contestBanner} onPress={() => NavigationService.navigate("Contest")}>
        <AppText color={WHITE}>
          Tap here to Join{" "}
          <AppText weight={POPPINS_BOLD} style={styles.underline} color={WHITE}>
            Live
          </AppText>{" "}
          Contest and earn money
        </AppText>
      </TouchableOpacity>

      {/* Category List */}
      <AppText weight={POPPINS_SEMI_BOLD} color={BLACK} type={FORTEEN} style={styles.categoryTitle}>
        Choose Your Category
      </AppText>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        horizontal
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        style={{ height: 100 }}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  ), [showSearch, searchQuery, categories, renderCategory, handleSearchPress, handleSearch, handleClearSearch]);

  return (
    <AppSafeAreaView style={{ backgroundColor: "#FEFEFE", flex: 1 }}>
      <View style={{ flex: 1 }}>
        {renderHeader()}
        
        {filteredPosts.length > 0 ? (
          <HomeFeeds 
            homePosts={filteredPosts} 
            openCommentBox={openCommentBox} 
          />
        ) : (
          <AppText style={styles.emptyText}>
            {debouncedSearchQuery.trim() ? "No users found" : "No data available"}
          </AppText>
        )}
      </View>

      {/* Comment Box */}
      <RBSheet
        ref={refRBSheetComment}
        closeOnDragDown
        height={350}
        customStyles={{
          container: styles.commentSheet,
          draggableIcon: styles.hidden,
        }}
      >
        <CommentBox
          allComments={allComments}
          SetComment={SetComment}
          comment={comment}
          close={() => refRBSheetComment.current?.close()}
        />
      </RBSheet>

      {/* Loader */}
      <SpinnerSecond loading={isLoading} />
    </AppSafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  categoryItem: { flexDirection: "column", alignItems: "center" },
  categoryView: {
    borderWidth: 5,
    borderColor: "#BDBDBD4F",
    alignItems: "center",
    padding: 10,
    width: 70,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  categoryIcon: { width: 40, height: 40 },
  contestBanner: {
    backgroundColor: "#fd5c63",
    marginTop: 20,
    alignItems: "center",
    padding: 10,
  },
  underline: { textDecorationLine: "underline" },
  categoryTitle: { margin: 20 },
  emptyText: { textAlign: "center", marginTop: 20, color: "#8E5A37" },
  commentSheet: { backgroundColor: "#D8D8D8", borderTopLeftRadius: 40, borderTopRightRadius: 40 },
  hidden: { backgroundColor: "transparent", display: "none" },
  searchContainer: {
    marginTop: 10,
  },
});
