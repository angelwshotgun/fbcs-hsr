<template>
  <div class="p-4 space-y-4">
    <h1 class="text-xl font-bold">🔢 Realtime Counter</h1>

    <p>👥 Users online: <strong>{{ usersOnline }}</strong></p>
    <p>📡 Current count: <strong>{{ count }}</strong></p>
    <p>👑 Leader ID: <code>{{ currentLeader || 'None' }}</code></p>
    <p v-if="isLeader" class="text-green-600 font-semibold">🎉 You are the leader!</p>
    <p v-if="isLeader && autoIncrementActive" class="text-blue-600">⏰ Auto-incrementing every second...</p>

    <div class="space-x-2">
      <button @click="increment" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        ➕ Manual Increment
      </button>
      <button 
        @click="claimLeader" 
        :disabled="isLeader"
        :class="[
          'px-4 py-2 text-white rounded',
          isLeader ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        ]"
      >
        {{ isLeader ? '👑 You are Leader' : '👑 Claim Leader' }}
      </button>
      <button 
        v-if="isLeader"
        @click="releaseLeader" 
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        🚪 Release Leader
      </button>
    </div>

    <div class="text-sm text-gray-600 space-y-1">
      <p>• Leader auto-increments count every second</p>
      <p>• Only one leader at a time</p>
      <p>• Your ID: <code class="text-xs">{{ clientId.slice(0, 8) }}...</code></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const config = useRuntimeConfig()
const supabase = createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)

const channel = supabase.channel('realtime-counter')
const usersOnline = ref(0)
const count = ref(0)
const currentLeader = ref<string | null>(null)
const autoIncrementActive = ref(false)

const clientId = crypto.randomUUID()
let autoIncrementTimer: ReturnType<typeof setInterval> | null = null

const isLeader = computed(() => currentLeader.value === clientId)

const increment = () => {
  count.value++
  channel.send({
    type: 'broadcast',
    event: 'increment',
    payload: { 
      count: count.value,
      timestamp: Date.now(),
      fromClient: clientId
    }
  })
}

const claimLeader = () => {
  // Chỉ cho phép claim nếu chưa có leader hoặc leader hiện tại offline
  if (!currentLeader.value || currentLeader.value === clientId) {
    currentLeader.value = clientId
    
    channel.send({
      type: 'broadcast',
      event: 'leader-claimed',
      payload: { 
        leaderId: clientId,
        timestamp: Date.now()
      }
    })
    
    startAutoIncrement()
  }
}

const releaseLeader = () => {
  if (isLeader.value) {
    stopAutoIncrement()
    currentLeader.value = null
    
    channel.send({
      type: 'broadcast',
      event: 'leader-released',
      payload: { 
        formerLeaderId: clientId,
        timestamp: Date.now()
      }
    })
  }
}

function startAutoIncrement() {
  if (autoIncrementTimer || !isLeader.value) return
  
  autoIncrementActive.value = true
  autoIncrementTimer = setInterval(() => {
    if (isLeader.value) {
      increment()
    } else {
      // Nếu không còn là leader, dừng timer
      stopAutoIncrement()
    }
  }, 1000)
}

function stopAutoIncrement() {
  autoIncrementActive.value = false
  if (autoIncrementTimer) {
    clearInterval(autoIncrementTimer)
    autoIncrementTimer = null
  }
}

onMounted(async () => {
  await channel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({ 
        online: true,
        clientId: clientId,
        joinedAt: Date.now()
      })
    }
  })

  // Update số người online
  channel.on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState()
    usersOnline.value = Object.keys(state).length
    
    // Kiểm tra xem leader hiện tại có còn online không
    if (currentLeader.value) {
      const leaderOnline = Object.values(state).some(
        (presences: any) => presences.some((p: any) => p.clientId === currentLeader.value)
      )
      
      if (!leaderOnline && !isLeader.value) {
        // Leader đã offline, reset leader
        currentLeader.value = null
        stopAutoIncrement()
      }
    }
  })

  // Nhận count từ broadcast
  channel.on('broadcast', { event: 'increment' }, ({ payload }) => {
    // Chỉ cập nhật nếu không phải từ chính mình
    if (payload.fromClient !== clientId) {
      count.value = payload.count
    }
  })

  // Nhận leader claimed từ broadcast
  channel.on('broadcast', { event: 'leader-claimed' }, ({ payload }) => {
    const { leaderId } = payload
    
    // Nếu có leader mới và không phải mình
    if (leaderId !== clientId) {
      // Dừng auto increment nếu đang chạy
      stopAutoIncrement()
      currentLeader.value = leaderId
    } else if (leaderId === clientId) {
      // Confirm mình là leader
      currentLeader.value = clientId
      startAutoIncrement()
    }
  })

  // Nhận leader released từ broadcast
  channel.on('broadcast', { event: 'leader-released' }, ({ payload }) => {
    if (payload.formerLeaderId === currentLeader.value) {
      currentLeader.value = null
      stopAutoIncrement()
    }
  })

  // Xử lý khi user leave
  channel.on('presence', { event: 'leave' }, ({ leftPresences }) => {
    // Kiểm tra xem leader có rời đi không
    const leaderLeft = leftPresences.some((p: any) => p.clientId === currentLeader.value)
    if (leaderLeft) {
      currentLeader.value = null
      stopAutoIncrement()
    }
  })
})

onBeforeUnmount(() => {
  // Release leader trước khi rời đi
  if (isLeader.value) {
    releaseLeader()
  }
  
  channel.unsubscribe()
  stopAutoIncrement()
})
</script>