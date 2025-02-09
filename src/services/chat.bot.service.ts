import ollama from 'ollama';
import { Message, ChatModel } from "@main/models/chat.model";
import { DoctorModel } from "@main/models/doctor.model";

// Fetch available doctors
const getAvailableDoctors = async (): Promise<string> => {
    try {
        const doctors = await DoctorModel.find();
        return JSON.stringify(doctors.map((doc: { name: any; specialty: any; availableSlots: any; contact: any; }) => ({
            name: doc.name,
            specialty: doc.specialty,
            availableSlots: doc.availableSlots,
            contact: doc.contact,
        })));
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return "[]"; // Return an empty array in case of failure
    }
};

// Get chatbot response
const getMessageFromBot = async (message: Message[], images: string[] | null, chatType: String): Promise<string> => {
    try {
        const formattedMessages = [
            {
                role: 'system',
                content: `You are a medical healthcare assistant named MediHelper, working at Medicare Hospital. 
                          Your primary role is to assist users by engaging in conversations, providing basic guidance, 
                          and directing them to the right doctor when necessary.

                          Key Information:
                          - Medicare Hospital has multiple doctors, retrievable via get_available_doctors.
                          - Hotline: 16122.
                          - Suggest home remedies for minor issues but do NOT prescribe medications.
                          - If a doctor is available, suggest them first; otherwise, advise on the type of specialist needed.
                          - If a user is interested in a doctor, politely ask for their name and phone number for follow-up.`,

            },
            ...message.map((msg) => ({
                role: msg.who,
                content: msg.message
            }))
        ];

        // Call the chatbot with the initial message
        const response = await ollama.chat({
            model: 'llama3.2',
            messages: formattedMessages,
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'get_available_doctors',
                        description: 'Fetches the list of available doctors with their specialties and schedules',
                        parameters: {
                            type: "object",
                            properties: {},
                            required: [],
                        },
                    },
                }
            ]
        });

        if (!response.message?.tool_calls) {
            return response.message?.content || "I'm sorry, I didn't understand that.";
        }

        // Handle function calling
        const toolResponses: Record<string, string> = {};
        for (const tool of response.message.tool_calls) {
            if (tool.function.name === 'get_available_doctors') {
                toolResponses[tool.function.name] = await getAvailableDoctors();
            }
        }

        // Send function response back for final processing
        const finalResponse = await ollama.chat({
            model: 'llama3.2',  // Keeping model consistent
            messages: [
                ...formattedMessages,
                { role: 'tool', content: JSON.stringify(toolResponses) }
            ],
        });

        return finalResponse.message?.content || "I'm sorry, I didn't understand that.";
    } catch (error) {
        console.error("Error processing chatbot request:", error);
        return "Apologies, but I am currently unable to process your request.";
    }
};

export { getMessageFromBot };
