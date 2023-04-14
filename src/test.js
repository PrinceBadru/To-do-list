function addItem(item) {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    const li = document.createElement('li');
    li.textContent = item;
    document.querySelector('ul').appendChild(li);
  }
  
  function deleteItem(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter((i) => i !== item);
    localStorage.setItem('items', JSON.stringify(items));
    const li = document.querySelector(`li:contains(${item})`);
    li.parentNode.removeChild(li);
  }
  