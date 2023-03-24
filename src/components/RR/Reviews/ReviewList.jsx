import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from './Review';
import AddReview from './AddReviews/AddReview';

function ReviewList({ prodID, reviewsMeta, totalReviews }) {
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(2);
  const [sort, setSort] = useState('Relevant');

  const makeGetRequest = (newCount, newSort) => {
    const countToDisplay = newCount || count;
    const sortToSearch = newSort || sort;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=${prodID}&count=${totalReviews}&sort=${sortToSearch}`, {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
    })
      .then((response) => {
        setReviews(response.data.results.slice(0, countToDisplay));
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    makeGetRequest();
  }, []);

  const dropdown = () => (
    <select
      className="underline"
      value={sort}
      onChange={(e) => {
        setSort(e.target.value);
        setCount(2);
        makeGetRequest(2, e.target.value);
      }}
    >
      <option value="relevant">relevance</option>
      <option value="helpful">helpfulness</option>
      <option value="newest">newest</option>
    </select>
  );

  return reviews.length ? (
    <div className="ml-4">
      <div className="flex mb-4">
        <div className="mr-1">
          {totalReviews}
          {' reviews, sorted by'}
        </div>
        {dropdown()}
      </div>
      {reviews.map((review) => (
        <Review
          key={review.review_id}
          review={review}
          makeGetRequest={makeGetRequest}
        />
      ))}
      <div className="flex flex-row">
        {totalReviews > 2 ? (
          <button
            onClick={() => {
              setCount(count + 2);
              makeGetRequest(count + 2);
            }}
            className="text-black border-2 border-black font-bold py-4 px-4 mr-2 rounded"
            type="button"
          >
            MORE REVIEWS
          </button>
        ) : null}
        <AddReview reviewsMeta={reviewsMeta} />
      </div>
    </div>
  ) : (
    <div className="p-4">
      <h3 className="font-bold my-4 text-xl">There are currently no reviews, use the button to add one!</h3>
      <AddReview reviewsMeta={reviewsMeta} />
    </div>
  );
}

export default ReviewList;
