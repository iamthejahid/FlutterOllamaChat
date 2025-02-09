import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_ollama/features/chat/domain/models/chat_model.dart';
import 'package:flutter_ollama/features/chat/view/chat_state_notifier.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class ChatScreen extends HookConsumerWidget {
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context, ref) {
    final textController = useTextEditingController();
    final state = ref.watch(chatStateProvider);
    final controller = ref.read(chatStateProvider.notifier);

    // Scroll Controller for chat list view
    final scrollController = ScrollController();

    // Send message handler
    void sendMessage() {
      if (textController.text.isNotEmpty) {
        final text = textController.text;
        final chatID =
            state.chatData.isNotEmpty ? state.chatData.last.chatId : null;
        controller.chat(message: text, chatId: chatID);
      }
    }

    ref.listen(chatStateProvider, (p, n) {
      if (p?.chatData.length != n.chatData.length) {
        scrollController.animateTo(
          0.0,
          duration: Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
        textController.clear();
      }
    });

    // A method to show the messages in the chat list
    Widget buildChatList() {
      return Expanded(
        child: ListView.builder(
          controller: scrollController,
          reverse: true, // To make the list scroll from bottom to top
          itemCount: state.chatData.length,
          itemBuilder: (context, index) {
            final chat = state.chatData[state.chatData.length - index - 1];
            final isUserMessage = chat.who == Who.USER;

            return Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Row(
                mainAxisAlignment: isUserMessage
                    ? MainAxisAlignment.end
                    : MainAxisAlignment.start,
                children: [
                  if (!isUserMessage) ...[
                    CircleAvatar(
                      radius: 20,
                      backgroundColor: Colors.blueAccent,
                      child: Text(
                        'A', // Replace with Assistant's avatar or initial
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                    SizedBox(width: 8),
                  ],
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: BoxDecoration(
                      color:
                          isUserMessage ? Colors.blue[200] : Colors.grey[300],
                      borderRadius: BorderRadius.circular(20),
                    ),
                    constraints: BoxConstraints(
                        maxWidth: MediaQuery.of(context).size.width * 0.7),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          isUserMessage ? "You" : "Assistant",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          chat.message ?? '',
                          style: TextStyle(
                            color: Colors.black87,
                            fontSize: 16,
                          ),
                        ),
                        if (chat.time != null) SizedBox(height: 6),
                        Text(
                          "${chat.time!.hour}:${chat.time!.minute}",
                          style: TextStyle(fontSize: 12, color: Colors.black54),
                        ),
                      ],
                    ),
                  ),
                  if (isUserMessage) ...[
                    SizedBox(width: 8),
                    CircleAvatar(
                      radius: 20,
                      backgroundColor: Colors.greenAccent,
                      child: Text(
                        'U', // Replace with User's avatar or initial
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                ],
              ),
            );
          },
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Chat'),
        backgroundColor: Colors.blueAccent,
      ),
      body: Column(
        children: [
          buildChatList(),
          if (state.isLoading)
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: CircularProgressIndicator(),
            ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: textController,
                    decoration: InputDecoration(
                      hintText: 'Type your message...',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(30),
                      ),
                      filled: true,
                      fillColor: Colors.grey[200],
                    ),
                  ),
                ),
                SizedBox(width: 10),
                IconButton(
                  onPressed: sendMessage,
                  icon: Icon(Icons.send, color: Colors.blueAccent),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
