import { loginLogic } from "./homepage.js";

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.container');
  const params = new URLSearchParams(window.location.search);
  const restaurantId = params.get('q');
  try {
    const res = await axios.get(`/restaurantData/${restaurantId}`);
    const restaurantData = res.data.restaurant[0]; 
    const reviews = res.data.reviews;
    console.log(res);
    const loggedInUser = res.data.username;
    loginLogic(loggedInUser);

    let totalRating = 0;
    for (let review of reviews) {
      totalRating += review.rating;
    }

    const reviewQuantity = reviews.length;
    const averageRating = totalRating / reviewQuantity;

    // Create HTML structure for restaurant details
    container.innerHTML = `
       <div class="info">
      <div>
        <a href="${restaurantData.website}"> 
          <img src="${restaurantData.img}" class="rest-img">
        </a>
        <button class="review-btn">Write a review</button>
      </div>
      <div class="location-info">
        <h2>${restaurantData.name}</h2>
        <span class="address">${restaurantData.address}</span>
        <span class="rating-info">${averageRating.toFixed(1)} Stars (${reviewQuantity} review) </span>
        <div class="business">
          <span class="about-business">About the business</span>
          <span class="description">${restaurantData.description}</span>
        </div>
      </div>
    </div>

    <div class="reviews">
      <p>What others are saying</p>
      <div class="review-container">
      ${reviews.map(review => `
        <div class="review">
         <div class="top-container"> 
            <div class="top">
              <span class="username">${review.username}</span>
              <div class="rating">
                <span>${review.rating} Stars</span>
                <span>${review.datePosted}</span>
              </div>
            </div>
            <div class="icons" style="display: ${review.username === loggedInUser ? 'block' : 'none'}">
              <span class="material-symbols-outlined edit-icon">
                edit_square
                <div class="tooltip" style="color: white;">Edit</div>
              </span>
              <span class="material-symbols-outlined delete-icon">
                delete
                <div class="tooltip" style="color: white;">Delete</div>
              </span>
            </div>
          </div>
          <span class="review-text">${review.review}</span>
        </div>
      `).join('')}
      </div>
    </div>
      `;
    // remove this feature if not logged in
    const reviewBtn = document.querySelector('.review-btn');
    reviewBtn.addEventListener('click', async () => {
      try {
        const res = await axios.get(`/review?q=${restaurantId}&resName=${restaurantData.name}`);
        console.log('review res', res);
        window.location.href = `/review?q=${restaurantId}&resName=${restaurantData.name}`;
      }
      catch (error) {
        alert('You must be signed in first before writing a review!')
        console.log(error);
      }
    });

    const editBtns = document.querySelectorAll('.edit-icon');
    const deleteBtns = document.querySelectorAll('.delete-icon');

    for (let i = 0; i < editBtns.length; i++) {
      deleteBtns[i].addEventListener('click', async () => {
        console.log(reviews[i]);
        const reviewId = reviews[i]._id;
        const res = await axios.get('/deleteReview', { params: { reviewId } });
        if (res.status === 200) {
          alert('Review deleted!')
          window.location.href = '/';
        }
      });

      editBtns[i].addEventListener('click', async () => {
        const reviewId = reviews[i]._id;
        window.location.href = `goEditReview?id=${reviewId}`;
      });
    }
    
    const data = {
      averageRating,
      reviewQuantity
    }
    try {
      const res2 = await axios.get('/data', { params: data });
    } catch (error) {
      console.log(error);
    }
  }
  catch (error) {
    console.error('Error fetching restaurant data:', error);
    container.innerHTML = '<p>Error loading restaurant page. Please try again.</p>';
  }

});

