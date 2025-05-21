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
    let pointerX = `calc(${event.clientX}px - 12px)`,
        pointerY = `calc(${event.clientY}px - 12px)`;

    const pointer_keyframes = {
        transform: `translate(${pointerX}, ${pointerY})`
    };

    pointer.animate(pointer_keyframes, {
        duration: 50,
        fill: 'forwards'
    })

    // pointer.style.transform = `translate(${pointerX}, ${pointerY})`;
}

const animateCursor = (event, interacting, interactable) => {
    let cursorX = `calc(${event.clientX}px - 12px)`,
        cursorY = `calc(${event.clientY}px - 12px)`;
  
    const dimensions = interacting ? interactable.getBoundingClientRect() : null;

    if (interacting) {
        cursorX = (dimensions.x) + 'px';
        cursorY = (dimensions.y) + 'px';
    };

    const cursor_keyframes = {
        transform: `translate(${cursorX}, ${cursorY})`,
        width: interacting ? `${dimensions.width}px` : '24px',
        height: interacting ? `${dimensions.height}px` : '24px',
    };
    
    cursor.animate(cursor_keyframes, { 
        duration: 100,
        fill: 'forwards'
    });
};

const handlePointerMove = throttle((event) => {
    animatePointer(event);
}, 1);

const handleCursorMove = throttle((event) => {
    const interactable = event.target.closest('[data-interactable]'),
          interacting = (interactable !== null);

    animateCursor(event, interacting, interactable);
}, 10);

document.addEventListener('mousemove', (event) => {
    handlePointerMove(event);
    handleCursorMove(event);
});