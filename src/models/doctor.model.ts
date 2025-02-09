import mongoose, { Schema } from 'mongoose';


export interface Doctor {
    name: string;
    specialty: string;
    availableSlots: { day: string; time: string }[];
    contact: string;
}

const doctorSchema = new Schema<Doctor>({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    availableSlots: [{
        day: { type: String, required: true },
        time: { type: String, required: true }
    }],
    contact: { type: String, required: true },
});

export const DoctorModel = mongoose.model<Doctor>("Doctor", doctorSchema);
