// status.js

export const markAsCompleted = (item) => {
    item.completed = true;
  };
  
  export const markAsIncomplete = (item) => {
    item.completed = false;
  };
  
  export const filterCompleted = (items) => {
    return items.filter((item) => !item.completed);
  };
  

  
  