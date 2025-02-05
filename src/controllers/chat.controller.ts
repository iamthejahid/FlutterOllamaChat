import { Request, Response } from "express";
import httpStatus from "http-status";
// Utilities
import catchAsyncErr from "@main/utils/catchAsync";
import apiResponse from "@main/utils/response";
// import { getMessageFromBot } from "@main/services/chat.bot.service";

import { ChatModel, ChatDocument } from "@main/models/chat.model";





const chatController = catchAsyncErr(async (req: Request, res: Response) => {
    const { device_id, chat_id, from_chat, message, images } = req.body;
    const chatInstance: ChatDocument = new ChatModel();
    let updatedChat = await chatInstance.addMessageToChat(device_id, chat_id, from_chat, message, "User", images);
    let messageFromBot: string;

    // Check if images is provided and is an array before passing it to getMessageFromBot
    if (Array.isArray(images)) {
        // messageFromBot = await getMessageFromBot(updatedChat, images, from_chat);
        messageFromBot = "";
    } else {
        // messageFromBot = await getMessageFromBot(updatedChat, null, from_chat);
        messageFromBot = "";
    }

    updatedChat = await chatInstance.addMessageToChat(device_id, updatedChat[0].chat_id, from_chat, messageFromBot, "Bot", images);
    return apiResponse(res, httpStatus.CREATED, { data: updatedChat });
});




export {
    chatController as textChat

}