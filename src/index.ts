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

export const menuSuggestionFlow = defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `Suggest an item for the menu of a ${subject} themed restaurant`,
      model: 'ollama/gemma2',
      config: {
        temperature: 1,
      },
    })

    return llmResponse.text()
  }
)

startFlowsServer()
