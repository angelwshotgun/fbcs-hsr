<template>
    <div class="video-list">
      <div v-if="loading" class="loading">
        Loading...
      </div>
  
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
  
      <div v-else-if="videos.length === 0" class="no-data">
        Chưa có dữ liệu nào được lưu
      </div>
  
      <div v-else class="video-grid">
        <div v-for="video in videos" :key="video.id" class="video-card">
          <div class="video-container">
            <video 
              :src="video.videoURL" 
              controls 
              class="video-player"
            ></video>
          </div>
          <div class="video-info">
            <h3>{{ video.text }}</h3>
            <p class="points">Điểm: {{ video.point }}</p>
            <p class="timestamp">
              {{ new Date(video.timestamp?.toDate()).toLocaleString() }}
            </p>
            <p>
              {{ video.name + ' ' + (video.note??'') }}
            </p>
            <button 
              @click="deleteVideo(video.id, video.fileName)" 
              class="delete-btn"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
  import { ref as storageRef, deleteObject } from 'firebase/storage';
  import { db1, storage } from '~/firebase/firebase.js';
  
  const videos = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  // Lắng nghe thay đổi từ Firestore
  onMounted(() => {
    const q = query(
      collection(db1, 'textAndVideos'),
      orderBy('timestamp', 'desc')
    );
  
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        videos.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        loading.value = false;
      },
      (err) => {
        console.error('Error fetching videos:', err);
        error.value = 'Không thể tải dữ liệu. Vui lòng thử lại sau.';
        loading.value = false;
      }
    );
  
    // Cleanup function
    onUnmounted(() => unsubscribe());
  });
  
  // Xóa video
  const deleteVideo = async (docId, fileName) => {
    try {
      if (!confirm('Bạn có chắc chắn muốn xóa?')) return;
  
      // Xóa file từ Storage
      const videoRef = storageRef(storage, `videos/${fileName}`);
      await deleteObject(videoRef);
  
      // Xóa document từ Firestore
      await deleteDoc(doc(db1, 'textAndVideos', docId));
  
    } catch (err) {
      console.error('Error deleting video:', err);
      alert('Không thể xóa video. Vui lòng thử lại sau.');
    }
  };
  </script>
  
  <style scoped>
  .video-list {
    padding: 20px;
  }
  
  .loading, .error, .no-data {
    text-align: center;
    padding: 20px;
    font-size: 1.2em;
  }
  
  .error {
    color: red;
  }
  
  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .video-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .video-container {
    position: relative;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
  }
  
  .video-player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .video-info {
    padding: 15px;
  }
  
  .video-info h3 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
  }
  
  .points {
    font-weight: bold;
    color: #2c3e50;
    margin: 5px 0;
  }
  
  .timestamp {
    color: #666;
    font-size: 0.9em;
    margin: 5px 0;
  }
  
  .delete-btn {
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .delete-btn:hover {
    background-color: #cc0000;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .video-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>