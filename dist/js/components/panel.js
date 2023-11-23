const $irEnfermo = document.getElementById('ir-enfermo');
const $irCompania = document.getElementById('ir-compania');
const $irMedicamento = document.getElementById('ir-medicamento');
const $irConsulta = document.getElementById('ir-consulta');
const $cerrarSesion = document.querySelector('.close-session');

const $sectionEnfermo = document.getElementById('enfermo');
const $sectionCompania = document.getElementById('compania');
const $sectionMedicamento = document.getElementById('medicamento');

// Options
$irEnfermo.addEventListener('click', changePanelOption);
$irCompania.addEventListener('click', changePanelOption);
$irMedicamento.addEventListener('click', changePanelOption);
$irConsulta.addEventListener('click', changePanelOption);

$cerrarSesion.addEventListener('click', () => {
    fetch('/api/controllers/close-session.php', {
        method: 'GET'
    })
    .then(response => {
        window.location.href = '/';
    })
})

function changePanelOption(e) {
    const target = e.target;
    document.querySelector('.selected-option').classList.remove('selected-option');
    document.querySelector('.right > section:not(.hide)').classList.add('hide');
    target.classList.add('selected-option');
    document.getElementById(target.id.substring(3)).classList.remove('hide');
}