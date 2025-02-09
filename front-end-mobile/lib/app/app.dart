import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_ollama/features/chat/view/chat_screen.dart';
import 'package:flutter_ollama/utils/dismiss_keyboard.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class App extends ConsumerWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context, ref) {
    return ScreenUtilInit(
      designSize: const Size(430, 932),
      minTextAdapt: true,
      builder: (_, c) => DismissKeyboard(
        child: AnnotatedRegion(
          value: SystemUiOverlayStyle(
            statusBarColor: Colors.green,
          ),
          child: MaterialApp(
            /// For preventing system dark.
            debugShowCheckedModeBanner: false,
            themeMode: ThemeMode.light,
            theme: ThemeData.light().copyWith(
              primaryColor: Colors.green,
            ),
            home: ChatScreen(),
          ),
        ),
      ),
    );
  }
}
