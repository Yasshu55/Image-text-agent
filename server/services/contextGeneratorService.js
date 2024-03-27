import fetch from 'node-fetch';

// async function contextGenerator(imageURL) {
//     try {
//         const response = await fetch('https://marmot-first-centrally.ngrok-free.app/generate', {
//             method: 'POST',
//             headers: {
//               'Content-type': 'application/json'
//             },
//             body: JSON.stringify({
//               "image_urls": [imageURL]
//             })
//           });
      
//           if (response.ok) {
//             const data = await response.json();
//             console.log("Generated Texts:", data.generated_texts); 

//             return data.generated_texts;
//           } else {
//             throw new Error('Failed to generate context from image');
//           }
//     } catch (error) {
//         console.log(error);
//     }
// }

async function contextGenerator(imageURL) {
  try {
          const data = {
            generated_texts : ["There is a man with sad expression and holding a blue color bottle"]
          }
          console.log("Generated Texts:", data.generated_texts); 

          return data.generated_texts;

  } catch (error) {
      console.log(error);
  }
}

export { contextGenerator };