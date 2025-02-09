import 'package:flutter_ollama/features/chat/repo/chat_repo.dart';
import 'package:flutter_ollama/features/chat/view/chat_state.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final chatStateProvider = StateNotifierProvider<ChatNotifier, ChatState>((ref) {
  return ChatNotifier();
});

class ChatNotifier extends StateNotifier<ChatState> {
  ChatNotifier() : super(ChatState.init());

  final ChatRepo _chatRepo = ChatRepo.instance;

  stateMaker(ChatState newState) => state = newState;

  chat({
    required String message,
    String? chatId,
  }) async {
    stateMaker(state.copyWith(isLoading: true));
    final response = await _chatRepo.getMessage(
      message: message,
      chatId: chatId,
    );
    if (response != null) {
      stateMaker(state.copyWith(
        chatData: response.data,
        isLoading: false,
      ));
    }
    stateMaker(state.copyWith(isLoading: false));
  }
}
