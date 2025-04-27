import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Russian } from 'flatpickr/dist/l10n/ru';
import { onMounted, onUnmounted, ref, nextTick } from "vue";
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
            onChange: (dates) => {
                selectedDates.value = dates.map(date => flatpickrInstance.value.formatDate(date, 'd.m.Y'));
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
    if (errors.value.phone.length)
        validatePhone();
};
const handlePhoneKeydown = (event) => {
    if ([8, 9, 13, 37, 39, 46].includes(event.keyCode))
        return;
    if (loginPhone.value.length >= 18 && event.key !== 'Backspace') {
        event.preventDefault();
    }
};
const validatePhone = () => {
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!loginPhone.value) {
        errors.value.phone = 'Пожалуйста, введите номер телефона';
    }
    else if (!phonePattern.test(loginPhone.value)) {
        errors.value.phone = 'Формат: +7 (XXX) XXX-XX-XX';
    }
    else {
        errors.value.phone = '';
    }
};
const validateDates = () => {
    if (!selectedDates.value || selectedDates.value.length === 0) {
        errors.value.dates = 'Пожалуйста, выберите даты';
    }
    else {
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
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            console.debug('TEST DATA', data);
            if (data.id) {
                userId.value = data.id;
            }
            else {
                throw new Error('Ошибка при поиске пользователя');
            }
            isLoggedIn.value = true;
        }
        catch (error) {
            console.error('Ошибка:', error);
        }
    }
};
const handleSelectDates = async () => {
    validateDates();
    const hasErrors = Object.values(errors.value).some(error => error !== '');
    if (!hasErrors) {
        try {
            console.debug('DATES', selectedDates.value);
            const response = await fetch(`https://api-teens.chaika.team/work-shifts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId.value,
                    dates: selectedDates.value.map(date => date.split('.').reverse().join('-')),
                    location_id: props.place === 'Приморский пляж' ? 2 : 1
                })
            });
            const data = await response.json();
            requestResult.value = data.message ?? requestResult.value;
            if (!data.data.length) {
                requestResult.value = data.message ?? 'Ошибка выбора смены';
            }
            shiftSelected.value = true;
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
if (!__VLS_ctx.shiftSelected) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "select-shift" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "block" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (!__VLS_ctx.isLoggedIn) }, null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (__VLS_ctx.formatPhone) },
        ...{ onKeydown: (__VLS_ctx.handlePhoneKeydown) },
        type: "tel",
        ...{ class: "text-input" },
        placeholder: "+7 (___) ___-__-__",
    });
    (__VLS_ctx.loginPhone);
    if (__VLS_ctx.errors.phone) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "error-message" },
        });
        (__VLS_ctx.errors.phone);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleLogin) },
        ...{ class: "button" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "block" },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isLoggedIn) }, null, null);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "heading" },
    });
    (__VLS_ctx.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "input-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "label" },
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
        ...{ onClick: (__VLS_ctx.handleSelectDates) },
        ...{ class: "button" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "shift-selected" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.requestResult);
}
/** @type {__VLS_StyleScopedClasses['select-shift']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['heading']} */ ;
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['text-input']} */ ;
/** @type {__VLS_StyleScopedClasses['flatpickr-input']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['shift-selected']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            $props: __VLS_makeOptional(props),
            ...props,
            $emit: emit,
            name: name,
            loginPhone: loginPhone,
            isLoggedIn: isLoggedIn,
            requestResult: requestResult,
            shiftSelected: shiftSelected,
            errors: errors,
            dateInput: dateInput,
            formatPhone: formatPhone,
            handlePhoneKeydown: handlePhoneKeydown,
            handleLogin: handleLogin,
            handleSelectDates: handleSelectDates,
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
