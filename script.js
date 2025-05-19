document.addEventListener('DOMContentLoaded', () => {
   
    // access all element
    const expenceName = document.querySelector('#expence-name');
    const expenceAmount = document.querySelector('#expence-amount');
    const addExpenceBtn = document.querySelector('button');
    const expenceList = document.querySelector('ul');
    const totalExpence = document.querySelector('h4');

    const expenceItems = [];

    let total;
   
    addExpenceBtn.addEventListener('click' , () => {
        const expenceNameValue = expenceName.value.trim();
        const expenceAmountValue = expenceAmount.value.trim();

        // push data to array
        if(expenceAmountValue > 0 && expenceNameValue != '' && !isNaN(expenceAmountValue)) {
            expenceItems.push({
                id : (Date.now() + 1) % 10,
                name : expenceNameValue,
                amount : expenceAmountValue
            })         

            // push data to localStorage
            localStorage.setItem('expenceItems' , JSON.stringify(expenceItems))
            getExpenceItems(); 
            total = addTotalAmount();
            displayTotal()
                  

            // clear input ----
            expenceAmount.value = '';
            expenceName.value = ''; 
        }else {
            return;
        }
    })    

    // get Items to localStorage and display ---
    const getExpenceItems = () => {
        const getItems = JSON.parse(localStorage.getItem('expenceItems'))
        
        const createList = document.createElement('li')
        createList.innerHTML = `<li class="my-3 bg-black">
                                    <div class="flex  py-2 h-12 ">
                                        <div class="flex w-full">
                                        <h4 class="mx-2">${getItems[getItems.length - 1].name} -</h4>
                                        <h4>$ ${getItems[getItems.length - 1].amount}</h4>
                                        </div>
                                        <button itemId="${getItems[getItems.length - 1].id}" class="bg-red-500 h-7 hover:bg-red-700 text-white font-bold px-4 mx-2 rounded">Delete</button>
                                    </div>
                                </li>`

        expenceList.appendChild(createList)  
        deleteListItem(createList , getItems)
    }

    //display totel
    function displayTotal() {
        total = addTotalAmount();
        totalExpence.innerHTML = `Total Expence : $ ${total}`
    }

    // delete list item ----
    const deleteListItem = (createList , getItems) => {
        createList.addEventListener('click' , (e) => {
            if(e.target.tagName === 'BUTTON') {
                createList.remove()
                if(total > 0) {                    
                    total -= parseInt(getItems[getItems.length - 1].amount)
                    totalExpence.innerHTML = `Total Expence : $ ${total}`
                } 
            };
        });
    };

    function addTotalAmount() {        
        return expenceItems.reduce((sum , expence) =>  sum + parseInt(expence.amount) , 0)     
    }     
});
