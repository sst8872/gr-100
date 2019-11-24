function scrollBar(data, fn) {
    const div = document.createElement('div');
    const toolTip = document.createElement('div');
    toolTip.classList.add('tooltip');
    div.classList.add('scrollmenu');
    data.forEach((item, index, array) => {
        const menu = document.createElement('a');
        menu.dataset.index = index;
        menu.classList.add('scrollmenu-item');
        menu.setAttribute('href', '#');
        menu.innerHTML = `${ item.term }`;
        menu.addEventListener('click', function (e) {
            let select = parseInt(menu.dataset.index) + 1;
            fn(select);
        }, false);

        menu.addEventListener('mouseenter', function (e) {
            console.log('mouseover');
            toolTip.style.display = 'block';
            toolTip.textContent = parseInt(e.target.dataset.index) + 1;
            toolTip.style.top = e.clientY + 5 + "px";
            toolTip.style.left = e.clientX + 4 + "px";
        });
        menu.addEventListener('mouseleave', function (e) {
            toolTip.style.display = "none";
        });
        div.appendChild(menu);
    });
    div.appendChild(toolTip);
    document.body.insertBefore(div, document.body.firstElementChild);
}

export default scrollBar;



