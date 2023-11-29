const $cerrarSesion = document.querySelector('.close-session');
const $openLeftPanel = document.getElementById('open-left-panel');
const $openLeftPanelImg = document.getElementById('open-left-panel-img');
const $left = document.querySelector('.left');
const $right = document.querySelector('.right');

// Cambiar opción (panel izquierdo)
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', e => {
        const target = e.target;
        document.querySelector('.selected-option').classList.remove('selected-option');
        document.querySelector('.right > section:not(.hide)').classList.add('hide');
        target.classList.add('selected-option');
        document.getElementById(target.id.substring(3)).classList.remove('hide');
    })
})

// Vista móvil
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        $left.classList.remove('show');
        $right.classList.remove('hide');
    }
})

$openLeftPanel.addEventListener('click', e => {
    const target = e.target;
    if (target.getAttribute('value') == '1') {
        target.setAttribute('value', '0');
        $openLeftPanelImg.classList.remove('rotate-180deg');
        $left.classList.add('close-left-panel');
        $left.addEventListener('animationend', function listener() {
            $right.classList.remove('hide');
            $left.classList.remove('show-left-panel');
            $left.classList.remove('close-left-panel');
            $left.removeEventListener('animationend', listener);
        })
    } else {
        target.setAttribute('value', '1');
        $openLeftPanelImg.classList.add('rotate-180deg');
        $right.classList.add('hide');
        $left.classList.add('show-left-panel');
    }
})
// Fin Vista Móvil

$cerrarSesion.addEventListener('click', () => {
    fetch('/api/controllers/close-session.php', {
        method: 'GET'
    })
    .then(response => {
        window.location.href = '/';
    })
})