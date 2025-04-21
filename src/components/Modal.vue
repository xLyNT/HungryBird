<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
<!--      <div class="header">-->
<!--        <slot name="header"></slot>-->
<!--        <div class="close-button" @click="closeModal">-->
<!--          <img alt="" :src="CloseIcon"/>-->
<!--        </div>-->
<!--      </div>-->
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from '../assets/close.svg';

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Phonk Sans', sans-serif;

  .modal-content {
    border-radius: 8px;
    width: 440px;
    color: #000;

    @media (max-width: 768px) {
      width: 90%;
      max-height: 80vh;
    }

    .header {
      position: relative;
      padding-top:20px;
      .close-button {
        position: absolute;
        cursor: pointer;
        top: 10px;
        right: 10px;
      }
    }

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
}
</style>