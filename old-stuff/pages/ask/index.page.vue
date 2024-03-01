<script lang="ts" setup>

const conversation = []
const apiBaseUrl = 'https://api.perplexity.ai/chat/completions'
const accessToken = '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'
let inputValue = "Hallo, das ist ein Test"


const sendPrompt = async (prompt: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  };
  if (prompt) {
    conversation.push({
      role: 'user',
      content: prompt
    })
  }

  const payload = {
    model: 'sonar-medium-online',
    messages: [
      {
        role: 'system',
        content: 'You are a helping assistant operating in Notion. Try to answer in same language as user is speaking with you.'
      },
      ...conversation].filter(
        (value) => value,
    ),
  };

  return await fetch(
      apiBaseUrl,
      {
        method: 'post',
        headers: headers,
        body: JSON.stringify(payload)
      }).then(value => {
    return value.json()
  }).then(value => {
    return value['choices'][0]['message']['content']
  }).then(value => {
    conversation.push({
      role: 'assistant',
      content: value
    })
    return value
  })
}
</script>

<template>
  <div class="w-full h-full text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-950 p-12">
    <div class="text-sm flex flex-col space-y-5">
      <h1 class="text-2xl">Ask me anything</h1>
      <ul v-if="conversation?.length">
        <li v-for="x in conversation"
            v-bind:class="{'text-green-500': x.role === 'assistant', 'text-blue-500': x.role === 'user', 'pb-2': x.role === 'assistant'}">
          {{ x.content }}
        </li>
      </ul>
      <div class="flex flex-col space-y-2">
        <input v-model="inputValue"
               class="p-2 border-0 border-b border-b-300 focus:border-b-blue-500 bg-transparent rounded border outline-none w-full">
        <button v-on:click="() => {
          sendPrompt(inputValue).then(value => {
            console.log('conversation', conversation)
          })
        }" class="bg-blue-500 text-white">Ask
        </button>
      </div>
    </div>
  </div>
</template>