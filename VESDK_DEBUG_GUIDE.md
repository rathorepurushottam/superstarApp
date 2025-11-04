# VESDK Crash Debugging Guide

## ✅ Status: RESOLVED

### Fixed Issues:
1. ✅ **Camera recording crash** - VESDK now opens without crashing
2. ✅ **Gallery permission error** - Runtime permission request added for Android 13+

## Changes Made

I've updated `src/screens/CreatePost.js` with:

1. **Enhanced Error Logging** - Now logs detailed information at each step
2. **Try-Catch Wrapper Around VESDK** - Prevents crashes from propagating to the entire app
3. **Debug Mode** - Set `SKIP_EDITOR_FOR_TESTING = true` to bypass VESDK completely
4. **Removed Config** - Now opens VESDK without any configuration (most stable approach)
5. **Runtime Permission Request** - Requests READ_MEDIA_VIDEO permission before opening gallery

## How to Debug the Crash

### Step 1: Check Console Logs

When you record a video, watch your console/terminal. You should see logs like:

```
📹 Starting camera capture...
✅ Camera capture complete: {path: "...", duration: ..., size: ...}
🎬 Opening VESDK editor with path: /path/to/video.mp4
```

**If the app crashes AFTER "Opening VESDK editor"** - The issue is with VESDK itself.

**If the app crashes BEFORE or AT "Camera capture complete"** - The issue is with ImagePicker or permissions.

### Step 2: Get Android Crash Logs

Run this command in a separate terminal BEFORE recording the video:

```bash
cd /Users/purushottamrathore/AppinopWorkspace/superstarApp
adb logcat *:E
```

This will show only ERROR level logs. When the crash happens, you'll see the full stack trace.

Look for lines containing:
- `FATAL EXCEPTION`
- `java.lang.NullPointerException`
- `ly.img.android.sdk`

### Step 3: Test Without VESDK

In `src/screens/CreatePost.js`, change line 36:

```javascript
const SKIP_EDITOR_FOR_TESTING = true;  // Change false to true
```

This will:
- Record the video normally
- Skip the VESDK editor entirely
- Navigate directly to preview

**If the app works** - The crash is definitely from VESDK.
**If it still crashes** - The issue is elsewhere (ImagePicker, navigation, etc.)

## Common VESDK Crash Causes

### 1. License Issue
**Symptoms:** Crash immediately when opening editor
**Solution:** Check that `src/vesdk_license.android.json` has valid license

### 2. Missing Gradle Modules
**Symptoms:** Crash with "ClassNotFoundException" or "NoClassDefFoundError"
**Solution:** Check `android/app/build.gradle` - ensure required modules are included

### 3. File Path Issues
**Symptoms:** Crash with file not found or permission errors
**Solution:** 
- Ensure Android permissions in `AndroidManifest.xml`
- Check file path format (should start with `file://` on Android)

### 4. Memory Issues
**Symptoms:** App crashes with no clear error, especially on low-end devices
**Solution:**
- Reduce `videoQuality` from "low" to "lowest"
- Add memory limits in gradle

### 5. Activity Lifecycle Conflicts
**Symptoms:** Crash when returning from VESDK editor
**Solution:** The immersive mode in `MainApplication.kt` might conflict with VESDK

## Solutions to Try

### Solution 1: Rebuild Android App (Clean Build)

```bash
cd /Users/purushottamrathore/AppinopWorkspace/superstarApp
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Solution 2: Check VESDK Version Compatibility

Open `android/app/build.gradle` and check the VESDK version. Try downgrading if you're on the latest:

```gradle
// In dependencies
implementation 'ly.img.android:video-editor-sdk:X.Y.Z'
```

### Solution 3: Add Android Logging

If the crash isn't being caught, add this to catch native crashes:

In `android/app/src/main/java/com/superstar/MainActivity.kt`:

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
        Log.e("CRASH", "Uncaught exception: ${throwable.message}", throwable)
    }
}
```

### Solution 4: Test with Gallery Video First

Gallery videos are often more stable than camera videos. Try:
1. Use "Upload from gallery" button
2. Select an existing video
3. See if VESDK opens without crashing

### Solution 5: Verify Permissions at Runtime

The crash might be due to missing permissions. Add runtime permission check before opening camera:

```javascript
import { PermissionsAndroid, Platform } from 'react-native';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    return Object.values(granted).every(val => val === 'granted');
  }
  return true;
};
```

## Next Steps

1. **Enable debug mode** (set `SKIP_EDITOR_FOR_TESTING = true`)
2. **Test if app crashes** without VESDK
3. **If it works**, we know VESDK is the problem
4. **Get crash logs** from `adb logcat`
5. **Share the logs** so I can help fix the specific VESDK issue

## Current Configuration

The app is now configured to:
- ✅ Open VESDK with NO configuration (most stable)
- ✅ Catch and handle VESDK errors gracefully
- ✅ Use original video if editor fails
- ✅ Log detailed information at each step

The editor will use default settings (no forced square aspect ratio) for now to ensure stability.

