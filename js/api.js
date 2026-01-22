const carddata = document.getElementById('card-data');  
const buttons = document.querySelectorAll(".filters button");
const url = './data.json';
let extensionsData = [];
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data); // full JSON output
 extensionsData = data;
    renderExtensions("all");
    
 })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });
function renderExtensions(filter) {
  carddata.innerHTML = "";

  const filteredData = extensionsData.filter(item => {
    if (filter === "active") return item.isActive;
    if (filter === "inactive") return !item.isActive;
    return true; // all
  });

  filteredData.forEach(item => {
    carddata.innerHTML += `
        <article class="card">
      <div class="card-header">
        <div class="icon pink"><img src="${item.logo}" alt="icon" class="card__icon" /></div>
        <div class="content">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
      </div>

      <div class="card-footer">
        <button class="remove">Remove</button>
        <label class="switch">
          <input type="checkbox" id="toggle" ${item.isActive ? "checked" : ""}>
          <span></span>
        </label>
      </div>
    </article>
      `;
  });
}

   // Button click handling
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    renderExtensions(btn.dataset.filter);
  });
});
