import ollama from 'ollama'
import { Message } from "@main/models/chat.model";


const getMessageFromBot = async (message: Message[], images: string[] | null, chatType: String): Promise<string> => {
    const formattedMessages = [{
        role: 'system',
        content: 'You are an AI assistant named Jarvis. You can ask me anything. I am here to help you.',
    }].concat(
        message.map((msg) => ({
            role: msg.who.toLowerCase() === "user" ? "user" : "assistant",
            content: msg.message
        }))
    );

    const response = await ollama.chat({
        model: 'llava',
        messages: formattedMessages
    });

    console.log(response); // Debugging
    return response.message?.content || "I'm sorry, I didn't understand that.";
};



export { getMessageFromBot };
