const sectioncenter = document.querySelector(".section-item");
//  display the menu element when content is done loading

var btnConatainer = document.querySelector('.btn-container')

window.addEventListener('DOMContentLoaded',function () {
//    getting data from the json external file
    async function getJsonData(file){
        let promise1 = await fetch(file);
        let recieved = await promise1.json()
        
        getuniqueCatigories(recieved)
       
    }
    getJsonData("data.json")
   

})


 // to get unique categories
 function getuniqueCatigories(unique){
     const uniqueitemsArray = unique.reduce(
         function (value, items){
             if(!value.includes(items.category)){
                 value.push(items.category)
             }
             return value

         },["all"]
     )
    //  looping through the buttons text
   const creatButtons = uniqueitemsArray.map((newItems=>{
            
            return `<button class="filter-btn" type="button" data-id="${newItems}">${newItems}</button>`
   })).join('')
   btnConatainer.innerHTML = creatButtons
   const filter_Btn = document.querySelectorAll(".filter-btn")
//    iterate over the button element and add event listerners to them
   filter_Btn.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{

        const category = e.currentTarget.dataset.id;
        // this function when called filters the main array and return a new array of fewer values
        const menuCategory = unique.filter((menuItem)=>{
            if(category===menuItem.category){
                return menuItem;
            }
        })
        // for displaying all
        if(category==="all"){
            displayMenu(unique)
        }else{
            displayMenu(menuCategory)
        }
        
    })
})
 }
// filter item in the array before you load it






function displayMenu(values){
    let diplay = values.map((item)=>{
        return `
            <article class="menu-item">
                <img src="${item.img}" class="photo" alt="${item.title}">
                <div class="menu-info">
                    <header>
                        <h4>${item.title}</h4>
                        <h4 class="price">${item.price}</h4>
                    </header>
                    <p class="item-text">${item.desc}</p>
                </div>
            </article>
            ` 
    }).join('')
    sectioncenter.innerHTML = diplay
    }
    