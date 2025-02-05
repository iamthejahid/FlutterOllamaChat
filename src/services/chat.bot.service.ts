import ollama from 'ollama'
import { Message } from "@main/models/chat.model";


const getMessageFromBot = async (message: Message[], images: string[] | null, chatType: String): Promise<string> => {

    const response = await ollama.chat({
        model: 'llama3.1',
        messages: message.map((msg) => ({
            role: msg.who,
            content: msg.message
        })),
    })

    return response.message.content;

};



export default getMessageFromBot;
