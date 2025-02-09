import 'package:equatable/equatable.dart';
import 'package:flutter_ollama/features/chat/domain/models/chat_model.dart';

class ChatState extends Equatable {
  final bool isLoading;
  final List<ChatData> chatData;
  const ChatState({
    required this.isLoading,
    required this.chatData,
  });

  ChatState copyWith({
    bool? isLoading,
    List<ChatData>? chatData,
  }) {
    return ChatState(
      isLoading: isLoading ?? this.isLoading,
      chatData: chatData ?? this.chatData,
    );
  }

  factory ChatState.init() => ChatState(isLoading: false, chatData: []);

  @override
  bool get stringify => true;

  @override
  List<Object> get props => [isLoading, chatData];
}
