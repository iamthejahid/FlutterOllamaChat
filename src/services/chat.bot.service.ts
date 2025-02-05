import ollama from 'ollama';
import { Message, ChatModel } from "@main/models/chat.model";
import { DoctorModel } from "@main/models/doctor.model";

// Fetch available doctors
const getAvailableDoctors = async () => {
    const doctors = await DoctorModel.find();
    return JSON.stringify(doctors.map((doc: { name: any; specialty: any; availableSlots: any; contact: any; }) => ({
        name: doc.name,
        specialty: doc.specialty,
        availableSlots: doc.availableSlots,
        contact: doc.contact,
    })));
};

// Get chatbot response
const getMessageFromBot = async (message: Message[], images: string[] | null, chatType: String): Promise<string> => {
    const formattedMessages = [{
        role: 'system',
        content: "You are an AI medical assistant named Medihelper. Your primary role is to provide basic health suggestions and guidance to users. You will offer initial recommendations based on the symptoms or concerns shared by the user, but you will not prescribe any medication. While providing these basic suggestions, you will also try to understand the underlying cause of the issue. Once you have gathered enough information and identified the root cause, you will suggest an appropriate doctor from the list of available professionals who specialize in the relevant field.",
    }].concat(
        message.map((msg) => ({
            role: msg.who,
            content: msg.message
        }))
    );

    const response = await ollama.chat({
        model: 'llava',
        messages: formattedMessages,
    });

    // If the model decides to use a tool
    if (response.message && response.message.tool_calls) {
        const toolResponses: string[] = [];

        // Loop through the tool calls and handle only if necessary
        for (const tool of response.message.tool_calls) {
            if (tool.function.name === 'get_available_doctors') {
                // Call the tool only if it is needed
                toolResponses.push(await getAvailableDoctors());
            }
        }

        // If any tool was called, process and send the result
        if (toolResponses.length > 0) {
            const finalResponse = await ollama.chat({
                model: 'llava',
                messages: [...formattedMessages, { role: 'tool', content: toolResponses.join('\n') }],
            });
            return finalResponse.message?.content || "I'm sorry, I didn't understand that.";
        }
    }

    return response.message?.content || "I'm sorry, I didn't understand that.";
};

export { getMessageFromBot };
