"use strict";

const devicesRecord = document.querySelector(".devices_record");
const inputDeviceName = document.querySelector(".device_name");
const inputDeviceIp = document.querySelector(".device_ip");
const inputDevicePower = document.querySelector(".device_power");
const btnAddDevice = document.querySelector(".add_device_button");
const tableContainer = document.querySelector(".devices_record");
const menuMobile = document.getElementsByTagName("aside");
const btnShowMenu = document.querySelector(".bx-menu");
const homeContentContainer = document.querySelector(".function");
const navBar = document.querySelector(".desktop_view");

let today = new Date().toISOString().slice(0, 10);

// Data

const devices = [
  ["TV", "00:18:44:11:3A:B7", "127.0.0.2", "2021-05-31", 50],
  ["Washer", "00:18:44:11:3A:B8", "127.0.0.3", "2021-05-31", 60],
  ["Refrigerator", "00:18:44:11:3A:B9", "127.0.0.4", "2021-05-31", 80],
  ["Selling Fan", "00:18:44:11:3A:B2", "127.0.0.5", "2021-05-31", 100],
];

// Save data to local storage

devices.forEach((e, i) =>
  localStorage.setItem(`${i + 1}`, JSON.stringify(`${e}`))
);

//Get data from local storage

function allStorage() {
  const values = [];
  const keys = Object.keys(localStorage)
    .map((e) => Number(e))
    .sort((a, b) => a - b)
    .reverse();
  let i = keys.length;
  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }
  const output = values.map((e) => e.replaceAll('"', "").split(","));
  return output;
}

//Calculate sum of power consumption

const calcSum = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i][4];
  }
  return sum;
};

//Render device log based on local storage

const displayDevices = (displayDevices) => {
  tableContainer.innerHTML = `
    <tr class="table_footer">
      <td class="total first_column">Total</td>
      <td></td>
      <td></td>
      <td></td>
      <td class="sum">${calcSum(devices)}</td>
    </tr>
  `;

  displayDevices.forEach((e) => {
    const html = `
    <tr>
      <td class="devices first_column">${e[0]}</td>
      <td class="mac_address">${e[1]}</td>
      <td class="ip">${e[2]}</td>
      <td class="created_date">${e[3]}</td>
      <td class="power_consumption">${e[4]}</td>
    </tr>
  `;
    devicesRecord.insertAdjacentHTML("afterbegin", html);
  });
};

displayDevices(allStorage().reverse());

// display pie chart using Chart.js

const label = [];
const datas = [];
const chartData = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    label.push(arr[i][0]);
    datas.push(arr[i][4]);
  }
};

chartData(allStorage());

const getNewColor = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6) + "20";
};

const addData = (chart, label, data) => {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
    dataset.backgroundColor.push(getNewColor());
  });
  chart.update();
};

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [...label],
    datasets: [
      {
        label: "# of Votes",
        data: [...datas],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Add data

btnAddDevice.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputDeviceName.value && inputDeviceIp.value && inputDevicePower.value) {
    const output = [
      inputDeviceName.value,
      "00:18:44:11:3A:B2",
      inputDeviceIp.value,
      today,
      Number(inputDevicePower.value),
    ];
    devices.unshift(output);
    localStorage.setItem(
      `${Object.keys(localStorage).length + 1}`,
      JSON.stringify(`${output}`)
    );
    displayDevices(allStorage().reverse());
    addData(myChart, inputDeviceName.value, Number(inputDevicePower.value));
  } else {
    alert("Invalid input");
  }
});

//Show/hide mobile menu

const showMobileMenu = () => {
  menuMobile[0].style.display = "block";
};

const hideMobileMenu = () => {
  menuMobile[0].style.display = "none";
};

if (window.innerWidth <= 414) {
  menuMobile[0].style.display = "none";
  btnShowMenu.addEventListener("click", showMobileMenu);
  homeContentContainer.addEventListener("click", hideMobileMenu);
  navBar.addEventListener("click", hideMobileMenu);
}

window.addEventListener("resize", function () {
  if (window.innerWidth <= 414) {
    hideMobileMenu();
    btnShowMenu.addEventListener("click", showMobileMenu);
    homeContentContainer.addEventListener("click", hideMobileMenu);
  } else {
    showMobileMenu();
  }
});
