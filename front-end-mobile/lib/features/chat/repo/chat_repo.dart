import 'dart:convert';
import 'dart:developer';
import 'package:http/http.dart' as http;
import 'package:flutter_ollama/features/chat/domain/models/chat_model.dart';

class ChatRepo {
  // Making it private to prevent instantiation
  ChatRepo._();
  static final ChatRepo instance = ChatRepo._();

  Future<ChatModel?> getMessage({
    required String message,
    String? chatId,
  }) async {
    try {
      // endpoint is http://localhost:3031/api/chat/textChat
      // {
      //   "device_id": "something",
      //   "message": "Yes please!",
      //   "from_chat": "postman",
      //   "chat_id": "67a8c97ec7a9b707be0bcb59"
      // }
      // if 201 response, return ChatModel.fromJson(response.body)
      final body = chatId == null
          ? {
              "device_id": "test-mobile",
              "from_chat": "mobile",
              "message": message,
            }
          : {
              "chat_id": chatId,
              "device_id": "test-mobile",
              "from_chat": "mobile",
              "message": message,
            };

      final response = await http.post(
        Uri.parse("http://192.168.1.103:3031/api/chat/textChat"),
        body: json.encode(body),
        headers: {
          "Content-Type": "application/json",
        },
      );

      log("Response: ${response.body}", name: "[Response]:");

      if (response.statusCode == 201) {
        return ChatModel.fromJson(json.decode(response.body));
      } else {
        log("Error: ${response.statusCode}, message: ${json.decode(response.body)["message"]} ",
            name: "ChatRepo.getMessage");
      }
    } catch (e, err) {
      log("", error: e, stackTrace: err, name: "ChatRepo.getMessage");
    }
    return null;
  }
}
