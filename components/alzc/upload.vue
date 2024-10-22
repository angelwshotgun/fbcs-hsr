<template>
    <div>
      <form @submit.prevent="saveData">
        <div>
          <label for="textInput">Tên:</label>
          <input v-model="name" type="text" id="textInput" required>
        </div>
        <br>
        <div>
          <label for="textInput">Comp:</label>
          <input v-model="comp" type="text" id="textInput" required>
        </div>
        <br>
        <div>
          <label for="textInput">Điểm:</label>
          <input v-model="point" type="text" id="textInput" required>
        </div>
        <br>
        <div>
          <label for="textInput">Ghi chú:</label>
          <input v-model="note" type="text" id="textInput">
        </div>
        <br>
        <div>
          <label for="videoInput">Video:</label>
          <input type="file" id="videoInput" @change="handleFileChange" accept="video/*">
        </div>
        <br>
  
        <button type="submit" :disabled="isUploading">
          {{ isUploading ? 'Uploading...' : 'Save to Firestore' }}
        </button>
      </form>
  
      <p v-if="successMessage" :class="messageType">{{ successMessage }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { addDoc, collection, serverTimestamp } from "firebase/firestore";
  import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
  import { db1, storage } from "~/firebase/firebase.js";
  
  const point = ref(0);
  const comp = ref('');
  const name = ref('');
  const note = ref('');
  const videoFile = ref(null);
  const successMessage = ref('');
  const messageType = ref('');
  const isUploading = ref(false);
  
  const props = defineProps({
    comp: String,
    point: Number,
  });
  
  comp.value = props.comp;
  point.value = props.point;

  watch(() => props.comp, (newValue) => {
    comp.value = newValue;
  });
  
  watch(() => props.point, (newValue) => {
    point.value = newValue;
  });
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert('File size too large! Please select a file under 100MB');
        event.target.value = '';
        return;
      }
      videoFile.value = file;
    }
  };
  
  const saveData = async () => {
    try {
      if (!videoFile.value) {
        alert('Please select a video file!');
        return;
      }
  
      isUploading.value = true;
      messageType.value = 'info';
      successMessage.value = 'Uploading...';
  
      // Create unique filename
      const timestamp = Date.now();
      const fileName = `${timestamp}-${videoFile.value.name}`;
      const storageReference = storageRef(storage, `videos/${fileName}`);
  
      // Upload with metadata
      const metadata = {
        contentType: videoFile.value.type,
        customMetadata: {
          'originalName': videoFile.value.name
        }
      };
  
      const snapshot = await uploadBytes(storageReference, videoFile.value, metadata);
      const videoURL = await getDownloadURL(snapshot.ref);
  
      // Add to Firestore
      await addDoc(collection(db1, "textAndVideos"), {
        text: comp.value,
        point: point.value,
        name: name.value,
        note: note.value,
        videoURL: videoURL,
        fileName: fileName,
        originalName: videoFile.value.name,
        timestamp: serverTimestamp(),
      });
  
      messageType.value = 'success';
      successMessage.value = "Data saved successfully!";
      
      // Reset form
      comp.value = '';
      point.value = 0;
      name.value = '';
      note.value = '';
      videoFile.value = null;
      document.getElementById('videoInput').value = '';
  
    } catch (error) {
      console.error("Error uploading video and saving data: ", error);
      messageType.value = 'error';
      successMessage.value = "Failed to save data: " + error.message;
    } finally {
      isUploading.value = false;
    }
  };
  </script>
  
  <style scoped>
  form {
    max-width: 400px;
    margin: auto;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  .success {
    color: green;
  }
  
  .error {
    color: red;
  }
  
  .info {
    color: blue;
  }
  
  input[type="text"], 
  input[type="file"] {
    width: 100%;
    padding: 8px;
    margin: 8px 0;
    box-sizing: border-box;
  }
  
  label {
    font-weight: bold;
  }
  </style>