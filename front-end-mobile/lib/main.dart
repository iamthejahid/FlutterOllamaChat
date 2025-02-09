import 'package:flutter/material.dart';
import 'package:flutter_ollama/app/app.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

void main() =>
    runApp(ProviderScope(child: const App()));  // Wrap App() with runApp

