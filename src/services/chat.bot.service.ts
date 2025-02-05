import ollama from 'ollama'
import { Message } from "@main/models/chat.model";


const getMessageFromBot = async (message: Message[], images: string[] | null, chatType: String): Promise<string> => {
    const response = await ollama.chat({
        model: 'llama3.1',
        messages: [{
            'role': 'system',
            'content': 'You are an AI assistant named Jarvis',
        },], ...message.map((msg) => ({
            role: msg.who,
            content: msg.message
        })),
    })
    return response.message.content;

};



export default getMessageFromBot;
