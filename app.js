const cursor = document.getElementById('cursor');
const pointer = document.getElementById('pointer');

const average = (n1, n2) => {
    return (n1 * 2 + n2 * 2) / 2;
}

const throttle = (callback, delay) => {
    let timerFlag = null;

    return (...args) => {
        if (timerFlag === null) {
            callback(...args);
            timerFlag = setTimeout(() => {
                timerFlag = null;
            }, delay);
        }
    };
}

const animatePointer = (event) => {
    let pointerX = `calc(${event.clientX}px - 16px)`,
        pointerY = `calc(${event.clientY}px - 16px)`;

    pointer.style.transform = `translate(${pointerX}, ${pointerY})`;
}

const animateCursor = (event, interacting, interactable) => {
    let cursorX = `calc(${event.clientX}px - 16px)`,
        cursorY = `calc(${event.clientY}px - 16px)`;
  
    const dimensions = interacting ? interactable.getBoundingClientRect() : null;

    let speed = dimensions ? average(dimensions.width, dimensions.height) : 200;

    if (interacting) {
        cursorX = (dimensions.x) + 'px';
        cursorY = (dimensions.y) + 'px';
    };

    const cursor_keyframes = {
        transform: `translate(${cursorX}, ${cursorY})`,
        width: interacting ? `${dimensions.width}px` : '2rem',
        height: interacting ? `${dimensions.height}px` : '2rem',
    };
    
    cursor.animate(cursor_keyframes, { 
        duration: speed, 
        fill: 'forwards' 
    });
};

const handlePointerMove = throttle((event) => {
    animatePointer(event);
}, 1);

const handleCursorMove = throttle((event) => {
    const interactable = event.target.closest('[data-interactable]');
    const interacting = (interactable !== null);

    animateCursor(event, interacting, interactable);
}, 10);

document.addEventListener('mousemove', (event) => {
    handlePointerMove(event);
    handleCursorMove(event);
});