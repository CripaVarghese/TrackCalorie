 
// Storage Controller
const StorageCtrl = (function(){
    // Public methods
    return {
      storeItem: function(item){
        let items;
        // Check if any items in ls
        if(localStorage.getItem('items') === null){
          items = [];
          // Push new item
          items.push(item);
          // Set ls
          localStorage.setItem('items', JSON.stringify(items));
        } else {
          // Get what is already in ls
          items = JSON.parse(localStorage.getItem('items'));
  
          // Push new item
          items.push(item);
  
          // Re set ls
          localStorage.setItem('items', JSON.stringify(items));
        }
      },
      getItemsFromStorage: function(){
        let items;
        if(localStorage.getItem('items') === null){
          items = [];
        } else {
          items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
      },
      updateItemStore:function(UpdatedItem){
        let items=JSON.parse(localStorage.getItem('items'));

        items.forEach(function(item, index){
          if(UpdatedItem.id === item.id){
            items.splice(index, 1, UpdatedItem);
      }
  });
      localStorage.setItem('items', JSON.stringify(items));
      },
      deleteItemFromLocalS: function(id){
        let items=JSON.parse(localStorage.getItem('items'));

        items.forEach(function(item, index){
          if(id === item.id){
            items.splice(index, 1);
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
},
clearItemsFromStorage: function(){
  localStorage.removeItem('items');
}
    }
  })();
  
  
      

// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
      this.id = id;
      this.name = name;
      this.calories = calories;
    }
  
// Data Structure / State
    const data = {
    //   items: [
    // // {id: 0, name: 'Steak Dinner', calories: 500},
    // // {id: 1, name: 'Cookie', calories: 700},
    // // {id: 2, name: 'Eggs', calories: 800}
    //    ],
    items: StorageCtrl.getItemsFromStorage(),
      currentItem: null,
      totalCalories: 0
    }  
    // Public methods
    return {
      getItems: function(){
        return data.items;
      },

      addItem: function(name, calories){
        console.log(name,calories);
        let ID;
        // Create ID
        if(data.items.length > 0){
          ID = data.items[data.items.length - 1].id + 1;
        } 
        else {
          ID = 0;
        }
  
        // Calories to number
        calories = parseInt(calories);
  
        // Create new item
        newItem = new Item(ID, name, calories);
  
        // Add to items array
        data.items.push(newItem);
  
        return newItem;
    },
      
      getItembyId:function(id){
        let found =null; // temporary variable

        // loop through items
        data.items.forEach(function(item){
          if(item.id===id){
            found=item;
          }
        });
        return found;
    },
      updateItem:function(name,calories){
          //calories to number
          calories=parseInt(calories);
          let found='null';

          data.items.forEach(function(item){
            if(item.id===data.currentItem.id){
                item.name=name;
                item.calories=calories;
                found=item;
            }
          });
          return found;
      },

      deleteItem: function(id){
        // Get ids
        const ids = data.items.map(function(item){
          return item.id;
        });
  
        // Get index
        const index = ids.indexOf(id);
  
        // Remove item
        data.items.splice(index, 1);
    },  
    
    clearAllItems:function(){
      data.items=[];
    },
      setcrrntItem:function(item){
        data.currentItem=item;
    },

      getcrrentItem:function(){
        return data.currentItem;
    },

      getTotalCal:function(){
        let total=0;
                 
      // Loop through items and add calories
      data.items.forEach(function(item){
        total += item.calories;
      });

      // Set total calories in data structure
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },

      Data1: function(){
        return data;
    }

  }

})();
  
  
  
  // UI Controller
    const UICtrl = (function(){
    const UISelectors = {
      itemList: '#item-list',
      ListItems: '#item-list li',
      AddBtn: '.add-btn',
      UpdateBtn: '.update-btn',   
      DeleteBtn: '.delete-btn',
      BackBtn: '.back-btn',
      ClearBtn: '.clear-btn',
      itemNameInput: '#meal',
      itemCaloriesInput: '#calories',
      totalCalories:'.tot-cal'
      }
    
    // Public methods
    return {
      populateItemList: function(items){
        let html = '';
  
        items.forEach(function(item){
          html += `<li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`;
        });
  
        // Insert list items
        document.querySelector(UISelectors.itemList).innerHTML = html;
      },

      getItemInput: function(){
        return {
          name:document.querySelector(UISelectors.itemNameInput).value,
          calories:document.querySelector(UISelectors.itemCaloriesInput).value
        }
      },
      
      addListItem:function(item){
        // show the list
        document.querySelector(UISelectors.itemList).style.display='block';
        // create li element
        const li=document.createElement('li');
        // add class
        li.className='collection-item';
        // add id
        li.id=`item-${item.id}`;
        // add HTML
        li.innerHTML=`<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        // insert item
        document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
      },

      UpdateListItem:function(item){
        let ListItems=document.querySelectorAll(UISelectors.ListItems);

        // turn NodeList into array
        ListItems=Array.from(ListItems);
        ListItems.forEach(function(ListItem){
          const itemId=ListItem.getAttribute('id');
          if(itemId===`item-${item.id}`){
            document.querySelector(`#${itemId}`).innerHTML= `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;
  
          }
        });

      },

      deleteListItem: function(id){
        const itemID = `#item-${id}`;
        const item = document.querySelector(itemID);
        item.remove();
      },
      
      clearInput:function(){
        document.querySelector(UISelectors.itemNameInput).value='';
        document.querySelector(UISelectors.itemCaloriesInput).value='';
      },

      AddItemtoForm:function(){
        document.querySelector(UISelectors.itemNameInput).value=ItemCtrl.getcrrentItem().name;
        document.querySelector(UISelectors.itemCaloriesInput).value=ItemCtrl.getcrrentItem().calories;
        UICtrl.ShowEditState();
      },

      removeItems: function(){
        let ListItems = document.querySelectorAll(UISelectors.ListItems);
  
        // Turn Node list into array
        ListItems = Array.from(ListItems);
  
        ListItems.forEach(function(item){
          item.remove();
        });
      },

      hideList:function(){
        document.querySelector(UISelectors.itemList).style.display='none';
    },

      showTotalCalories:function(totalCalories){
        document.querySelector(UISelectors.totalCalories).textContent=totalCalories;
    },

      clearEditState:function(){
        UICtrl.clearInput();        
        document.querySelector(UISelectors.AddBtn).style.display='inline';        
        document.querySelector(UISelectors.UpdateBtn).style.display='none';
        document.querySelector(UISelectors.DeleteBtn).style.display='none';
        document.querySelector(UISelectors.BackBtn).style.display='none';

    },

      ShowEditState:function(){
        document.querySelector(UISelectors.AddBtn).style.display='none';        
        document.querySelector(UISelectors.UpdateBtn).style.display='inline';
        document.querySelector(UISelectors.DeleteBtn).style.display='inline';
        document.querySelector(UISelectors.BackBtn).style.display='inline';
    },

      getSelectors: function(){
        return UISelectors;
    }
  }
})();
  
  
  
// App Controller
    const appCntrl = (function(ItemCtrl, StorageCtrl, UICtrl){
    console.log(ItemCtrl.Data1());
    // Load event listeners
    const LoadEventL = function(){
      // Get UI selectors
      const UISelectors = UICtrl.getSelectors();
  
      // Add item event
      document.querySelector(UISelectors.AddBtn).addEventListener('click', addSubmit);

      // disable submit on enter
       document.addEventListener('keypress',function(e){
           if(e.keycode===13 || e.which===13){
               e.preventDefault();
               return false;
           }
       });

        // edit icon click event
      document.querySelector(UISelectors.itemList).addEventListener('click', editClick);

      // update item event
      document.querySelector(UISelectors.UpdateBtn).addEventListener('click', updateSubmit);

      // delete item event
      document.querySelector(UISelectors.DeleteBtn).addEventListener('click', deleteSubmit);

       // Back button event
     document.querySelector(UISelectors.BackBtn).addEventListener('click', UICtrl.clearEditState);
     
     // clear item event
      document.querySelector(UISelectors.ClearBtn).addEventListener('click', clearAllItemsClick);
    }
  
      // Add item submit
      const addSubmit = function(e){
      console.log('ADD');
      // Get form input from UI Controller
      const input = UICtrl.getItemInput();
      console.log(input);
  
      // Check for name and calorie input
      if(input.name !== '' && input.calories !== ''){
      console.log(123);

      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to to UI list
      UICtrl.addListItem(newItem);

      // get total calories
      const totalCalories=ItemCtrl.getTotalCal();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Storage in localstorage
      StorageCtrl.storeItem(newItem);

      // clear fields
      UICtrl.clearInput();
      }
  
      e.preventDefault();
    }
    
    // click edit item
    const editClick=function(e){
      if(e.target.classList.contains('edit-item')){
      console.log('Ok');

      // Get list item id (item-0, item-1)
      const listtheId = e.target.parentNode.parentNode.id;
      console.log(listtheId);

      // break into the array
      const IdArray=listtheId.split('-');
      console.log(IdArray);

      // get the actual id
      const id=parseInt(IdArray[1]);
      console.log(id);

      // get item
      const itemtoEdit=ItemCtrl.getItembyId(id);
        console.log(itemtoEdit);

      // set current item
      ItemCtrl.setcrrntItem(itemtoEdit);

      // add item to form
      UICtrl.AddItemtoForm();
    }

    e.preventDefault();
  }

    const updateSubmit=function(e){
        console.log('Update');

        // get item input
        const UpdInput=UICtrl.getItemInput();

        // update item
        const UpdatedItem=ItemCtrl.updateItem(UpdInput.name,UpdInput.calories);

        // update UI
        UICtrl.UpdateListItem(UpdatedItem);

        // get total calories
        const totalCalories=ItemCtrl.getTotalCal();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // update local storage
        StorageCtrl.updateItemStore(UpdatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    const deleteSubmit=function(e){
      console.log('delete');
      
      // get current item
      const currentItem=ItemCtrl.getcrrentItem();

      // delete from data structure
      ItemCtrl.deleteItem(currentItem.id);

      // delete from UI
      UICtrl.deleteListItem(currentItem.id);

      // get total calories
      const totalCalories=ItemCtrl.getTotalCal();

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // delete from local storage
      StorageCtrl.deleteItemFromLocalS(currentItem.id);

      UICtrl.clearEditState();


      e.preventDefault();
    }

    // Clear items event
    const clearAllItemsClick = function(){
    // Delete all items from data structure
    ItemCtrl.clearAllItems();

    // get total calories
    const totalCalories=ItemCtrl.getTotalCal();

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // remove from UI
       UICtrl.removeItems(); 

    // clear from LS
        StorageCtrl.clearItemsFromStorage();
    // hide UL
    UICtrl.hideList();
  }

    // Public methods
    return {
      init: function(){          
        console.log('Initializing App...');

        // clear edit state / set initial set
        UICtrl.clearEditState();
        // Fetch items from data structure
        const items = ItemCtrl.getItems();

        // check if any item
        if(items.length===0){
            UICtrl.hideList();
        }
        else{
              // Populate list with items
        UICtrl.populateItemList(items);
        }

        // get total calories
        const totalCalories=ItemCtrl.getTotalCal();

        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
   
       
        // Load event listeners
        LoadEventL();
      }
    }
})(ItemCtrl, StorageCtrl, UICtrl);
  
// Initialize App
appCntrl.init();