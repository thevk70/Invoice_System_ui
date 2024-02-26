async function logInvoice() {
  var total = 0;
  fetch("https://localhost:7126/api/Sales")
    .then(function (response) {
      return response.json(); //returning the response as json format
    })
    .then(function (objects) {
      let placeholder = document.getElementById("data-output");
      let out = "";
      for (let object of objects) {
        out += `
      <tr>
          <td>${object.id}</td>
          <td>${object.item_Name}</td>
          <td>${object.quantity}</td>
          <td>${object.rate}</td>
          <td>${object.amount}</td>
      </tr>
      `;
        total = total + object.amount;
      }
      out += `<tr>
      <td colspan="4" style="text-align: end;
      font-weight: 900;
      font-size: 1.5rem;">Sub Total :</td>
      <td colspan="1"> ${total}</td>
      </tr>
      <tr><td colspan="4" style="text-align: end;
      font-weight: 900;
      font-size: 1.5rem;">Tax Rate :</td>
      <td colspan="1">5.00%</td></tr>
      <tr> <td colspan="4" style="text-align: end;
      font-weight: 900;
      font-size: 1.5rem;">Total :</td>
      <td colspan="1">${total = total + 0.05 * total}</td></tr>`;
  
      document.querySelector("#data-output").innerHTML = out;
    });

  // const invoice = await Response.json();

  // console.log(invoice);
}

async function postInvoice() {
  let Id = 0;
  const Response = await fetch("https://localhost:7126/api/Sales");

  const result = await Response.json();

  result.map((item) => (Id = item.id));
  // console.log("id = ",++Id);
  sessionStorage.setItem("Id", ++Id);
  sessionStorage.getItem("Id");

  let ItemName = document.getElementById("ItemName").value;
  let ItemDesc = document.getElementById("ItemDesc").value;
  let Quantity = document.getElementById("Quantity").value;
  let Rate = document.getElementById("Rate").value;
  // console.log(ItemName,ItemDesc,Quantity,Rate);

  let invoice = {
    id: Id,
    quantity: Number(Quantity),
    item_Name: ItemName,
    description: ItemDesc,
    rate: Rate,
    amount: Number(Quantity) * Number(Rate),
  };
  console.log(invoice);
  if (ItemName != "" && ItemDesc != "" && Quantity != "" && Rate != "") {
    fetch("https://localhost:7126/api/Sales", {
      method: "POST",
      body: JSON.stringify(invoice),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(function (response) {
      return response.json();
    });
  }
}

async function printInvoice() {
  window.print();
  let id = sessionStorage.getItem("Id");
  console.log(id);
  const Response = await fetch("https://localhost:7126/api/Sales/" + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  }).then(sessionStorage.setItem("Id", 0));
}
