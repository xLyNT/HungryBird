<template>
  <div class="select-shift" v-if="!shiftSelected">
    <div class="block" v-show="!isLoggedIn">
      <div class="input-container">
        <div class="label">Номер телефона</div>
        <input
            v-model="loginPhone"
            type="tel"
            class="text-input"
            placeholder="+7 (___) ___-__-__"
            @input="formatPhone"
            @keydown="handlePhoneKeydown"
        />
        <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
      </div>

      <button class="button" @click="handleLogin">Войти</button>
    </div>
    <div class="block" v-show="isLoggedIn">
      <div class="heading">Добро пожаловать, {{ name }}</div>

      <div class="input-container">
        <div class="label">Выберите даты</div>
        <input
            ref="dateInput"
            type="text"
            class="text-input flatpickr-input"
            placeholder="Выберите даты"
        />
        <div v-if="errors.dates" class="error-message">{{ errors.dates }}</div>
      </div>

      <button class="button" @click="handleSelectDates">Отправить</button>
    </div>
  </div>
  <div class="shift-selected" v-else>
      <p>{{ requestResult }}</p>
  </div>
</template>

<script setup>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {Russian} from 'flatpickr/dist/l10n/ru';
import {onMounted, onUnmounted, ref, nextTick} from "vue";

const emit = defineEmits(['close']);
const props = defineProps({
  place: String
});


const name = ref('Птичка');
const loginPhone = ref('');
const isLoggedIn = ref(false);
const selectedDates = ref([]);
const userId = ref(0);
const requestResult = ref('Заявка успешно отправлена');

const shiftSelected = ref(false);

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
      onChange: (dates) => {
        selectedDates.value = dates.map(date =>
            flatpickrInstance.value.formatDate(date, 'd.m.Y')
        );
        validateDates();
      }
    });
  });
};

const formatPhone = (event) => {
  let input = event.target;
  let value = input.value.replace(/\D/g, '');
  if (value === '') {
    loginPhone.value = '';
    return;
  }

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
  loginPhone.value = formattedValue;
  if (errors.value.phone.length) validatePhone();
};

const handlePhoneKeydown = (event) => {
  if ([8, 9, 13, 37, 39, 46].includes(event.keyCode)) return;

  if (loginPhone.value.length >= 18 && event.key !== 'Backspace') {
    event.preventDefault();
  }
};

const validatePhone = () => {
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  if (!loginPhone.value) {
    errors.value.phone = 'Пожалуйста, введите номер телефона';
  } else if (!phonePattern.test(loginPhone.value)) {
    errors.value.phone = 'Формат: +7 (XXX) XXX-XX-XX';
  } else {
    errors.value.phone = '';
  }
};
const validateDates = () => {
  if (!selectedDates.value || selectedDates.value.length === 0) {
    errors.value.dates = 'Пожалуйста, выберите даты';
  } else {
    errors.value.dates = '';
  }
};

const handleLogin = async () => {
  validatePhone();

  const hasErrors = Object.values(errors.value).some(error => error !== '');

  if (!hasErrors) {

    try {
      console.debug('LOGIN', loginPhone.value);

      const response = await fetch(`https://api-teens.chaika.team/users/get-id?phone=${loginPhone.value.replace(/[^\d+]/g, '')}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      });
      const data = await response.json();
      console.debug('TEST DATA',data);
      if(data.id){
        userId.value = data.id;
      }else{
        throw new Error('Ошибка при поиске пользователя');
      }

      isLoggedIn.value = true;
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
}
const handleSelectDates = async () => {
  validateDates();

  const hasErrors = Object.values(errors.value).some(error => error !== '');

  if (!hasErrors) {

    try {
      console.debug('DATES', selectedDates.value);


      const response = await fetch(`https://api-teens.chaika.team/work-shifts`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id:userId.value,
          dates:selectedDates.value.map(date => date.split('.').reverse().join('-')),
          location_id: props.place === 'Приморский пляж' ? 2 : 1
        })
      });

      const data = await response.json();

      requestResult.value = data.message ?? requestResult.value;
      if (!data.data.length) {
        requestResult.value = data.message ?? 'Ошибка выбора смены'
      }

      shiftSelected.value = true;
      setTimeout(close, 3000);

    } catch (error) {
      console.error('Ошибка:', error);
    }
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
.select-shift {

  .block {
    .heading{
      margin-bottom: 15px;
    }
    .input-container{
      display: flex;
      flex-direction: column;
      gap:16px;
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