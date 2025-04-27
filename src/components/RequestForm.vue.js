import 'flatpickr/dist/flatpickr.min.css';
import { ref } from "vue";
const emit = defineEmits(['close']);
const props = defineProps({
    place: String
});
const submitted = ref(false);
const requestResult = ref('Успешная регистрация!');
const formData = ref({
    name: '',
    lastName: '',
    phone: '',
    age: '',
});
const errors = ref({
    name: '',
    lastName: '',
    phone: '',
    age: '',
});
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
const handleSubmit = async () => {
    validatePhone();
    validateAge();
    const hasErrors = Object.values(errors.value).some(error => error !== '');
    if (!hasErrors) {
        try {
            const response = await fetch(`https://api-teens.chaika.team/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name: formData.value.name,
                    last_name: formData.value.lastName,
                    age: formData.value.age,
                    phone: formData.value.phone.replace(/[^\d+]/g, ''),
                    telegram_chat_id: import.meta.env.VITE_CHAT_ID,
                })
            });
            const data = await response.json();
            if (!data?.id) {
                requestResult.value = data.detail ?? 'Ошибка при регистрации пользователя';
                submitted.value = true;
                throw new Error(data.detail ?? 'Ошибка при регистрации пользователя');
            }
            submitted.value = true;
            setTimeout(close, 3000);
        }
        catch (error) {
            console.error('Ошибка:', error);
        }
    }
};
const close = () => {
    emit('close');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['text-input']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (!__VLS_ctx.submitted) {
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
        value: (__VLS_ctx.formData.lastName),
        type: "text",
        ...{ class: "text-input" },
        placeholder: "Фамилия",
    });
    if (__VLS_ctx.errors.lastName) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.errors.lastName);
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
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "form-submitted" },
    });
    (__VLS_ctx.requestResult);
}
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
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['form-submitted']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
            submitted: submitted,
            requestResult: requestResult,
            formData: formData,
            errors: errors,
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
