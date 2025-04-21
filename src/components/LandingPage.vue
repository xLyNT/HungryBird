<template>
  <div class="landing-page">
    <div class="screen first-screen">
      <div class="fullscreen-image-container">
        <img class="fullscreen-image" alt="" src="../assets/PageOne.png">
      </div>
    </div>

    <div class="screen second-screen">
      <div class="content">
        <div class="block">
          <h3 class="heading">ВСЁ ЛЕГКО И ПРОСТО</h3>
          <ul>
            <li> возраст от 14 до 18 лет</li>
            <li> зарегистрируйся</li>
            <li> пройди инструктаж</li>
            <li> выучи меню (мы поможем)</li>
            <li> выбери свободную и удобную для тебя дату</li>
            <li> запишись на смену</li>
          </ul>
          <br>
          <p>Наш менеджер с тобой свяжется!</p>
        </div>
        <div class="block">
          <h3 class="heading">ВЫБИРАЙ!</h3>
          <p>Дневные смены с 9.00 до 18.00<br>
            Вечерние смены с 17.00 до 00.00</p>
          <br>
          <p>Оплата сразу после смены!<br>
            Ставка + % от заказов + чаевые 🔥</p>
          <br>
          <p>Мы выдадим тебе стильную форму и мерч😎</p>
          <br>
          <p>Ждем тебя уже сейчас!</p>
        </div>
      </div>
    </div>

    <div class="screen third-screen">
      <div class="sliders-container">
        <div class="slider-wrapper">
          <div class="slider" ref="sliderSimeizRef">
            <div class="slide" v-for="(slide, index) in sliderSimeizImages" :key="'sliderSimeiz-' + index">
              <img :src="slide.image" alt="">
            </div>
          </div>
          <h3 class="slider-heading">Пляж Симеиз</h3>
          <div class="top-buttons">
            <button class="apply-button" @click="openModal('top')">
              <span>Оставить заявку</span>
            </button>
            <button class="apply-button" @click="openModal('top')">
              <span>Регистрация</span>
            </button>
          </div>
          <div class="slider-controls">
            <button class="round-button" @click="prevSlide('sliderSimeiz')">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="round-button" @click="nextSlide('sliderSimeiz')">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="slider-wrapper">
          <div class="slider" ref="sliderPrimorskiy">
            <div class="slide" v-for="(slide, index) in sliderPrimorskiyImages" :key="'sliderPrimorskiy-' + index">
              <img :src="slide.image" alt="">
            </div>
          </div>
          <h3 class="slider-heading">Пляж Приморский</h3>
          <div class="top-buttons">
            <button class="apply-button" @click="openModal('top')">
              <span>Оставить заявку</span>
            </button>
            <button class="apply-button" @click="openModal('top')">
              <span>Регистрация</span>
            </button>
          </div>
          <div class="slider-controls">
            <button class="round-button" @click="prevSlide('sliderPrimorskiy')">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="round-button" @click="nextSlide('sliderPrimorskiy')">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal v-if="isModalOpen" @close="closeModal">
      <RequestForm @close="closeModal" :place="place"/>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import Modal from './Modal.vue';
import RequestForm from "./RequestForm.vue";
import simeiz1 from '@/assets/sliders/simeiz/slideOne.png';
import simeiz2 from '@/assets/sliders/simeiz/slideTwo.png';
import simeiz3 from '@/assets/sliders/simeiz/slideThree.png';
import simeiz4 from '@/assets/sliders/simeiz/slideFour.png';
import primorskiy1 from '@/assets/sliders/primorskiy/slideOne.png';
import primorskiy2 from '@/assets/sliders/primorskiy/slideTwo.png';
import primorskiy3 from '@/assets/sliders/primorskiy/slideThree.png';
import primorskiy4 from '@/assets/sliders/primorskiy/slideFour.png';

const isModalOpen = ref(false);
const activeModal = ref<'top' | 'bottom'>('top');
const place = ref<'Приморский пляж' | 'Симеиз пляж'>('Приморский пляж');

const sliderSimeizImages = ref([
  {image: simeiz1},
  {image: simeiz2},
  {image: simeiz3},
  {image: simeiz4}
]);

const sliderPrimorskiyImages = ref([
  {image: primorskiy1},
  {image: primorskiy2},
  {image: primorskiy3},
  {image: primorskiy4}
]);

const sliderSimeizCurrent = ref(0);
const sliderPrimorskiyCurrent = ref(0);
let sliderSimeizInterval: ReturnType<typeof setInterval>;
let sliderPrimorskiyInterval: ReturnType<typeof setInterval>;

const nextSlide = (slider: string) => {
  if (slider === 'sliderSimeiz') {
    sliderSimeizCurrent.value = (sliderSimeizCurrent.value + 1) % sliderSimeizImages.value.length;
    resetSliderInterval('sliderSimeiz');
  } else {
    sliderPrimorskiyCurrent.value = (sliderPrimorskiyCurrent.value + 1) % sliderPrimorskiyImages.value.length;
    resetSliderInterval('sliderPrimorskiy');
  }
  updateSliderPosition();
};

const prevSlide = (slider: string) => {
  if (slider === 'sliderSimeiz') {
    sliderSimeizCurrent.value = (sliderSimeizCurrent.value - 1 + sliderSimeizImages.value.length) % sliderSimeizImages.value.length;
    resetSliderInterval('sliderSimeiz');
  } else {
    sliderPrimorskiyCurrent.value = (sliderPrimorskiyCurrent.value - 1 + sliderPrimorskiyImages.value.length) % sliderPrimorskiyImages.value.length;
    resetSliderInterval('sliderPrimorskiy');
  }
  updateSliderPosition();
};

const updateSliderPosition = () => {
  const sliderSimeiz = document.querySelector('.slider-wrapper:first-child .slider') as HTMLElement;
  const sliderPrimorskiy = document.querySelector('.slider-wrapper:last-child .slider') as HTMLElement;

  if (sliderSimeiz) {
    sliderSimeiz.style.transform = `translateX(-${sliderSimeizCurrent.value * 100}%)`;
  }
  if (sliderPrimorskiy) {
    sliderPrimorskiy.style.transform = `translateX(-${sliderPrimorskiyCurrent.value * 100}%)`;
  }
};

const resetSliderInterval = (slider: string) => {
  if (slider === 'sliderSimeiz') {
    clearInterval(sliderSimeizInterval);
    sliderSimeizInterval = setInterval(() => nextSlide('sliderSimeiz'), 5000);
  } else {
    clearInterval(sliderPrimorskiyInterval);
    sliderPrimorskiyInterval = setInterval(() => nextSlide('sliderPrimorskiy'), 5000);
  }
};

const openModal = (type: 'top' | 'bottom') => {
  activeModal.value = type;
  place.value = type === 'top' ? 'Симеиз пляж' : 'Приморский пляж';
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  updateSliderPosition();
  sliderSimeizInterval = setInterval(() => nextSlide('sliderSimeiz'), 5000);
  sliderPrimorskiyInterval = setInterval(() => nextSlide('sliderPrimorskiy'), 5000);
});

onUnmounted(() => {
  clearInterval(sliderSimeizInterval);
  clearInterval(sliderPrimorskiyInterval);
});
</script>

<style lang="scss" scoped>
.landing-page {
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  background: #000;
  min-width: 370px;
  font-family: 'Phonk Sans', sans-serif;
  .screen {
    max-width: 1200px;
    margin: 0 auto;
    scroll-snap-align: start;
    position: relative;
    overflow: hidden;

    &.first-screen, &.second-screen {
      .fullscreen-image-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .fullscreen-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          max-height: 817px;
        }
      }
    }

    &.second-screen {
      .content {
        display: flex;
        flex-direction: column;
        gap: 72px;
        justify-content: flex-start;
        color: #FFFFFF;
        padding: 72px 26px;
        font-size: 24px;
        font-weight: 300;

        h3 {
          color: #F8DE03;
          font-weight: 700;
          font-size: 32px;
          margin-bottom: 40px;
        }



        ul {
          list-style-type: none;
          padding-left: 1em;

          li:before {
            content: "- ";
            position: absolute;
            margin-left: -1em;
          }
        }
      }
    }

    &.third-screen {
      background-color: #000;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem 0;

      .sliders-container {
        width: 90%;
        height: 90%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .slider-wrapper {
        position: relative;
        height: 48%;
        min-height: 250px;
        overflow: hidden;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

        .slider-heading{
          color:#F8DE03;
          font-size: 32px;
          font-weight: 700;
          position: absolute;
          bottom:30px;
          left:30px;
        }

        .slider {
          height: 100%;
          display: flex;
          transition: transform 0.5s ease-in-out;
          will-change: transform;

          .slide {
            min-width: 100%;
            height: 100%;
            position: relative;
            flex-shrink: 0;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
        .top-buttons{
          position: absolute;
          top: 30px;
          left: 30px;
          display: flex;
          gap:16px;
          align-items: center;
          flex-wrap: wrap;
          .apply-button {
            padding: 10px;
            background-color: #000;
            color: #F8DE03;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Phonk Sans', sans-serif;
            font-size: 24px;
            font-weight: 700;
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
              background-color: #F8DE03;
              color: #000;
            }
          }

        }

        .slider-controls {
          position: absolute;
          bottom: 30px;
          right: 30px;
          display: flex;
          gap: 12px;

          .round-button {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #000;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            color: #F8DE03;

            &:hover {
              background-color: #F8DE03;
              color: #000;
              transform: scale(1.05);
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            }

          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .screen.second-screen{
      .content{
        font-size: 20px;

        h3{
          font-size:28px;
        }
      }

    }
    .screen.third-screen {

      .slider-wrapper {
        overflow: hidden;
        .slider-heading{
          font-size:24px;
          bottom:70px;
        }
        .top-buttons {
          .apply-button {
            font-size: 20px;
            height: 56px;
          }
        }
        .slider-controls .round-button {
          width: 40px;
          height: 40px;

          svg {
            width: 18px;
            height: 18px;
          }
        }
        .slider {
          .slide {
            width: 100%;
            flex-shrink: 0;
          }
        }

      }
    }
  }

  @media (max-width: 480px) {
    .screen.second-screen{
      .content{
        font-size: 12px;
        h3{
          font-size:20px;
        }
      }

    }
    .screen.third-screen {
      .slider-wrapper {
        max-height: 370px;
        min-height: 250px;
        .slider-heading{
          font-size:18px;
          bottom:50px;
        }
        .top-buttons{
          .apply-button{
            font-size: 10px;
            left:10px;
            max-width: 189px;
            height: 40px;
          }
        }

        .slider-controls .round-button {
          width: 24px;
          height: 24px;

          svg {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
}
</style>