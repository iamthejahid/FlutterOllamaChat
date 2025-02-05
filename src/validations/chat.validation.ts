import Joi from "joi";
import { validateRequest } from "@main/utils/validationError";


const isBase64Image: Joi.CustomValidator<string> = (value, helpers) => {
    if (!value.match(/^data:image\/(png|jpg|jpeg);base64,/)) {
        return helpers.error('any.invalid');
    }
    return value;
};


const imageChatMessage = {
    body: Joi.object({
        device_id: Joi.string().required(),
        chat_id: Joi.string(),
        message: Joi.string().required(),
        images: Joi.array().items(Joi.string().custom(isBase64Image, 'base64 image')),
        from_chat: Joi.string().required(),
    }),
};


const imageChatValidation = validateRequest(imageChatMessage);


export { imageChatValidation };