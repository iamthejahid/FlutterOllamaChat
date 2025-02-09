import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
    name: string;
    phoneNumber: string;
}

const LeadSchema: Schema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});

export const LeadModel = mongoose.model<ILead>('Lead', LeadSchema);

export const saveLead = async (name: string, phoneNumber: string) => {
    try {
        const lead = new LeadModel({ name, phoneNumber });
        await lead.save();
        return lead;
    } catch (error) {
        console.error('Error saving lead:', error);
        throw error; // Re-throw the error if you want to handle it elsewhere
    }
};