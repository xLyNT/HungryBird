import { ref, onMounted, onUnmounted } from 'vue';
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
const activeModal = ref('top');
const place = ref('Приморский пляж');
const sliderSimeizImages = ref([
    { image: simeiz1 },
    { image: simeiz2 },
    { image: simeiz3 },
    { image: simeiz4 }
]);
const sliderPrimorskiyImages = ref([
    { image: primorskiy1 },
    { image: primorskiy2 },
    { image: primorskiy3 },
    { image: primorskiy4 }
]);
const sliderSimeizCurrent = ref(0);
const sliderPrimorskiyCurrent = ref(0);
let sliderSimeizInterval;
let sliderPrimorskiyInterval;
const nextSlide = (slider) => {
    if (slider === 'sliderSimeiz') {
        sliderSimeizCurrent.value = (sliderSimeizCurrent.value + 1) % sliderSimeizImages.value.length;
        resetSliderInterval('sliderSimeiz');
    }
    else {
        sliderPrimorskiyCurrent.value = (sliderPrimorskiyCurrent.value + 1) % sliderPrimorskiyImages.value.length;
        resetSliderInterval('sliderPrimorskiy');
    }
    updateSliderPosition();
};
const prevSlide = (slider) => {
    if (slider === 'sliderSimeiz') {
        sliderSimeizCurrent.value = (sliderSimeizCurrent.value - 1 + sliderSimeizImages.value.length) % sliderSimeizImages.value.length;
        resetSliderInterval('sliderSimeiz');
    }
    else {
        sliderPrimorskiyCurrent.value = (sliderPrimorskiyCurrent.value - 1 + sliderPrimorskiyImages.value.length) % sliderPrimorskiyImages.value.length;
        resetSliderInterval('sliderPrimorskiy');
    }
    updateSliderPosition();
};
const updateSliderPosition = () => {
    const sliderSimeiz = document.querySelector('.slider-wrapper:first-child .slider');
    const sliderPrimorskiy = document.querySelector('.slider-wrapper:last-child .slider');
    if (sliderSimeiz) {
        sliderSimeiz.style.transform = `translateX(-${sliderSimeizCurrent.value * 100}%)`;
    }
    if (sliderPrimorskiy) {
        sliderPrimorskiy.style.transform = `translateX(-${sliderPrimorskiyCurrent.value * 100}%)`;
    }
};
const resetSliderInterval = (slider) => {
    if (slider === 'sliderSimeiz') {
        clearInterval(sliderSimeizInterval);
        sliderSimeizInterval = setInterval(() => nextSlide('sliderSimeiz'), 5000);
    }
    else {
        clearInterval(sliderPrimorskiyInterval);
        sliderPrimorskiyInterval = setInterval(() => nextSlide('sliderPrimorskiy'), 5000);
    }
};
const openModal = (type) => {
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
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['second-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['screen']} */ ;
/** @type {__VLS_StyleScopedClasses['second-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['screen']} */ ;
/** @type {__VLS_StyleScopedClasses['third-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['top-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['apply-button']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['round-button']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['screen']} */ ;
/** @type {__VLS_StyleScopedClasses['second-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['screen']} */ ;
/** @type {__VLS_StyleScopedClasses['third-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['top-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['apply-button']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['round-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "landing-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "screen first-screen" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "fullscreen-image-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
    ...{ class: "fullscreen-image" },
    alt: "",
    src: "../assets/PageOne.png",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "screen second-screen" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "block" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "screen third-screen" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "sliders-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider" },
    ref: "sliderSimeizRef",
});
/** @type {typeof __VLS_ctx.sliderSimeizRef} */ ;
for (const [slide, index] of __VLS_getVForSourceType((__VLS_ctx.sliderSimeizImages))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "slide" },
        key: ('sliderSimeiz-' + index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
        src: (slide.image),
        alt: "",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "slider-heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-buttons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.openModal('top');
        } },
    ...{ class: "apply-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.openModal('top');
        } },
    ...{ class: "apply-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider-controls" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.prevSlide('sliderSimeiz');
        } },
    ...{ class: "round-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M15 18L9 12L15 6",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.nextSlide('sliderSimeiz');
        } },
    ...{ class: "round-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M9 6L15 12L9 18",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider-wrapper" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider" },
    ref: "sliderPrimorskiy",
});
/** @type {typeof __VLS_ctx.sliderPrimorskiy} */ ;
for (const [slide, index] of __VLS_getVForSourceType((__VLS_ctx.sliderPrimorskiyImages))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "slide" },
        key: ('sliderPrimorskiy-' + index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)({
        src: (slide.image),
        alt: "",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "slider-heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "top-buttons" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.openModal('top');
        } },
    ...{ class: "apply-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.openModal('top');
        } },
    ...{ class: "apply-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "slider-controls" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.prevSlide('sliderPrimorskiy');
        } },
    ...{ class: "round-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M15 18L9 12L15 6",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.nextSlide('sliderPrimorskiy');
        } },
    ...{ class: "round-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
    d: "M9 6L15 12L9 18",
    stroke: "currentColor",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
if (__VLS_ctx.isModalOpen) {
    /** @type {[typeof Modal, typeof Modal, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Modal, new Modal({
        ...{ 'onClose': {} },
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClose': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    let __VLS_5;
    const __VLS_6 = {
        onClose: (__VLS_ctx.closeModal)
    };
    __VLS_2.slots.default;
    /** @type {[typeof RequestForm, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(RequestForm, new RequestForm({
        ...{ 'onClose': {} },
        place: (__VLS_ctx.place),
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onClose': {} },
        place: (__VLS_ctx.place),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_10;
    let __VLS_11;
    let __VLS_12;
    const __VLS_13 = {
        onClose: (__VLS_ctx.closeModal)
    };
    var __VLS_9;
    var __VLS_2;
}
/** @type {__VLS_StyleScopedClasses['landing-page']} */ ;
/** @type {__VLS_StyleScopedClasses['screen']} */ ;
/** @type {__VLS_StyleScopedClasses['first-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['fullscreen-image-container']} */ ;
/** @type {__VLS_StyleScopedClasses['fullscreen-image']} */ ;
/** @type {__VLS_StyleScopedClasses['screen']} */ ;
/** @type {__VLS_StyleScopedClasses['second-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['heading']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['heading']} */ ;
/** @type {__VLS_StyleScopedClasses['screen']} */ ;
/** @type {__VLS_StyleScopedClasses['third-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['sliders-container']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['top-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['apply-button']} */ ;
/** @type {__VLS_StyleScopedClasses['apply-button']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['round-button']} */ ;
/** @type {__VLS_StyleScopedClasses['round-button']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['slider']} */ ;
/** @type {__VLS_StyleScopedClasses['slide']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['top-buttons']} */ ;
/** @type {__VLS_StyleScopedClasses['apply-button']} */ ;
/** @type {__VLS_StyleScopedClasses['apply-button']} */ ;
/** @type {__VLS_StyleScopedClasses['slider-controls']} */ ;
/** @type {__VLS_StyleScopedClasses['round-button']} */ ;
/** @type {__VLS_StyleScopedClasses['round-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Modal: Modal,
            RequestForm: RequestForm,
            isModalOpen: isModalOpen,
            place: place,
            sliderSimeizImages: sliderSimeizImages,
            sliderPrimorskiyImages: sliderPrimorskiyImages,
            nextSlide: nextSlide,
            prevSlide: prevSlide,
            openModal: openModal,
            closeModal: closeModal,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
