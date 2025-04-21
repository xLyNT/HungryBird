import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Russian } from 'flatpickr/dist/l10n/ru';
import { onMounted, onUnmounted, ref, nextTick } from "vue";
const emit = defineEmits(['close']);
const props = defineProps({
    place: String
});
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
        if (!dateInput.value)
            return;
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
                formData.value.dates = selectedDates.map(date => flatpickrInstance.value.formatDate(date, 'd.m.Y'));
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
    if (errors.value.phone.length)
        validatePhone();
};
// Обработка клавиш для телефона
const handlePhoneKeydown = (event) => {
    // Разрешаем управляющие клавиши
    if ([8, 9, 13, 37, 39, 46].includes(event.keyCode))
        return;
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
    }
    else if (!phonePattern.test(formData.value.phone)) {
        errors.value.phone = 'Формат: +7 (XXX) XXX-XX-XX';
    }
    else {
        errors.value.phone = '';
    }
};
// Валидация возраста
const validateAge = () => {
    const age = parseInt(formData.value.age);
    if (!formData.value.age) {
        errors.value.age = 'Пожалуйста, введите возраст';
    }
    else if (age < 14 || age > 18) {
        errors.value.age = 'Возраст должен быть от 14 до 18 лет';
    }
    else {
        errors.value.age = '';
    }
};
// Валидация дат
const validateDates = () => {
    if (!formData.value.dates || formData.value.dates.length === 0) {
        errors.value.dates = 'Пожалуйста, выберите даты';
    }
    else {
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
            console.debug('TEST', formData.value);
            // Формирование сообщения
            const message = `📋 Новая заявка\n\n` +
                `👤 Имя: ${formData.value.name}\n` +
                `👤 Возраст: ${formData.value.age}\n` +
                `📱 Телефон: ${formData.value.phone}\n` +
                `🏢 Заведение: ${props.place}\n` +
                `📅 Выбранные даты:\n${formData.value.dates.map(d => `       • ${d.trim()}`).join('\n')}`;
            const response = await fetch(`https://api.telegram.org/bot${import.meta.env.VITE_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: import.meta.env.VITE_CHAT_ID,
                    text: message
                })
            });
            const data = await response.json();
            if (!data.ok)
                throw new Error('Ошибка Telegram API');
        }
        catch (error) {
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['text-input']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: "form" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.formData.name),
    type: "text",
    ...{ class: "text-input" },
    placeholder: "Имя",
});
if (__VLS_ctx.errors.name) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.errors.name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.validateAge) },
    type: "number",
    ...{ class: "text-input" },
    placeholder: "Возраст (14-18)",
});
(__VLS_ctx.formData.age);
if (__VLS_ctx.errors.age) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.errors.age);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onInput: (__VLS_ctx.formatPhone) },
    ...{ onKeydown: (__VLS_ctx.handlePhoneKeydown) },
    type: "tel",
    ...{ class: "text-input" },
    placeholder: "+7 (___) ___-__-__",
});
(__VLS_ctx.formData.phone);
if (__VLS_ctx.errors.phone) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.errors.phone);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-group" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ref: "dateInput",
    type: "text",
    ...{ class: "text-input flatpickr-input" },
    placeholder: "Выберите даты",
});
/** @type {typeof __VLS_ctx.dateInput} */ ;
if (__VLS_ctx.errors.dates) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "error-message" },
    });
    (__VLS_ctx.errors.dates);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
});
/** @type {__VLS_StyleScopedClasses['form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
/** @type {__VLS_StyleScopedClasses['text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['flatpickr-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
            formData: formData,
            errors: errors,
            dateInput: dateInput,
            formatPhone: formatPhone,
            handlePhoneKeydown: handlePhoneKeydown,
            validateAge: validateAge,
            handleSubmit: handleSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
