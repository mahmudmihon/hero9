import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import map from "../../images/map.png";
import "./Search.css";

const Search = () => {
  const { key } = useParams();

  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
  });

  const [dataExist, setDataExist] = useState(false);

  const [searchResult, setSearchResult] = useState({});

  const handelBlur = (event) => {
    const initialData = { ...searchData };

    initialData[event.target.name] = event.target.value;

    setSearchData(initialData);
  }

  const handelSubmit = (event) => {
    const { from, to } = searchData;

    if (from && to) {
      fetch('/placeData.json', {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          let matchData = { ...searchResult };
          matchData = data.filter(x =>
              x.pickFrom.toLowerCase() === from.toLowerCase() &&
              x.pickTo.toLowerCase() === to.toLowerCase()
          )[0];

          if (matchData !== null) {
            setDataExist(true);
            setSearchResult(matchData);
          }
        });
    }

    event.preventDefault();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5" style={{ padding: "0px 20px 100px 100px" }}>
          {dataExist ? (
            <div className="result">
              <div className="resultDiv">
                <p>{searchResult.pickFrom}</p>
                <p>{searchResult.pickTo}</p>
              </div>

              <div className="vechileDetails">
                {   key === 'Bus' ?
                    <img src={searchResult.busImage} />
                    : key === 'Bike' ?
                    <img src={searchResult.bikeImage} />
                    : key === 'Car' ?
                    <img src={searchResult.carImage} />
                    :
                    <img src={searchResult.trainImage} />
                }
                <p>Sit: {searchResult.sit}</p>
                <p>Price: {searchResult.cost}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handelSubmit}>
              <div className="mb-3">
                <label className="form-label">Pick From</label>
                <input
                  type="text"
                  name="from"
                  onBlur={handelBlur}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Pick To</label>
                <input
                  type="text"
                  name="to"
                  onBlur={handelBlur}
                  className="form-control"
                />
              </div>
              <br />
              <button className="btn btn-primary form-control">Search</button>
            </form>
          )}
        </div>
        <div className="col-md-7" style={{ padding: "0px 100px" }}>
          <img style={{ width: "100%" }} src={map} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Search;
