'use strict';
function hover({ type, hoverSelector, showSelector }) {
    const eventTypes = ['mouseenter', 'mouseleave', 'click', 'touchstart', 'touchend'];
    const eventTypesNoClick = ['mouseenter', 'mouseleave', 'touchstart', 'touchend'];

    function hoverElement(event) {
        event.stopPropagation();

        if (type === 'nav') {
            if (window.innerWidth < 1024 && event.type == 'click') {
                if (!this.classList.contains(showSelector)) {
                    this.classList.add(showSelector);
                } else {
                    this.classList.remove(showSelector);
                }
            } else if (window.innerWidth > 1023 && event.type == 'mouseenter') {
                this.classList.add(showSelector);
            } else if (window.innerWidth > 1023 && event.type == 'mouseleave') {
                this.classList.remove(showSelector);
            }
        } else {
            if (window.innerWidth < 1024 && event.type == 'touchstart') {
                this.classList.add(showSelector);
            } else if (window.innerWidth < 1024 && event.type == 'touchend') {
                this.classList.remove(showSelector);
            } else if (window.innerWidth > 1023 && event.type == 'mouseenter') {

                this.classList.add(showSelector);
            } else if (window.innerWidth > 1023 && event.type == 'mouseleave') {
                this.classList.remove(showSelector);
            }
        }
    };

    if (type === 'nav') {
        eventTypes.forEach(e => {
            document.querySelectorAll(hoverSelector).forEach(i => i.addEventListener(e, hoverElement));
        });
    } else {
        eventTypesNoClick.forEach(e => {
            document.querySelectorAll(hoverSelector).forEach(i => i.addEventListener(e, hoverElement));
        });
    }
}

export { hover }; 