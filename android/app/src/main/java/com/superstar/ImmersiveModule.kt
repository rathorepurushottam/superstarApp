package com.superstar

import android.app.Activity
import android.os.Build
import android.view.View
import android.view.WindowInsetsController
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ImmersiveModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "Immersive"

  @ReactMethod
  fun enter() {
    val activity: Activity? = currentActivity
    activity ?: return
    activity.runOnUiThread {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        val controller = activity.window.insetsController ?: return@runOnUiThread
        controller.hide(android.view.WindowInsets.Type.navigationBars() or android.view.WindowInsets.Type.statusBars())
        controller.systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
      } else {
        @Suppress("DEPRECATION")
        activity.window.decorView.systemUiVisibility = (
          View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or
          View.SYSTEM_UI_FLAG_LAYOUT_STABLE or
          View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or
          View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or
          View.SYSTEM_UI_FLAG_FULLSCREEN or
          View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
        )
      }
    }
  }

  @ReactMethod
  fun exit() {
    val activity: Activity? = currentActivity
    activity ?: return
    activity.runOnUiThread {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
        val controller = activity.window.insetsController ?: return@runOnUiThread
        controller.show(android.view.WindowInsets.Type.navigationBars() or android.view.WindowInsets.Type.statusBars())
      } else {
        @Suppress("DEPRECATION")
        activity.window.decorView.systemUiVisibility = (View.SYSTEM_UI_FLAG_LAYOUT_STABLE)
      }
    }
  }
}


