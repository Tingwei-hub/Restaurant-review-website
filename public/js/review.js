document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const params = new URLSearchParams(window.location.search);
    const restaurantId = params.get('q');
    const restaurantName = params.get('resName')

    container.innerHTML = `
    <h1 class="restaurant-name">${restaurantName}</h1>
    <div class="rating">
      <span class="star" data-value="5">&#9733;</span>
      <span class="star" data-value="4">&#9733;</span>
      <span class="star" data-value="3">&#9733;</span>
      <span class="star" data-value="2">&#9733;</span>
      <span class="star" data-value="1">&#9733;</span>
    </div>
    <textarea cols="60" rows="15" placeholder="What did you think of the food?"></textarea>
    <span class="error-msg"></span>
    <button class="review-btn">Post review</button>
    `

    const reviewBtn = document.querySelector('.review-btn');
    const textArea = document.querySelector('textarea');
    const stars = document.querySelectorAll('.star');
    const errorMsg = document.querySelector('.error-msg');
    let rating = 0;

    for (let star of stars) {
        star.addEventListener('click', () => {
            const value = star.getAttribute('data-value');
            highlightStars(value);
            rating = value;
        });
    }

    reviewBtn.addEventListener('click', async () => {
        // get time
        const date = new Date().toLocaleString('en-GB', {
            timeZone: 'Asia/Singapore',
            dateStyle: 'long', 
            timeStyle: 'short'
        });
        // get review
        const review = textArea.value;
        const ratingInt = parseInt(rating);

        // data to send to database 
        const data = {
            date,
            review,
            ratingInt,
            restaurantId
        }
        console.log(data);

        // validate review content length 
        if (review.length < 20) {
            errorMsg.textContent = 'Your review needs to be at least 20 characters.';
            errorMsg.style.display = 'block';
        } else if (!ratingInt) {
            errorMsg.textContent = 'Please select a rating!';
            errorMsg.style.display = 'block';
        } else {
            errorMsg.style.display = 'none';
            try {
                const res = await axios.post(`/reviewData`, data);
                // aft successful review, go to another page 
                alert('Review submitted!');
                window.location.href = `/`;

            }
            catch (error) {
                console.log(error.response.data);
            }
        }
    });

    function highlightStars(value) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= value) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }
});

