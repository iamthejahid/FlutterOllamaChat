import 'dart:convert';

class ChatModel {
  final List<ChatData>? data;
  final dynamic message;
  final dynamic stack;

  ChatModel({
    this.data,
    this.message,
    this.stack,
  });

  ChatModel copyWith({
    List<ChatData>? data,
    dynamic message,
    dynamic stack,
  }) =>
      ChatModel(
        data: data ?? this.data,
        message: message ?? this.message,
        stack: stack ?? this.stack,
      );

  factory ChatModel.fromRawJson(String str) =>
      ChatModel.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory ChatModel.fromJson(Map<String, dynamic> json) => ChatModel(
        data: json["data"] == null
            ? []
            : List<ChatData>.from(
                json["data"]!.map((x) => ChatData.fromJson(x))),
        message: json["message"],
        stack: json["stack"],
      );

  Map<String, dynamic> toJson() => {
        "data": data == null
            ? []
            : List<dynamic>.from(data!.map((x) => x.toJson())),
        "message": message,
        "stack": stack,
      };
}

class ChatData {
  final String? chatId;
  final Who? who;
  final String? message;
  final List<dynamic>? images;
  final DateTime? time;
  final String? id;

  ChatData({
    this.chatId,
    this.who,
    this.message,
    this.images,
    this.time,
    this.id,
  });

  ChatData copyWith({
    String? chatId,
    Who? who,
    String? message,
    List<dynamic>? images,
    DateTime? time,
    String? id,
  }) =>
      ChatData(
        chatId: chatId ?? this.chatId,
        who: who ?? this.who,
        message: message ?? this.message,
        images: images ?? this.images,
        time: time ?? this.time,
        id: id ?? this.id,
      );

  factory ChatData.fromRawJson(String str) =>
      ChatData.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory ChatData.fromJson(Map<String, dynamic> json) => ChatData(
        chatId: json["chat_id"],
        who: whoValues.map[json["who"]]!,
        message: json["message"],
        images: json["images"] == null
            ? []
            : List<dynamic>.from(json["images"]!.map((x) => x)),
        time: json["time"] == null ? null : DateTime.parse(json["time"]),
        id: json["_id"],
      );

  Map<String, dynamic> toJson() => {
        "chat_id": chatId,
        "who": whoValues.reverse[who],
        "message": message,
        "images":
            images == null ? [] : List<dynamic>.from(images!.map((x) => x)),
        "time": time?.toIso8601String(),
        "_id": id,
      };
}

enum Who { ASSISTANT, USER }

final whoValues = EnumValues({"assistant": Who.ASSISTANT, "user": Who.USER});

class EnumValues<T> {
  Map<String, T> map;
  late Map<T, String> reverseMap;

  EnumValues(this.map);

  Map<T, String> get reverse {
    reverseMap = map.map((k, v) => MapEntry(v, k));
    return reverseMap;
  }
}
