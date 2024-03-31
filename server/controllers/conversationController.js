import { Conversation } from '../models/Conversation.js';
import { query } from '../services/bertQueryService.js';

const initiateConversation = async (req, res) => {
    try {
        const {question,contextOfImage} = req.body;
        console.log("This is ques : ",question," and this is the context : ",contextOfImage);
        const answer = await query({
            "inputs": {
            "question": question,
            "context": contextOfImage
        }})
        console.log("This is answer : ", answer);
        return res.json({answer})

    } catch (error) {
        console.log("Error at convo api : ", error );
        res.status(500).json({error : "Failed to upload image"})
    }
}

const getPreviousConversations = async (req,res) =>{
    try {
        const userId = req.user.id;
        console.log("This is the userid : ",userId);

        const userConvos = await Conversation.findAll({where : {userId:userId}})
        // console.log("This is the userConvos : ",userConvos);

        if(!userConvos){
            return res.status(200).json({message : "No previous Convos"})
        }

        return  res.status(200).json(userConvos)
    } catch (error) {
        console.log(error);
    }
}


export { initiateConversation, getPreviousConversations };