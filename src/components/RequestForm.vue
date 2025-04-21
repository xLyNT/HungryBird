<template>
  <form class="form" @submit.prevent="handleSubmit">
    <!-- Имя -->
    <div class="form-group">
      <input
          v-model="formData.name"
          type="text"
          class="text-input"
          placeholder="Имя"
      />
      <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
    </div>

    <!-- Возраст -->
    <div class="form-group">
      <input
          v-model="formData.age"
          type="number"
          class="text-input"
          placeholder="Возраст (14-18)"
          @input="validateAge"
      />
      <div v-if="errors.age" class="error-message">{{ errors.age }}</div>
    </div>

    <!-- Телефон -->
    <div class="form-group">
      <input
          v-model="formData.phone"
          type="tel"
          class="text-input"
          placeholder="+7 (___) ___-__-__"
          @input="formatPhone"
          @keydown="handlePhoneKeydown"
      />
      <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
    </div>

    <!-- Даты -->
    <div class="form-group">
      <input
          ref="dateInput"
          type="text"
          class="text-input flatpickr-input"
          placeholder="Выберите даты"
      />
      <div v-if="errors.dates" class="error-message">{{ errors.dates }}</div>
    </div>

    <button type="submit">Отправить</button>
  </form>
</template>

<script setup>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {Russian} from 'flatpickr/dist/l10n/ru';
import {onMounted, onUnmounted, ref, nextTick} from "vue";

const emit = defineEmits(['close']);
const props = defineProps({
  place:String
})

const formData = ref({
  name: '',
  phone: '',
  age: '',
  dates: []
});

const errors = ref({
  name: '',
  phone: '',
  age: '',
  dates: ''
});

const flatpickrInstance = ref(null);
const dateInput = ref(null);

// Инициализация flatpickr
const initFlatpickr = () => {
  nextTick(() => {
    if (!dateInput.value) return;

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);

    flatpickrInstance.value = flatpickr(dateInput.value, {
      mode: "multiple",
      dateFormat: "d.m.Y",
      minDate: "today",
      maxDate: maxDate,
      allowInput: true,
      placeholder: "Выберите даты",
      locale: Russian,
      onChange: (selectedDates) => {
        formData.value.dates = selectedDates.map(date =>
            flatpickrInstance.value.formatDate(date, 'd.m.Y')
        );
        validateDates();
      }
    });
  });
};

// Маска телефона
const formatPhone = (event) => {
  let input = event.target;
  let value = input.value.replace(/\D/g, '');

  // Если пользователь очищает поле - разрешаем
  if (value === '') {
    formData.value.phone = '';
    return;
  }

  // Удаляем первую 7, если она есть (префикс +7 уже будет добавлен)
  if (value.startsWith('7')) {
    value = value.substring(1);
  }

  let formattedValue = '+7';
  if (value.length > 0) {
    formattedValue += ` (${value.substring(0, 3)}`;
  }
  if (value.length > 3) {
    formattedValue += `) ${value.substring(3, 6)}`;
  }
  if (value.length > 6) {
    formattedValue += `-${value.substring(6, 8)}`;
  }
  if (value.length > 8) {
    formattedValue += `-${value.substring(8, 10)}`;
  }

  input.value = formattedValue;
  formData.value.phone = formattedValue;
  if(errors.value.phone.length) validatePhone();
};

// Обработка клавиш для телефона
const handlePhoneKeydown = (event) => {
  // Разрешаем управляющие клавиши
  if ([8, 9, 13, 37, 39, 46].includes(event.keyCode)) return;

  // Запрещаем ввод, если достигли максимальной длины
  if (formData.value.phone.length >= 18 && event.key !== 'Backspace') {
    event.preventDefault();
  }
};

// Валидация телефона
const validatePhone = () => {
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  if (!formData.value.phone) {
    errors.value.phone = 'Пожалуйста, введите номер телефона';
  } else if (!phonePattern.test(formData.value.phone)) {
    errors.value.phone = 'Формат: +7 (XXX) XXX-XX-XX';
  } else {
    errors.value.phone = '';
  }
};

// Валидация возраста
const validateAge = () => {
  const age = parseInt(formData.value.age);
  if (!formData.value.age) {
    errors.value.age = 'Пожалуйста, введите возраст';
  } else if (age < 14 || age > 18) {
    errors.value.age = 'Возраст должен быть от 14 до 18 лет';
  } else {
    errors.value.age = '';
  }
};

// Валидация дат
const validateDates = () => {
  if (!formData.value.dates || formData.value.dates.length === 0) {
    errors.value.dates = 'Пожалуйста, выберите даты';
  } else {
    errors.value.dates = '';
  }
};
const handleSubmit = async () => {
  validatePhone();
  validateAge();
  validateDates();

  // Проверяем, есть ли ошибки
  const hasErrors = Object.values(errors.value).some(error => error !== '');

  if (!hasErrors) {

    try {
      console.debug('TEST',formData.value)
      // Формирование сообщения
      const message = `📋 Новая заявка\n\n` +
          `👤 Имя: ${formData.value.name}\n` +
          `👤 Возраст: ${formData.value.age}\n` +
          `📱 Телефон: ${formData.value.phone}\n` +
          `🏢 Заведение: ${props.place}\n` +
          `📅 Выбранные даты:\n${formData.value.dates.map(d => `       • ${d.trim()}`).join('\n')}`;

      const response = await fetch(`https://api.telegram.org/bot${import.meta.env.VITE_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          chat_id: import.meta.env.VITE_CHAT_ID,
          text: message
        })
      });

      const data = await response.json();

      if (!data.ok) throw new Error('Ошибка Telegram API');

    } catch (error) {
      console.error('Ошибка:', error);
    }
    close();
  }
};

const close = () => {
  emit('close');
};

onMounted(() => {
  initFlatpickr();
});

onUnmounted(() => {
  if (flatpickrInstance.value) {
    flatpickrInstance.value.destroy();
  }
});
</script>

<style lang="scss" scoped>
.form {
  background: #F8DE03;
  padding: 20px;
  border-radius: 40px;
  width: 100%;
  font-family: 'Phonk Sans', sans-serif;
  .form-group {
    margin-bottom: 15px;
    position: relative;

    .text-input {
      width: 100%;
      border-radius: 32px;
      padding: 16px;
      border: none;
      background: #fff;
      box-sizing: border-box;
      color: #000;
      font-family: 'Phonk Sans', sans-serif;
      font-size: 16px;

    }

    .text-input::placeholder {
      color: #0000004D;
      font-family: 'Phonk Sans', sans-serif;
    }

    .flatpickr-input {
      background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E") no-repeat right 16px center;
      background-size: 16px;
    }

    .error-message {
      color: #ff0000;
      font-size: 12px;
      margin-top: 5px;
      padding-left: 16px;
    }
  }

  button {
    width: 100%;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 32px;
    cursor: pointer;
    font-size: 20px;
    padding: 16px;
    font-family: 'Phonk Sans', sans-serif;
    margin-top: 10px;
  }
}

/* Скрытие стрелок у числового поля */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>