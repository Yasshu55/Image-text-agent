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


export { initiateConversation };