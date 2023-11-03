import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";
import dotenv from "dotenv";
dotenv.config();

const PAT = process.env.PAT;

const USER_ID = "meta";
const APP_ID = "Llama-2";

const MODEL_ID = "llama2-70b-chat";
const MODEL_VERSION_ID = "acba9c1995f8462390d7cb77d482810b";

export const chatbot = async (req, res) => {
  const { userInput } = req.body;
  const prompt = `<s>[INST] <<SYS>>

    You are personal chatbot of governor of uttrakhand.

    <</SYS>>
    
    ${userInput}[/INST]`;

  const stub = ClarifaiStub.grpc();

  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key " + PAT);

  try {
    stub.PostModelOutputs(
      {
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        model_id: MODEL_ID,
        version_id: MODEL_VERSION_ID,
        inputs: [{ data: { text: { raw: prompt } } }],
      },
      metadata,
      (err, response) => {
        if (err) {
          throw new Error(err);
        }

        if (response.status.code !== 10000) {
          throw new Error(
            "Post model outputs failed, status: " + response.status.description
          );
        }

        const output = response.outputs[0].data.text.raw;

        res.status(200).json({ output });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
