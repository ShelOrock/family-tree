const canvas = document.querySelector('#canvas');
const form = document.querySelector('form');
const name = document.querySelector('.name-input');
const age = document.querySelector('.age-input');
const button = document.querySelector('button');

const data = [];

const invisibleAncestors = new FamilyTree('invisibleAncestors')

form.addEventListener('click', ev => {
    ev.preventDefault();
    if(ev.target === button) {
        data.push({
            generation: 1,
            name: name.value,
            age: age.value,
            selected: false,
        });
        invisibleAncestors.insert(name.value)
        paint();
        resetValues();
    }
});

const resetValues = () => {
    name.value = '';
    age.value = '';
}

const paint = () => {

    const html = data.map(item => {
        return `
            <div class='member-container${item.selected ? ' selected' : ''}'>
                <div class='member-name-container'>
                    <p class='member-name'>${item.name}</p>
                </div>
                <div class='member-age-container'>
                    <p class='member-age'>${item.age}</p>
                </div>
            </div>
        `}).join('');

    canvas.innerHTML = html;
}

canvas.addEventListener('click', ev => {
    ev.preventDefault();
    if(ev.target.classList.contains('member-name')) {
        data.forEach(item => {
            item.selected = false;
            if(item.name === ev.target.innerHTML) {
                item.selected = true;
                invisibleAncestors.findMember(item.name);
                paint();
            }
        });
    }
})