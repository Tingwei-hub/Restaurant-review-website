document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.container');

  const res = await axios.get('/data');
  const data = res.data.data;
  const username = res.data.user;

  // display search restaurant
  const input = document.querySelector('.search-input');
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = input.value;
      performSearch(query);
      // clears input field
      input.value = '';
    }
  });

  async function performSearch(query) {
    try {
      const res = await axios.get('/search', { params: { q: query } });
      const results = res.data;
      displayResults(results);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  }

  function displayResults(results) {
    container.innerHTML = results.map(result => `
     <div class="restaurant">
      <div class="img-sect">
        <img src="${result.img}" class="rest-img">
      </div>
      <div class="description">
        <p>${result.name}</p>
        <div class="review-stats">
          <img src="images/star.jpg" alt="" class="star-img">
          <span>4.9</span>
          <span>(76)</span>
        </div>
      </div>
      <p class="category">${result.category}</p>
      <div class="overview">
        <h1>Overview</h1>
        <p>${result.description}</p>
        <span>Opening hours: ${result.openinghours}</span>
        <button class="info-btn" data-id="${result._id}">More info</button>
      </div>
    </div>
    ` ).join('');
    const infoButtons = document.querySelectorAll('.info-btn');
    for (let infoButton of infoButtons) {
      infoButton.addEventListener('click', async (event) => {
        const restaurantId = event.target.dataset.id;
        window.location.href = `/restaurant?q=${restaurantId}`;
      });
    }
  }

  console.log(res);
  // display all restaurants
  for (let restaurant of data) {
    container.innerHTML += `
    <div class="restaurant">
      <div class="img-sect">
        <img src="${restaurant.img}" class="rest-img">
      </div>
      <div class="description">
        <p>${restaurant.name}</p>
        <div class="review-stats">
          <img src="images/star.jpg" alt="" class="star-img">
          <span>4.9</span>
          <span>(76)</span>
        </div>
      </div>
      <p class="category">${restaurant.category}</p>
      <div class="overview">
        <h1>Overview</h1>
        <p>${restaurant.description}</p>
        <span>Opening hours: ${restaurant.openinghours}</span>
        <button class="info-btn" data-id="${restaurant._id}">More info</button>
      </div>
    </div>`
    const infoButtons = document.querySelectorAll('.info-btn');
    for (let infoButton of infoButtons) {
      infoButton.addEventListener('click', async (event) => {
        const restaurantId = event.target.dataset.id;
        window.location.href = `/restaurant?q=${restaurantId}`;
      });
    }
  }
  loginLogic(username);
})

export async function loginLogic(user) {
  const loginBtn = document.querySelector('#login-btn');
  loginBtn.addEventListener('click', async () => {
    window.location.href = '/login';
  });

  const logoutBtn = document.querySelector('#logout-btn');
  logoutBtn.addEventListener('click', async () => {
    alert('Logged out');
    const res = await axios.post('/logout');
    console.log(res);
    if (res.status === 200) {
      window.location.reload();
    }
  });

  const signupBtn = document.querySelector('#signup-btn');
  signupBtn.addEventListener('click', async () => {
    window.location.href = '/signup.html';
  });

  const loginStatusRes = await axios.get('/isLoggedIn');
  const { isLoggedIn } = loginStatusRes.data;

  const accountIcon = document.querySelector('.account-icon');
  const toolTip = document.querySelector('.tooltip');

  if (isLoggedIn) {
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'inline';
    accountIcon.style.display = 'inline'
    toolTip.innerHTML = user;
  } else {
    signupBtn.style.display = 'inline-block'
    logoutBtn.style.display = 'none';
  }

  const logo = document.querySelector('#logo-div');
  logo.addEventListener('click', () => {
    window.location.href = `/`;
  });
}

