const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user')
const doubleMoneyBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calcualteWealthBtn = document.getElementById('calculate-wealth')

getRandomUser();
getRandomUser();
getRandomUser();

let data = [];
//fetch user and money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    const user = data.results[0];
	
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };
    
	addData(newUser);
    
}
function addData(obj){
    data.push(obj);
    updateDOM();

}

function updateDOM(providedData = data) {
    // clear main
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2 >' ;
    providedData.forEach((item) => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element)
    });
}

//double money
function doubleMoney() {
    data = data.map((user) => {
        return {
            ...user,
            money: user.money * 2
        }

    })
    updateDOM();
}

//millionaires
function showMillionaires() {
    data = data.filter((user) => user.money > 1000000)
    updateDOM();
}

//sort
function sortByRichest() {
    data = data.sort((a, b) => b.money - a.money);
    updateDOM();
}

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth :<strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

//format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//add event listener
addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calcualteWealthBtn.addEventListener('click', calculateWealth);

