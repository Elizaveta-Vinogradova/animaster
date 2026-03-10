addListeners();

let object;
let objectMoveAndHide;
let fadeInResetter = null;
let fadeOutResetter = null;
let scaleResetter1 = null;
let scaleResetter2 = null;


function addListeners() {
    const animator = animaster();

    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            fadeInResetter = animator.fadeIn(block, 5000);
        });

    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            if (fadeInResetter) {
                fadeInResetter();
            }
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            fadeOutResetter = animator.fadeOut(block, 5000);
        });

    document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            if (fadeOutResetter) {
                fadeOutResetter();
            }
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            scaleResetter1 = animator.move(block, 1000, { x: 100, y: 10 });
        });

    document.getElementById('moveAndScaleReset1')
        .addEventListener('click', function () {
            if (scaleResetter1) {
                scaleResetter1();
            }
        });

    document.getElementById('moveAndScaleReset2')
        .addEventListener('click', function () {
            if (scaleResetter2) {
                scaleResetter2();
            }
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            scaleResetter2 = animator.scale(block, 1000, 1.25);
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            objectMoveAndHide = animator.moveAndHide(block, 1000);
        });

    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            if (objectMoveAndHide)
            {
                objectMoveAndHide.reset();
            }
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animator.showAndHide(block, 1000);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            object = animator.heartBeating(block);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            if (object) {
                object.stop();
            }
        });
}

function animaster() {
    function resetFadeIn(element) {
        element.classList.remove('show');
        element.classList.add('hide');
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    function resetFadeOut(element) {
        element.classList.remove('hide');
        element.classList.add('show');
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    function resetMoveAndScale(element) {
        element.style.transitionDuration = null;
        element.style.transform = null;
    }

    return {
        move(element, duration, translation) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);

            return function () {
                resetMoveAndScale(element);
            };
        },

        fadeIn(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');

            return function () {
                resetFadeIn(element);
            };
        },

        scale(element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);

            return function () {
                resetMoveAndScale(element);
            };
        },

        fadeOut(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');

            return function () {
                resetFadeOut(element);
            };
        },

        moveAndHide(element, duration) {
            this.move(element, duration * 2 / 5, { x: 100, y: 20 });
            this.fadeOut(element, duration * 3 / 5);

            return {
                reset(){
                    resetFadeOut(element);
                    resetMoveAndScale(element);
                }
            }
        },

        showAndHide(element, duration) {
            this.fadeIn(element, duration / 3);
            setTimeout(() => {
                this.fadeOut(element, duration / 3);
            }, duration / 3);
        },

        heartBeating(element) {
            let intervalId = setInterval(() => {
                this.scale(element, 500, 1.4);
                setTimeout(() => {
                    this.scale(element, 500, 1);
                }, 500);
            }, 1000);

            return {
                stop() {
                    clearInterval(intervalId);
                }
            };
        },
    };
}

function getTransform(translation, ratio) {
    const result = [];

    if (translation) {
        result.push(`translate(${translation.x}px, ${translation.y}px)`);
    }

    if (ratio) {
        result.push(`scale(${ratio})`);
    }

    return result.join(' ');
}