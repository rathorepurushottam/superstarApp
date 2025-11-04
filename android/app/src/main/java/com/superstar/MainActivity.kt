package com.superstar

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

// ✅ ADDED IMPORTS
import android.os.Bundle
import android.os.Build
import android.view.View

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "SUPERSTAR"

  override fun onCreate(savedInstanceState: Bundle?) {
    // ⚠️ Corrected: Should call super with the received Bundle, not null.
    super.onCreate(savedInstanceState)
    
    // 🚀 Corrected Kotlin Syntax for System UI Flags
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        // Use 'window' (property access) and bitwise OR operator 'or'
        window.decorView.systemUiVisibility = (
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE
            or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
        )
    }
    
    // For devices with Android 11+
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        // Use 'window' (property access) and setDecorFitsSystemWindows(false)
        window.setDecorFitsSystemWindows(false)
    }
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}