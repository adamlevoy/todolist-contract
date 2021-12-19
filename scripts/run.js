async function main() {
  // We get the contract to deploy
  const todoListContractFactory = await hre.ethers.getContractFactory("TodoList");
  const todoListContract = await todoListContractFactory.deploy();
  await todoListContract.deployed();
  console.log("TodoList contract deployed to:", todoListContract.address);

  // create todo #1
  let txCreateTodo = await todoListContract.createTodo("write smart contract");
  console.log("Creating todo...⛏️");
  await txCreateTodo.wait();
  console.log("Todo mined! 💎");

  // create todo #2
  txCreateTodo = await todoListContract.createTodo("deploy smart contract");
  console.log("Creating todo...⛏️");
  await txCreateTodo.wait();
  console.log("Todo mined! 💎");

  // show todo list
  txGetTodos = await todoListContract.getTodoListByOwner();
  console.log("Here are your todos:", txGetTodos);

  // toggle todo #1
  let txToggleTodo = await todoListContract.toggleCompleted(1);
  console.log("Updating todo...⛏️");
  await txToggleTodo.wait();
  console.log("Todo updated! 💎");

  // toggle todo #2
  txToggleTodo = await todoListContract.toggleCompleted(2);
  console.log("Updating todo...⛏️");
  await txToggleTodo.wait();
  console.log("Todo updated! 💎");

  // show todo list
  txGetTodos = await todoListContract.getTodoListByOwner();
  console.log("Here are your todos:", txGetTodos);

  //remove todo
  let txRemoveTodo = await todoListContract.removeTodo(2);
  console.log("Removing todo...");
  await txRemoveTodo.wait();
  console.log("Todo removed!");

  // show todo list
  txGetTodos = await todoListContract.getTodoListByOwner();
  console.log("Here are your todos:", txGetTodos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
