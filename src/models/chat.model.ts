import mongoose, { Schema } from 'mongoose';

export interface Message {
    chat_id: string;
    time: string;
    who: string;
    message: string;
    images: string[] | null;
}

export interface ChatDocument extends mongoose.Document {
    device_id: string;
    from_chat: string;
    isSaved: boolean;
    chats: Message[];
    addMessageToChat(device_id: string, chat_id: string, from_chat: string, message: string, from_who: string, images: string[] | null): Promise<Message[]>;
    getChatById(chat_id: string): Promise<ChatDocument>;
    getAllChatByDeviceID(device_id: string): Promise<ChatDocument[]>;
    saveTheChat(chat_id: string): Promise<boolean | null>
    deleteTheChat(chat_id: string): Promise<boolean | null>
    deleteLastTwoMessage(chat_id: string): Promise<Message[]>;


}

const messageSchema = new mongoose.Schema({
    chat_id: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    who: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    message: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    images: {
        type: [String],
        required: false,
        default: null,
    },
    time: {
        type: String,
        required: true,
    },
});

const chatSchema = new mongoose.Schema<ChatDocument>({
    device_id: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    from_chat: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    isSaved: {
        type: Boolean,
        required: true,
    },
    chats: [messageSchema],
}, { timestamps: true });

chatSchema.methods.addMessageToChat = async function (device_id: string, chat_id: string, from_chat: string, message: string, from_who: string, images: string[] | null): Promise<Message[]> {
    const chatModel = mongoose.model('Chat') as mongoose.Model<ChatDocument>;
    let chat = await chatModel.findById(chat_id);
    if (!chat) {
        chat = new chatModel({
            device_id: device_id,
            from_chat: from_chat,
            isSaved: false, // Adjust as needed
            // chats: [{
            //   images: images,
            //   chat_id: newChatId,
            //   who: from_who,
            //   message: message,
            //   time: new Date().toISOString(),
            // }],
        });
        let newChat = await chat.save();
        newChat.chats.push({
            images: images,
            chat_id: newChat.id,
            who: from_who,
            message: message,
            time: new Date().toISOString(),
        });
        await newChat.save();
        return newChat.chats;

    } else {
        chat.chats.push({
            images: images,
            chat_id: chat_id,
            who: from_who,
            message: message,
            time: new Date().toISOString(),
        });
        await chat.save();
    }

    return chat.chats;
};

chatSchema.methods.getChatById = async function (chat_id: string): Promise<ChatDocument> {
    const chatModel = mongoose.model('Chat') as mongoose.Model<ChatDocument>;
    let chat = await chatModel.findOne({ chat_id: chat_id });
    if (!chat) {
        throw "No chat found";
    } else {
        return chat;
    }
};

chatSchema.methods.saveTheChat = async function (chat_id: string): Promise<boolean | null> {
    const chatModel = mongoose.model('Chat') as mongoose.Model<ChatDocument>;
    let chat = await chatModel.findOne({ _id: chat_id });

    if (!chat) {
        throw "No chat found";
    } else {
        chat.isSaved = true;
        await chat.save();
        return true;
    }
};

chatSchema.methods.deleteTheChat = async function (chat_id: string): Promise<boolean | null> {
    const chatModel = mongoose.model('Chat') as mongoose.Model<ChatDocument>;
    let chat = await chatModel.findOne({ _id: chat_id });

    if (!chat) {
        throw "No chat found";
    } else {
        chat.isSaved = false;
        await chat.save();
        return true;
    }
};


chatSchema.methods.deleteLastTwoMessage = async function (chat_id: string): Promise<Message[]> {
    const chatModel = mongoose.model('Chat') as mongoose.Model<ChatDocument>;
    let chat = await chatModel.findById(chat_id);
    if (!chat) {
        throw "No chat found";
    } else {
        chat.chats.pop();
        chat.chats.pop();
        await chat.save();
        return chat.chats;
    }
};

chatSchema.methods.getAllChatByDeviceID = async function (device_id: string): Promise<ChatDocument[]> {
    const chatModel = mongoose.model('Chat') as mongoose.Model<ChatDocument>;
    let chat = await chatModel.find({ device_id: device_id, isSaved: true });

    if (!chat) {
        throw "No chat found";
    } else {
        return chat;
    }
};

const chatModel = mongoose.model<ChatDocument>('Chat', chatSchema);

export { chatModel as ChatModel };