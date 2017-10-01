# Install React Native

$ npm install -g react-native-cli

# Install or setup Andorid SDK, emulator

$ I know, you can :)

# Build and run app

$ cd NotifyMe/ && npm install && react-native npm start
$ Alt+Ctl+T react-native run-android

# Run emulator commnd line

$ cd /path_to_Android/Sdk/tools && ./emulator -avd Emulator_name

# Possible errors && problems

* Update android/local.properties file corresponding to your machine Android SDK location or create that file and provide SDK location.
 - For example: sdk.dir = /home/work/Android/Sdk/
* If the "react-native start" command will get the error related to watchman, try to type the following commands in your terminal:

$ echo 256 | sudo tee -a /proc/sys/fs/inotify/max_user_instances
$ echo 32768 | sudo tee -a /proc/sys/fs/inotify/max_queued_events
$ echo 65536 | sudo tee -a /proc/sys/fs/inotify/max_user_watches
$ watchman shutdown-server

