import { CommonActions, StackActions, DrawerActions } from "@react-navigation/native";

let navigator; // holds the navigation ref
let isReady = false; // check if NavigationContainer is mounted

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function setIsReady(value) {
  isReady = value;
}

function navigate(name, params) {
  if (isReady && navigator) {
    navigator.dispatch(CommonActions.navigate({ name, params }));
  } else {
    console.warn("Navigation not ready yet. Tried navigating to:", name);
  }
}

function push(name, params) {
  if (isReady && navigator) {
    navigator.dispatch(StackActions.push(name, params));
  }
}

function replace(name, params) {
  if (isReady && navigator) {
    navigator.dispatch(StackActions.replace(name, params));
  }
}

function pop(count = 1) {
  if (isReady && navigator) {
    navigator.dispatch(StackActions.pop(count));
  }
}

function reset(name, params) {
  if (isReady && navigator) {
    navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      })
    );
  }
}

function goBack() {
  if (isReady && navigator) {
    navigator.dispatch(CommonActions.goBack());
  }
}

function openDrawer() {
  if (isReady && navigator) {
    navigator.dispatch(DrawerActions.openDrawer());
  }
}

function closeDrawer() {
  if (isReady && navigator) {
    navigator.dispatch(DrawerActions.closeDrawer());
  }
}

function toggleDrawer() {
  if (isReady && navigator) {
    navigator.dispatch(DrawerActions.toggleDrawer());
  }
}

export default {
  setTopLevelNavigator,
  setIsReady,
  navigate,
  push,
  replace,
  pop,
  reset,
  goBack,
  openDrawer,
  closeDrawer,
  toggleDrawer,
};
