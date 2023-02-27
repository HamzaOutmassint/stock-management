import React, { useState } from "react";
import Nav from "./NavAdmin";
export default function Controllerpage() {
  const [searchnmame, setSearchname] = useState("");
  const [searchdate, setSearchdate] = useState("");
  console.log(searchdate);
  console.log(searchnmame);
  return (
    <div>
      <Nav />
      <div className="container">
        <section>
          <div className="flex  justify-end gap-10">
            <div>
              <input
                className="bg-[#3C3D42] text-white p-3 h-11 rounded-xl w-64"
                type="text"
                onChange={(e) => setSearchname(e.target.value)}
                placeholder="Search for ... "
              />
            </div>
            <div className="flex gap-4 items-center">
              
              <select
                name=""
                id=""
              
                onChange={(e) => setSearchdate(e.target.value)}
                className="bg-[#3C3D42] p-3 h-11 w-64 text-center rounded-xl font-mono  font-medium  text-white"
              >
                <option selected >
                  All date
                </option>
                <option  value="1">
                  1
                </option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
