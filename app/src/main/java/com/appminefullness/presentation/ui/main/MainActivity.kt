package com.appminefullness.presentation.ui.main

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Create a simple TextView programmatically
        val textView = TextView(this).apply {
            text = "Hello World!"
            textSize = 48f
            gravity = android.view.Gravity.CENTER
            setPadding(32, 32, 32, 32)
        }

        setContentView(textView)
    }
}