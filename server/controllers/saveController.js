import { Conversation } from "../models/Conversation.js";
import multerConfig from "../utils/multerConfig.js";

export const saveDetails = async (req,res) =>{
    try {
        console.log("Request body size:", req.body.length); 
        const conversation = req.body.conversation;
        const contextOfImage = req.body.contextOfImage;
          
        console.log("contextOfImage : ",contextOfImage);
        console.log("Conversation : ",conversation);
        const userId = req.user.id
        console.log("userId :", userId);
        
        const newConversation = await Conversation.create({conversation,contextOfImage,userId})
        res.status(200).json({ message: 'Conversation saved successfully', savedConversation: newConversation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}