import { useState } from "react"

export default function UsersList() {
  const [queryCheked, setQueryCheked] = useState("all");
  const mockUsers: Array<string> = ["Not","Really",":)"]

  return <div className="card">
    <div className="card-body">
      <strong className="h5">Users</strong>
      <div>
        Search: <input type="text" placeholder="user1234" className="form-control" />
      </div>
      <div className="my-2">
        <input className="noselect" type="radio" checked={queryCheked === "all"} value="all" onChange={e => setQueryCheked(e.target.value)} name="query-user" id="all" />
        <label htmlFor="all">All</label><br />
        <input className="noselect" type="radio" checked={queryCheked === "following"} value="following" onChange={e => setQueryCheked(e.target.value)} name="query-user" id="following" />
        <label htmlFor="following">Following</label><br />
        <input className="noselect" type="radio" checked={queryCheked === "not-following"} value="not-following" onChange={e => setQueryCheked(e.target.value)} name="query-user" id="not-following" />
        <label htmlFor="not-following">Not Following</label>
      </div>
      <hr />
      <div>
        {mockUsers.map((user, index)=> {
          return (
            <div className="card mb-2" key={index}>
              <div className="card-body">
                <b style={{fontSize: "0.9rem"}}>User123</b> <br />
                <p style={{fontSize: "0.9rem"}} className="fst-italic text-muted">been here for 2 years</p>
                <button className="btn btn-info">+ Follow</button>
              </div>
            </div>
          )
        })
        }
      </div>
    </div>
  </div>
}