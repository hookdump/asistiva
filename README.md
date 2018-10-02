# Asistiva
## Accesibility made simple.

## Project Goal

Asistiva is **a set of tools for creating amazing web apps optimized to be used through different input methods** (i.e. including eye-tracking, head-tracking, button-less mouse, adapted switches, etc).

## Main Components

### GazeCursor directive

This is a virtual cursor that you will be able to control with any input method (eye-tracking, etc).

### Input Engines

An Input Engine is a service that receives data from any source (for example an eye-tracker or a regular mouse), and relays this information to the GazeInput service.

Two demos are included:

 * Mouse
 * Pupil Eye-Tracker (https://github.com/pupil-labs/pupil)

### GazeInput service

It is fed by an **Input Engine**, and it controls the **GazeCursor**. It makes the GazeCursor interact with the DOM elements in your app. It also adds some smoothing and easing to the **GazeCursor**, ideal for using fast moving and erratic inputs, like an eye-tracker.

### Demo

A virtual keyboard app is included to showcase the project. Instructions on how to set up the database for the demo coming soon! (required for the predictive text to work)


## Coming soon:

 * More documentation!
 * Some of the core components will be made standalone modules, and published as bower and/or webpack packages.
 * [Wiki](https://github.com/hookdump/asistiva/wiki)
