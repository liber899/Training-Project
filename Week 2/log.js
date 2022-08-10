"use strict";

//Data

const devices = [
  ["101", "TV", "Turn On", "124689"],
  ["102", "Washer", "Sleep", "124689"],
  ["103", "Selling Fan", "Turn Off", "124689"],
  ["104", "TV", "Turn On", "124689"],
  ["105", "Washer", "Sleep", "124689"],
  ["106", "Selling Fan", "Turn Off", "124689"],
  ["107", "TV", "Turn On", "124689"],
  ["108", "Washer", "Sleep", "124689"],
  ["109", "Selling Fan", "Turn Off", "124689"],
  ["110", "TV", "Turn On", "124689"],
  ["112", "Washer", "Sleep", "124689"],
  ["113", "Selling Fan", "Turn Off", "124689"],
  ["114", "TV", "Turn On", "124689"],
  ["115", "Washer", "Sleep", "124689"],
  ["116", "Selling Fan", "Turn Off", "124689"],
  ["117", "TV", "Turn On", "124689"],
  ["118", "Washer", "Sleep", "124689"],
  ["119", "Selling Fan", "Turn Off", "124689"],
  ["120", "TV", "Turn On", "124689"],
  ["121", "Washer", "Sleep", "124689"],
  ["122", "TV", "Turn On", "124689"],
  ["123", "TV", "Turn On", "124689"],
  ["124", "TV", "Turn On", "124689"],
];

const devicesRecord = document.querySelector(".devices_record");
const tableContainer = document.querySelector(".devices_record");
const paginationContainer = document.querySelector(".pagination");
const searchName = document.querySelector(".search_name");
const searchBtn = document.querySelector(".search_button");

// get result base on page number

const getResultsPage = (page, data) => {
  const start = (page - 1) * 7;
  const end = page * 7;
  return data.slice(start, end).reverse();
};

//Render data
const displayDevices = (displayDevices, data) => {
  tableContainer.innerHTML = `
    <tr class="table_footer">
      <td class="total first_column">Total Devices</td>
      <td></td>
      <td></td>
      <td class="sum">${data.length}</td>
    </tr>
  `;

  displayDevices.forEach((e) => {
    const html = `
    <tr>
      <td class="device_id first_column">${e[0]}</td>
      <td class="name">${e[1]}</td>
      <td class="action">${e[2]}</td>
      <td class="date">${e[3]}</td>
    </tr>
  `;
    devicesRecord.insertAdjacentHTML("afterbegin", html);
  });
};

displayDevices(getResultsPage(1, devices), devices);

//Render pagination

const resultPerPage = 7;

const pageNums = (data) => {
  const paginationNums = [];
  const nums = Math.ceil(data.length / resultPerPage);
  for (let i = 1; i < nums + 1; i++) {
    paginationNums.unshift(i);
  }
  return paginationNums;
};

const displayPagination = (pageNumber, data) => {
  paginationContainer.innerHTML = "";

  pageNumber.forEach((e) => {
    const html = `<button class="page_num" id="${e}">${e}</button>`;

    paginationContainer.insertAdjacentHTML("afterbegin", html);

    if (e === 1) {
      document.getElementById(`${e}`).classList.add("active_pagination");
    }

    const pageNum = document.getElementsByClassName("page_num");
    document.getElementById(`${e}`).addEventListener("click", function () {
      displayDevices(getResultsPage(e, data), data);

      for (let i = 0; i < pageNumber.length; i++) {
        pageNum[i].classList.remove("active_pagination");
      }

      document.getElementById(`${e}`).classList.add("active_pagination");
    });
  });
};

displayPagination(pageNums(devices), devices);

//Display search result

const displaySearchResults = () => {
  const searchResult = devices
    .filter((d) => d[1] == searchName.value)
    .reverse();
  displayDevices(getResultsPage(1, searchResult.reverse()), searchResult);
  displayPagination(pageNums(searchResult), searchResult);
  if (searchName.value === "") {
    displayDevices(getResultsPage(1, devices), devices);
    displayPagination(pageNums(devices), devices);
  }
};

searchBtn.addEventListener("click", function (e) {
  displaySearchResults();
});

searchName.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    displaySearchResults();
  }
});
