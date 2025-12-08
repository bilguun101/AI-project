import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const token = process.env.HF_TOKEN;
const client = new InferenceClient(token);

export const POST = async (request: NextRequest) => {
  try {
    const { textArea } = await request.json();
    if (!textArea) {
      return NextResponse.json(
        { error: "No prompt provided" },
        { status: 400 }
      );
    }

    const image = await client.textToImage({
      provider: "nscale",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: textArea,
      parameters: { num_inference_steps: 5 },
    });

    const blob = image as unknown as Blob;

    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ image: dataUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error" },
      { status: 500 }
    );
  }
};
