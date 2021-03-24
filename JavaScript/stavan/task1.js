// ) Write down a program to display the searched data and sorted data from the Array of Objects.

// Requirements:

// There should be User Input which defines the number of records [n]  to store. Then the user must fill the information which is required for the data for the "n" records.
// The values of data should be stored in UPPERCASE, lowercase, Title Case format. There should be a key which holds a function which returns output in console. The data should be sorted based on any field that you prefer. (Ascending & Descending order)
// The User should be able to search for the records and should give the desired output.

// Output:
// 1) Display the Records as the User have Filled (No Filteration or Sort)
// 2) Display the records sorted in ascending order and descending order
// 3) Display the records filtered with the search input

function Task1() {
  let len = parseInt(prompt("Enter The Length of Array"));
  let data = [];

  function capitalizeName(name) {
    return name[0].toUpperCase() + name.slice(1);
  }

  while (len !== 0) {
    let obj = {
      name: {},
    };
    let userInput = prompt("enter name");
    let nameArray = nameSplitter(userInput);
    obj.name["firstName"] = capitalizeName(nameArray.firstName);
    obj.name["lastName"] = capitalizeName(nameArray.lastName);
    obj["age"] = parseInt(prompt("enter age"));
    obj["city"] = capitalizeName(prompt("enter city"));
    data.push(obj);
    len--;
  }
  console.log("Input Array", data);

  //By Age
  // data.sort((a, b) => {
  //   return a.age - b.age;
  // });
  // console.log("Sorted Array By Age ", data);

  // By firstName
  let sortedData = new Array(...data);
  var j = +prompt("enter 1 for ascending and -1 for descending ");
  sortedData.sort((a, b) => {
    if (a.name.firstName < b.name.firstName) {
      return -1 * j;
    }
    if (a.name.firstName > b.name.firstName) {
      return 1 * j;
    }
    return 0;
  });
  console.log("Sorted Array By Name ", sortedData);
  console.log("original Data", data);

  // Search By LastName
  let filteredItem = [];
  const text = prompt("Enter The Name You Want to search");
  data.forEach((x) => {
    if (x.name.lastName.toLowerCase().includes(text.toLowerCase()) === true) {
      filteredItem.push(x);
    }
  });
  console.log("Output=", filteredItem);

  function nameSplitter(data) {
    let msg = data.split(" ");
    let firstName = msg.shift();
    let lastName = msg.join("");
    // let lastName = msg.filter((x) => {
    //   return x !== firstName;
    // });
    // lastName = lastName.join("");
    return { firstName, lastName };
  }
}
