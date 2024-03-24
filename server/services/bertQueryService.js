import fetch from 'node-fetch';

async function query(data) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/google-bert/bert-large-uncased-whole-word-masking-finetuned-squad",
            {
                headers: { Authorization: `Bearer ${process.env.BERT_API_KEY}` },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        console.log("Successfully answered the ques");
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export {query}