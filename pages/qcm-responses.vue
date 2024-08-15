<script setup lang="ts">
import { z } from 'zod';

definePageMeta({
  middleware: 'qcm-middleware'
})
const route = useRoute()

const responsesSchema = z.object({
  response1: z.number(),
  response2: z.number(),
  response3: z.number(),
})

const responses = responsesSchema.safeParse(JSON.parse(route.query.responses as string))
</script>

<template>
 {{ responses.data }}
</template>
