// id - индекс элемента на html странице, а file - Откуда загружаем
function loadComponent(id, file){
    fetch(file)
    // тут приходят только заголовки, а не готовый текст
    .then(response => response.text()) 
    .then(html => {
        // помещаем элемент html который получили из file
        document.getElementById(id).innerHTML = html;
    });
}
    // подписка на событие
    document.addEventListener('DOMContentLoaded', () => {
        loadComponent('header-placeholder', 'components/header.html');
        loadComponent('footer-placeholder', 'components/footer.html');
    });
