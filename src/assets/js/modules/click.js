function click({ elementClass, action, options }) {
    const elements = document.querySelectorAll(elementClass);
    elements.forEach(elem => {
        elem.addEventListener('click', () => action(elem, options));
    });

}

export { click };