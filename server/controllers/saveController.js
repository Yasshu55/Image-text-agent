import { Conversation } from "../models/Conversation";

export const saveDetails = async (req,res) =>{
    try {
        const {userId} = req.params
        const {contextOfImage, conversation} = req.body;

        const newConversation = await Conversation.create({conversation,contextOfImage,userId})
        res.status(200).json({ message: 'Conversation saved successfully', savedConversation: newConversation });
    } catch (error) {
        
    }
}