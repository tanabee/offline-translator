import * as z from 'zod'
import { generate } from '@genkit-ai/ai'
import { configureGenkit } from '@genkit-ai/core'
import { defineFlow, startFlowsServer } from '@genkit-ai/flow'
import { ollama } from 'genkitx-ollama'

configureGenkit({
  plugins: [
    ollama({
      models: [{ name: 'gemma2' }],
      serverAddress: 'http://127.0.0.1:11434',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})

export const translationFlow = defineFlow(
  {
    name: 'translationFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (text) => {
    const llmResponse = await generate({
      prompt: `If the following text is in Japanese, translate it into English; if the text is not in Japanese, translate it into Japanese.\n\n## Text:\n${text}`,
      model: 'ollama/gemma2',
      config: {
        temperature: 1,
      },
    })

    return llmResponse.text()
  }
)

startFlowsServer()
