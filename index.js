addListeners();
let object;
function addListeners() {
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 1000);
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 1000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            object = animaster().heartBeating(block);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            object.stop();
        });
}

function animaster(){
    function resetFadeIn(element){
        element.classList.remove('show');
        element.classList.add('hide');
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    function resetFadeOut(element){
        element.classList.remove('hide');
        element.classList.add('show');
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    function resetMoveAndScale(element){
        element.style.transitionDuration =  null;
        element.style.transform = null;
    }

    return {
        move(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
        },

        fadeIn(element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
        },

        scale(element, duration, ratio) {
            element.style.transitionDuration =  `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
        },

        fadeOut(element, duration) {
            element.style.transitionDuration =  `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
        },

        moveAndHide(element, duration) {
            this.move(element, duration * 2/5, {x: 100, y: 20});
            this.fadeOut(element, duration * 3/5);
        },

        showAndHide(element, duration) {
            this.fadeIn(element, duration * 1/3);
            setTimeout(() => {
                this.fadeOut(element, duration * 1/3);
            }, 1/3 * duration);
        },

        heartBeating(element) {
            let intervalId = setInterval(() => {this.scale(element, 500, 1.4);
                setTimeout(() => {
                    this.scale(element, 500, 1);
                }, 500);}, 1000);
            return {
                stop(){
                    clearInterval(intervalId);
                }
            }
        },
    }
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}
