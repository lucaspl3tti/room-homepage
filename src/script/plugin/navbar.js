export default class NavbarPlugin {
    constructor(el) {
        this.el = document.querySelector(el);

        this.registerEvents();
    }

    registerEvents() {
        this.checkIfScrolled();
    }

    checkIfScrolled() {
        window.onscroll = () => {
            if (document.body.scrollTop >= 280 || document.documentElement.scrollTop >= 280) {
                this.el.classList.add('navbar--scrolled');
                this.el.classList.add('navbar-light');
                this.el.classList.remove('navbar-dark');
                return
            }

            this.el.classList.remove('navbar--scrolled');
            this.el.classList.remove('navbar-light');
            this.el.classList.add('navbar-dark');
        };
    }
}
