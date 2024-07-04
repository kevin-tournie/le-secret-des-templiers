<script setup lang="ts">
import type { Team } from '~/server/database/schema';

const { data, error, } = await useFetch<Team[]>('/api/hello')
</script>

<template>
    <div>
        <h1>Home</h1>
        <p>Welcome to the home page</p>
        <p>{{ data ? data[0].name : "c'est vide !" }}</p>
    </div>
</template>