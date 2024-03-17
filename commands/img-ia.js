require('dotenv').config()
const Replicate = require('replicate')
const traslate = require('@iamtraction/google-translate');
const translate = require('@iamtraction/google-translate');
const replicate = new Replicate({
  auth: process.env.APIKEY2,
});
async function img_ai(prompt) {
    try {
        await translate(prompt, {from: 'es', to: 'en'})
        .then( data => {
            prompt = data.text
        })
        const output = await replicate.run(
            "prompthero/openjourney:ad59ca21177f9e217b9075e7300cf6e14f7e5b4505b87b9689dbd866e9768969",
            {
                input: {
                    seed: undefined,
                    width: 512,
                    height: 512,
                    prompt: `mdjrny-v4 ${prompt}`,
                    num_outputs: 1,
                    guidance_scale: 7,
                    prompt_strength: 0.8,
                    num_inference_steps: 50
                }
            }
        );

        return output[0];
    } catch (error) {

        console.log(error)
        return 'https://i.ibb.co/wJZLkLv/20240305-092038.jpg'
    }

}
module.exports ={
    img_ai
}