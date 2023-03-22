import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QListEntry from './QListEntry';
import QModal from '../Modals/QModal';

function QList({ prodId }) {
  const [listOfQs, setListOfQs] = useState([]);
  const [openQModal, setOpenQModal] = useState(false);

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${prodId}`, {
      headers: {
        Authorization: process.env.AUTH_TOKEN,
      },
    })
      .then((response) => {
        // console.log(response.data.results);
        setListOfQs(response.data.results);
      })
      .catch((err) => {
        throw new Error('Error getting QA data', err);
      });
  }, []);

  return (
    <>
      <div className="flex-col">
        {listOfQs.map((eachQ) => (
          <QListEntry key={eachQ.question_id} eachQ={eachQ} />
        ))}
      </div>
      <div className="flex items-center justify-start space-x-10 p-6">
        <button className="w-[275px] bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">More Answered Questions</button>
        <button className="w-[250px] bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setOpenQModal(true)}>Add A Question</button>
      </div>
      {openQModal ? <QModal setOpenQModal={setOpenQModal} /> : null}
    </>
  );
}

export default QList;
