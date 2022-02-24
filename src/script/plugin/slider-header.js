export default class SliderHeaderPlugin {
    constructor(el) {
        // select configured element
        this.el = document.querySelector(el);

        // select slider navigation elements
        this.sliderNavPrevios = this.el.querySelector('[data-slider-controls="previous"]');
        this.sliderNavNext = this.el.querySelector('[data-slider-controls="next"]');
        this.sliderCount = this.el.querySelectorAll('[data-slider-image]').length;

        // define slider targets and numbers
        this.sliderImageTarget = 'data-slider-image';
        this.sliderTextTarget = 'data-slider-text';
        this.slider1 = '"1"';
        this.slider2 = '"2"';
        this.slider3 = '"3"';

        // select the different slider images and texts
        this.sliderImage1 = this.el.querySelector('[' + this.sliderImageTarget + '=' + this.slider1 + ']');
        this.sliderText1 = this.el.querySelector('[' + this.sliderTextTarget + '=' + this.slider1 + ']');
        this.sliderImage2 = this.el.querySelector('[' + this.sliderImageTarget + '=' + this.slider2 + ']');
        this.sliderText2 = this.el.querySelector('[' + this.sliderTextTarget + '=' + this.slider2 + ']');
        this.sliderImage3 = this.el.querySelector('[' + this.sliderImageTarget + '=' + this.slider3 + ']');
        this.sliderText3 = this.el.querySelector('[' + this.sliderTextTarget + '=' + this.slider3 + ']');

        this.registerEvents();
    }

    registerEvents() {
        this.sliderNavPrevios.addEventListener('click', () => {
            const sliderNavPrevious = 'previous';
            this.onClickSliderNav(sliderNavPrevious);
        });

        this.sliderNavNext.addEventListener('click', () => {
            const sliderNavNext = 'next';
            this.onClickSliderNav(sliderNavNext);
        });
    }

    onClickSliderNav(sliderNavEl) {
        const currentSlider = this.getCurrentSliderAttribute();
        const currentSliderAttr = Number(currentSlider);
        let newSliderAttr = 0;

        if (sliderNavEl === 'previous') {
            // select previous slider element
            if (currentSliderAttr > 1) {
                newSliderAttr = currentSliderAttr - 1;
            } else {
                newSliderAttr = this.sliderCount;
            }
        } else if (sliderNavEl === 'next') {
            // select next slider element
            if (currentSliderAttr < this.sliderCount) {
                newSliderAttr = currentSliderAttr + 1;
            } else {
                newSliderAttr = 1;
            }
        }

        const currentSliderImage = this.el.querySelector('[' + this.sliderImageTarget + '="' + currentSliderAttr + '"]');
        const currentSliderText = this.el.querySelector('[' + this.sliderTextTarget + '="' + currentSliderAttr + '"]');
        const nextSliderImage = this.el.querySelector('[' + this.sliderImageTarget + '="' + newSliderAttr + '"]');
        const nextSliderText = this.el.querySelector('[' + this.sliderTextTarget + '="' + newSliderAttr + '"]');

        this.hideSlider(currentSliderImage, currentSliderText);
        this.showSlider(nextSliderImage, nextSliderText);
    }

    getCurrentSliderAttribute() {
        const currentSliderAttr = this.el.querySelector('.slider__image--current').getAttribute('data-slider-image');
        return currentSliderAttr;
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
