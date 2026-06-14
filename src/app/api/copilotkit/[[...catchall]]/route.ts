import { CopilotRuntime, copilotRuntimeNextJSAppRouterEndpoint } from "@copilotkit/runtime";
import { BuiltInAgent, convertMessagesToVercelAISDKMessages, convertToolsToVercelAITools } from "@copilotkit/runtime/v2";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export const dynamic = 'force-dynamic';

const customProvider = createOpenAI({
  apiKey: process.env.CEREBRAS_API_KEY || "dummy",
  baseURL: "https://api.cerebras.ai/v1",
});

const defaultAgent = new BuiltInAgent({
  type: "aisdk",
  factory: async ({ input, abortSignal }) => {
    return streamText({
      model: customProvider.chat("gpt-oss-120b"),
      messages: convertMessagesToVercelAISDKMessages(input.messages),
      tools: input.tools && input.tools.length > 0 ? convertToolsToVercelAITools(input.tools) : undefined,
      abortSignal,
    });
  },
});

const runtime = new CopilotRuntime({
  agents: {
    "default": defaultAgent,
  },
});

const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
  runtime,
  endpoint: "/api/copilotkit",
});

export const GET = handleRequest;
export const POST = handleRequest;
