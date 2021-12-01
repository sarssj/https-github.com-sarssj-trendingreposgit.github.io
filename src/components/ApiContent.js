import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
function ApiContent() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getRepos = async () => {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=1&_limit=30`
      );
      const data = await res.json();

      setItems(data["items"]);
    };
    getRepos();
  }, []);

  const fetchRepos = async (currentPage) => {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${currentPage}&_limit=30`
    );
    const data = await res.json();
    return data["items"];
  };

  const handlePageClick = async (e) => {
    console.log(e.selected);
    let currentPage = e.selected + 1;
    const reposFormServer = await fetchRepos(currentPage);
    setItems(reposFormServer);
  };

  return (
    <Fragment>
      <div className="row m-2">
        {items.map((item) => {
          let now = new Date();
          const date_created = Math.ceil(
            (now - new Date(item.created_at)) / (1000 * 3600 * 24)
          );

          return (
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-xl-2 col-lg-4 col-md-4 text-center">
                  <img
                    src={item.owner.avatar_url}
                    className="avatar img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-xl-9 col-lg-8 col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <div className="container group">
                      <div class="row">
                        <div className="col-xl-2 col-lg-2 col-md-4">
                          <div className="stars text-center">
                            Stars: {item.stargazers_count}
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-4">
                          <div className="issues text-center">
                            Issues: {item.open_issues_count}
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 submitted">
                          Submitted {date_created} {""}
                          {date_created === 1 ? "day" : "days"} ago by{" "}
                          {item.owner.login}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        breakLabel={"..."}
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        nextLabel={"Next"}
        containerClassName={"pagination d-flex justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </Fragment>
  );
}
export default ApiContent;
