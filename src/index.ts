import { genkit, z } from 'genkit'
import { ollama } from 'genkitx-ollama'

const ai = genkit({
  plugins: [
    ollama({
      models: [{ name: 'gemma2' }],
      serverAddress: 'http://127.0.0.1:11434',
    }),
  ],
  model: 'ollama/gemma2',
})

const translationFlow = ai.defineFlow(
  {
    name: 'translationFlow',
    inputSchema: z.string(),
  },
  async input => {
    const prompt = `Translate the following text into both English and Japanese.\n\n## Text:\n${input}\n\n## English:`
    const { text } = await ai.generate(prompt)
    return text
  }
)

ai.startFlowServer({ flows: [translationFlow] })
