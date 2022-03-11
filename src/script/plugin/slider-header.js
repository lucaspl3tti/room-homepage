export default class SliderHeaderPlugin {
    constructor(el) {
        // select configured element
        this.el = document.querySelector(el);

        // select slider navigation elements
        this.sliderNavPrevios = this.el.querySelector('[data-slider-controls="previous"]');
        this.sliderNavNext = this.el.querySelector('[data-slider-controls="next"]');
        this.sliderCount = this.el.querySelectorAll('[data-slider-image]').length;

        // define slider targets for images and texts
        this.sliderImageTarget = 'data-slider-image';
        this.sliderTextTarget = 'data-slider-text';

        this.registerEvents();
    }

    registerEvents() {
        this.sliderNavPrevios.addEventListener('click', () => this.onClickSliderNav('previous'));

        this.sliderNavNext.addEventListener('click', () => this.onClickSliderNav('next'));
    }

    onClickSliderNav(sliderNavEl) {
        const currentSliderAttr = this.getCurrentSliderAttribute();

        // per default select first slider element
        let newSliderAttr = 1;

        // get attribute for new slider element
        newSliderAttr = this.getNewSliderAttr(sliderNavEl, currentSliderAttr);

        // select current slider image and text, as well as the next slider image and text
        const currentSliderImage = this.getSliderEl(this.sliderImageTarget, currentSliderAttr);
        const currentSliderText = this.getSliderEl(this.sliderTextTarget, currentSliderAttr);
        const nextSliderImage = this.getSliderEl(this.sliderImageTarget, newSliderAttr);
        const nextSliderText = this.getSliderEl(this.sliderTextTarget, newSliderAttr);

        // hide current slider and show the next one
        this.hideSlider(currentSliderImage, currentSliderText);
        this.showSlider(nextSliderImage, nextSliderText);
    }

    getCurrentSliderAttribute() {
        return Number(this.el.querySelector('.slider__image--current').getAttribute('data-slider-image'));
    }

    getNewSliderAttr(sliderNavEl, currentSliderAttr) {
        if (sliderNavEl === 'previous') {

            // select previous slider element
            if (currentSliderAttr > 1) return currentSliderAttr - 1;
            return this.sliderCount;

        } else if (sliderNavEl === 'next') {

            // select next slider element
            if (currentSliderAttr < this.sliderCount) return currentSliderAttr + 1;
            return 1;

        }
    }

    getSliderEl(targetEl, sliderAttr) {
        return this.el.querySelector('[' + targetEl + '="' + sliderAttr + '"]');
    }

    hideSlider(sliderImageEl, sliderTextEl) {
        sliderImageEl.classList.add('slider--hidden');
        sliderImageEl.classList.remove('slider__image--current');
        sliderTextEl.classList.add('slider--hidden');
        sliderTextEl.classList.remove('slider__text--current');
    }

    showSlider(sliderImageEl, sliderTextEl) {
        sliderImageEl.classList.remove('slider--hidden');
        sliderImageEl.classList.add('slider__image--current');
        sliderTextEl.classList.remove('slider--hidden');
        sliderTextEl.classList.add('slider__text--current');
    }
}
